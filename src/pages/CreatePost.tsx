import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateBlogPost, analyzeContent } from '../lib/openrouter'
import { createPost } from '../lib/supabase'
import { useToast } from '../components/ui/Toaster'
import { formatToMarkdown } from '../utils/markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PostData {
  title: string
  content: string
  metadata: {
    tags: string[]
    category: string
    readTime: number
  }
}

const CreatePost = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    metadata: {
      tags: [],
      category: '',
      readTime: 0
    }
  })

  const generatePost = async () => {
    if (!postData.title) {
      addToast('Please enter a title first', 'error')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const content = await generateBlogPost(postData.title)
      console.log('Raw content:', content)

      const markdownContent = formatToMarkdown(postData.title, content)
      console.log('Formatted content:', markdownContent)

      const metadata = await analyzeContent(markdownContent)
      console.log('Content metadata:', metadata)

      setPostData(prev => ({
        ...prev,
        content: markdownContent,
        metadata
      }))
      
      addToast('Content generated successfully', 'success')
    } catch (error) {
      console.error('Error in content generation:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      addToast(`Failed to generate content: ${errorMessage}`, 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!postData.content) {
      addToast('Please generate or enter content first', 'error')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      await createPost(
        postData.title,
        postData.content,
        postData.metadata
      )
      
      addToast('Post saved successfully', 'success')
      navigate('/')
    } catch (error) {
      console.error('Error saving post:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      addToast(`Failed to save post: ${errorMessage}`, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Blog Post
      </h1>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-500">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={postData.title}
            onChange={(e) =>
              setPostData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="input-field mt-1"
            placeholder="Enter your post title"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={generatePost}
            disabled={!postData.title || isGenerating}
            className={`btn-primary ${
              isGenerating || !postData.title ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Generating...
              </div>
            ) : (
              <>
                <span className="mr-2">✨</span>
                Generate with AI
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>

        {postData.content && (
          <>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Content (Markdown)
                </label>
                <textarea
                  id="content"
                  value={postData.content}
                  onChange={(e) =>
                    setPostData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="input-field font-mono"
                  rows={10}
                  placeholder="Your post content will appear here"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preview
                </label>
                <div className="prose dark:prose-dark max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {postData.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                {postData.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {postData.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSaving}
                className={`btn-primary ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <span className="mr-2">📝</span>
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default CreatePost