const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set in environment variables')
}

interface OpenRouterResponse {
  id: string
  provider: string
  model: string
  object: string
  created: number
  choices: Array<{
    logprobs: null
    finish_reason: string
    native_finish_reason: string
    index: number
    message: {
      role: string
      content: string
      refusal: null
    }
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export const generateBlogPost = async (prompt: string): Promise<string> => {
  console.log('Generating blog post with prompt:', prompt)

  try {
    const requestBody = {
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: "You are a skilled writer helping to create authentic blog posts about personal growth and experiences."
        },
        {
          role: "user",
          content: `Write a blog post about ${prompt}. 
          This post should be authentic and personal, focusing on a journey of personal growth 
          and transparency. Include specific examples, emotional depth, and lessons learned 
          while maintaining a professional tone.

          Structure the post with:
          1. A compelling opening that hooks the reader
          2. Personal experiences and challenges faced
          3. Lessons learned and growth achieved
          4. Reflection on authenticity
          5. Advice for others in similar situations

          Write in a vulnerable yet professional tone.`
        }
      ]
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    console.log('API Response:', data);

    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    return content;
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
};

export const analyzeContent = async (content: string): Promise<{
  tags: string[]
  category: string
  readTime: number
}> => {
  try {
    const requestBody = {
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: "Analyze the blog post and extract metadata. Respond with ONLY a JSON object containing tags (array of 3-5 relevant keywords), category (general topic), and readTime (estimated minutes to read)."
        },
        {
          role: "user",
          content: content
        }
      ]
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    console.log('Analysis Response:', data);

    const analysisText = data.choices[0]?.message?.content;
    if (!analysisText) {
      throw new Error('No analysis generated');
    }

    try {
      // Try to parse the entire response as JSON
      const analysis = JSON.parse(analysisText.trim());
      return {
        tags: analysis.tags || ['personal'],
        category: analysis.category || 'Personal Growth',
        readTime: analysis.readTime || Math.ceil(content.split(' ').length / 200)
      };
    } catch (e) {
      console.error('Failed to parse analysis:', e);
      // Return default values if parsing fails
      return {
        tags: ['personal'],
        category: 'Personal Growth',
        readTime: Math.ceil(content.split(' ').length / 200)
      };
    }
  } catch (error) {
    console.error('Error analyzing content:', error);
    // Return default values if analysis fails
    return {
      tags: ['personal'],
      category: 'Personal Growth',
      readTime: Math.ceil(content.split(' ').length / 200)
    };
  }
};