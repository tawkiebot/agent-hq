import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

// Server-side Supabase client for actions/route handlers
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    throw new Error(
      "Supabase server client not configured: missing SUPABASE_URL/SUPABASE_ANON_KEY (or NEXT_PUBLIC_* fallback).",
    )
  }

  const cookieStore = cookies()

  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // Some contexts may not allow setting cookies; ignore gracefully.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch {}
      },
    },
  })
}
