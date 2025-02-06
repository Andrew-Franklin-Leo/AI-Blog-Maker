import { openRouter } from './openrouter';

export interface TestResult {
  success: boolean;
  error?: string;
}

export const testOpenRouter = async (): Promise<TestResult> => {
  try {
    const response = await openRouter.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: 'Test message. Please respond with "Connection successful!"',
        },
      ],
      temperature: 0,
      max_tokens: 10,
    });

    if (
      response &&
      response.choices &&
      response.choices[0]?.message?.content?.includes('Connection successful')
    ) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Unexpected response from OpenRouter',
      };
    }
  } catch (error) {
    console.error('OpenRouter test error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};