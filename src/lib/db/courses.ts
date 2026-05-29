import { createServerSupabase } from '@/lib/supabase'

export async function getCourses(query: { published?: boolean; limit?: number } = {}) {
  const supabase = await createServerSupabase()

  let dbQuery = supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (query.published !== undefined) dbQuery = dbQuery.eq('published', query.published)
  if (query.limit) dbQuery = dbQuery.limit(query.limit)

  const { data, error } = await dbQuery

  if (error) {
    console.error('Failed to fetch courses:', error)
    return []
  }

  return data || []
}

export async function getCourseBySlug(slug: string) {
  const supabase = await createServerSupabase()

  const { data } = await supabase
    .from('courses')
    .select('*, chapters:course_chapters(*)')
    .eq('slug', slug)
    .single()

  return data
}
