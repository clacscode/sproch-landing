# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Sitio corporativo de la **Sociedad de Prótesis y Rehabilitación Oral de Chile (SPROCh)**. Next.js 15 (App Router, React 19), TypeScript strict, Tailwind CSS 4, Prisma sobre **MySQL/MariaDB**, Auth.js v5. El idioma del producto y del contenido es español.

## Comandos

```bash
npm run dev          # servidor de desarrollo (localhost:3000)
npm run build        # prisma migrate deploy && next build
npm run start        # prisma migrate deploy && next start
npm run lint         # ESLint (eslint-config-next)
npm run typecheck    # tsc --noEmit
npm run format       # Prettier (incluye prettier-plugin-tailwindcss)

# Base de datos (Prisma)
npm run db:migrate   # prisma migrate dev (crear/aplicar migración en local)
npm run db:generate  # regenerar el cliente Prisma
npm run db:studio    # explorador de la DB
npm run db:seed      # carga contenido de ejemplo (no se corre en deploy)
```

No hay framework de tests configurado. La verificación es `npm run typecheck && npm run lint` en verde + revisión manual de rutas.

## Arquitectura

### Dos zonas, dos route groups
- `src/app/(public)/` — landing pública (Inicio, Nosotros, Noticias, Eventos, Pacientes, Socios, Contacto). RSC por defecto; listados con `export const revalidate` (ISR). Cada ruta tiene su `opengraph-image.tsx` (OG generado con `src/lib/og.tsx`).
- `src/app/admin/(panel)/` — panel CRUD protegido. `src/app/admin/login/` queda fuera del grupo `(panel)`.

### Flujo de datos: lecturas vs mutaciones
- **Lecturas** → `src/server/queries/` (`news`, `events`, `patients`, `admin`). Las páginas las llaman directamente. `src/server/queries/mappers.ts` convierte filas Prisma → tipos de dominio en `src/lib/types.ts`.
- **Mutaciones** → `src/server/actions/` (Server Actions). Las del admin viven en `actions/admin/` y **deben** empezar con `await requireAdmin()` (`actions/admin/_guard.ts`). Devuelven el discriminated union `ActionResult` / `ActionError` (`{ ok: true, ... } | { ok: false, error, fieldErrors? }`).
- `src/data/` es contenido estático/curado (directiva, filiales, sponsors, membresía) que **no** está en la DB — no confundir con mocks pendientes de migrar.

### Autenticación (Auth.js v5, dividida por runtime)
- `src/lib/auth.config.ts` — config **edge-safe** (sin Prisma ni bcrypt). El callback `authorized` protege `/admin` (sólo rol `ADMIN`, dejando pasar `/admin/login`). La usa `src/middleware.ts`.
- `src/lib/auth.ts` — extiende lo anterior con el provider de credenciales (bcrypt + Prisma). Sólo se importa en contexto Node, nunca en middleware/edge.
- El admin se crea solo al arrancar: `src/instrumentation.ts` → `src/server/bootstrap.ts` (`ensureAdmin`) lee `ADMIN_EMAIL`/`ADMIN_PASSWORD`/`ADMIN_NAME`. Sin seed manual.
- Sesión JWT; el `role` se propaga vía callbacks `jwt`/`session` (tipos en `src/types/next-auth.d.ts`).

### Feature flags en `src/lib/site.ts`
`siteConfig.features` controla qué se muestra:
- `eventsComingSoon` — categorías de eventos sin contenido muestran "Próximamente".
- `adminExtras` — módulos extra del admin (directiva, filiales, sponsors, textos) están scaffoldeados pero **gated**; el sidebar los marca "no habilitado" y sus rutas renderizan `LockedModule`. Activar sólo cuando el cliente lo contrate.

### Contenido enriquecido (TipTap)
Los campos `content` de `News`/`Event` son **JSON** (documento TipTap), no HTML ni markdown. `src/lib/tiptap.ts` (cliente) y `src/lib/tiptap-server.ts` (render server-side a HTML) son el puente; el editor es `components/admin/RichTextEditor.tsx`.

### Validación
Schemas Zod en `src/lib/validations/` compartidos cliente (React Hook Form) y servidor (Server Actions). Validar **siempre** en el servidor además del cliente.

## Convenciones específicas de este repo

- **El contenido autogestionado nunca se borra: se archiva.** `News`, `Event`, `ContactMessage`, `MembershipApplication` y `NewsletterSubscriber` tienen `archivedAt DateTime?` (null = activo). Las acciones del admin son `archive*` / `restore*` — **nada de `prisma.*.delete()`** en esas entidades. Toda lectura pública filtra `archivedAt: null`; los listados del panel muestran lo activo y ofrecen la pestaña "Archivados" (`adminList*({ archived: true })`). Al re-suscribirse un email dado de baja se reactiva la fila existente en vez de crear otra (`email` es único).
- **MySQL/MariaDB, no Postgres.** Sin arrays escalares ni `@default` en JSON: `tags`, `speakers`, `sponsors`, `program` son columnas `Json` que la app **siempre** escribe explícitamente. Tenerlo presente al crear filas.
- **`next/image` siempre**, formatos AVIF/WebP (hay `.jpg` + `.webp` en `public/brand`).
- Tokens de marca como CSS variables en `src/styles/globals.css` vía `@theme` (Tailwind 4, sin `tailwind.config`). Rojo corporativo `#E30613` = `--color-brand-600`. Fuentes Inter + Bebas Neue vía `next/font`.
- Crédito de agencia en el footer ("Sitio desarrollado por Korr") — mantenerlo, configurable en `siteConfig.developedBy`.
- Uploads de imágenes → `POST /api/admin/upload` guarda en `public/uploads/` (disco, no object storage). Ver `DEPLOY.md` sobre persistencia entre builds.
- Git: **no** agregar trailer `Co-Authored-By: Claude` en los commits.

## Deploy

Hostinger (Node + MySQL, deploy automático desde `main`). Autosuficiente: el `start` aplica migraciones y `ensureAdmin` crea el admin. Variables clave en `DEPLOY.md`; `NEXT_PUBLIC_SITE_URL` se compila en el bundle (definir **antes** del build). En Prisma usar `127.0.0.1`, no `localhost` (IPv6). El repo incluye `render.yaml` como alternativa.
