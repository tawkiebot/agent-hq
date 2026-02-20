# Architecture - Agent Version

## Directory Structure
```
agent-hq/
├── app/              # Next.js App Router
│   ├── layout.tsx   # Root layout, fonts, theme
│   └── page.tsx     # Homepage
├── components/       # React components
│   ├── landing-page.tsx
│   ├── header.tsx
│   └── ui/          # Radix UI
├── lib/
│   └── catalog.ts   # Data types + sample data
├── docs/            # Documentation
└── .github/workflows/ # CI/CD
```

## Build Flow
1. lib/catalog.ts exports types + data
2. Components import from lib/catalog.ts
3. Next.js static export
4. Output: ./out for GitHub Pages
