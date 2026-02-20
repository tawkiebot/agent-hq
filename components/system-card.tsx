"use client"
import { cn } from "@/lib/utils"
import type { System } from "@/lib/catalog"
import { vendorById } from "@/lib/catalog"
import { Badge } from "@/components/ui/badge"
import { ServerCog, TerminalSquare, Boxes, Globe2 } from "lucide-react"
import { useSound } from "@/components/sound-provider"

type SystemSelection = {
  system: System
  anchorId: string
}

export function SystemCard({
  system,
  onSelect = () => {},
  active = false,
}: {
  system: System
  onSelect?: (sel: SystemSelection) => void
  active?: boolean
}) {
  const { play } = useSound()
  const anchorId = `system-card-${system.id}`
  const vendor = vendorById(system.vendorId)

  const open = () => {
    play("select")
    onSelect({ system, anchorId })
  }

  return (
    <div
      id={anchorId}
      role="button"
      tabIndex={0}
      onClick={open}
      onMouseEnter={() => play("hover")}
      className={cn(
        "group relative w-full overflow-hidden rounded-md border bg-neutral-950 text-left",
        "border-neutral-800 hover:border-neutral-500/60 focus-visible:border-neutral-400/80",
        "u-anim u-card focus:outline-none",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_6px_20px_rgba(0,0,0,0.30)]",
        active && "border-neutral-300/70",
      )}
      aria-label={`Open details for ${system.title}`}
    >
      {/* Photo window */}
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
        {/* Inner bevel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        />
        <div className="relative z-10 flex items-center justify-between px-3 py-2 h-full">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                "grid h-7 w-7 place-items-center rounded-[4px] border border-neutral-700 bg-neutral-950/70",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.55)]",
              )}
              aria-hidden="true"
            >
              {/* Vendor/system icon cluster */}
              <ServerCog className="h-4 w-4 text-violet-400" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-100 leading-tight">
                {system.title}
              </p>
              <p className="truncate font-mono text-[10px] text-neutral-500">{vendor?.name ?? "Vendor"}</p>
            </div>
          </div>

          {/* Version chip */}
          <div className="absolute right-2 top-2">
            <span className="inline-flex rounded-[3px] border border-neutral-700 bg-neutral-950/80 px-1 py-0.5 font-mono text-[9px] text-neutral-300">
              v{system.version}
            </span>
          </div>

          {/* Interfaces bottom-left; Hosting bottom-right */}
          <div className="absolute left-2 bottom-2">
            <div className="flex items-center gap-1.5">
              {system.interfaces.includes("editor") && (
                <Badge variant="outline" className="border-neutral-700 bg-neutral-900/60 px-1 py-0.5 text-[9px]">
                  <Boxes className="mr-0.5 h-2.5 w-2.5" /> editor
                </Badge>
              )}
              {system.interfaces.includes("cli") && (
                <Badge variant="outline" className="border-neutral-700 bg-neutral-900/60 px-1 py-0.5 text-[9px]">
                  <TerminalSquare className="mr-0.5 h-2.5 w-2.5" /> cli
                </Badge>
              )}
              {system.interfaces.includes("api") && (
                <Badge variant="outline" className="border-neutral-700 bg-neutral-900/60 px-1 py-0.5 text-[9px]">
                  <Globe2 className="mr-0.5 h-2.5 w-2.5" /> api
                </Badge>
              )}
            </div>
          </div>
          <div className="absolute right-2 bottom-2">
            <span className="inline-flex rounded-[3px] border border-neutral-800 bg-neutral-900/80 px-1 py-0.5 font-mono text-[9px] text-neutral-400">
              {system.hosting.join("/")}
            </span>
          </div>
        </div>
      </div>

      {/* Caption strip */}
      <div className="relative border-t border-neutral-800 bg-neutral-950/90 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        />
        <p className="relative z-10 font-mono text-[10px] leading-tight text-neutral-300 line-clamp-2">
          {"Interfaces: " + system.interfaces.join(", ") + " — Hosting: " + system.hosting.join(", ")}
        </p>
      </div>
    </div>
  )
}

SystemCard.defaultProps = {
  onSelect: () => {},
  active: false,
}
