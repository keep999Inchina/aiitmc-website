import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  name: string
  subtitle: string | null
  description: string | null
  price: string | null
  price_note: string | null
  image: string | null
  icon: string
  color: string
  tags: string[]
  features: string[]
  buy_url: string | null
  status: 'available' | 'inquiry'
  category: string
  published: boolean
  created_at: string
  updated_at: string
}

export async function getProducts(options?: {
  published?: boolean
  category?: string
}) {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (options?.published !== undefined) {
    query = query.eq('published', options.published)
  }
  if (options?.category) {
    query = query.eq('category', options.category)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return (data as Product[]) || []
}

export async function getProductById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  return data as Product | null
}
