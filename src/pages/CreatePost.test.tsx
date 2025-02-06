import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { CreatePost } from './CreatePost';
import { generateContent } from '../lib/openrouter';
import { supabase } from '../lib/supabase';

// Mock the modules
vi.mock('../lib/openrouter', () => ({
  generateContent: vi.fn(),
}));

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(),
    })),
  },
}));

describe('CreatePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the create post form', () => {
    render(<CreatePost />);
    expect(screen.getByLabelText(/title/i)).toBeDefined();
    expect(screen.getByLabelText(/ai prompt/i)).toBeDefined();
    expect(screen.getByLabelText(/content/i)).toBeDefined();
  });

  it('generates content when clicking generate button', async () => {
    const mockContent = 'Generated blog post content';
    (generateContent as ReturnType<typeof vi.fn>).mockResolvedValue(mockContent);

    render(<CreatePost />);
    
    const promptInput = screen.getByLabelText(/ai prompt/i);
    fireEvent.change(promptInput, { target: { value: 'Test prompt' } });

    const generateButton = screen.getByText(/generate content/i);
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(generateContent).toHaveBeenCalledWith('Test prompt');
      expect(screen.getByLabelText(/content/i)).toHaveValue(mockContent);
    });
  });

  it('creates a post when submitting the form', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
      insert: mockInsert,
    });

    render(<CreatePost />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    });

    const submitButton = screen.getByText(/create post/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith({
        title: 'Test Title',
        content: 'Test Content',
        author: 'Li Xia',
      });
    });
  });

  it('shows error message when post creation fails', async () => {
    const mockError = new Error('Failed to create post');
    const mockInsert = vi.fn().mockResolvedValue({ error: mockError });
    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
      insert: mockInsert,
    });

    render(<CreatePost />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    });

    const submitButton = screen.getByText(/create post/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/failed to create post/i)).toBeDefined();
    });
  });
});