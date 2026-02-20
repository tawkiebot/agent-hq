---
title: Quickstart
description: Get started with Agent HQ
order: 2
---

# Quickstart

Get up and running with Agent HQ in under 5 minutes.

## Prerequisites

- Bun (recommended) or npm/pnpm
- Node.js >= 18

## Installation

```bash
# Clone the repository
git clone https://github.com/tawkiebot/agent-hq.git
cd agent-hq

# Install dependencies
bun install
```

## Development

```bash
# Start dev server
bun run dev
```

The app runs at http://localhost:3000

## Building for Production

```bash
# Build static export
bun run build

# Output is in ./out directory
```

## Data Schema

The data types are defined in `lib/catalog.ts`:

```typescript
import { VENDORS, SYSTEMS, TEMPLATES, CATEGORIES } from '@/lib/catalog'
```

## Deployment

The project auto-deploys to GitHub Pages on push to main. See `.github/workflows/deploy.yml`.
