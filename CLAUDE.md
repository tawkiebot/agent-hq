# CLAUDE.md

> Project-specific rules for AI agents working on Agent HQ

## Critical Rules

- ALWAYS use Bun as package manager (not npm/yarn/pnpm)
- NEVER commit node_modules or .next to git
- ALWAYS run `bun run build` before committing to verify static export works
- KEEP basePath in sync with deployment target

## Project Context

- Next.js 15 with static export to ./out
- GitHub Pages at https://tawkiebot.github.io/agent-hq/
- Fonts: Fraunces (hero), Space Grotesk (headings), Geist Mono (code)
- Accent color: emerald (#10b981)

## Key Commands

```bash
bun install          # Install dependencies
bun run dev         # Start dev server
bun run build       # Build static export to ./out
bun run lint        # Lint code
```

## Important Files

- `lib/catalog.ts` - Data types (Vendor, System, Template, Category)
- `components/landing-page.tsx` - Main UI
- `next.config.mjs` - Build config (basePath, output: export)
- `.github/workflows/deploy.yml` - CI/CD pipeline

## Data Schema

All data in lib/catalog.ts uses URI schemes:
- Vendor: `vndr://{slug}` (e.g., vndr://anthropic)
- System: `sys://{vendor}/{name}@{version}`
- Template: `agt://{namespace}/{name}@{version}`

## Deployment

Push to main triggers automatic GitHub Pages deployment. Check Actions tab for status.
