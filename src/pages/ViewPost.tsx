import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { supabase } from '../lib/supabase';
import { Post } from '../types/post';
import { formatDate } from '../utils/date';
import { useToast } from '../components/ui/hooks/useToast';

export const ViewPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        showToast({
          title: 'Error',
          description: 'Failed to load the blog post',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, showToast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
          {post.ai_generated && (
            <>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                AI Generated
              </span>
            </>
          )}
        </div>
      </header>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
      />

      {post.ai_generated && post.ai_prompt && (
        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">AI Prompt Used</h2>
          <p className="text-gray-600">{post.ai_prompt}</p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to All Posts
        </Link>
      </div>
    </article>
  );
};