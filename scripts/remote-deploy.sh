#!/usr/bin/env bash
#
# Se ejecuta EN el servidor de Hostinger, vía:
#   ssh ... "DATABASE_URL='...' bash -s" < scripts/remote-deploy.sh
#
# Requisitos en el entorno remoto:
#   - El artefacto ya compilado (next standalone) está en  $STAGE
#   - DATABASE_URL exportado (para las migraciones)
#
# Estrategia anti-downtime: el proceso Passenger en vivo mantiene abiertos los
# inodos de .next/node_modules aun después de renombrarlos (rename POSIX), así
# que el swap no afecta a la app corriendo. Solo el proceso NUEVO (tras tocar
# tmp/restart.txt) lee el build nuevo. Downtime ≈ restart graceful de Passenger.
set -euo pipefail

DOMAIN="$HOME/domains/rehabilitacionoral.cl"
APP="$DOMAIN/nodejs"
STAGE="$DOMAIN/deploy-staging"
export PATH="/opt/alt/alt-nodejs20/root/bin:$PATH"

log() { echo "[remote-deploy] $*"; }

[ -d "$STAGE/.next" ] || { echo "ERROR: no hay build en $STAGE"; exit 1; }
[ -f "$STAGE/server.js" ] || { echo "ERROR: falta server.js en el staging"; exit 1; }

# 1) Migraciones — SOLO a demanda (RUN_MIGRATIONS=true).
#    SIN el CLI de Prisma: en este host el CLI se cuelga al conectar (el engine
#    muere por el límite de memoria/procesos de la cuenta; 2026-07-19 colgó
#    2× 10 min con la DB completamente libre, y el mismo SQL vía mysql tomó
#    30 ms). Se aplican los migration.sql pendientes con el cliente mysql y se
#    registran en _prisma_migrations con el formato de Prisma (sha256 del
#    archivo), así `prisma migrate` en dev sigue entendiendo el estado.
if [ "${RUN_MIGRATIONS:-}" = "true" ]; then
  [ -n "${DATABASE_URL:-}" ] || { echo "ERROR: RUN_MIGRATIONS=true pero falta DATABASE_URL"; exit 1; }
  [ -d "$STAGE/prisma/migrations" ] || { echo "ERROR: faltan prisma/migrations en el staging"; exit 1; }

  # mysql://user:pass@host:port/db → componentes (la clave va por MYSQL_PWD,
  # nunca en la línea de comandos). Se corta en el ÚLTIMO @ por si la clave
  # contiene @ sin percent-encoding.
  u="${DATABASE_URL#mysql://}"
  userpass="${u%@*}"; hostportdb="${u##*@}"
  DB_USER="${userpass%%:*}"; export MYSQL_PWD="${userpass#*:}"
  hostport="${hostportdb%%/*}"
  DB_NAME="${hostportdb#*/}"; DB_NAME="${DB_NAME%%\?*}"
  DB_HOST="${hostport%%:*}"; DB_PORT="${hostport#*:}"
  M() { timeout 30 mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" "$@"; }

  # Idéntica a la tabla que crea Prisma, por si la DB estuviera vacía.
  M -e "CREATE TABLE IF NOT EXISTS _prisma_migrations (
    id VARCHAR(36) NOT NULL,
    checksum VARCHAR(64) NOT NULL,
    finished_at DATETIME(3) NULL,
    migration_name VARCHAR(255) NOT NULL,
    logs TEXT NULL,
    rolled_back_at DATETIME(3) NULL,
    started_at DATETIME(3) NOT NULL DEFAULT NOW(3),
    applied_steps_count INT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

  applied=$(M -N -B -e "SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL;")
  count=0
  for dir in "$STAGE"/prisma/migrations/*/; do
    name=$(basename "$dir")
    [ -f "$dir/migration.sql" ] || continue
    if printf '%s\n' "$applied" | grep -qx "$name"; then continue; fi
    checksum=$(sha256sum "$dir/migration.sql" | cut -d' ' -f1)
    log "Aplicando migración ${name}…"
    # lock_wait_timeout corto: si un metadata lock la retiene (conexiones vivas
    # de la app), falla limpio en 30 s en vez de colgarse. timeout duro por si
    # el propio cliente quedara pegado.
    if ! { echo "SET SESSION lock_wait_timeout=30;"; cat "$dir/migration.sql"; } \
        | timeout 120 mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME"; then
      echo "ERROR: la migración $name falló. Sin swap — revisar con el workflow db-diag."; exit 1
    fi
    # El DELETE limpia un posible registro a medias de un intento colgado del
    # CLI viejo antes de registrar el resultado real.
    M -e "DELETE FROM _prisma_migrations WHERE migration_name='$name';
          INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
          VALUES (UUID(), '$checksum', NOW(3), '$name', NOW(3), 1);"
    count=$((count+1))
  done
  log "Migraciones aplicadas: $count."
else
  log "Migraciones omitidas (RUN_MIGRATIONS != true). Esquema sin cambios."
fi

# 2) Swap atómico de los directorios pesados (rename en el mismo filesystem).
cd "$APP"
log "Swap de .next y node_modules…"
rm -rf .next.prev node_modules.prev
mv .next .next.prev
mv node_modules node_modules.prev
mv "$STAGE/.next" .next
mv "$STAGE/node_modules" node_modules

# 3) Entrypoint y manifiestos.
cp -f "$STAGE/server.js" server.js
cp -f "$STAGE/package.json" package.json

# 4) Estáticos públicos: actualiza assets pero PRESERVA public/uploads.
mkdir -p public/uploads
rsync -a --delete --exclude 'uploads/' "$STAGE/public/" public/

# 5) Schema + migraciones para el próximo deploy.
rm -rf prisma.prev
[ -d prisma ] && mv prisma prisma.prev || true
mv "$STAGE/prisma" prisma 2>/dev/null || true
rm -rf prisma.prev

# 6) Restart graceful de Passenger.
mkdir -p tmp
touch tmp/restart.txt
log "OK — restart.txt tocado. Build anterior queda en .next.prev / node_modules.prev (rollback)."
