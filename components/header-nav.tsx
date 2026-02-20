"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useSound } from "@/components/sound-provider"
import { useSupabaseUser } from "@/components/supabase-user-provider"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useTheme } from "next-themes"
import { Cog, Moon, Sun, Monitor, User, LogIn, LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function HeaderNav({ section }: { section: string }) {
  const pathname = usePathname()
  const { enabled: soundOn, toggleEnabled, channels, setChannels } = useSound()
  const { user, loading, isConfigured } = useSupabaseUser()
  const { theme, setTheme } = useTheme()

  const [openSignIn, setOpenSignIn] = useState(false)
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0]?.toUpperCase())
      .join("")
      .slice(0, 2) || (user?.email ? user.email[0]?.toUpperCase() : "U")

  const sendMagicLink = useCallback(async () => {
    const supabase = getSupabaseBrowserClient()
    setSending(true)
    setSent(false)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      setSent(true)
    } catch (e) {
      console.error("signIn error", e)
      setSent(false)
    } finally {
      setSending(false)
    }
  }, [email])

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
  }, [])

  return (
    <>
      <header className="relative z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <Link href="/agents" className="flex items-baseline gap-3 u-anim hover:opacity-90">
              <span className="font-mono text-sm font-semibold tracking-[0.2em] uppercase text-neutral-100">
                agentlist<span className="text-neutral-400">.io</span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">{section}</span>
            </Link>

            {/* Primary nav */}
            <nav className="hidden sm:flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                className={cn(
                  "h-8 rounded-sm border-neutral-700 bg-neutral-900 text-neutral-200",
                  pathname?.startsWith("/agents") && "bg-neutral-900/80 border-neutral-600",
                )}
              >
                <Link href="/agents">Agents</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "h-8 rounded-sm border-neutral-700 bg-neutral-900 text-neutral-200",
                  pathname?.startsWith("/systems") && "bg-neutral-900/80 border-neutral-600",
                )}
              >
                <Link href="/systems">Systems</Link>
              </Button>
            </nav>

            {/* Right controls: Settings + Account */}
            <div className="flex items-center gap-2">
              {/* Settings */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 u-anim u-lift u-press"
                    aria-label="Open settings"
                  >
                    <Cog className="mr-2 h-4 w-4" />
                    <span className="font-mono text-xs">Settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 border-neutral-800 bg-neutral-950 text-neutral-200">
                  <DropdownMenuLabel className="text-neutral-400">Appearance</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
                      <Moon className="h-4 w-4" /> Dark{" "}
                      {theme === "dark" && <span className="ml-auto text-xs">active</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
                      <Sun className="h-4 w-4" /> Light{" "}
                      {theme === "light" && <span className="ml-auto text-xs">active</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2">
                      <Monitor className="h-4 w-4" /> System{" "}
                      {theme === "system" && <span className="ml-auto text-xs">active</span>}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-neutral-800" />

                  <DropdownMenuLabel className="text-neutral-400">Sound</DropdownMenuLabel>
                  {/* Sound controls moved here */}
                  <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem checked={soundOn} onCheckedChange={toggleEnabled}>
                      Enable sound
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={channels.cards}
                      onCheckedChange={(v) => setChannels({ cards: v })}
                      disabled={!soundOn}
                    >
                      Card interactions
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={channels.tabs}
                      onCheckedChange={(v) => setChannels({ tabs: v })}
                      disabled={!soundOn}
                    >
                      Tabs & toggles
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={channels.typing}
                      onCheckedChange={(v) => setChannels({ typing: v })}
                      disabled={!soundOn}
                    >
                      Typing
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-neutral-800" />

                  <DropdownMenuLabel className="text-neutral-400">Navigation</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/agents">Agents</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/systems">Systems</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Account - only show if Supabase is configured */}
              {isConfigured && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-sm border-neutral-700 bg-neutral-900 text-neutral-200 u-anim u-lift u-press"
                      aria-label="Account menu"
                    >
                      {user ? (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-neutral-800 border border-neutral-700">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 border-neutral-800 bg-neutral-950 text-neutral-200">
                    <DropdownMenuLabel>
                      {user ? (
                        <div className="flex flex-col">
                          <span className="text-neutral-100">{user.name || "Signed in"}</span>
                          <span className="text-xs text-neutral-400">{user.email}</span>
                        </div>
                      ) : loading ? (
                        "Loading..."
                      ) : (
                        "You are not signed in"
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-800" />
                    {!user ? (
                      <DropdownMenuItem className="gap-2" onClick={() => setOpenSignIn(true)}>
                        <LogIn className="h-4 w-4" /> Sign in
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="gap-2" onClick={signOut}>
                        <LogOut className="h-4 w-4" /> Sign out
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-neutral-800" />
      </header>

      {/* Sign-in dialog */}
      <Dialog open={openSignIn} onOpenChange={setOpenSignIn}>
        <DialogContent className="sm:max-w-sm border-neutral-800 bg-neutral-950 text-neutral-200">
          <DialogHeader>
            <DialogTitle className="text-neutral-100">Sign in</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Enter your email to receive a magic link. We’ll return you to the app after confirmation.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!email.trim()) return
              sendMagicLink()
            }}
            className="space-y-3"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 border-neutral-700 text-neutral-100 placeholder:text-neutral-500"
                placeholder="you@example.com"
              />
              {sent && (
                <p className="font-mono text-[11px] text-emerald-400 mt-1">Magic link sent. Check your email.</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
                variant="outline"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send link"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
