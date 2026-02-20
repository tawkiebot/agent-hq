"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSound } from "@/components/sound-provider"
import { SYSTEMS, TEMPLATES, VENDORS, CATEGORIES } from "@/lib/catalog"
import {
  ArrowRight,
  Zap,
  Search,
  Layers,
  Box,
  Building2,
  Code2,
  Shield,
  Database,
  Cpu,
} from "lucide-react"

export default function LandingPage() {
  const { play } = useSound()

  const stats = [
    { value: SYSTEMS.length, label: "Agent Systems", color: "text-emerald-400" },
    { value: TEMPLATES.length, label: "Templates", color: "text-emerald-400" },
    { value: CATEGORIES.length, label: "Categories", color: "text-emerald-400" },
    { value: VENDORS.length, label: "Vendors", color: "text-emerald-400" },
  ]

  const categories = [
    { name: "Frontend", icon: Code2, count: 2, color: "text-emerald-400", desc: "UI generation, SSR, component specs" },
    { name: "Backend", icon: Layers, count: 1, color: "text-emerald-400", desc: "API design, auth, caching" },
    { name: "DevOps", icon: Box, count: 1, color: "text-emerald-400", desc: "Pipelines, policies, infrastructure" },
    { name: "Security", icon: Shield, count: 1, color: "text-emerald-400", desc: "SAST, DAST, vulnerability scanning" },
    { name: "Data", icon: Database, count: 1, color: "text-emerald-400", desc: "SQL models, metrics, dashboards" },
    { name: "Systems", icon: Cpu, count: 1, color: "text-emerald-400", desc: "Performance, profiling, optimization" },
  ]

  return (
    <div className={cn("relative min-h-[100dvh] text-neutral-200", "bg-neutral-950")}>
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(80,80,80,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(80,80,80,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px, 32px 32px",
          maskImage: "radial-gradient(120% 120% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 opacity-60"
      />

      {/* Header */}
      <header className="relative z-10 border-b border-neutral-800/50 bg-neutral-950/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-neutral-100">
                agent-hq<span className="text-emerald-400">.io</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-emerald-600/50 u-anim u-lift font-mono text-xs"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/agents">Agents</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-blue-600/50 u-anim u-lift font-mono text-xs"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/systems">Systems</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-violet-600/50 u-anim u-lift font-mono text-xs"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/tools">Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <Badge
                variant="outline"
                className="border-emerald-600/50 bg-emerald-950/40 text-emerald-200 font-mono text-sm px-4 py-2 u-anim u-glow"
              >
                <Zap className="mr-2 h-4 w-4 text-emerald-400" />
                Open source agent directory
              </Badge>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-100 sm:text-7xl font-[family-name:var(--font-fraunces)]">
              Agent HQ
              <br />
              <span className="text-emerald-400 font-[family-name:var(--font-space-grotesk)]">Your Agent Infrastructure</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400 font-[family-name:var(--font-space-grotesk)]">
              A curated directory of AI agents, systems, and templates. 
              Built for developers who want to harness the power of autonomous agents.
            </p>

            <div className="mx-auto mb-12 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search agents, systems, or templates..."
                  className="h-14 w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-12 pr-4 text-neutral-200 placeholder:text-neutral-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 font-mono text-xs text-neutral-500">
                  /
                </kbd>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-emerald-600 text-neutral-100 hover:bg-emerald-500 u-anim u-lift font-mono"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/agents" className="flex items-center gap-2">
                  Browse Agents <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-emerald-600/50 u-anim u-lift font-mono"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/systems" className="flex items-center gap-2">
                  View Systems <Layers className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-neutral-800/50 bg-neutral-900/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center cursor-pointer hover:scale-105 transition-transform">
                <div className={cn("mb-1 text-3xl font-bold font-mono", stat.color)}>
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Rationale */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-neutral-100 font-[family-name:var(--font-space-grotesk)]">Why Agent HQ?</h2>
            <p className="mb-6 text-lg text-neutral-400">
              The AI agent landscape is exploding. New systems, frameworks, and tools appear daily.
              Agent HQ is an attempt to organize this chaos into something usable.
            </p>
            <p className="text-neutral-400">
              We catalog agent systems from major vendors (Anthropic, OpenAI, Google, Meta) 
              and curate templates for common use cases. Whether you're building a frontend specialist 
              or a security auditor, start here.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 border-y border-neutral-800/50 bg-neutral-900/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-neutral-100 font-[family-name:var(--font-space-grotesk)]">Explore Categories</h2>
            <p className="text-neutral-400">Find agents for your specific needs</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href="/agents"
                className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim cursor-pointer"
                onMouseEnter={() => play("hover")}
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800", category.color)}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)]">
                    {category.name}
                  </div>
                  <div className="text-sm text-neutral-500">{category.desc}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Systems */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-neutral-100 font-[family-name:var(--font-space-grotesk)]">Featured Systems</h2>
              <p className="text-neutral-400">Production-ready agent systems from leading vendors</p>
            </div>
            <Button
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300"
              onMouseEnter={() => play("hover")}
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.slice(0, 6).map((sys) => (
              <div
                key={sys.id}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)]">
                    {sys.title}
                  </h3>
                  <Badge variant="outline" className="font-mono text-xs">
                    v{sys.version}
                  </Badge>
                </div>
                <p className="mb-3 text-sm text-neutral-500 font-mono">{sys.license}</p>
                <div className="flex flex-wrap gap-2">
                  {sys.interfaces.map((iface) => (
                    <span key={iface} className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400 font-mono">
                      {iface}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="relative z-10 border-y border-neutral-800/50 bg-neutral-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-neutral-100 font-[family-name:var(--font-space-grotesk)]">Data Schema</h2>
            <p className="text-neutral-400">The structure that powers Agent HQ</p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link 
              href="https://github.com/tawkiebot/agent-hq/blob/main/lib/catalog.ts"
              className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim cursor-pointer"
            >
              <h3 className="font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)] mb-2">
                Types & Interfaces
              </h3>
              <p className="text-sm text-neutral-400 font-mono">
                Vendor, System, Template, Category
              </p>
            </Link>
            
            <Link 
              href="https://github.com/tawkiebot/agent-hq/blob/main/lib/catalog.ts"
              className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim cursor-pointer"
            >
              <h3 className="font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)] mb-2">
                URI Schemes
              </h3>
              <p className="text-sm text-neutral-400 font-mono">
                vndr://, sys://, agt://
              </p>
            </Link>
            
            <Link 
              href="https://github.com/tawkiebot/agent-hq/blob/main/lib/catalog.ts"
              className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim cursor-pointer"
            >
              <h3 className="font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)] mb-2">
                Helper Functions
              </h3>
              <p className="text-sm text-neutral-400 font-mono">
                vendorById, systemsByVendor
              </p>
            </Link>
            
            <Link 
              href="https://github.com/tawkiebot/agent-hq/blob/main/lib/catalog.ts"
              className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim cursor-pointer"
            >
              <h3 className="font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-space-grotesk)] mb-2">
                Data Export
              </h3>
              <p className="text-sm text-neutral-400 font-mono">
                VENDORS, SYSTEMS, TEMPLATES, CATEGORIES
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800/50 bg-neutral-950 py-8 font-[family-name:var(--font-space-grotesk)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-neutral-100">
                agent-hq<span className="text-emerald-400">.io</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="/agents" className="hover:text-emerald-400 transition-colors">Agents</Link>
              <Link href="/systems" className="hover:text-emerald-400 transition-colors">Systems</Link>
              <Link href="/tools" className="hover:text-emerald-400 transition-colors">Tools</Link>
            </div>
            <div className="text-sm text-neutral-600">
              © 2026 Agent HQ
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
