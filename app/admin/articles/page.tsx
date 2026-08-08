import { createServerClient } from '@/src/admin/lib/supabase-server'
import Link from 'next/link'
import { Plus, Search, Eye, Edit, Trash2, FileText, CheckCircle } from 'lucide-react'
import ArticleListClient from './ArticleListClient'

export const revalidate = 0

export default async function ArticlesListPage() {
  let articles: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    articles = data || []
  } catch (err) {
    console.error('Error fetching articles:', err)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#c3c4c7] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327]">Articles</h1>
          <p className="text-xs text-[#646970] mt-0.5">
            Gérez les publications et actualités de votre site
          </p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-2 rounded-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter un article</span>
        </Link>
      </div>

      {/* Client List component with status tabs & search */}
      <ArticleListClient initialArticles={articles} />
    </div>
  )
}
