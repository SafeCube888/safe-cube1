# SAFE CUBE — Workplace Safety, QHSE and Compliance Solutions

> Strengthening Every Side of Your Business.

Production-ready, multi-page full-stack website for SAFE CUBE, a workplace improvement and QHSE support company.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Backend | Supabase Edge Functions (Deno) |
| Email | Resend (via Edge Functions) |
| Spam Protection | Cloudflare Turnstile |
| Deployment | Cloudflare Pages |

## Project Structure

```
app/                    # Next.js App Router pages
  (marketing)/          # Public marketing pages
  (admin)/              # Protected admin dashboard
  api/                  # API route handlers
components/
  layout/               # Header, Footer, Breadcrumbs
  navigation/           # Nav-related components
  sections/             # Page sections (home, solutions, etc.)
  cards/                # Reusable card components
  forms/                # Form components (contact, CUBE SCORE, etc.)
  store/                # Store-specific components
  admin/                # Admin dashboard components
  ui/                   # shadcn/ui primitives
config/                 # Centralized brand & site configuration
content/                # Structured content data (services, industries, etc.)
lib/                    # Utility functions
types/                  # TypeScript type definitions
hooks/                  # Custom React hooks
public/                 # Static assets (images, favicon, etc.)
styles/                 # Additional styles (if needed)
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Supabase service role (never expose) |
| `RESEND_API_KEY` | Server | Resend API key for emails |
| `RESEND_FROM_EMAIL` | Server | Sender email address |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Server | Cloudflare Turnstile secret |
| `ADMIN_NOTIFICATION_EMAIL` | Server | Email to receive admin notifications |

## Local Development

```bash
npm install
npm run dev
```

The dev server starts automatically in this environment. Do not run `npm run dev` manually.

## Build

```bash
npm run build
```

## Deployment

### Cloudflare Pages (Recommended)

1. Connect the GitHub repository to Cloudflare Pages.
2. Set the build command to `npm run build`.
3. Set the output directory to `.next` (or as directed by the Cloudflare Next.js adapter).
4. Add all environment variables in the Cloudflare Pages dashboard.
5. Deploy.

### Cloudflare Workers (Alternative)

For full-stack Next.js with SSR on Cloudflare Workers, use `@opennextjs/cloudflare`:

1. Install the adapter: `npm install @opennextjs/cloudflare`
2. Configure `wrangler.toml` with the project settings.
3. Deploy: `npx opennextjs-cloudflare && npx wrangler deploy`

## Supabase Setup

The Supabase project is pre-provisioned. Database migrations, RLS policies, and storage buckets will be created in Phase 2+.

## Phases

- **Phase 1** (current): Foundation — project structure, config, types, placeholder routes
- **Phase 2**: Core marketing pages (Home, About, Solutions, CUBE SCORE, Training)
- **Phase 3**: Industries (12 industry pages)
- **Phase 4**: Knowledge Centre (articles, guides, downloads, FAQs)
- **Phase 5**: CUBE Store (products, cart, checkout)
- **Phase 6**: Admin Dashboard (auth, CRUD, settings)
- **Phase 7**: SEO, schema, performance, legal pages

## Brand

SAFE CUBE brand colours are defined in `tailwind.config.ts` and `app/globals.css`:

| Token | Hex |
|---|---|
| Deep Navy Blue | `#00163E` |
| Primary Green | `#5E9400` |
| Bright Green Accent | `#7AA800` |
| Dark Green | `#3F7A00` |
| Secondary Blue | `#0B4F96` |
| Soft Background | `#F5F8FA` |
| Warning Amber | `#F4A000` |
| Critical Red | `#C62828` |
| Success Green | `#278B3D` |

## License

Proprietary. All rights reserved by SAFE CUBE.
