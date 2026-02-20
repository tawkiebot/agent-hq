/**
 * Agent HQ Data Schema
 * 
 * This file defines the core data types for the Agent HQ directory.
 * Each type represents a key entity in the agent ecosystem.
 * 
 * ## Entity Overview
 * 
 * 1. **Vendor** - Companies/organizations building AI agents
 * 2. **System** - AI agent systems (products, tools)
 * 3. **Template** - Pre-built agent configurations/templates
 * 4. **Category** - Functional categories for organizing agents
 * 
 * ## URI Schemes
 * 
 * - Vendor: `vndr://{slug}` (e.g., vndr://anthropic)
 * - System: `sys://{vendor}/{name}@{version}` (e.g., sys://anthropic/claude-code@1.2.0)
 * - Template: `agt://{namespace}/{name}@{version}` (e.g., agt://agentlist/frontend-specialist@1.4.2)
 */

import { 
  Code2, 
  Layers, 
  Box, 
  Shield, 
  Database, 
  Cpu,
  type LucideIcon 
} from "lucide-react"

/**
 * A company or organization that builds AI agents
 */
export type Vendor = {
  /** Unique identifier using vndr:// scheme */
  id: string
  /** Display name */
  name: string
  /** Company homepage URL */
  homepage?: string
  /** Optional logo URL */
  logo?: string
  /** When the vendor was added */
  createdAt?: string
}

/**
 * An AI agent system/product
 */
export type System = {
  /** Unique identifier using sys:// scheme with version */
  id: string
  /** Reference to vendor */
  vendorId: Vendor["id"]
  /** URL-safe slug */
  name: string
  /** Display name */
  title: string
  /** Semantic version string */
  version: string
  /** Available interfaces */
  interfaces: Interface[]
  /** Hosting options */
  hosting: Hosting[]
  /** Additional capabilities */
  capabilities?: Record<string, unknown>
  /** License type */
  license?: string
  /** Whether this system is deprecated */
  deprecated?: boolean
  /** When the system was added */
  createdAt?: string
}

export type Interface = "editor" | "cli" | "api"
export type Hosting = "local" | "cloud"

/**
 * A pre-built agent template/configuration
 */
export type Template = {
  /** Unique identifier using agt:// scheme with version */
  id: string
  /** Template namespace (e.g., "agentlist") */
  namespace: string
  /** URL-safe name */
  name: string
  /** Semantic version */
  version: string
  /** Optional vendor reference */
  vendorId?: Vendor["id"]
  /** Display title */
  title: string
  /** Descriptive tags */
  tags?: string[]
  /** Template manifest/configuration */
  manifest: Record<string, unknown>
  /** Optional README content */
  readmeMd?: string
  /** When the template was added */
  createdAt?: string
}

/**
 * A functional category for organizing agents
 */
export type Category = {
  /** Unique slug */
  id: string
  /** Display name */
  name: string
  /** Category description */
  description: string
  /** Lucide icon component name */
  icon: LucideIcon
  /** Related tags for filtering */
  tags?: string[]
}

// =============================================================================
// Data
// =============================================================================

export const VENDORS: Vendor[] = [
  { id: "vndr://anthropic", name: "Anthropic", homepage: "https://www.anthropic.com" },
  { id: "vndr://openai", name: "OpenAI", homepage: "https://openai.com" },
  { id: "vndr://google", name: "Google", homepage: "https://ai.google" },
  { id: "vndr://github", name: "GitHub", homepage: "https://github.com" },
  { id: "vndr://meta", name: "Meta", homepage: "https://meta.ai" },
  { id: "vndr://mistral", name: "Mistral", homepage: "https://mistral.ai" },
  { id: "vndr://xai", name: "xAI", homepage: "https://x.ai" },
  { id: "vndr://aws", name: "AWS", homepage: "https://aws.amazon.com" },
]

export const SYSTEMS: System[] = [
  {
    id: "sys://anthropic/claude-code@1.2.0",
    vendorId: "vndr://anthropic",
    name: "claude-code",
    title: "Claude Code",
    version: "1.2.0",
    interfaces: ["editor", "cli", "api"],
    hosting: ["cloud"],
    createdAt: "2025-06-20T10:00:00Z",
    license: "Commercial",
  },
  {
    id: "sys://openai/gpt-cursor@0.9.0",
    vendorId: "vndr://openai",
    name: "gpt-cursor",
    title: "GPT Cursor",
    version: "0.9.0",
    interfaces: ["editor", "cli", "api"],
    hosting: ["cloud"],
    createdAt: "2025-05-18T08:00:00Z",
    license: "Commercial",
  },
  {
    id: "sys://google/gemini-cli@2.3.1",
    vendorId: "vndr://google",
    name: "gemini-cli",
    title: "Gemini CLI",
    version: "2.3.1",
    interfaces: ["cli", "api"],
    hosting: ["local", "cloud"],
    createdAt: "2025-05-01T12:00:00Z",
    license: "Apache-2.0",
  },
  {
    id: "sys://github/copilot@3.0.0",
    vendorId: "vndr://github",
    name: "copilot",
    title: "GitHub Copilot",
    version: "3.0.0",
    interfaces: ["editor", "api"],
    hosting: ["cloud"],
    createdAt: "2025-04-02T12:00:00Z",
    license: "Commercial",
  },
  {
    id: "sys://openai/amp@1.1.0",
    vendorId: "vndr://openai",
    name: "amp",
    title: "AMP",
    version: "1.1.0",
    interfaces: ["cli", "api"],
    hosting: ["local", "cloud"],
    createdAt: "2025-07-12T09:00:00Z",
    license: "Commercial",
  },
  {
    id: "sys://meta/llama-agent@1.0.0",
    vendorId: "vndr://meta",
    name: "llama-agent",
    title: "Llama Agent",
    version: "1.0.0",
    interfaces: ["cli", "api"],
    hosting: ["local", "cloud"],
    createdAt: "2025-08-15T10:00:00Z",
    license: "Open Source",
  },
  {
    id: "sys://mistral/mistral-agent@2.0.0",
    vendorId: "vndr://mistral",
    name: "mistral-agent",
    title: "Mistral Agent",
    version: "2.0.0",
    interfaces: ["cli", "api"],
    hosting: ["cloud"],
    createdAt: "2025-09-01T08:00:00Z",
    license: "Commercial",
  },
  {
    id: "sys://xai/grok-agent@1.5.0",
    vendorId: "vndr://xai",
    name: "grok-agent",
    title: "Grok Agent",
    version: "1.5.0",
    interfaces: ["editor", "cli", "api"],
    hosting: ["cloud"],
    createdAt: "2025-07-20T14:00:00Z",
    license: "Commercial",
  },
  {
    id: "sys://aws/bedrock-agents@1.0.0",
    vendorId: "vndr://aws",
    name: "bedrock-agents",
    title: "Bedrock Agents",
    version: "1.0.0",
    interfaces: ["api"],
    hosting: ["cloud"],
    createdAt: "2025-06-10T09:00:00Z",
    license: "Commercial",
  },
]

