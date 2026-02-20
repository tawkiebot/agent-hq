"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Agent } from "@/lib/agents"
import { Code2, Server, TerminalSquare, Bot, Database, Lock } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import { toHyphenUpper } from "@/components/spec-pill"

type AgentSelection = {
  agent: Agent
  anchorId: string
}

type AgentCardProps = {
  agent: Agent
  onSelect?: (sel: AgentSelection) => void
  dense?: boolean
  active?: boolean
}

const categoryIcon: Record<Agent["category"], React.ReactNode> = {
  Frontend: <Code2 className="h-4 w-4" />,
  Backend: <Server className="h-4 w-4" />,
  Systems: <TerminalSquare className="h-4 w-4" />,
  Architecture: <Bot className="h-4 w-4" />,
  Data: <Database className="h-4 w-4" />,
  DevOps: <Server className="h-4 w-4" />,
  Security: <Lock className="h-4 w-4" />,
}

const categoryAccentText: Record<Agent["category"], string> = {
  Frontend: "text-fuchsia-400",
  Backend: "text-teal-400",
  Systems: "text-amber-400",
  Architecture: "text-violet-400",
  Data: "text-fuchsia-400",
  DevOps: "text-teal-400",
  Security: "text-amber-400",
}

function headerLabel(agent: Agent) {
  const primaryRole = agent.role.split("•")[0]?.trim() || agent.role
  const roleWord = primaryRole.split(/\s+/)[0] || primaryRole
  return toHyphenUpper(`${agent.category} ${roleWord}`)
}

export default function AgentCard({ agent, onSelect = () => {}, dense = false, active = false }: AgentCardProps) {
  const { play } = useSound()
  const anchorId = `agent-card-${agent.id}`

  const open = () => {
    play("select")
    onSelect({ agent, anchorId })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      open()
    }
  }

  return (
    <div
      id={anchorId}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={onKeyDown}
      onMouseEnter={() => play("hover")}
      className={cn(
        // Outer card frame — slight rounding and chrome
        "group relative w/full overflow-hidden rounded-md border bg-neutral-950 text-left",
        "border-neutral-800 hover:border-neutral-500/60 focus-visible:border-neutral-400/80",
        "u-anim u-card focus:outline-none",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_6px_20px_rgba(0,0,0,0.30)]",
        active && "border-neutral-300/70",
      ).replace("w/full", "w-full")}
      aria-label={`Open details for ${agent.name}`}
    >
      {/* Polaroid "photo" window */}
      <div className="relative bg-neutral-900 h-16">
        {/* Subtle surface noise */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/noise-paper.png')",
            backgroundSize: "600px 600px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* Inner bevel and top highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        />

        {/* Content row: icon + label */}
        <div className="relative z-10 flex items-center justify-between px-3 py-2 h-full">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "grid h-7 w-7 place-items-center rounded-[4px] border border-neutral-700 bg-neutral-950/70",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.55)]",
              )}
              aria-hidden="true"
            >
              <span className={cn("h-4 w-4", categoryAccentText[agent.category])}>{categoryIcon[agent.category]}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-100 leading-tight">
                {headerLabel(agent)}
              </p>
              <p className="truncate font-mono text-[10px] text-neutral-500">{agent.name}</p>
            </div>
          </div>

          {/* Version chip top-right of photo window */}
          <div className="absolute right-2 top-2">
            <span className="inline-flex rounded-[3px] border border-neutral-700 bg-neutral-950/80 px-1 py-0.5 font-mono text-[9px] text-neutral-300">
              v{agent.version}
            </span>
          </div>
        </div>
      </div>

      {/* Polaroid "caption" strip with beveled edge */}
      <div
        className={cn(
          "relative border-t border-neutral-800 bg-neutral-950/90 p-2",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        )}
      >
        {/* Bevel decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        />
        {/* Description */}
        <p className={cn("relative z-10 font-mono text-[10px] leading-tight text-neutral-300 line-clamp-2")}>
          {agent.summary}
        </p>

        {/* Tags */}
        <div className="relative z-10 mt-1.5 flex flex-wrap items-center gap-1">
          {agent.tags.slice(0, dense ? 2 : 3).map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="rounded-[3px] border-neutral-700 bg-neutral-950/80 px-1 py-0 text-[9px] font-mono text-neutral-300"
            >
              {t}
            </Badge>
          ))}
          {agent.tags.length > (dense ? 2 : 3) && (
            <Badge
              variant="outline"
              className="rounded-[3px] border-neutral-700 bg-neutral-950/80 px-1 py-0 text-[9px] font-mono text-neutral-400"
            >
              +{agent.tags.length - (dense ? 2 : 3)}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

AgentCard.defaultProps = {
  onSelect: () => {},
  dense: false,
  active: false,
}
