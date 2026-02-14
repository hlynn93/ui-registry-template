# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A shadcn/ui component registry built with Next.js 15, React 19, Fumadocs, and Tailwind CSS v4. Components are authored in `registry/`, built to static JSON via `shadcn build`, and served from `public/r/[name].json` for installation via the shadcn CLI.

## Commands

- `pnpm dev` — Start dev server (Turbopack)
- `pnpm build` — Production build
- `pnpm lint` — ESLint
- `pnpm registry:build` — Build registry JSON files from `registry.json` into `public/r/*.json`
- `pnpm postinstall` — Runs `fumadocs-mdx` to compile MDX (also runs automatically after install)

## Architecture

### Registry System

1. **`registry.json`** — Manifest defining all distributable components (name, files, dependencies, registryDependencies)
2. **`registry/aui/`** — Component source files organized into `ui/` (primitives like button, card, input) and `blocks/` (composed components like example-form)
3. **`shadcn build`** reads `registry.json` and outputs `public/r/[name].json` — these are the distributable artifacts
4. **`components.json`** — shadcn config (style: "aui", aliases, Tailwind settings)

### Documentation System (Fumadocs)

- **`content/docs/`** — MDX documentation files with YAML frontmatter (title, description)
- **`content/docs/meta.json`** — Sidebar navigation structure
- **`source.config.ts`** — Fumadocs source configuration pointing to `content/docs`
- **`lib/source.ts`** — Loader that creates the page tree from compiled MDX
- **`.source/`** — Auto-generated directory from `fumadocs-mdx` (compiled MDX imports)
- **`app/[[...slug]]/page.tsx`** — Catch-all route that renders MDX docs pages
- **`app/api/search/route.ts`** — Full-text search endpoint (Orama)

### Custom MDX Components

Registered in `mdx-components.tsx`:
- **`ComponentBlock`** (`components/ComponentBlock/`) — Client component that dynamically imports registry components for preview. Accepts `name`, `description`, `type`, `path` props. Uses `React.lazy` with a dynamic import from `@/registry/`.
- **`AutoTypeTable`** — Generates API docs from TypeScript types via `fumadocs-typescript`

### Styling

- Tailwind v4 with `@tailwindcss/postcss`
- CSS custom properties in `app/globals.css` using oklch() color space, with light/dark mode
- Components use `cva()` (class-variance-authority) for variants and `cn()` (`lib/utils.ts`) for class merging
- Components use `data-slot` attributes for part identification

## Adding a New Registry Component

1. Create component files under `registry/aui/blocks/` or `registry/aui/ui/`
2. Add an entry to `registry.json` with files, dependencies, and registryDependencies
3. Run `pnpm registry:build` to generate the `public/r/[name].json` file
4. Optionally create docs in `content/docs/` and update `content/docs/meta.json`
