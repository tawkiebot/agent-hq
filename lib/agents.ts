export type Agent = {
  id: string
  name: string
  role: string
  category: "Frontend" | "Backend" | "Systems" | "Architecture" | "Data" | "DevOps" | "Security"
  version: string
  access: "free" | "paid"
  tags: string[]
  summary: string
  systemPrompt: string
  userPrompt: string
  context: string
  appContext: string
  endpoints: { url: string; api: string }[]
  createdAt: string
  updatedAt: string
  avatar?: string
}

export const AGENT_CATEGORIES = [
  "Frontend",
  "Backend",
  "Systems",
  "Architecture",
  "Data",
  "DevOps",
  "Security",
] as const

export const MOCK_AGENTS: Agent[] = [
  {
    id: "agt-frontend-ui",
    name: "A-17 FRONTEND.UI",
    role: "Specialist • React/Next Tailwind",
    category: "Frontend",
    version: "1.4.2",
    access: "free",
    tags: ["SSR", "RSC", "UI-Gen", "A11y"],
    summary:
      "Generates accessible UI with RSC patterns, Tailwind semantics, and shadcn primitives. Enforces design tokens and IA.",
    systemPrompt:
      "You are A-17 FRONTEND.UI. You generate accessible, performant React/Next code using the App Router and Tailwind. Always return strongly typed components and avoid inline styles unless necessary.",
    userPrompt:
      "Create a responsive dashboard with a left nav, KPI cards, and a table. Prioritize a11y and keyboard navigation.",
    context:
      "Target stack: Next.js (App Router), TypeScript, Tailwind, shadcn/ui. Use Lucide icons. Avoid blue unless asked.",
    appContext:
      "Runs in CI as a codegen step. Receives schema JSON, emits components and test stubs. Can open PRs with diffs.",
    endpoints: [
      { url: "https://api.example.com/generate/ui", api: "POST /generate/ui" },
      { url: "https://api.example.com/validate/a11y", api: "POST /validate/a11y" },
    ],
    createdAt: "2025-08-01T12:00:00Z",
    updatedAt: "2025-08-10T09:15:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "agt-backend-api",
    name: "B-04 BACKEND.API",
    role: "Engineer • API Orchestration",
    category: "Backend",
    version: "2.1.0",
    access: "paid",
    tags: ["REST", "AuthZ", "Caching"],
    summary:
      "Designs and enforces REST APIs with schema-first approach. Implements authz, rate limits, and cache strategy.",
    systemPrompt:
      "You are B-04 BACKEND.API. Produce OpenAPI-first services with consistent resource naming. Add observability.",
    userPrompt:
      "Draft an API for project/issue tracking with roles and audit logs. Include pagination and filtering patterns.",
    context: "Languages: TypeScript/Node. Infra: Vercel, Neon. Use zod validation on boundaries. Emit OpenAPI JSON.",
    appContext: "Used by platform squads to bootstrap internal services with guardrails and consistent patterns.",
    endpoints: [{ url: "https://api.example.com/openapi.json", api: "GET /openapi.json" }],
    createdAt: "2025-07-18T08:20:00Z",
    updatedAt: "2025-08-09T14:55:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "agt-systems-lowlat",
    name: "S-09 SYSTEMS.LL",
    role: "Engineer • Low-Latency",
    category: "Systems",
    version: "0.9.7",
    access: "paid",
    tags: ["Rust", "SIMD", "Profiling"],
    summary: "Optimizes critical paths with lock-free structures and cache-aware layouts. Targets tail latency p99.9.",
    systemPrompt: "You are S-09 SYSTEMS.LL. Apply perf-first design, measure before optimize, and document tradeoffs.",
    userPrompt: "Refactor ingestion pipeline to reduce p99 latency by 30%. Provide flamegraph guidance and benchmarks.",
    context: "Runtime: Rust + Tokio. Targets Linux x86_64. Use criterion for benches. Avoid unsafe unless justified.",
    appContext: "Runs in perf CI on PRs to annotate regressions and suggest patches.",
    endpoints: [
      { url: "https://perf.example.com/runs", api: "GET /runs" },
      { url: "https://perf.example.com/patch", api: "POST /patch" },
    ],
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-08-08T11:22:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "agt-arch-ref",
    name: "R-02 ARCH.REF",
    role: "Architect • Reference Designs",
    category: "Architecture",
    version: "1.0.5",
    access: "free",
    tags: ["ADR", "Bounded-Context", "Event-Driven"],
    summary: "Produces ADRs, context maps, and reference event-driven topologies. Ensures evolution paths and SLOs.",
    systemPrompt:
      "You are R-02 ARCH.REF. Align technical decisions to business capabilities. Prefer explicit boundaries.",
    userPrompt: "Propose a reference architecture for a multi-tenant SaaS with strong isolation and cost controls.",
    context: "Tooling: C4, PlantUML, Mermaid. Infra: Vercel, Neon, S3. Observability first.",
    appContext: "Used in discovery to converge on tenable architectures before build.",
    endpoints: [{ url: "https://arch.example.com/reference", api: "GET /reference" }],
    createdAt: "2025-06-10T12:00:00Z",
    updatedAt: "2025-08-05T18:00:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "agt-data-analyst",
    name: "D-11 DATA.ANALYST",
    role: "Analyst • SQL/Visualization",
    category: "Data",
    version: "3.2.0",
    access: "free",
    tags: ["SQL", "BI", "Metrics"],
    summary: "Builds canonical metrics, SQL models, and visual dashboards. Ensures definitions are consistent.",
    systemPrompt: "You are D-11 DATA.ANALYST. Create metrics with clear grain and dimensions. Ship validated SQL.",
    userPrompt: "Define product adoption metrics with weekly cohorts and retention. Provide datasets and charts.",
    context: "Warehouse: Postgres/Neon. Tools: dbt-like modeling, SQLFluff. Charts via Vega.",
    appContext: "Runs notebooks and publishes dashboards on commit.",
    endpoints: [{ url: "https://data.example.com/metrics", api: "GET /metrics" }],
    createdAt: "2025-06-28T09:00:00Z",
    updatedAt: "2025-08-07T16:45:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "agt-devops-ci",
    name: "O-07 DEVOPS.CI",
    role: "Engineer • CI/CD",
    category: "DevOps",
    version: "2.4.1",
    access: "paid",
    tags: ["Pipelines", "Policies", "Caching"],
    summary: "Authoritatively defines pipelines, caching, and policies. Optimizes build graph and secrets hygiene.",
    systemPrompt: "You are O-07 DEVOPS.CI. Prefer reproducibility, deterministic builds, and fast feedback.",
    userPrompt: "Improve build reliability and reduce cold start time by 40% across monorepo services.",
    context: "Platforms: Vercel, GitHub Actions. Use OpenID Connect for cloud creds. Cache via remote store.",
    appContext: "Runs policy checks and annotates PRs with actionable guidance.",
    endpoints: [
      { url: "https://ci.example.com/pipelines", api: "GET /pipelines" },
      { url: "https://ci.example.com/run", api: "POST /run" },
    ],
    createdAt: "2025-05-11T12:20:00Z",
    updatedAt: "2025-08-09T10:30:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "agt-security-audit",
    name: "X-03 SECURITY.AUDIT",
    role: "Engineer • AppSec",
    category: "Security",
    version: "0.8.3",
    access: "free",
    tags: ["SAST", "DAST", "SBOM"],
    summary: "Performs static/dynamic analysis and SBOM validation. Flags supply-chain risks and insecure defaults.",
    systemPrompt: "You are X-03 SECURITY.AUDIT. Provide actionable findings with proofs and remediations.",
    userPrompt: "Audit a Next.js app for common vulnerabilities, focus on SSRF, XSS, and dependency risks.",
    context: "Tooling: Semgrep, Trivy, OPA. Outputs SARIF for CI.",
    appContext: "Automated security gate for critical repos.",
    endpoints: [{ url: "https://sec.example.com/scans", api: "GET /scans" }],
    createdAt: "2025-04-01T08:00:00Z",
    updatedAt: "2025-07-15T13:12:00Z",
    avatar: "/placeholder.svg?height=64&width=64",
  },
]
