"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let browserClient: SupabaseClient | null = null

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && anon && url !== 'https://your-project.supabase.co' && anon !== 'your-anon-key-here')
}

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!isSupabaseConfigured()) {
    // Return a mock client that won't crash the app
    console.info("Supabase not configured - authentication features disabled")
    // Create a minimal mock that prevents crashes
    return null
  }
  
  browserClient = createClient(url!, anon!)
  return browserClient
}
