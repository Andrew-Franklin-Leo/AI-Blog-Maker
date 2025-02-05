import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OPENROUTER_API_KEY = process.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('Error: VITE_OPENROUTER_API_KEY not found in environment variables');
  process.exit(1);
}

const testOpenRouter = async () => {
  try {
    console.log('Testing OpenRouter API connection...');
    const requestBody = {
      model: "deepseek/deepseek-r1:free",
      messages: [{
        role: "user",
        content: "Say hello"
      }]
    };

    console.log('\nRequest Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('\nResponse Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers));

    const text = await response.text();
    console.log('\nRaw Response:', text);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    try {
      const data = JSON.parse(text);
      console.log('\nParsed Response:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('\nFailed to parse response as JSON:', e.message);
    }

  } catch (error) {
    console.error('\nError:', error.message);
    if (error.response) {
      try {
        const text = await error.response.text();
        console.error('Error Response:', text);
      } catch (e) {
        console.error('Failed to read error response');
      }
    }
  }
};

console.log('Starting OpenRouter API test...\n');
testOpenRouter();