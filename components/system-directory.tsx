"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Keyboard, RefreshCw, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSound } from "@/components/sound-provider"
import { SystemCard } from "@/components/system-card"
import { VENDORS, SYSTEMS } from "@/lib/catalog"
import { HeaderNav } from "@/components/header-nav"

export default function SystemDirectory() {
  const [query, setQuery] = useState("")
  const [vendor, setVendor] = useState<string>("all")
  const [sort, setSort] = useState<"updated" | "az" | "version">("updated")
  const { play } = useSound()
  const searchRef = useRef<HTMLInputElement>(null)

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
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = SYSTEMS.filter((s) => (vendor === "all" ? true : s.vendorId === vendor))
    if (q) {
      list = list.filter((s) => {
        const hay = [s.title, s.name, s.version, ...s.interfaces, ...s.hosting].join(" ").toLowerCase()
        return hay.includes(q)
      })
    }
    switch (sort) {
      case "az":
        list.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "version":
        list.sort((a, b) => b.version.localeCompare(a.version))
        break
      case "updated":
      default:
        list.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        break
    }
    return list
  }, [query, vendor, sort])

  function resetFilters() {
    setQuery("")
    setVendor("all")
    setSort("updated")
  }

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

      <HeaderNav section="Agentic Systems" />

      <section className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-3 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" aria-hidden="true" />
                <Input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    play("key")
                  }}
                  placeholder='Search systems (press "/" to focus)'
                  className={cn(
                    "pl-9 bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-500",
                    "focus-visible:ring-1 focus-visible:ring-neutral-400/30",
                    "u-anim",
                  )}
                  aria-label="Search systems"
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
                    <SelectItem value="updated">Recently Added</SelectItem>
                    <SelectItem value="az">Name A–Z</SelectItem>
                    <SelectItem value="version">Version</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button
                  asChild
                  variant="outline"
                  className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 u-anim u-lift u-press"
                >
                  <Link href="/agents">Browse Agents</Link>
                </Button>
              </div>
            </div>

            {/* Vendors as tabs */}
            <Tabs value={vendor} onValueChange={(v: any) => setVendor(v)} className="w-full">
              <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className={cn(
                    "inline-flex h-7 items-center gap-1.5 px-2.5 py-1",
                    "border border-neutral-700 bg-neutral-950 text-neutral-300",
                    "hover:bg-neutral-900 hover:border-neutral-600",
                    "data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-600",
                    "font-mono text-xs tracking-[0.08em]",
                    "u-anim u-lift",
                  )}
                >
                  All Vendors
                </TabsTrigger>
                {VENDORS.map((v) => (
                  <TabsTrigger
                    key={v.id}
                    value={v.id}
                    className={cn(
                      "inline-flex h-7 items-center gap-1.5 px-2.5 py-1",
                      "border border-neutral-700 bg-neutral-950 text-neutral-300",
                      "hover:bg-neutral-900 hover:border-neutral-600",
                      "data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-600",
                      "font-mono text-xs tracking-[0.08em]",
                      "u-anim u-lift",
                    )}
                  >
                    {v.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono">
              SYSTEMS: <span className="text-neutral-200">{filtered.length}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono">HINT: type "/" to search</span>
              <Keyboard className="h-4 w-4 hidden sm:inline" aria-hidden="true" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
              No systems match your filters. Try adjusting your search.
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((sys) => (
                <SystemCard key={sys.id} system={sys} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
