/* eslint-env node */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });

// eslint-disable-next-line no-undef
const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  // eslint-disable-next-line no-undef
  console.error('OPENROUTER_API_KEY environment variable is required');
  // eslint-disable-next-line no-undef
  process.exit(1);
}

async function testOpenRouter() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-site.com',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Hello! Can you help me test the OpenRouter API?'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // eslint-disable-next-line no-undef
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error('Error testing OpenRouter API:', error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

testOpenRouter();