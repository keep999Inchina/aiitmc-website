'use client'

import PremiumGate from '@/components/auth/PremiumGate'

interface ArticleContentProps {
  content: string
  isPremium: boolean
  excerpt: string
}

export default function ArticleContent({ content, isPremium, excerpt }: ArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PremiumGate isPremium={isPremium}>
        {content ? (
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(content) }}
          />
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <p className="text-amber-800 text-sm font-medium">📝 内容建设中</p>
            <p className="text-amber-700 text-sm mt-1">
              这篇文章的完整内容正在整理中。配套课程视频已上线，可前往
              <a href="/courses" className="underline ml-1">课程页面</a>观看。
            </p>
          </div>
        )}
      </PremiumGate>
    </div>
  )
}

/**
 * Simple markdown-to-HTML converter for basic formatting.
 * For production, replace with next-mdx-remote or react-markdown rendering.
 */
function simpleMarkdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      if (cells.every(c => /^[-:\s]+$/.test(c))) return '' // separator row
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    })
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p>')
    // Single newline
    .replace(/\n/g, '<br/>')

  return `<p>${html}</p>`
}
