import { getSupabaseAdmin } from './supabaseAdmin'

export async function getSubscriptionForUser(profileId: string) {
  if (!profileId) return null
  const supabaseAdmin = getSupabaseAdmin()
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('profile_id', profileId)
    .order('current_period_end', { ascending: false })
    .limit(1)
    .single()

  if (error) return null
  return data
}

export default getSubscriptionForUser
