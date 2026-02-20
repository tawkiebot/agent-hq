import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation - Agent HQ',
  description: 'Agent HQ documentation',
}

const docs = [
  { title: 'Overview', description: 'Introduction to Agent HQ', href: '/docs/overview' },
  { title: 'Quickstart', description: 'Get started in 5 minutes', href: '/docs/quickstart' },
  { title: 'Architecture', description: 'Project structure and data flow', href: '/docs/architecture' },
  { title: 'API Reference', description: 'TypeScript type definitions', href: '/docs/api' },
  { title: 'Prompts', description: 'Task templates for common operations', href: '/docs/prompts' },
  { title: 'Skills', description: 'Pre-built skill definitions', href: '/docs/skills' },
  { title: 'AI Assistants', description: 'How to use docs with AI assistants', href: '/docs/ai-assistants' },
]

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-fraunces)]">Documentation</h1>
      <p className="text-neutral-400 mb-12 text-lg">Everything you need to know about Agent HQ</p>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 cursor-pointer"
          >
            <h2 className="font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)] mb-2">
              {doc.title}
            </h2>
            <p className="text-sm text-neutral-400">{doc.description}</p>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">Agent-Ready Files</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://github.com/tawkiebot/agent-hq/blob/main/AGENTS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 cursor-pointer"
          >
            <h3 className="font-bold text-neutral-100 font-[family-name:var(--font-space-grotesk)] mb-1">AGENTS.md</h3>
            <p className="text-sm text-neutral-400">Combined agent context with critical rules</p>
          </a>
          <a
            href="https://github.com/tawkiebot/agent-hq/blob/main/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 cursor-pointer"
          >
            <h3 className="font-bold text-neutral-100 font-[family-name:var(--font-space-grotesk)] mb-1">llms.txt</h3>
            <p className="text-sm text-neutral-400">Plain text summary for LLM context</p>
          </a>
        </div>
      </section>
    </div>
  )
}
