# Despliegue

Arquitectura: **base de datos MySQL en Hostinger** (Business Web Hosting) + **app Next.js en un host Node** (Railway o Render). El hosting compartido de Hostinger no ejecuta Node, por eso la app va aparte.

---

## 1. Base de datos en Hostinger

En **hPanel → Bases de datos → MySQL**:

1. Crea la base de datos y un usuario. Anota: **host** (ej. `srvNNN.hstgr.io`), **nombre de DB**, **usuario** y **contraseña**.
2. Entra a **"Acceso MySQL remoto"** y autoriza el origen. Como la app corre en Railway/Render (IP de salida variable), usa `%` (cualquier host). Es menos restrictivo; si tu plan permite IPs fijas de salida, úsalas.

Crea las tablas y carga el contenido inicial **desde tu máquina** (una sola vez), apuntando a la DB remota:

```bash
npm install
DATABASE_URL="mysql://USUARIO:CLAVE@HOST:3306/NOMBRE_DB" npx prisma migrate deploy
DATABASE_URL="mysql://USUARIO:CLAVE@HOST:3306/NOMBRE_DB" npm run db:seed
```

`migrate deploy` no necesita "shadow database", así que funciona con los privilegios de hosting compartido. El `seed` crea el admin (lee `ADMIN_*` de tu `.env.local`) y migra las noticias/pacientes/evento iniciales. Verifica en **phpMyAdmin** que existan las tablas `News`, `Event`, `User`.

---

## 2. App en Render (Blueprint)

1. Sube el repo a GitHub (rama `main`).
2. En Render: **New → Blueprint** → conecta `clacscode/sproch-landing`. Render lee `render.yaml`.
3. Completa las variables (marcadas `sync: false`):
   - `DATABASE_URL` → la cadena remota de Hostinger del paso 1.
   - `AUTH_SECRET` → genera con `openssl rand -base64 32`.
   - `AUTH_URL` y `NEXT_PUBLIC_SITE_URL` → la URL pública de la app (ej. `https://sproch.onrender.com` o tu dominio).
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`.
4. Deploy. `preDeployCommand` corre `prisma migrate deploy` en cada release. El disco persiste las imágenes subidas (`public/uploads`).

> El disco requiere plan de pago. En el tier gratuito quita el bloque `disk` del `render.yaml`, pero las imágenes subidas se borrarán en cada redeploy.

## 2-bis. App en Railway (alternativa)

1. **New Project → Deploy from GitHub** → selecciona el repo. Railway detecta Next.js.
2. Variables (Settings → Variables): las mismas del paso anterior.
3. Build: `npm run build` · Start: `npm run start` (Railway inyecta `PORT`, que `next start` respeta).
4. Release/Deploy hook: `npx prisma migrate deploy`.
5. **Volumen** (Settings → Volumes): monta uno en `/app/public/uploads` para persistir las imágenes.

---

## Notas

- `NEXT_PUBLIC_SITE_URL` se compila en el bundle; defínela **antes** del primer build.
- Si cambias de dominio, actualiza `AUTH_URL` y `NEXT_PUBLIC_SITE_URL` y vuelve a desplegar.
- El panel queda en `/admin` (login con `ADMIN_EMAIL`/`ADMIN_PASSWORD`).
