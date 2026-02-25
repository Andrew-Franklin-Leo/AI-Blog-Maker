export const formatToMarkdown = (title: string, content: string): string => {
  // Remove any existing markdown headers and dividers
  let formatted = content
    .replace(/^#{1,6}\s/gm, '')
    .replace(/^---+$/gm, '')
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines

  // Split content into sections based on numbered points or section titles
  const sections = formatted.split(/(?=\d\.\s|\b(?:The\s(?:Hook|Struggle|Lessons|Reflection|Advice|Beginning|Closing))\b)/i)

  // Format sections with proper markdown
  const formattedSections = sections.map(section => {
    section = section.trim()

    // Check if it's a numbered point
    if (/^\d\.\s/.test(section)) {
      return section // Keep the numbering as is
    }

    // Check if it's a section title
    const titleMatch = section.match(/^(The\s(?:Hook|Struggle|Lessons|Reflection|Advice|Beginning|Closing)):/i)
    if (titleMatch) {
      const [, title] = titleMatch
      return `## ${title}\n\n${section.replace(/^[^:]+:\s*/, '')}`
    }

    return section
  })

  // Combine sections with proper spacing
  let markdownContent = `# ${title}\n\n`
  markdownContent += formattedSections.join('\n\n')

  // Format lists
  markdownContent = markdownContent
    .replace(/(?:^|\n)[-•]\s+/gm, '\n- ') // Convert bullet points to markdown list items
    .replace(/(?:^|\n)(\d+)\.\s+/gm, '\n$1. ') // Format numbered lists

  // Format blockquotes
  markdownContent = markdownContent
    .replace(/(?:^|\n)[""]([^""]+)[""]/gm, '\n> $1') // Convert quoted text to blockquotes

  // Clean up spacing
  markdownContent = markdownContent
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .replace(/\s+$/gm, '') // Remove trailing spaces
    .trim()

  return markdownContent
}

export const parseMetadata = (content: string) => {
  const metadataRegex = /(?:tags|category|readTime):\s*([^\n]+)/gi
  const metadata = {
    tags: [] as string[],
    category: 'Personal Growth',
    readTime: 5
  }

  let match
  while ((match = metadataRegex.exec(content)) !== null) {
    const [full, value] = match
    if (full.toLowerCase().includes('tags')) {
      metadata.tags = value
        .replace(/[\[\]]/g, '')
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    } else if (full.toLowerCase().includes('category')) {
      metadata.category = value.trim()
    } else if (full.toLowerCase().includes('readtime')) {
      const time = parseInt(value)
      if (!isNaN(time)) {
        metadata.readTime = time
      }
    }
  }

  // Ensure we have at least one tag
  if (metadata.tags.length === 0) {
    metadata.tags = ['personal']
  }

  return metadata
}