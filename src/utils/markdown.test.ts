import { describe, it, expect } from 'vitest';
import { parseMarkdown, renderMarkdown } from './markdown';

describe('markdown utils', () => {
  describe('parseMarkdown', () => {
    it('handles empty input', () => {
      expect(parseMarkdown('')).toBe('');
      expect(parseMarkdown(undefined as unknown as string)).toBe('');
    });

    it('strips HTML tags', () => {
      const input = '# Hello\n\nThis is a **bold** test';
      expect(parseMarkdown(input)).not.toContain('<');
      expect(parseMarkdown(input)).not.toContain('>');
    });

    it('preserves text content', () => {
      const input = '# Hello\n\nThis is a test';
      expect(parseMarkdown(input)).toContain('Hello');
      expect(parseMarkdown(input)).toContain('This is a test');
    });

    it('handles HTML entities', () => {
      const input = '&amp; &lt; &gt; &quot; &#039;';
      expect(parseMarkdown(input)).toBe('& < > " \'');
    });
  });

  describe('renderMarkdown', () => {
    it('handles empty input', () => {
      expect(renderMarkdown('')).toBe('');
      expect(renderMarkdown(undefined as unknown as string)).toBe('');
    });

    it('converts markdown to HTML', () => {
      const input = '# Hello\n\nThis is a **bold** test';
      const result = renderMarkdown(input);
      expect(result).toContain('<h1');
      expect(result).toContain('<strong');
    });

    it('preserves HTML entities', () => {
      const input = '& < > " \'';
      const result = renderMarkdown(input);
      expect(result).toContain('&amp;');
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
    });
  });
});