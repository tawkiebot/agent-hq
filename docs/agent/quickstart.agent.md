# Quickstart - Agent Version

## Install
```bash
git clone https://github.com/tawkiebot/agent-hq.git
cd agent-hq
bun install
```

## Dev
```bash
bun run dev
# → http://localhost:3000
```

## Build
```bash
bun run build
# Output: ./out
```

## Deploy
Push to main → GitHub Actions → GitHub Pages

## Data Import
```typescript
import { VENDORS, SYSTEMS, TEMPLATES, CATEGORIES } from '@/lib/catalog'
```
