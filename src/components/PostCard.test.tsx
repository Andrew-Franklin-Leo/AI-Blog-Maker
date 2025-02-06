import { describe, it, expect } from 'vitest';
import { render, mockPost } from '../test/test-utils';
import PostCard from './PostCard';
import { formatDate } from '../utils/date';

describe('PostCard', () => {
  it('renders post information correctly', () => {
    const { getByText, getByRole } = render(
      <PostCard post={mockPost} />
    );

    // Check title is rendered as a link
    const titleLink = getByRole('link', { name: mockPost.title });
    expect(titleLink).toHaveAttribute('href', `/post/${mockPost.id}`);

    // Check content preview is rendered
    expect(getByText(mockPost.content)).toBeInTheDocument();

    // Check author is rendered
    expect(getByText(`By ${mockPost.author}`)).toBeInTheDocument();

    // Check date is rendered
    const formattedDate = formatDate(mockPost.created_at);
    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  it('truncates long content', () => {
    const longPost = {
      ...mockPost,
      content: 'A'.repeat(300) // Create long content
    };

    const { getByTestId } = render(
      <PostCard post={longPost} />
    );

    // Content should be truncated to 200 characters + ...
    const contentElement = getByTestId('post-content');
    expect(contentElement.textContent?.length).toBeLessThanOrEqual(203); // 200 + 3 for ...
    expect(contentElement.textContent?.endsWith('...')).toBe(true);
  });

  it('handles empty content gracefully', () => {
    const emptyPost = {
      ...mockPost,
      content: ''
    };

    const { getByTestId } = render(
      <PostCard post={emptyPost} />
    );

    // Should show a placeholder message
    expect(getByTestId('post-content')).toHaveTextContent('No content available');
  });

  it('displays post status when unpublished', () => {
    const draftPost = {
      ...mockPost,
      is_published: false
    };

    const { getByText } = render(
      <PostCard post={draftPost} />
    );

    expect(getByText('Draft')).toBeInTheDocument();
  });
});