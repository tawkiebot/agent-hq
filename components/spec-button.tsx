"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SpecButtonProps = React.ComponentProps<typeof Button> & {
  sizeVariant?: "xs" | "sm" | "icon"
}

/**
 * SpecButton: squared, monochrome, outline CTA with subtle micro-animations.
 */
export function SpecButton({ className, sizeVariant = "xs", asChild, children, ...props }: SpecButtonProps) {
  const size = {
    xs: "h-7 px-2 text-[11px]",
    sm: "h-8 px-2.5 text-xs",
    icon: "h-7 w-7 p-0",
  }[sizeVariant]

  return (
    <Button
      asChild={asChild}
      variant="outline"
      className={cn(
        // Base spec style
        "rounded-none border border-neutral-700 bg-neutral-950 text-neutral-200",
        "hover:bg-neutral-900 hover:border-neutral-500",
        "focus-visible:ring-1 focus-visible:ring-neutral-400/30",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "font-mono",
        // Micro-animations
        "u-anim u-lift u-press",
        // Size
        size,
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
