import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function formatMarkdown(markdown: string): string {
  const rawHtml = marked.parse(markdown);
  return DOMPurify.sanitize(rawHtml as string);
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/[#*_`~]/g, '')           // Remove markdown symbols
    .replace(/\n{2,}/g, ' ')           // Replace multiple newlines with space
    .replace(/\n/g, ' ')               // Replace single newlines with space
    .replace(/>/g, '')                 // Remove blockquote symbols
    .replace(/\s+/g, ' ')              // Replace multiple spaces with single space
    .trim();                           // Remove leading/trailing whitespace
}