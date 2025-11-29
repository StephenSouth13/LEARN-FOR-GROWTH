// lib/supabase-server.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required for server client.')
}

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set(name, value, options)
        } catch (error) {
          // Thao tác thất bại nếu gọi trong Server Component
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set(name, '', options)
        } catch (error) {
          // Xóa cookies thất bại nếu gọi trong Server Component
        }
      },
    },
  })
}