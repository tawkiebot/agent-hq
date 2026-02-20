---
title: Prompts
description: Task templates for common operations
order: 5
---

# Prompts

Pre-built prompts for common Agent HQ tasks.

## Add New Vendor

```
Add a new vendor to the catalog:

1. Add to VENDORS array in lib/catalog.ts:
   { id: "vndr://{slug}", name: "{Name}", homepage: "https://..." }

2. Update landing-page.tsx if needed for featured display

3. Run: bun run build && bun run lint
```

## Add New System

```
Add a new system to the catalog:

1. Add to SYSTEMS array in lib/catalog.ts:
   {
     id: "sys://{vendor}/{name}@{version}",
     vendorId: "vndr://{vendor}",
     name: "{name}",
     title: "{Title}",
     version: "{x.y.z}",
     interfaces: ["editor", "cli", "api"],
     hosting: ["local", "cloud"],
     license: "Commercial|Open Source|Apache-2.0"
   }

2. Verify: bun run build
```

## Add New Category

```
Add a new category:

1. Import new Lucide icon in lib/catalog.ts
2. Add to CATEGORIES array:
   {
     id: "{slug}",
     name: "{Name}",
     description: "{description}",
     icon: {ImportedIcon},
     tags: ["tag1", "tag2"]
   }
```

## Deploy to GitHub Pages

```
Deployment is automatic on push to main.

Manual deployment:
1. Ensure basePath in next.config.mjs is set correctly
2. Push: git push origin main
3. Wait for GitHub Actions to complete
4. Site available at: https://tawkiebot.github.io/agent-hq/
```

## Run Development Server

```
# Install dependencies
bun install

# Start dev server
bun run dev

# Build static export
bun run build

# Output is in ./out/
```
