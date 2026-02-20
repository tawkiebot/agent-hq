---
title: AI Assistants
description: How to use Agent HQ docs with AI assistants
order: 7
---

# AI Assistants

## Using with Claude / OpenCode

When working with an AI assistant on Agent HQ:

1. **Read AGENTS.md first** - Contains critical context and rules
2. **Check lib/catalog.ts** - Data types and sample data
3. **Reference docs/agent/*.md** - Dense, structured info for quick lookup

## Using llms.txt

For quick context in LLM prompts:

```
Read the project summary at: https://github.com/tawkiebot/agent-hq/blob/main/llms.txt
```

## Best Practices

- Always check CLAUDE.md for project-specific rules
- Use docs/agent/*.md for dense technical info
- Run `bun run build` before committing to verify changes
- Reference docs/api.md for type definitions

## CI/CD

AI agents can check build status via GitHub Actions API:
```
gh run list --repo tawkiebot/agent-hq
```
