# SPROCh — Sitio corporativo

Sitio web institucional de la **Sociedad de Prótesis y Rehabilitación Oral de Chile**
(SPROCh, fundada en 1952). Construido con Next.js 16 App Router, TypeScript, Tailwind CSS 4
y un stack pensado para mantenerse en el tiempo.

## Stack

- **Next.js 16** (App Router, React Server Components, Server Actions)
- **TypeScript** strict
- **Tailwind CSS 4** + design tokens de marca
- **Radix UI** primitives (Tabs, Label, Slot)
- **React Hook Form + Zod** para formularios validados
- **lucide-react** para iconografía
- Preparado para: **Auth.js**, **Prisma + Supabase Postgres**, **Supabase Storage**, **Resend**,
  **Transbank Webpay**.

## Estructura

```
src/
├─ app/
│  ├─ (public)/           # Landing pública: Home, Nosotros, Noticias, Eventos, Contacto
│  ├─ layout.tsx          # Root layout (metadata, fuentes)
│  ├─ not-found.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ public/             # Header, Footer, Hero, Cards, Section, etc.
│  └─ ui/                 # Primitives tipo shadcn
├─ data/                  # Mock data (se reemplaza por Prisma en F2)
├─ lib/                   # cn, format, site config, validations, types
├─ server/
│  ├─ actions/            # Server Actions (contact, …)
│  └─ queries/            # Lecturas server-side (news, events)
└─ styles/globals.css     # Tokens de marca, Tailwind 4
```

## Setup local

```bash
pnpm install
cp .env.example .env.local   # completar variables disponibles
pnpm dev
```

App disponible en http://localhost:3000.

### Variables de entorno relevantes

| Variable | Cuándo | Default si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Siempre | `http://localhost:3000` |
| `DATABASE_URL`, `DIRECT_URL` | F2 (Prisma + Supabase) | — |
| `AUTH_SECRET`, `AUTH_URL` | F2 (Auth.js) | — |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | F2 (uploads) | — |
| `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_INBOX` | F2 (emails) | logs en consola |
| `WEBPAY_COMMERCE_CODE`, `WEBPAY_API_KEY`, `WEBPAY_ENV` | F3 (pagos) | UI muestra "Inscripción próximamente" |

## Scripts

```bash
pnpm dev          # servidor de desarrollo
pnpm build        # build de producción
pnpm start        # servidor de producción
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier
# F2 (cuando se conecte la DB)
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm db:studio
```

## Roadmap

### F1 — Landing pública ✅ (esta entrega)
- Diseño system con identidad de marca
- Páginas: Inicio, Nosotros, Noticias (listado + detalle), Cursos y Congresos
  (listado + detalle), Contacto
- SEO: metadata por ruta, sitemap dinámico, robots, JSON-LD para `NewsArticle` y `Event`
- Mock data en `src/data/`; queries en `src/server/queries/` listas para Prisma

### F2 — Auth + Admin
- Auth.js v5 (credentials + recuperación), roles ADMIN/USER
- Conectar Prisma a Supabase, migrar mocks a DB, seed inicial
- Panel `/admin` con CRUD noticias/eventos/usuarios/mensajes, uploader Supabase Storage,
  editor TipTap, dashboard básico
- Envío real de emails (Resend) en formulario de contacto y password reset

### F3 — Inscripciones + WebPay
- Modelo `Registration` y flujo `/eventos/[slug]/inscripcion`
- Wrapper `lib/webpay.ts` sobre `transbank-sdk` (sandbox → producción)
- Webhook `/api/webhooks/webpay`, confirmación server-side
- Dashboard de ventas (Recharts) en admin

## Convenciones

- **RSC por defecto**; `"use client"` sólo donde haya interactividad.
- **Server Actions** para mutaciones; **queries** server-side para lecturas.
- **Validación con Zod** compartida cliente/servidor.
- **Tokens de marca** vía CSS variables en `globals.css` y `@theme` (Tailwind 4).
- **next/image** para todas las imágenes, formatos AVIF/WebP.
- **Static + ISR** (`export const revalidate = 60`) en listados públicos.
- **Accesibilidad**: focus visible, labels asociados, semántica HTML, contraste WCAG AA.

## Identidad visual

- Rojo corporativo: `#E30613` (`--color-brand-600`)
- Negro/gris oscuro: `--color-ink-900` … `--color-ink-950`
- Tipografías: `Inter` (body) + `Bebas Neue` (display) — vía `next/font/google`
- Logo: `public/brand/logo.png` (4967×1856), también usado como favicon

## Verificación

- `pnpm dev` y revisar manualmente cada ruta en móvil/desktop
- `pnpm typecheck && pnpm lint` verdes
- Lighthouse objetivo ≥ 90 en Performance/SEO/Best Practices/Accessibility
