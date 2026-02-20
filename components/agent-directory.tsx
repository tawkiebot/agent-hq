"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Search,
  RefreshCw,
  Keyboard,
  ListTree,
  Grid3X3,
  Bot,
  Server,
  Code2,
  TerminalSquare,
  Asterisk,
  Database,
  Lock,
} from "lucide-react"
import AgentCard from "@/components/agent-card"
import type { Agent } from "@/lib/agents"
import { AGENT_CATEGORIES, MOCK_AGENTS } from "@/lib/agents"
import { useSound } from "@/components/sound-provider"
import AgentSpecOverlay from "@/components/agent-spec-overlay"
import type { JSX } from "react/jsx-runtime"
import { HeaderNav } from "@/components/header-nav"

type AgentSelection = {
  agent: Agent
  anchorId: string
  alignLeft?: boolean
}

type AgentDirectoryProps = {
  initialAgents?: Agent[]
}

const categoryIconMap: Record<(typeof AGENT_CATEGORIES)[number], JSX.Element> = {
  Frontend: <Code2 />,
  Backend: <Server />,
  Systems: <TerminalSquare />,
  Architecture: <Bot />,
  Data: <Database />,
  DevOps: <Server />,
  Security: <Lock />,
}
const categoryAccentMap: Record<(typeof AGENT_CATEGORIES)[number], string> = {
  Frontend: "text-fuchsia-400",
  Backend: "text-teal-400",
  Systems: "text-amber-400",
  Architecture: "text-violet-400",
  Data: "text-fuchsia-400",
  DevOps: "text-teal-400",
  Security: "text-amber-400",
}

const AgentDirectory = ({ initialAgents = MOCK_AGENTS }: AgentDirectoryProps) => {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"updated" | "az" | "version" | "access">("updated")
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  const [selection, setSelection] = useState<AgentSelection | null>(null)
  const [category, setCategory] = useState("all")

  const { play } = useSound()

  const searchRef = useRef<HTMLInputElement>(null)
  const keyDebounceRef = useRef<number | null>(null)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === "Escape") {
        setSelection(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    return () => {
      if (keyDebounceRef.current) {
        clearTimeout(keyDebounceRef.current)
        keyDebounceRef.current = null
      }
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let base = initialAgents.filter((a) => (category === "all" ? true : a.category === category))
    if (q) {
      base = base.filter((a) => {
        const hay = [
          a.name,
          a.role,
          a.category,
          a.version,
          a.summary,
          a.access,
          ...a.tags,
          a.systemPrompt,
          a.userPrompt,
          a.context,
          a.appContext,
          ...a.endpoints.map((e) => e.url),
          ...a.endpoints.map((e) => e.api),
        ]
          .join(" ")
          .toLowerCase()
        return hay.includes(q)
      })
    }
    switch (sort) {
      case "az":
        base.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "version":
        base.sort((a, b) => b.version.localeCompare(a.version))
        break
      case "access":
        base.sort((a, b) => {
          const order = { free: 0, paid: 1 } as const
          return order[a.access] - order[b.access] || a.name.localeCompare(b.name)
        })
        break
      case "updated":
      default:
        base.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        break
    }
    return base
  }, [initialAgents, category, query, sort])

  function resetFilters() {
    setQuery("")
    setSort("updated")
  }

  const selectedId = selection?.agent.id

  return (
    <div className={cn("relative min-h-[100dvh] text-neutral-200", "bg-neutral-950")}>
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(80,80,80,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(80,80,80,0.13) 1px, transparent 1px)",
          backgroundSize: "32px 32px, 32px 32px",
          maskImage: "radial-gradient(150% 150% at 50% 50%, black 60%, transparent 100%)",
        }}
      />

      <HeaderNav section="Agent Directory" />

      <section className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-3 flex flex-col gap-3">
            {/* Secure Action demo (optional) */}

            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" aria-hidden="true" />
                <Input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    if (keyDebounceRef.current) clearTimeout(keyDebounceRef.current)
                    keyDebounceRef.current = window.setTimeout(() => {
                      play("key")
                    }, 90)
                  }}
                  placeholder='Search agents (press "/" to focus)'
                  className={cn(
                    "pl-9 bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-500",
                    "focus-visible:ring-1 focus-visible:ring-neutral-400/30",
                    "u-anim",
                  )}
                  aria-label="Search agents"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={sort}
                  onValueChange={(v: any) => {
                    setSort(v)
                    play("toggle")
                  }}
                >
                  <SelectTrigger className="w-[180px] bg-neutral-900 border-neutral-700 text-neutral-200 u-anim">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-700 text-neutral-200">
                    <SelectItem value="updated">Recently Updated</SelectItem>
                    <SelectItem value="az">Name A–Z</SelectItem>
                    <SelectItem value="version">Version</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setLayout(layout === "grid" ? "list" : "grid")
                    play("toggle")
                  }}
                  className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 u-anim u-lift u-press"
                  aria-label="Toggle layout"
                >
                  {layout === "grid" ? <ListTree className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetFilters()
                    play("reset")
                  }}
                  className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 u-anim u-lift u-press"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Category tabs */}
            <Tabs
              value={category}
              onValueChange={(v: any) => {
                setCategory(v)
                play("tab")
              }}
              className="w-full"
            >
              <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                {(["all", ...AGENT_CATEGORIES] as const).map((c) => {
                  const isAll = c === "all"
                  const accent = isAll ? "text-neutral-300" : categoryAccentMap[c as (typeof AGENT_CATEGORIES)[number]]
                  const IconEl = isAll ? <Asterisk /> : categoryIconMap[c as (typeof AGENT_CATEGORIES)[number]]
                  return (
                    <TabsTrigger
                      key={c}
                      value={c}
                      className={cn(
                        "inline-flex h-7 items-center gap-1.5 px-2.5 py-1",
                        "border border-neutral-700 bg-neutral-950 text-neutral-300",
                        "hover:bg-neutral-900 hover:border-neutral-600",
                        "data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-600",
                        "font-mono text-xs tracking-[0.08em]",
                        "u-anim u-lift",
                      )}
                    >
                      <span className={cn("h-3.5 w-3.5", accent)}>{IconEl}</span>
                      <span>{String(c).toUpperCase()}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono">
              RESULTS: <span className="text-neutral-200">{filtered.length}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono">HINT: type "/" to search</span>
              <Keyboard className="h-4 w-4 hidden sm:inline" aria-hidden="true" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
              No agents match your filters. Try adjusting your search.
            </div>
          ) : layout === "grid" ? (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((agent, index) => {
                // Determine which column this card is in (for xl screens with 4 columns)
                const columnPosition = index % 4;
                const isRightSide = columnPosition >= 2; // columns 2 and 3 are on the right
                
                return (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    active={selectedId === agent.id}
                    onSelect={({ agent: a, anchorId }) => 
                      setSelection({ agent: a, anchorId, alignLeft: isRightSide })
                    }
                  />
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-neutral-800 rounded border border-neutral-800">
              {filtered.map((agent) => (
                <div key={agent.id} className="p-2 sm:p-2.5">
                  <AgentCard
                    agent={agent}
                    dense
                    active={selectedId === agent.id}
                    onSelect={({ agent: a, anchorId }) => setSelection({ agent: a, anchorId })}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Attached spec sheet overlay */}
      <AgentSpecOverlay selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}

AgentDirectory.defaultProps = {
  initialAgents: MOCK_AGENTS,
}

export default AgentDirectory
