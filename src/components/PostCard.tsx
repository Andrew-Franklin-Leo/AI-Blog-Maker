import { Link } from 'react-router-dom';
import { formatDate } from '../utils/date';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  is_published: boolean;
}

interface PostCardProps {
  post: Post;
}

const MAX_CONTENT_LENGTH = 200;

export default function PostCard({ post }: PostCardProps) {
  const truncatedContent = post.content
    ? post.content.length > MAX_CONTENT_LENGTH
      ? `${post.content.slice(0, MAX_CONTENT_LENGTH)}...`
      : post.content
    : 'No content available';

  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <header className="mb-4">
        <Link 
          to={`/post/${post.id}`}
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          {post.title}
        </Link>
        <div className="flex items-center mt-2 text-gray-600 text-sm">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time>{formatDate(post.created_at)}</time>
          {!post.is_published && (
            <>
              <span className="mx-2">•</span>
              <span className="text-yellow-600 font-medium">Draft</span>
            </>
          )}
        </div>
      </header>
      <div 
        className="text-gray-700 mb-4"
        data-testid="post-content"
      >
        {truncatedContent}
      </div>
      <footer className="flex justify-end">
        <Link
          to={`/post/${post.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Read more →
        </Link>
      </footer>
    </article>
  );
}