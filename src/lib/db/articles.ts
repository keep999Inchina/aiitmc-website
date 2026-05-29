/**
 * 文章数据访问层
 * 从 Supabase 查询，带兜底数据
 */

import { createServerSupabase } from '@/lib/supabase'

type ArticleQuery = {
  published?: boolean
  category?: string
  limit?: number
  is_premium?: boolean
}

export async function getArticles(query: ArticleQuery = {}) {
  const supabase = await createServerSupabase()

  let dbQuery = supabase
    .from('articles')
    .select('*, author:profiles(display_name, avatar_url)')
    .order('created_at', { ascending: false })

  if (query.published !== undefined) dbQuery = dbQuery.eq('published', query.published)
  if (query.category) dbQuery = dbQuery.eq('category', query.category)
  if (query.is_premium !== undefined) dbQuery = dbQuery.eq('is_premium', query.is_premium)
  if (query.limit) dbQuery = dbQuery.limit(query.limit)

  const { data, error } = await dbQuery

  if (error) {
    console.error('Failed to fetch articles:', error)
    return []
  }

  return data || []
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createServerSupabase()

  const { data, error } = await supabase
    .from('articles')
    .select('*, author:profiles(display_name, avatar_url)')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function getArticleCategories() {
  const supabase = await createServerSupabase()

  const { data } = await supabase
    .from('articles')
    .select('category')
    .eq('published', true)

  const categories = Array.from(new Set((data || []).map((a: any) => a.category)))
  return ['全部', ...categories]
}
