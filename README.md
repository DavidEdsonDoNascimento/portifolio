# Portfolio Web — Dark Tech Premium

Personal portfolio of a Senior Full Stack Software Engineer. This is the **foundation stage**: design system, layout, placeholder sections and deploy setup. Final content, animations and the *Packet Rush Mini* game come in later stages.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- next-intl (EN / PT-BR) · Lucide React (icons) · ESLint
- Fonts via `next/font`: Space Grotesk (headings), Inter (body), JetBrains Mono (tech details)

## Requirements

- Node.js 22.13+ (Docker image uses Node 24)
- pnpm 11.18.0 (pinned via `packageManager`; run `corepack enable` to get it)

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

| Script              | Purpose                            |
| ------------------- | ---------------------------------- |
| `pnpm dev`       | Development server                 |
| `pnpm build`     | Production build (standalone)      |
| `pnpm start`     | Run the production build           |
| `pnpm lint`      | ESLint                             |
| `pnpm typecheck` | Route types + `tsc --noEmit`       |
| `pnpm test`      | Packet Rush rules + translation integrity (`node --test`, Node 22.18+) |

## Internationalization

English is the default language (`/`); Brazilian Portuguese lives at `/pt`. There is no
browser-language detection and no cookie: the URL is the source of truth. `/api/health` is not
prefixed.

- Copy lives in `messages/en.json` and `messages/pt.json` (same keys; `pnpm test` fails if they diverge).
- Structural data (ids, URLs, companies, technologies, dates) stays in `src/data/` and is shared;
  texts are looked up by id (e.g. `projects.items.<id>.title`).
- Routing: `src/i18n/routing.ts`, `src/proxy.ts` (Next 16 replacement for `middleware.ts`).
- Optional: set `NEXT_PUBLIC_SITE_URL` at build time once the domain exists to emit `canonical` and
  `hreflang` metadata. Nothing is assumed until then.

## Docker

```bash
docker build -t portfolio-web .
docker run --rm -p 3000:3000 portfolio-web
curl http://localhost:3000/api/health   # {"status":"ok"}
```

The image is multi-stage (`pnpm install --frozen-lockfile` → build → minimal runtime, pnpm via Corepack), runs as a non-root user, listens on port `3000` with `HOSTNAME=0.0.0.0`, and uses Next.js `output: "standalone"`. Note that `next/font/google` downloads fonts at build time, so the build needs outbound network access.

## Deploy (Coolify)

Planned setup: Git repository → Build Pack **Dockerfile** → internal port **3000**. No database, no persistent volumes. Health endpoint: `GET /api/health`. Domain, DNS and SSL are configured later in Coolify.

## Project structure

```
src/
  app/[locale]/        localized layout + page; globals.css (tokens), api/health, icon.svg
  components/
    layout/            Header (client, mobile menu), Footer
    sections/          Hero, Projects, Experience, InteractiveLab (Packet Rush), About, Contact
    ui/                ButtonLink, SectionHeading, Badge
  config/site.ts       site name, nav, contact links (language-independent)
  i18n/                routing, request config, navigation helpers (next-intl)
  lib/                 pure game rules (packet-rush.ts) and their tests
  data/                typed placeholder content (projects, experience)
  types/               shared content types
messages/              en.json, pt.json
public/                assets used by the site
ref/                   local reference only (see below)
```

## The `ref/` folder

`ref/Rival-pro/` holds the licensed BootstrapMade *Rival* template, used **only as a visual/structural reference** during development. It is git-ignored, docker-ignored, excluded from lint/typecheck, and nothing from it is shipped. The site recreates the relevant ideas in React + Tailwind without Bootstrap, jQuery plugins or PHP forms.

## Next steps

1. SEO: Open Graph image, sitemap and canonical/hreflang once the domain is defined.
2. Case-study pages for the selected projects.
3. Visual refinement and motion.
