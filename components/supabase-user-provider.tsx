"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client"

export type SupaUser = {
  id: string
  email?: string
  name?: string
  avatarUrl?: string
}

type SupabaseUserContextValue = {
  user: SupaUser | null
  accessToken: string | null
  loading: boolean
  isConfigured: boolean
}

const SupabaseUserContext = createContext<SupabaseUserContextValue | null>(null)

export function SupabaseUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupaUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const isConfigured = isSupabaseConfigured()

  useEffect(() => {
    // If Supabase isn't configured, just set loading to false and return
    if (!isConfigured) {
      setLoading(false)
      return
    }

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setLoading(false)
      return
    }
    
    let mounted = true

    async function load() {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      setSessionState(data.session)
      setLoading(false)
    }

    function setSessionState(session: any) {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? undefined,
          name: (session.user.user_metadata?.name as string | undefined) || undefined,
          avatarUrl: (session.user.user_metadata?.avatar_url as string | undefined) || undefined,
        })
        setAccessToken(session.access_token ?? null)
      } else {
        setUser(null)
        setAccessToken(null)
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionState(session)
    })

    load()
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [isConfigured])

  const value = useMemo(() => ({ user, accessToken, loading, isConfigured }), [user, accessToken, loading, isConfigured])

  return <SupabaseUserContext.Provider value={value}>{children}</SupabaseUserContext.Provider>
}

export function useSupabaseUser() {
  const ctx = useContext(SupabaseUserContext)
  if (!ctx) return { user: null, accessToken: null, loading: false, isConfigured: false } as SupabaseUserContextValue
  return ctx
}
