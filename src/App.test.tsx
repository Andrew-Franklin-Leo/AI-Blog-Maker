import { describe, it, expect } from 'vitest';
import { render, screen } from './test/test-utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Test that the main heading exists
    const headingElement = screen.getByRole('heading', { 
      level: 1,
      name: /Blog Posts/i 
    });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the main navigation', () => {
    render(<App />);
    // Test that the navigation exists
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();

    // Test that important navigation links are present
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create/i })).toBeInTheDocument();
  });
});