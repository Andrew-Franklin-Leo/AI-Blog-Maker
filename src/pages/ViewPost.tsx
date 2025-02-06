import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../lib/toast';
import { useState, useEffect } from 'react';
import { formatDate } from '../utils/date';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Post } from '../types/post';

export default function ViewPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    fetchPost();
  }, [id]);

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
      showToast('Failed to load post', 'error');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showToast('Post deleted successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Failed to delete post', 'error');
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderContent = (content: string) => {
    const parser = new marked.Parser();
    const lexer = new marked.Lexer();
    const tokens = lexer.lex(content);
    const html = parser.parse(tokens);
    const sanitizedHtml = DOMPurify.sanitize(html);
    return { __html: sanitizedHtml };
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="prose lg:prose-xl">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-6 text-gray-600">
          <p>By {post.author}</p>
          <p>{formatDate(post.created_at)}</p>
        </div>
        <div 
          className="post-content"
          dangerouslySetInnerHTML={renderContent(post.content)}
        />
      </article>
      <div className="mt-6">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </button>
      </div>
    </div>
  );
}