import { describe, it, expect } from 'vitest';
import { formatMarkdown, stripMarkdown } from './markdown';

describe('formatMarkdown', () => {
  it('converts markdown to HTML', () => {
    const markdown = '# Hello\n\nThis is **bold** and *italic* text.';
    const result = formatMarkdown(markdown);
    
    expect(result).toContain('<h1>Hello</h1>');
    expect(result).toContain('<strong>bold</strong>');
    expect(result).toContain('<em>italic</em>');
  });

  it('sanitizes HTML in markdown', () => {
    const markdown = '# Title\n\n<script>alert("xss")</script>';
    const result = formatMarkdown(markdown);
    
    expect(result).toContain('<h1>Title</h1>');
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert');
  });

  it('handles empty input', () => {
    const result = formatMarkdown('');
    expect(result).toBe('');
  });

  it('preserves safe HTML elements', () => {
    const markdown = '# Title\n\n<a href="https://example.com">Link</a>';
    const result = formatMarkdown(markdown);
    
    expect(result).toContain('<h1>Title</h1>');
    expect(result).toContain('<a href="https://example.com">Link</a>');
  });
});

describe('stripMarkdown', () => {
  it('removes markdown syntax', () => {
    const markdown = '# Hello\n\nThis is **bold** and *italic* text.';
    const result = stripMarkdown(markdown);
    
    expect(result).toBe('Hello This is bold and italic text.');
  });

  it('handles empty input', () => {
    const result = stripMarkdown('');
    expect(result).toBe('');
  });

  it('removes multiple markdown elements', () => {
    const markdown = '# Title\n## Subtitle\n* List item\n> Quote\n`code`';
    const result = stripMarkdown(markdown);
    
    expect(result).toBe('Title Subtitle List item Quote code');
  });

  it('preserves non-markdown text', () => {
    const text = 'Just regular text without any markdown.';
    const result = stripMarkdown(text);
    
    expect(result).toBe(text);
  });
});