import { SYSTEMS, TEMPLATES, VENDORS } from "@/lib/catalog"
import Link from "next/link"

export const metadata = {
  title: "Agent HQ — AI Agent Directory",
  description: "A directory of AI agents, systems, and templates.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      <header className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-400">Agent HQ</h1>
          <nav className="flex gap-6">
            <Link href="/agents" className="hover:text-emerald-400 transition-colors">Agents</Link>
            <Link href="/systems" className="hover:text-emerald-400 transition-colors">Systems</Link>
            <Link href="/tools" className="hover:text-emerald-400 transition-colors">Tools</Link>
          </nav>
        </div>
      </header>

      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">AI Agent Directory</h2>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
          A curated collection of AI agents, systems, and templates. 
          Built for developers who want to harness the power of autonomous agents.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/agents" className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500 transition-colors">
            Browse Agents
          </Link>
          <Link href="/systems" className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-emerald-400 transition-colors">
            View Systems
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">{SYSTEMS.length} Systems</h3>
            <p className="text-neutral-400">AI systems from leading vendors like Anthropic, OpenAI, Google, and more.</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">{TEMPLATES.length} Templates</h3>
            <p className="text-neutral-400">Pre-built agent templates for frontend, security, data analysis, and DevOps.</p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold mb-2">{VENDORS.length} Vendors</h3>
            <p className="text-neutral-400">Leading AI companies building the next generation of autonomous agents.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SYSTEMS.slice(0, 6).map((sys) => (
            <div key={sys.id} className="bg-neutral-900 rounded-lg p-4 border border-neutral-800 hover:border-emerald-600 transition-colors">
              <h3 className="font-bold text-lg">{sys.title}</h3>
              <p className="text-sm text-neutral-400 mb-2">v{sys.version} • {sys.license}</p>
              <div className="flex gap-2 flex-wrap">
                {sys.interfaces.map((iface) => (
                  <span key={iface} className="text-xs bg-neutral-800 px-2 py-1 rounded">{iface}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.slice(0, 6).map((tpl) => (
            <div key={tpl.id} className="bg-neutral-900 rounded-lg p-4 border border-neutral-800 hover:border-emerald-600 transition-colors">
              <h3 className="font-bold text-lg">{tpl.title}</h3>
              <p className="text-sm text-neutral-400 mb-2">v{tpl.version}</p>
              <div className="flex gap-2 flex-wrap">
                {tpl.tags?.map((tag) => (
                  <span key={tag} className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-neutral-500">
          <p>Agent HQ — Built with Next.js</p>
        </div>
      </footer>
    </main>
  )
}
