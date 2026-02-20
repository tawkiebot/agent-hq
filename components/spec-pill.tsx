"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * SpecPill
 * - Beveled icon square + uppercase hyphenated label.
 * - Minimal color: accent on icon only; rest stays monochrome.
 * - size: "sm" (default) or "xs" for tighter spaces like tabs.
 * - iconVariant: "bevel" (default) for bordered square or "plain" to remove icon borders/bevel.
 */
export function SpecPill({
  icon,
  iconClassName,
  label,
  className,
  size = "sm",
  iconVariant = "bevel",
}: {
  icon: ReactNode
  iconClassName?: string
  label: string
  className?: string
  size?: "sm" | "xs"
  iconVariant?: "bevel" | "plain"
}) {
  const isXS = size === "xs"
  const outer = cn(
    "inline-flex items-center rounded-sm border border-neutral-700 bg-neutral-950 font-mono uppercase",
    "u-anim u-lift",
    isXS ? "gap-1.5 px-2 py-0.5 text-[10px]" : "gap-2 px-2.5 py-1 text-[11px]",
    className,
  )

  const squareBase = "grid place-items-center rounded-[3px]"
  const squareBevel =
    "border border-neutral-700 bg-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.55)]"
  const squarePlain = "border-none bg-transparent shadow-none"

  const square = cn(squareBase, iconVariant === "plain" ? squarePlain : squareBevel, isXS ? "h-5 w-5" : "h-6 w-6")
  const iconSize = isXS ? "h-3 w-3" : "h-3.5 w-3.5"

  return (
    <span className={outer}>
      <span aria-hidden="true" className={square}>
        <span className={cn(iconSize, iconClassName)}>{icon}</span>
      </span>
      <span className="font-semibold tracking-[0.08em]">{label}</span>
    </span>
  )
}

/**
 * toHyphenUpper
 * Converts e.g. "Frontend Specialist" -> "FRONTEND-SPECIALIST"
 */
export function toHyphenUpper(input: string) {
  return input
    .replace(/[•·]/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, "-")
    .trim()
    .toUpperCase()
}
