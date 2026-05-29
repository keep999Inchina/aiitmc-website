import { createServerSupabase } from '@/lib/supabase'

export async function getLabItems(query: { published?: boolean } = {}) {
  const supabase = await createServerSupabase()
  let dbQuery = supabase.from('lab_items').select('*').order('created_at', { ascending: false })
  if (query.published !== undefined) dbQuery = dbQuery.eq('published', query.published)
  const { data, error } = await dbQuery
  if (error) { console.error('Failed to fetch lab items:', error); return [] }
  return data || []
}
