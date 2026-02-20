"use client"

import type React from "react"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Agent } from "@/lib/agents"
import {
  Copy,
  CheckCheck,
  LinkIcon,
  Code2 as CodeGlyph,
  Database,
  X,
  Bot,
  Server,
  Code2,
  TerminalSquare,
  Lock,
} from "lucide-react"
import { useSound } from "@/components/sound-provider"
import { SpecButton } from "@/components/spec-button"
import { SpecPill, toHyphenUpper } from "@/components/spec-pill"

type Selection = {
  agent: Agent
  anchorId: string
  alignLeft?: boolean
}

type AgentSpecOverlayProps = {
  selection: Selection | null
  onClose: () => void
}

type Position = {
  top: number
  left: number
  placement: "right" | "left"
  panelWidth: number
  lineTop: number
  lineLeft: number
  lineWidth: number
}

const categoryIcon: Record<Agent["category"], React.ReactNode> = {
  Frontend: <Code2 className="h-3.5 w-3.5" />,
  Backend: <Server className="h-3.5 w-3.5" />,
  Systems: <TerminalSquare className="h-3.5 w-3.5" />,
  Architecture: <Bot className="h-3.5 w-3.5" />,
  Data: <Database className="h-3.5 w-3.5" />,
  DevOps: <Server className="h-3.5 w-3.5" />,
  Security: <Lock className="h-3.5 w-3.5" />,
}
const categoryIconColor: Record<Agent["category"], string> = {
  Frontend: "text-fuchsia-400",
  Backend: "text-teal-400",
  Systems: "text-amber-400",
  Architecture: "text-violet-400",
  Data: "text-fuchsia-400",
  DevOps: "text-teal-400",
  Security: "text-amber-400",
}

function rolePillLabel(agent: Agent) {
  const primaryRole = agent.role.split("•")[0]?.trim() || ""
  const roleWord = primaryRole.split(/\s+/)[0] || primaryRole
  const label = `${agent.category} ${roleWord}`
  return toHyphenUpper(label)
}

