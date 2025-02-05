import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Test that at least one heading exists in the app
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the main navigation', () => {
    render(<App />);
    // Test that the navigation exists
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });
});