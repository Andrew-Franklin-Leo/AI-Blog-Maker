import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from './test/test-utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    // Wait for any async state updates to complete
    await waitFor(() => {
      // Test that the main heading exists
      const headingElement = screen.getByRole('heading', {
        level: 1,
        name: /Blog Posts/i
      });
      expect(headingElement).toBeInTheDocument();
    });
  });

  it('renders the main navigation', async () => {
    render(<App />);
    // Wait for any async state updates to complete
    await waitFor(() => {
      // Test that the navigation exists
      const navElement = screen.getByRole('navigation');
      expect(navElement).toBeInTheDocument();

      // Test that important navigation links are present
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /create/i })).toBeInTheDocument();
    });
  });

  it('contains a skip to content link and main content area', async () => {
    render(<App />);

    // Check for skip link
    const skipLink = screen.getByRole('link', { name: /skip to content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveClass('sr-only');

    // Check for main content area
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('id', 'main-content');
    expect(mainContent).toHaveAttribute('tabIndex', '-1');
  });
});
