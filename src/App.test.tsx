import React from 'react';
import { render, screen } from './test/test-utils';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders navigation links', () => {
    render(<App />);
    
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Create Post')).toBeDefined();
    expect(screen.getByText('Test AI')).toBeDefined();
  });

  it('renders blog title', () => {
    render(<App />);
    expect(screen.getByText('Li Xia Blog')).toBeDefined();
  });
});