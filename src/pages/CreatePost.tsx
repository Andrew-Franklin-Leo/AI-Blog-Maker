import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/hooks/useToast';

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast({
        title: 'Error',
        description: 'Please fill in both title and content',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          author: 'Li Xia',
          ai_generated: false,
        })
        .select()
        .single();

      if (error) throw error;

      showToast({
        title: 'Success',
        description: 'Blog post created successfully',
        type: 'success',
      });

      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      showToast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create blog post',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Write a Blog Post</h1>
        <p className="text-gray-600">
          Share your thoughts, experiences, and insights with the world.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={12}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Write your blog post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
          <p className="mt-2 text-sm text-gray-500">
            Markdown formatting is supported.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner mr-2" />
                Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </button>
          {isSubmitting && (
            <p className="text-sm text-gray-500">
              Publishing your post...
            </p>
          )}
        </div>
      </form>

      <div className="mt-12 prose max-w-none">
        <h2 className="text-xl font-semibold mb-4">Writing Tips</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Start with a strong opening that hooks the reader</li>
          <li>Break your content into clear, logical sections</li>
          <li>Use examples and personal experiences to illustrate your points</li>
          <li>Keep paragraphs concise and focused</li>
          <li>End with a conclusion that ties everything together</li>
        </ul>
      </div>
    </div>
  );
};