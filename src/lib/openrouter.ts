import axios from 'axios';

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
      role: 'assistant';
    };
  }>;
}

if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
  throw new Error('Missing environment variable: VITE_OPENROUTER_API_KEY');
}

const openRouterClient = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const generateBlogPost = async (prompt: string): Promise<string> => {
  try {
    const response = await openRouterClient.post<OpenRouterResponse>('/chat/completions', {
      model: 'mistralai/mistral-7b-instruct', // Free model
      messages: [
        {
          role: 'system',
          content: 'You are a skilled writer helping to generate blog post content. Write in a natural, engaging style that connects with readers while maintaining authenticity and credibility.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || 'Failed to generate blog post content'
      );
    }
    throw error;
  }
};