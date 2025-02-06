import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateBlogPost } from '../lib/openrouter';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/hooks/useToast';

export const TestAI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      showToast({
        title: 'Error',
        description: 'Please enter a prompt for the blog post',
        type: 'error',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const content = await generateBlogPost(prompt);
      const title = prompt.length > 50 ? `${prompt.slice(0, 47)}...` : prompt;

      const { data, error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          author: 'Li Xia',
          ai_generated: true,
          ai_prompt: prompt,
        })
        .select()
        .single();

      if (error) throw error;

      showToast({
        title: 'Success',
        description: 'Blog post generated and saved successfully',
        type: 'success',
      });

      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error('Error generating blog post:', error);
      showToast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate blog post',
        type: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Blog Generator</h1>
        <p className="text-gray-600">
          Describe the type of blog post you want to generate. Be specific about the topic,
          tone, and key points you want to include.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Blog Post Prompt
          </label>
          <textarea
            id="prompt"
            rows={6}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Write a blog post about..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isGenerating}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isGenerating && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="loading-spinner mr-2" />
                Generating...
              </>
            ) : (
              'Generate Blog Post'
            )}
          </button>
          {isGenerating && (
            <p className="text-sm text-gray-500">
              This might take a minute...
            </p>
          )}
        </div>
      </form>

      <div className="mt-12 prose max-w-none">
        <h2 className="text-xl font-semibold mb-4">Tips for Better Results</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be specific about the topic and key points you want to cover</li>
          <li>Mention the desired tone (professional, casual, technical, etc.)</li>
          <li>Include any specific examples or case studies you want to reference</li>
          <li>Specify the target audience and their level of expertise</li>
          <li>Mention any specific formatting preferences</li>
        </ul>
      </div>
    </div>
  );
};