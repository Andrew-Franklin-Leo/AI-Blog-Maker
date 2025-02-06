interface OpenRouterChoice {
  message: {
    content: string;
  };
}

interface OpenRouterResponse {
  choices: OpenRouterChoice[];
}

export async function generateContent(title: string): Promise<OpenRouterResponse> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gryphe/mythomist-7b',
      messages: [
        {
          role: 'system',
          content: 'You are a creative writer assisting in blog post creation.'
        },
        {
          role: 'user',
          content: `Write a blog post with the title: ${title}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate content');
  }

  return response.json();
}