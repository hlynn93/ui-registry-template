# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A shadcn/ui component registry (named "acme") built with Next.js 15, React 19, Fumadocs, and Tailwind CSS v4. Components are authored in `registry/`, built to static JSON via `shadcn build`, and served from `public/r/[name].json` for installation via the shadcn CLI. Node is pinned via Volta (v25.6.0).

## Commands

- `pnpm dev` — Start dev server (Turbopack)
- `pnpm build` — Production build
- `pnpm lint` — ESLint (next/core-web-vitals + next/typescript)
- `pnpm registry:build` — Build registry JSON files from `registry.json` into `public/r/*.json`
- `pnpm postinstall` — Runs `fumadocs-mdx` to compile MDX (also runs automatically after install)

No test framework is configured.

## Architecture

### Registry System

1. **`registry.json`** — Manifest defining all distributable components (name, files, dependencies, registryDependencies). Each file entry has a `type` (e.g. `registry:component`, `registry:page`, `registry:lib`, `registry:hook`)
2. **`registry/aui/`** — Component source files: `ui/` for primitives (button, card, input, label, textarea) and `blocks/` for composed components (each in its own directory)
3. **`shadcn build`** reads `registry.json` and outputs `public/r/[name].json` — these are the distributable artifacts
4. **`components.json`** — shadcn config (style: "aui", aliases, Tailwind settings)

Path alias: `@/*` maps to the project root.

### Documentation System (Fumadocs)

- **`content/docs/`** — MDX documentation files with YAML frontmatter (title, description)
- **`content/docs/meta.json`** — Sidebar navigation structure
- **`source.config.ts`** — Fumadocs source configuration pointing to `content/docs`
- **`lib/source.ts`** — Loader that creates the page tree from compiled MDX
- **`.source/`** — Auto-generated directory from `fumadocs-mdx` (do not edit)
- **`app/[[...slug]]/page.tsx`** — Catch-all route that renders MDX docs pages
- **`app/api/search/route.ts`** — Full-text search endpoint (Orama)

### Custom MDX Components

Registered in `mdx-components.tsx`:
- **`ComponentBlock`** (`components/ComponentBlock/`) — Client component that dynamically imports registry components for live preview. The `path` prop is relative to `registry/` (e.g. `path="aui/blocks/example-form/example-form.tsx"`). Uses `React.lazy` with dynamic import from `@/registry/`.
- **`AutoTypeTable`** — Generates API docs from TypeScript types via `fumadocs-typescript`. Takes `path` (to the .ts file) and `name` (export name) props.

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
