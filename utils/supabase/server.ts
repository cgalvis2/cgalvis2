import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ierfmeothkmjcdortdfu.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    throw new Error("Supabase configuration error")
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.delete(name)
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
