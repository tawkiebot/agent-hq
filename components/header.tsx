"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSound } from "@/components/sound-provider"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  BarChart3,
  Search,
  Layers,
} from "lucide-react"

const navItems = [
  { href: "/articles", label: "Articles", icon: BookOpen },
  { href: "/benchmarks", label: "Benchmarks", icon: BarChart3 },
  { href: "/tools", label: "Tool Directory", icon: Layers },
]

export function Header() {
  const pathname = usePathname()
  const { play } = useSound()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/50 bg-neutral-950/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-baseline gap-3"
            onMouseEnter={() => play("hover")}
          >
            <span className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-neutral-100">
              agentreport<span className="text-emerald-400">.io</span>
            </span>
            <Badge
              variant="outline"
              className="border-emerald-700/50 text-emerald-300 bg-emerald-950/30 font-mono text-[10px] px-2 py-0.5"
            >
              BETA
            </Badge>
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => play("hover")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all",
                    isActive 
                      ? "bg-emerald-950/50 text-emerald-400" 
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              onMouseEnter={() => play("hover")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 hover:border-neutral-600 transition-all font-mono text-sm"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5 text-xs">/</kbd>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
