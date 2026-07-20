---
description: Deploy a producción CON migraciones de esquema (commit [skip ci] + workflow con run_migrations)
argument-hint: "[mensaje de commit opcional]"
---

Ejecuta un deploy a producción **con migraciones de base de datos**, en el orden
correcto y sin gatillar deploys dobles. Contexto: el deploy por push NO migra;
las migraciones se aplican solo despachando `deploy.yml` con `run_migrations=true`
(vía cliente mysql en el server — ver `scripts/remote-deploy.sh` y `DEPLOY.md`).

Sigue estos pasos en orden. Si cualquier paso falla, detente y reporta — no
improvises saltándote resguardos.

## 1. Verificación previa

- `npm run typecheck && npm run lint` deben pasar. Si fallan, detente.
- Revisa `git status`. Si hay cambios sin commitear, continúa al paso 2.
  Si el árbol está limpio Y el último commit ya tiene `[skip ci]` y no está
  pusheado, salta al paso 3. Si el árbol está limpio y todo está pusheado,
  pregunta al usuario qué quiere deployar antes de seguir.
- Sanity check de migraciones: confirma que exista al menos una carpeta en
  `prisma/migrations/` que **no** esté aún en producción (si tienes duda,
  sigue igual — el paso de migración del server es idempotente y reporta
  "Migraciones aplicadas: 0" si no hay pendientes).
- Si `prisma/schema.prisma` cambió pero NO hay carpeta de migración nueva,
  detente y avisa: falta generar la migración (con `npm run db:migrate` si el
  MySQL local corre, o con `prisma migrate diff --from-schema-datamodel
  <schema-viejo> --to-schema-datamodel prisma/schema.prisma --script` offline,
  guardando el SQL en `prisma/migrations/<YYYYMMDD>000000_<nombre>/migration.sql`).

## 2. Commit con [skip ci] y push

- Commit de los cambios con mensaje descriptivo en español (usa el argumento
  del comando si viene: "$ARGUMENTS"). El mensaje DEBE terminar con `[skip ci]`
  — esto evita que el push dispare el deploy automático, que deployaría código
  nuevo contra un esquema viejo.
- NO incluir trailer `Co-Authored-By`.
- `git push origin main`.
- Verifica con `gh run list --limit 1` que el push NO haya gatillado un run
  nuevo de "Deploy a producción". Si gatilló uno (se olvidó el [skip ci]),
  espera a que termine antes de seguir — dos deploys seguidos apilan procesos
  `next-server` y pueden dejar el sitio en 503.

## 3. Despachar el deploy con migraciones

```bash
gh workflow run deploy.yml -f run_migrations=true
```

- Obtén el run id (`gh run list --workflow=deploy.yml --limit 1`) y síguelo
  hasta el final con `gh run watch <id> --exit-status` (en background si
  tarda; lo normal es ~4 min).

## 4. Verificar y reportar

- Si el run terminó `success`: confirma en el log la línea
  `[remote-deploy] Migraciones aplicadas: N` y haz un smoke test propio
  (`curl -s -o /dev/null -w "%{http_code}" https://rehabilitacionoral.cl/` → 200).
- Si el paso "Migrar + swap + restart" falló: el sitio sigue con el código
  anterior (no hubo swap). Diagnostica con el workflow `db-diag.yml`
  (`gh workflow run db-diag.yml`) y revisa su output (processlist, estado de
  `_prisma_migrations`). No reintentes a ciegas.
- Si tras el deploy el sitio da 503 sostenido: son procesos `next-server`
  apilados. Rescate por SSH:
  `ssh -i ~/.ssh/sproch_deploy -p 65002 u273127787@46.202.197.70 'pkill -f "next-serve[r]"; mkdir -p domains/rehabilitacionoral.cl/nodejs/tmp && touch domains/rehabilitacionoral.cl/nodejs/tmp/restart.txt'`
  (el patrón con corchete es a propósito: sin él, pkill mata la propia sesión SSH).
- Recuerda al usuario que las páginas estáticas pueden tardar hasta 5 min en
  reflejarse por el caché del CDN de Hostinger (revalidate=300).

Reporta al final: commit pusheado, resultado del run, migraciones aplicadas y
smoke test.
