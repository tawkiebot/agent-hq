# Agent HQ - Overview

## Project
| Field | Value |
|-------|-------|
| Name | agent-hq |
| Type | Next.js webapp |
| Package Manager | Bun |
| Deployment | GitHub Pages |

## What
Public directory of AI agents, systems, templates from major vendors.

## Tech Stack
- Next.js 15 (static export)
- Bun
- Tailwind CSS
- Radix UI

## Vendors
Anthropic, OpenAI, Google, GitHub, Meta, Mistral, xAI, AWS

## Systems
9 agent systems cataloged (Claude Code, GPT Cursor, Gemini CLI, Copilot, AMP, Llama Agent, Mistral Agent, Grok Agent, Bedrock Agents)

## Templates
5 templates (Frontend Specialist, Security Audit, Fullstack Developer, Data Analyst, DevOps Engineer)

## Categories
Frontend, Backend, DevOps, Security, Data, Systems

## Data Schema
lib/catalog.ts - Vendor, System, Template, Category types with helper functions

## Quick Links
- Dev: `bun run dev` → http://localhost:3000
- Build: `bun run build` → ./out
- Deploy: push to main