export default function AgentSpecOverlay({ selection, onClose }: AgentSpecOverlayProps) {
  const { play } = useSound()
  const panelRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<Position | null>(null)
  const [copied, setCopied] = useState(false)

  const agent = selection?.agent ?? null
  const anchorId = selection?.anchorId ?? null

  const json = useMemo(() => (agent ? JSON.stringify(agent, null, 2) : "{}"), [agent])

  async function copySpec() {
    if (!agent) return
    await navigator.clipboard.writeText(json)
    play("click") // Add sound feedback
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  function computePosition() {
    if (!anchorId) return
    const anchor = document.getElementById(anchorId)
    if (!anchor) return

    const r = anchor.getBoundingClientRect()
    const vw = window.innerWidth
    const margin = 12
    const gap = window.innerWidth >= 640 ? 16 : 12
    
    // For smart grid snapping: use the width of 2 columns in a 4-column grid
    const containerEl = anchor.closest('.grid')
    const containerRect = containerEl?.getBoundingClientRect()
    const gridGap = 16 // gap-4 in tailwind
    
    // Calculate panel width to be exactly 2 columns wide
    let panelWidth = r.width * 2 + gridGap
    
    // On smaller screens, adjust the width appropriately
    if (window.innerWidth < 1280) { // xl breakpoint
      // For lg screens (3 columns), use different calculation
      if (window.innerWidth >= 1024) {
        panelWidth = Math.min(r.width * 2 + gridGap, vw - margin * 2)
      } else {
        // For smaller screens, use more of the available width
        panelWidth = Math.min(600, vw - margin * 2)
      }
    }
    
    // Force alignment based on the alignLeft prop
    const preferLeft = selection?.alignLeft ?? false
    const placement: Position["placement"] = preferLeft ? "left" : "right"
    
    // Calculate the left position to align with grid columns
    let snappedLeft: number
    if (placement === "left" && containerRect) {
      // Align to the left edge of the leftmost column (column 0)
      snappedLeft = containerRect.left
    } else if (placement === "right" && containerRect) {
      // Align to the right edge of the second column (column index 1)
      // This makes it align perfectly with the right edge of column 2 in a 4-col grid
      const columnWidth = r.width
      snappedLeft = r.right + gap
    } else {
      // Fallback to original calculation
      const leftBase = placement === "right" ? r.right + gap : r.left - gap - panelWidth
      snappedLeft = leftBase
    }

    // Ensure panel stays within viewport
    const minLeft = margin
    const maxLeft = vw - panelWidth - margin
    snappedLeft = Math.min(Math.max(snappedLeft, minLeft), maxLeft)

    const top = Math.max(r.top, margin)

    // Calculate connector line position
    const startX = placement === "right" ? r.right : snappedLeft + panelWidth
    const endX = placement === "right" ? snappedLeft : r.left
    const lineLeft = Math.min(startX, endX)
    const lineWidth = Math.max(0, Math.abs(endX - startX))
    const lineTop = Math.max(top + 8, margin + 8)

    setPos({
      top,
      left: snappedLeft,
      placement,
      panelWidth,
      lineTop,
      lineLeft,
      lineWidth,
    })
  }

  useEffect(() => {
    if (agent) play("open")
  }, [agent, play])

  useLayoutEffect(() => {
    if (!selection) return
    computePosition()
    const onScroll = () => computePosition()
    const onResize = () => computePosition()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection])

  useEffect(() => {
    if (!selection) return
    const id = requestAnimationFrame(() => {
      computePosition()
      requestAnimationFrame(() => computePosition())
    })
    return () => cancelAnimationFrame(id)
  }, [selection])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const ro = new ResizeObserver(() => computePosition())
    ro.observe(panel)
    return () => ro.disconnect()
  }, [selection])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!agent || !pos) return null

  return (
    <>
      {/* Backdrop click-capture layer */}
      <div className="fixed inset-0 z-40 u-fade" aria-hidden="true" onClick={onClose} />

      {/* Dotted connector line */}
      <div
        aria-hidden="true"
        className="fixed z-50 pointer-events-none border-t border-dotted border-neutral-700 opacity-70 u-fade"
        style={{ top: pos.lineTop, left: pos.lineLeft, width: pos.lineWidth }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={`agent-spec-title-${agent.id}`}
        className={cn(
          "fixed z-50 rounded-md border border-neutral-800 bg-neutral-950 text-neutral-200 shadow-2xl u-pop",
          "shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.02)]",
        )}
        style={{
          top: pos.top,
          left: pos.left,
          width: pos.panelWidth,
          maxHeight: "calc(100vh - 24px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Spec sheet corner brackets */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-neutral-400/50" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-neutral-400/50" />
          <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-neutral-500/30" />
          <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-neutral-500/30" />
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="min-w-0">
                <h3
                  id={`agent-spec-title-${agent.id}`}
                  className="text-neutral-100 uppercase tracking-[0.08em] text-sm"
                >
                  {agent.name}
                </h3>
                <p className="text-neutral-400 text-[11px]">
                  {agent.role} • v{agent.version}
                </p>
              </div>
            </div>
            <SpecButton
              sizeVariant="icon"
              aria-label="Close details"
              onClick={onClose}
              className="u-anim u-lift u-press"
            >
              <X className="h-4 w-4" />
            </SpecButton>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Category as compact pill */}
            <SpecPill
              icon={categoryIcon[agent.category]}
              iconClassName={cn(categoryIconColor[agent.category], "opacity-90")}
              label={toHyphenUpper(agent.category)}
              size="xs"
              iconVariant="plain"
            />
            {agent.tags.slice(0, 4).map((t) => (
              <Badge key={t} variant="outline" className="border-neutral-700 text-neutral-300 font-mono text-[10px]">
                {t}
              </Badge>
            ))}
          </div>

          <Separator className="my-3 bg-neutral-800" />

          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] text-neutral-400">
              UPDATED {new Date(agent.updatedAt).toISOString().slice(0, 16).replace("T", " ")}
            </p>
            <div className="flex items-center gap-2">
              <SpecButton
                sizeVariant="xs"
                onClick={copySpec}
              >
                {copied ? <CheckCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied" : "Copy JSON"}
              </SpecButton>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-3">
            <TabsList className="bg-neutral-900/40">
              <TabsTrigger
                value="overview"
                className="text-xs data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 u-anim u-lift"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="prompts"
                className="text-xs data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 u-anim u-lift"
              >
                Prompts
              </TabsTrigger>
              <TabsTrigger
                value="io"
                className="text-xs data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 u-anim u-lift"
              >
                I/O
              </TabsTrigger>
              <TabsTrigger
                value="raw"
                className="text-xs data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 u-anim u-lift"
              >
                Raw JSON
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-3">
              <div className="space-y-3">
                <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                  <h4 className="mb-2 font-mono text-[10px] text-neutral-400">SUMMARY</h4>
                  <p className="font-mono text-[11px] leading-relaxed text-neutral-300">{agent.summary}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                    <h4 className="mb-2 font-mono text-[10px] text-neutral-400">APPLICATION CONTEXT</h4>
                    <p className="font-mono text-[11px] text-neutral-300 whitespace-pre-wrap">{agent.appContext}</p>
                  </div>
                  <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                    <h4 className="mb-2 font-mono text-[10px] text-neutral-400">CONTEXT</h4>
                    <p className="font-mono text-[11px] text-neutral-300 whitespace-pre-wrap">{agent.context}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                    <h4 className="mb-2 font-mono text-[10px] text-neutral-400">SYSTEM PROMPT</h4>
                    <CodeBlock text={agent.systemPrompt} copyLabel="Copy system prompt" />
                  </div>
                  <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                    <h4 className="mb-2 font-mono text-[10px] text-neutral-400">USER PROMPT</h4>
                    <CodeBlock text={agent.userPrompt} copyLabel="Copy user prompt" />
                  </div>
                </div>

                <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                  <h4 className="mb-2 font-mono text-[10px] text-neutral-400">ENDPOINTS</h4>
                  <div className="space-y-2">
                    {agent.endpoints.map((e, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded border border-neutral-800 bg-neutral-950 p-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-mono text-[11px] text-neutral-300">{e.url}</p>
                          <p className="font-mono text-[10px] text-neutral-500">{e.api}</p>
                        </div>
                        <SpecButton asChild sizeVariant="xs" className="inline-flex items-center">
                          <a href={e.url} target="_blank" rel="noreferrer" aria-label={`Open ${e.api}`}>
                            <LinkIcon className="mr-1 h-3.5 w-3.5" />
                            Open
                          </a>
                        </SpecButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prompts" className="mt-3">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="system">
                  <AccordionTrigger className="font-mono text-[11px] u-anim u-lift">System Prompt</AccordionTrigger>
                  <AccordionContent>
                    <CodeBlock text={agent.systemPrompt} copyLabel="Copy system prompt" />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="user">
                  <AccordionTrigger className="font-mono text-[11px] u-anim u-lift">User Prompt</AccordionTrigger>
                  <AccordionContent>
                    <CodeBlock text={agent.userPrompt} copyLabel="Copy user prompt" />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="context">
                  <AccordionTrigger className="font-mono text-[11px] u-anim u-lift">Context</AccordionTrigger>
                  <AccordionContent>
                    <CodeBlock text={agent.context} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="app">
                  <AccordionTrigger className="font-mono text-[11px] u-anim u-lift">
                    Application Context
                  </AccordionTrigger>
                  <AccordionContent>
                    <CodeBlock text={agent.appContext} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="io" className="mt-3">
              <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                  <Database className="h-4 w-4" /> Interfaces
                </h4>
                <ul className="list-inside list-disc space-y-1">
                  {agent.endpoints.map((e, idx) => (
                    <li key={idx} className="font-mono text-[11px] text-neutral-300">
                      {e.api} — {e.url}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="raw" className="mt-3">
              <div className="rounded border border-neutral-800 bg-neutral-950">
                <ScrollArea className="h-[50vh]">
                  <pre className="m-0 p-3 font-mono text-[11px] text-neutral-300">{json}</pre>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

function CodeBlock({ text = "", copyLabel = "Copy" }: { text?: string; copyLabel?: string }) {
  const [copied, setCopied] = useState(false)
  const { play } = useSound()

  async function copy() {
    await navigator.clipboard.writeText(String(text ?? ""))
    play("click") // Add sound feedback for copy action
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="rounded border border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-1.5">
        <div className="flex items-center gap-2 text-neutral-400">
          <CodeGlyph className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px]">SPEC</span>
        </div>

        <div className="flex items-center gap-2">
          <SpecButton sizeVariant="xs" onClick={copy} aria-label={copyLabel}>
            {copied ? <CheckCheck className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </SpecButton>
          {/* Decorative dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-500/70" />
            <span className="h-2 w-2 rounded-full bg-neutral-400/70" />
            <span className="h-2 w-2 rounded-full bg-neutral-300/70" />
          </div>
        </div>
      </div>
      <ScrollArea className="max-h-[28vh]">
        <pre className="m-0 whitespace-pre-wrap p-3 font-mono text-[11px] leading-relaxed text-neutral-300">
          {String(text)}
        </pre>
      </ScrollArea>
    </div>
  )
}
