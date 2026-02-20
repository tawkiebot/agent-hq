# API Reference - Agent Version

## Types

### Vendor
| Field | Type | Required |
|-------|------|----------|
| id | string (vndr://{slug}) | yes |
| name | string | yes |
| homepage | string | no |
| logo | string | no |

### System
| Field | Type | Required |
|-------|------|----------|
| id | string (sys://{v}/{n}@{v}) | yes |
| vendorId | string | yes |
| name | string | yes |
| title | string | yes |
| version | string | yes |
| interfaces | ('editor'|'cli'|'api')[] | yes |
| hosting | ('local'|'cloud')[] | yes |
| license | string | no |

### Template
| Field | Type | Required |
|-------|------|----------|
| id | string (agt://{ns}/{n}@{v}) | yes |
| namespace | string | yes |
| name | string | yes |
| version | string | yes |
| title | string | yes |
| tags | string[] | no |
| manifest | object | yes |

### Category
| Field | Type | Required |
|-------|------|----------|
| id | string | yes |
| name | string | yes |
| description | string | yes |
| icon | LucideIcon | yes |
| tags | string[] | no |

## Exports
| Name | Type | Count |
|------|------|-------|
| VENDORS | Vendor[] | 8 |
| SYSTEMS | System[] | 9 |
| TEMPLATES | Template[] | 5 |
| CATEGORIES | Category[] | 6 |

## Helpers
- `vendorById(id) → Vendor|undefined`
- `systemById(id) → System|undefined`
- `systemsByVendor(vendorId) → System[]`
- `templatesByCategory(categoryId) → Template[]`
