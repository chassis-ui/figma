# Chassis Figma

> Tokenized Figma component library documentation for the Chassis Design System.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version: 0.1.0](https://img.shields.io/badge/Version-0.1.0-blue.svg)](https://github.com/chassis-ui/figma)

## Overview

Chassis Figma provides documentation and reference material for the Chassis Design System's Figma component library. It documents how Figma components map to design tokens and code implementations, bridging the gap between design and development.

> [!NOTE]
> This project is part of the multi-repository Chassis Design System. It focuses on Figma component documentation, while design tokens, CSS framework, icons, and assets are handled by their respective repositories.

> [!WARNING]
> This project uses `pnpm` for package management. Install it globally with `npm install -g pnpm` before running the commands below.

## Features

- **Figma Component Documentation** — Detailed reference for each Figma component with usage guidelines
- **Token Mapping** — Shows how Figma variables connect to design tokens and CSS output
- **Tabbed Interface** — Browse components by design specs, token usage, and code examples
- **Search Integration** — Algolia-powered search across all documentation
- **Live Examples** — StackBlitz integration for interactive code previews

## Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 10.0.0 or higher
- Git with SSH access to GitHub (for submodules)

### Installation

```bash
git clone --recursive https://github.com/chassis-ui/figma.git chassis-figma
cd chassis-figma
pnpm install
```

### Development

```bash
# Start development server (port 4326)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm astro:preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server at localhost:4326 |
| `pnpm build` | Build documentation site |
| `pnpm site:build` | Build site with submodule sync |
| `pnpm site:lint` | Run all linters (ESLint, Stylelint, Prettier, VNU) |
| `pnpm site:format` | Format code with Prettier |
| `pnpm astro:dev` | Start Astro dev server |
| `pnpm astro:build` | Build Astro site |
| `pnpm astro:preview` | Preview production build |
| `pnpm check` | Run Astro check, lockfile lint, and security audit |

## Project Structure

```
chassis-figma/
├── site/
│   ├── astro.config.ts       # Astro configuration
│   ├── config.yml            # Site metadata and settings
│   ├── tsconfig.json         # TypeScript configuration
│   ├── content/
│   │   ├── docs/             # Documentation content (MDX)
│   │   ├── figma/            # Figma component content (MDX)
│   │   └── callouts/         # Reusable callout content
│   └── src/
│       ├── components/       # Astro components
│       ├── layouts/          # Page layouts
│       ├── libs/             # Utility libraries
│       ├── pages/            # File-based routing
│       ├── plugins/          # Vite plugins (Algolia, StackBlitz)
│       └── scss/             # Stylesheets
├── build/                    # Build and version scripts
├── refs/                     # Reference documentation
├── vendor/                   # Git submodules (assets)
└── _site/                    # Build output (generated)
```

## Documentation

Visit [chassis-ui.com/figma](https://chassis-ui.com/figma/) for the full documentation site.

## Chassis Ecosystem

This project is part of the Chassis Design System's multi-repository architecture:

| Project | Description |
|---------|-------------|
| [chassis-website](https://github.com/chassis-ui/website) | Main website and shared documentation package |
| [chassis-css](https://github.com/chassis-ui/css) | CSS framework and component library |
| [chassis-tokens](https://github.com/chassis-ui/tokens) | Design token generation and management |
| [chassis-icons](https://github.com/chassis-ui/icons) | Icon library and build toolkit |
| [chassis-assets](https://github.com/chassis-ui/assets) | Multi-platform asset management |
| **chassis-figma** | **Figma component documentation (this repository)** |

All documentation sites share the `@chassis-ui/docs` package for consistent layouts, components, and styling.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test the build: `pnpm build && pnpm site:lint`
5. Commit your changes: `git commit -m "feat: add my feature"`
6. Push to the branch: `git push origin feature/my-feature`
7. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) file for details.
