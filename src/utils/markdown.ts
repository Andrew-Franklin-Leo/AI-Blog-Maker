import { marked } from 'marked';

export const parseMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  
  // Convert markdown to HTML
  const html = marked(markdown);
  
  // Strip HTML tags for preview text
  const strippedHtml = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decodedText = strippedHtml
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  return decodedText.trim();
};

export const renderMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  return marked(markdown);
};