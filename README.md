# registry-template

A custom component registry based on the [shadcn registry template](https://github.com/shadcn-ui/registry-template), with [Radix UI](https://www.radix-ui.com/) replaced by [Base UI](https://base-ui.com/). Component documentation is built with [Fumadocs](https://fumadocs.vercel.app/).

Built with Next.js 15, React 19, and Tailwind CSS v4.

## Getting Started

### Prerequisites

- Node.js (pinned to v25.6.0 via Volta)
- pnpm

### Install dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Build registry

Build the registry JSON files from `registry.json` into `public/r/*.json`:

```bash
pnpm registry:build
```

## How It Works

- Components are defined in `registry.json` and authored under `registry/aui/`.
- `shadcn build` reads the manifest and outputs static JSON files to `public/r/[name].json`.
- Every registry item is compatible with the `shadcn` CLI for installation into any React project.
- Documentation pages live in `content/docs/` as MDX files and are rendered by Fumadocs.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) for more details on the registry system.
