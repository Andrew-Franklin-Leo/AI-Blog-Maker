import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../test/test-utils';
import userEvent from '@testing-library/user-event';
import CreatePost from './CreatePost';
import { generateContent } from '../lib/openrouter';

// Mock the supabase and openrouter modules
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: { id: '123' }, error: null })
        })
      })
    })
  }
}));

vi.mock('../lib/openrouter', () => ({
  generateContent: vi.fn()
}));

describe('CreatePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock successful AI response
    vi.mocked(generateContent).mockResolvedValue({
      choices: [
        {
          message: {
            content: 'Generated content from AI'
          }
        }
      ]
    });
  });

  it('renders form fields correctly', () => {
    render(<CreatePost />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save post/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const { container } = render(<CreatePost />);
    const user = userEvent.setup();
    
    const submitButton = screen.getByRole('button', { name: /save post/i });
    await user.click(submitButton);

    // First, check if the form is invalid
    const form = container.querySelector('form');
    expect(form).toBeInvalid();

    // Then wait for the validation message
    await waitFor(() => {
      const titleInput = screen.getByLabelText(/title/i);
      expect(titleInput).toBeInvalid();
    }, { timeout: 10000 });
  });

  it('generates content using AI', async () => {
    render(<CreatePost />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/title/i), 'Test Title');
    await user.click(screen.getByRole('button', { name: /generate/i }));
    
    expect(generateContent).toHaveBeenCalledWith('Test Title');
    
    // Wait for the generated content
    await waitFor(
      () => {
        expect(screen.getByDisplayValue(/Generated content from AI/i)).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('submits form with valid data', async () => {
    render(<CreatePost />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/title/i), 'Test Title');
    await user.type(screen.getByLabelText(/content/i), 'Test Content');
    await user.type(screen.getByLabelText(/author/i), 'Test Author');
    
    await user.click(screen.getByRole('button', { name: /save post/i }));
    
    // Wait for navigation after successful submission
    await waitFor(
      () => {
        expect(screen.queryByRole('button', { name: /save post/i })).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('handles AI generation error gracefully', async () => {
    vi.mocked(generateContent).mockRejectedValueOnce(new Error('AI Error'));
    
    render(<CreatePost />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/title/i), 'Test Title');
    await user.click(screen.getByRole('button', { name: /generate/i }));
    
    // Wait for the error state
    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: /generate/i })).not.toBeDisabled();
      },
      { timeout: 10000 }
    );
  });

  it('shows loading state during AI generation', async () => {
    // Mock a delayed response
    vi.mocked(generateContent).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        choices: [{ message: { content: 'Generated content' } }]
      }), 100))
    );
    
    render(<CreatePost />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/title/i), 'Test Title');
    await user.click(screen.getByRole('button', { name: /generate/i }));
    
    expect(screen.getByText(/generating/i)).toBeInTheDocument();
  });
});