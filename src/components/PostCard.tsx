import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { formatDate } from '../utils/date';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const previewText = post.content.slice(0, 200) + (post.content.length > 200 ? '...' : '');

  return (
    <article className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/post/${post.id}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          {post.title}
        </h2>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          {post.ai_generated && (
            <>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                AI Generated
              </span>
            </>
          )}
        </div>
        <p className="text-gray-600 line-clamp-3">{previewText}</p>
        <div className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
          Read more →
        </div>
      </Link>
    </article>
  );
};