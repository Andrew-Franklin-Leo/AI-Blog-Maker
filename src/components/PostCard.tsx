import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PostCardProps {
  id: string
  title: string
  content: string
  created_at: string
  metadata: {
    tags: string[]
    category: string
    readTime: number
  }
}

const PostCard = ({ id, title, content, created_at, metadata }: PostCardProps) => {
  // Get the first paragraph of content for the preview
  const previewContent = content
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .slice(0, 2)
    .join('\n')

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/post/${id}`} className="block h-full">
        <div className="p-6">
          <header className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2">
              {title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={created_at}>
                {new Date(created_at).toLocaleDateString()}
              </time>
              <span>•</span>
              <span>{metadata.readTime} min read</span>
              <span>•</span>
              <span>{metadata.category}</span>
            </div>
          </header>

          <div className="prose dark:prose-dark max-w-none line-clamp-3 mb-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {previewContent}
            </ReactMarkdown>
          </div>

          {metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
            Read more →
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostCard