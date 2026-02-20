---
title: API Reference
description: TypeScript type definitions
order: 4
---

# API Reference

## Data Types

All types are exported from `lib/catalog.ts`:

```typescript
import { Vendor, System, Template, Category, VENDORS, SYSTEMS, TEMPLATES, CATEGORIES } from '@/lib/catalog'
```

## Vendor

```typescript
type Vendor = {
  id: string           // vndr://{slug}
  name: string
  homepage?: string
  logo?: string
  createdAt?: string
}
```

## System

```typescript
type System = {
  id: string           // sys://{vendor}/{name}@{version}
  vendorId: string     // Reference to Vendor.id
  name: string
  title: string
  version: string
  interfaces: Interface[]  // ['editor', 'cli', 'api']
  hosting: Hosting[]       // ['local', 'cloud']
  capabilities?: Record<string, unknown>
  license?: string
  deprecated?: boolean
  createdAt?: string
}

type Interface = 'editor' | 'cli' | 'api'
type Hosting = 'local' | 'cloud'
```

## Template

```typescript
type Template = {
  id: string           // agt://{namespace}/{name}@{version}
  namespace: string
  name: string
  version: string
  vendorId?: string
  title: string
  tags?: string[]
  manifest: Record<string, unknown>
  readmeMd?: string
  createdAt?: string
}
```

## Category

```typescript
type Category = {
  id: string
  name: string
  description: string
  icon: LucideIcon    // React component
  tags?: string[]
}
```

## Helper Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `vendorById(id)` | `Vendor \| undefined` | Find vendor by ID |
| `systemById(id)` | `System \| undefined` | Find system by ID |
| `systemsByVendor(vendorId)` | `System[]` | Get all systems for a vendor |
| `templatesByCategory(categoryId)` | `Template[]` | Get templates by category |

## Data Exports

| Export | Type | Count |
|--------|------|-------|
| `VENDORS` | `Vendor[]` | 8 |
| `SYSTEMS` | `System[]` | 9 |
| `TEMPLATES` | `Template[]` | 5 |
| `CATEGORIES` | `Category[]` | 6 |
