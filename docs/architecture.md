---
title: Architecture
description: Agent HQ project structure and architecture
order: 3
---

# Architecture

## Project Structure

```
agent-hq/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   ├── agents/            # Agents directory page
│   ├── systems/           # Systems directory page
│   └── tools/             # Tools page
├── components/            # React components
│   ├── landing-page.tsx   # Main landing component
│   ├── header.tsx         # Site header
│   ├── system-card.tsx    # System display card
│   └── ui/                # Radix UI components
├── lib/                   # Core libraries
│   ├── catalog.ts         # Data types & sample data
│   ├── agents.ts          # Agent utilities
│   └── supabase/          # Supabase client (for future)
├── docs/                  # Documentation
├── .github/workflows/     # GitHub Actions
└── out/                  # Static export output
```

## Data Flow

1. `lib/catalog.ts` exports TypeScript types (Vendor, System, Template, Category)
2. Components import data from `lib/catalog.ts`
3. Next.js renders pages statically
4. Output exported to `./out` for GitHub Pages

## Key Files

| File | Purpose |
|------|---------|
| `lib/catalog.ts` | All data types and sample datasets |
| `components/landing-page.tsx` | Main landing page UI |
| `app/layout.tsx` | Font setup, theme provider |
| `next.config.mjs` | Static export config, basePath |
