# Despliegue

La app corre en **Hostinger** (Node.js + Passenger) y la **base de datos MySQL**
vive en el mismo servidor (`localhost`).

El deploy se hace por **GitHub Actions** (`.github/workflows/deploy.yml`):
**compila en CI** (contenedor AlmaLinux 9, igual que el servidor) y sube el
resultado ya construido. El servidor **no recompila** — solo recibe el artefacto,
migra y reinicia Passenger. Así el downtime baja de minutos (build en un server
saturado) a **segundos** (restart graceful), con rollback inmediato.

> ⚠️ El **auto-deploy de GitHub en hPanel debe estar DESACTIVADO**. Este workflow
> lo reemplaza; si ambos están activos, pelean por la carpeta de la app.

---

## Cómo funciona

1. Push a `main` (o `workflow_dispatch`) dispara el workflow.
2. CI instala Node 20, `npm ci`, `prisma generate` (engine `rhel-openssl-3.0.x`)
   y `next build` con `output: standalone`. **El build no toca la DB**: las
   páginas públicas son `force-dynamic` y los `[slug]` se generan on-demand.
3. CI ensambla el standalone (+ `static`, `public`, engine de Prisma, `prisma/`).
4. `rsync` del artefacto a `~/domains/rehabilitacionoral.cl/deploy-staging/`.
5. Por SSH se ejecuta `scripts/remote-deploy.sh`:
   - `prisma migrate deploy` (idempotente),
   - swap atómico de `.next` y `node_modules` (rename; el proceso vivo conserva
     los inodos abiertos, así que no se cae durante el swap),
   - preserva `public/uploads`,
   - `touch tmp/restart.txt` → Passenger reinicia graceful.
6. Smoke test HTTP 200 contra el sitio.

**Rollback:** `ssh … 'bash -s' < scripts/remote-rollback.sh` (restaura el build
anterior, que queda en `.next.prev` / `node_modules.prev`).

---

## Configuración (una sola vez)

### 1. Llave SSH de deploy
Ya existe el par `~/.ssh/sproch_deploy(.pub)` y la pública está autorizada en el
servidor. Si hay que regenerarla: `ssh-keygen -t ed25519` + `ssh-copy-id`.

### 2. Secrets en GitHub
**Settings → Secrets and variables → Actions → New repository secret:**

| Secret | Valor |
|---|---|
| `SSH_PRIVATE_KEY` | contenido de `~/.ssh/sproch_deploy` (privada completa) |
| `DATABASE_URL` | `mysql://USER:PASS@localhost:3306/sproch` (real, para migraciones) |
| `NEXT_PUBLIC_SITE_URL` | `https://rehabilitacionoral.cl` |
| `NEXT_PUBLIC_GA_ID` | (opcional) `G-XXXXXXXXXX` |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | misma clave que en runtime (hPanel) |

> Host/puerto/usuario SSH están en el `env` del workflow (no son secretos).

### 3. Variables de entorno en hPanel (runtime)
La app en producción las lee vía Passenger:

| Variable | Valor |
|---|---|
| `DATABASE_URL` | `mysql://USER:PASS@localhost:3306/sproch` |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | `https://rehabilitacionoral.cl` |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | **mismo valor que en el secret de CI** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | credenciales del admin |

### 4. Desactivar el auto-deploy de Hostinger
hPanel → (sección Git / despliegue del sitio) → desactivar el deploy automático
desde GitHub.

---

## Imágenes subidas

Viven en `nodejs/public/uploads`. El deploy las **preserva** (el swap excluye
`uploads/`). No se pierden entre despliegues.
