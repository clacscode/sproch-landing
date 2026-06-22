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
#    El host comparte memoria y mata el proceso (OOM, exit 137) en cada deploy;
#    como el esquema casi nunca cambia, se corre aparte cuando hace falta:
#    Actions → "Run workflow" → marca "run_migrations".
#    Usa el CLI empacado en el artefacto (sin descargar nada por red) y limita
#    la memoria de Node para no chocar con el límite de la cuenta.
if [ "${RUN_MIGRATIONS:-}" = "true" ]; then
  if [ -n "${DATABASE_URL:-}" ] && [ -f "$STAGE/node_modules/prisma/build/index.js" ]; then
    log "Aplicando migraciones…"
    ( cd "$STAGE" && NODE_OPTIONS="--max-old-space-size=256" DATABASE_URL="$DATABASE_URL" \
        node node_modules/prisma/build/index.js migrate deploy )
  else
    echo "ERROR: RUN_MIGRATIONS=true pero falta DATABASE_URL o el CLI"; exit 1
  fi
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