export const TEMPLATES: Template[] = [
  {
    id: "agt://agentlist/frontend-specialist@1.4.2",
    namespace: "agentlist",
    name: "frontend-specialist",
    version: "1.4.2",
    title: "Frontend Specialist",
    tags: ["SSR", "RSC", "UI-Gen"],
    manifest: { runtime: "node", framework: "nextjs" },
    createdAt: "2025-08-01T12:00:00Z",
  },
  {
    id: "agt://agentlist/security-audit@0.8.3",
    namespace: "agentlist",
    name: "security-audit",
    version: "0.8.3",
    title: "Security Audit",
    tags: ["SAST", "DAST"],
    manifest: { tools: ["semgrep", "trivy"] },
    createdAt: "2025-07-15T13:12:00Z",
  },
  {
    id: "agt://agentlist/fullstack-dev@2.1.0",
    namespace: "agentlist",
    name: "fullstack-dev",
    version: "2.1.0",
    title: "Fullstack Developer",
    tags: ["React", "Node", "PostgreSQL"],
    manifest: { runtime: "node", framework: "nextjs" },
    createdAt: "2025-09-10T10:00:00Z",
  },
  {
    id: "agt://agentlist/data-analyst@1.2.0",
    namespace: "agentlist",
    name: "data-analyst",
    version: "1.2.0",
    title: "Data Analyst",
    tags: ["SQL", "Python", "Visualization"],
    manifest: { runtime: "python", tools: ["pandas", "matplotlib"] },
    createdAt: "2025-08-20T15:00:00Z",
  },
  {
    id: "agt://agentlist/devops-engineer@1.0.0",
    namespace: "agentlist",
    name: "devops-engineer",
    version: "1.0.0",
    title: "DevOps Engineer",
    tags: ["Kubernetes", "Terraform", "CI/CD"],
    manifest: { tools: ["kubectl", "terraform", "github-actions"] },
    createdAt: "2025-09-05T09:00:00Z",
  },
]

export const CATEGORIES: Category[] = [
  { 
    id: "frontend", 
    name: "Frontend", 
    description: "UI generation, SSR, component specs",
    icon: Code2,
    tags: ["ui", "react", "nextjs", "css"]
  },
  { 
    id: "backend", 
    name: "Backend", 
    description: "API design, auth, caching",
    icon: Layers,
    tags: ["api", "rest", "graphql", "auth"]
  },
  { 
    id: "devops", 
    name: "DevOps", 
    description: "Pipelines, policies, infrastructure",
    icon: Box,
    tags: ["ci", "cd", "kubernetes", "terraform"]
  },
  { 
    id: "security", 
    name: "Security", 
    description: "SAST, DAST, vulnerability scanning",
    icon: Shield,
    tags: ["audit", "sast", "dast", "sbom"]
  },
  { 
    id: "data", 
    name: "Data", 
    description: "SQL models, metrics, dashboards",
    icon: Database,
    tags: ["sql", "analytics", "bi", "etl"]
  },
  { 
    id: "systems", 
    name: "Systems", 
    description: "Performance, profiling, optimization",
    icon: Cpu,
    tags: ["performance", "profiling", "optimization"]
  },
]

// =============================================================================
// Helpers
// =============================================================================

/**
 * Find a vendor by ID
 */
export function vendorById(id: string): Vendor | undefined {
  return VENDORS.find((v) => v.id === id)
}

/**
 * Find a system by ID
 */
export function systemById(id: string): System | undefined {
  return SYSTEMS.find((s) => s.id === id)
}

/**
 * Get all systems for a vendor
 */
export function systemsByVendor(vendorId: string): System[] {
  return SYSTEMS.filter((s) => s.vendorId === vendorId)
}

/**
 * Get all templates for a category based on tags
 */
export function templatesByCategory(categoryId: string): Template[] {
  const category = CATEGORIES.find((c) => c.id === categoryId)
  if (!category?.tags) return []
  
  return TEMPLATES.filter((t) => 
    t.tags?.some((tag) => category.tags?.includes(tag))
  )
}
