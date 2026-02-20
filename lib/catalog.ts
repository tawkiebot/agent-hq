export type Vendor = {
  id: string // e.g., "vndr://anthropic"
  name: string
  homepage?: string
  createdAt?: string
}

export type System = {
  id: string // e.g., "sys://anthropic/claude-code@1.2.0"
  vendorId: Vendor["id"]
  name: string // slug, e.g., "claude-code"
  title: string // display name, e.g., "Claude Code"
  version: string // "1.2.0"
  interfaces: ("editor" | "cli" | "api")[]
  hosting: ("local" | "cloud")[]
  capabilities?: Record<string, unknown>
  license?: string
  deprecated?: boolean
  createdAt?: string
}

export type Template = {
  id: string // "agt://agentlist/frontend-specialist@1.4.2"
  namespace: string // "agentlist"
  name: string // "frontend-specialist"
  version: string // "1.4.2"
  vendorId?: Vendor["id"] // optional
  title: string
  tags?: string[]
  manifest: Record<string, unknown>
  readmeMd?: string
  createdAt?: string
}

// Mock catalog (aligned with your SQL model)
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
    vendorId: undefined,
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

// Helpers
export function vendorById(id: string) {
  return VENDORS.find((v) => v.id === id)
}
