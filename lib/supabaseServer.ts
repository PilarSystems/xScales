import { cookies } from 'next/headers'
import { getSupabaseAdmin } from './supabaseAdmin'

// Server helper to get the current user (to call from server components).
// This reads the Supabase access token cookie and asks the Admin client
// for the user associated with that token. It is a pragmatic replacement
// for `createServerComponentClient` to avoid requiring the auth-helpers
// package exports that may vary across versions.
export async function getCurrentUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('sb-access-token')?.value || cookieStore.get('sb:token')?.value
  if (!token) return null

  const supabaseAdmin = getSupabaseAdmin()
  // supabaseAdmin.auth.getUser accepts an access token in some versions;
  // if the API changes, adapt here to the supabase-js admin auth lookup.
  try {
    // @ts-ignore - attempt to call getUser with access token
    const { data } = await (supabaseAdmin.auth.getUser as any)(token)
    return data?.user ?? null
  } catch (err) {
    return null
  }
}

export default getCurrentUser
