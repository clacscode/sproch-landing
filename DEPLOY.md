# Despliegue

La app corre en **Hostinger** (hosting con Node.js, deploy automático desde GitHub) y la
**base de datos MySQL** vive también en Hostinger. Todo en el mismo proveedor.

El deploy es **autosuficiente**: al arrancar, la app aplica las migraciones
(`prisma migrate deploy` en el `start`) y crea el usuario admin si no existe
(`src/instrumentation.ts` → `ensureAdmin`). No requiere shell ni seed manual.

---

## 1. Base de datos (Hostinger)

En el panel del sitio → **Bases de datos** → crea/conecta una MySQL. Anota host,
nombre de DB, usuario y contraseña. Si la app y la DB están en el mismo Hostinger,
el host suele ser interno (no necesitas "MySQL remoto").

## 2. Variables de entorno

En el panel del sitio → **Variables de entorno**, define:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | `mysql://USUARIO:CLAVE@HOST:3306/NOMBRE_DB` |
| `AUTH_SECRET` | genera con `openssl rand -base64 32` |
| `AUTH_URL` | `https://rehabilitacionoral.cl` |
| `NEXT_PUBLIC_SITE_URL` | `https://rehabilitacionoral.cl` |
| `ADMIN_EMAIL` | correo del admin (ej. `admin@sproch.cl`) |
| `ADMIN_PASSWORD` | contraseña del admin |
| `ADMIN_NAME` | nombre a mostrar |

> `NEXT_PUBLIC_SITE_URL` se compila en el bundle: defínela **antes** del build.

## 3. Deploy

Mergea a `main`. Hostinger reconstruye (build automático) y al iniciar:
1. `prisma migrate deploy` crea/actualiza las tablas.
2. El hook de arranque crea el admin desde `ADMIN_*` (si no existe).

Luego entra a `https://rehabilitacionoral.cl/admin` con `ADMIN_EMAIL`/`ADMIN_PASSWORD`.

> **Contenido inicial (opcional):** el deploy NO carga las noticias/evento de ejemplo;
> el admin las crea desde el panel. Si quieres precargarlas y la DB acepta conexión
> externa, corre una vez desde tu máquina:
> `DATABASE_URL="mysql://…" npm run db:seed`

### Si las migraciones no se aplican solas

Significa que Hostinger no ejecuta `npm run start` (sino `next start` directo). Opciones:
- En **Ajustes** del sitio, fija el comando de inicio a `npm run start`, **o**
- Corre una vez desde tu máquina (si la DB acepta conexión externa):
  `DATABASE_URL="mysql://…" npx prisma migrate deploy`

### Imágenes subidas

Se guardan en `public/uploads` (disco). Si Hostinger hace builds limpios y borra ese
directorio en cada deploy, las imágenes subidas se perderían. Verifica tras un redeploy;
si no persisten, lo movemos a un directorio persistente servido por una ruta, o a
almacenamiento de objetos.

---

## Alternativa: Render / Railway

Si algún día se mueve fuera de Hostinger, el repo incluye `render.yaml` (Blueprint de
Render con disco persistente). En Railway: deploy desde GitHub, mismas variables, y un
volumen montado en `/app/public/uploads`.
