// lib/supabase-browser.ts
import { createBrowserClient } from '@supabase/ssr'

let supabase: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowser() {
  if (typeof window === 'undefined') {
    throw new Error('Supabase browser client can only be used in the browser.')
  }

  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL and Anon Key are required for browser client.')
    }

    supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }

  return supabase
}
