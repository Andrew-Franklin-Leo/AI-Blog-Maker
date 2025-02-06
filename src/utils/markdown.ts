import sanitizeHtml from 'sanitize-html';

export function formatMarkdown(markdown: string): string {
  const formatted = markdown
    .replace(/^#\s+/gm, '### ') // Convert h1 to h3
    .replace(/^##\s+/gm, '#### ') // Convert h2 to h4
    .replace(/^###(?!#)\s+/gm, '##### ') // Convert h3 to h5
    .replace(/^\*\s+/gm, '• ') // Convert asterisk lists to bullet points
    .replace(/^-\s+/gm, '• ') // Convert dash lists to bullet points
    .replace(/^>\s+/gm, '❝ ') // Convert blockquotes
    .replace(/`([^`]+)`/g, '『$1』') // Convert inline code
    .replace(/\*\*([^*]+)\*\*/g, '「$1」') // Convert bold
    .replace(/\*([^*]+)\*/g, '『$1』') // Convert italics
    .replace(/~~([^~]+)~~/g, '＿$1＿') // Convert strikethrough
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1［$2］') // Convert links
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '📷 $1［$2］') // Convert images
    .replace(/^```[\s\S]*?```$/gm, match => // Handle code blocks
      match
        .replace(/^```.*$/m, '【Code:】')
        .replace(/^```$/m, '【End Code】')
    );

  // Sanitize HTML
  return sanitizeHtml(formatted, {
    allowedTags: [],
    allowedAttributes: {}
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/^\*.*$/gm, '') // Remove lists
    .replace(/^-.*$/gm, '') // Remove dash lists
    .replace(/^>.*$/gm, '') // Remove blockquotes
    .replace(/`.*`/g, '') // Remove inline code
    .replace(/\*\*.*\*\*/g, '') // Remove bold
    .replace(/\*.*\*/g, '') // Remove italics
    .replace(/~~.*~~/g, '') // Remove strikethrough
    .replace(/\[.*\]\(.*\)/g, '') // Remove links
    .replace(/!\[.*\]\(.*\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function isValidMarkdown(text: string): boolean {
  const patterns = [
    /^#{1,6}\s/, // Headers
    /^\s*[-*+]\s/, // Lists
    /^\s*\d+\.\s/, // Numbered lists
    /^\s*>\s/, // Blockquotes
    /\[([^\]]*)\]\(([^)]*)\)/, // Links
    /!\[([^\]]*)\]\(([^)]*)\)/, // Images
    /`[^`]*`/, // Inline code
    /```[\s\S]*?```/, // Code blocks
    /\*\*[^*]*\*\*/, // Bold
    /\*[^*]*\*/, // Italic
    /~~[^~]*~~/ // Strikethrough
  ];

  return patterns.some(pattern => pattern.test(text));
}

export function extractMetadata(markdown: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  const lines = markdown.split('\n');
  let inMetadata = false;

  for (const line of lines) {
    if (line.trim() === '---') {
      if (!inMetadata) {
        inMetadata = true;
        continue;
      } else {
        break;
      }
    }

    if (inMetadata) {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        metadata[match[1]] = match[2];
      }
    }
  }

  return metadata;
}