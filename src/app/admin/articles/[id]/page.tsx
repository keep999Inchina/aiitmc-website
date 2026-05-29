'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import ArticleForm from '@/components/admin/ArticleForm'

export default function EditArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id as string)
        .single()
      setArticle(data)
      setLoading(false)
    }
    load()
  }, [params.id])

  if (loading) {
    return <div className="animate-pulse h-96 bg-gray-100 rounded-xl" />
  }

  if (!article) {
    return <p className="text-gray-500">文章不存在</p>
  }

  return <ArticleForm initialData={article} isEditing />
}
