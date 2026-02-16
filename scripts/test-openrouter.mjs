/* global process */
/* eslint-env node */
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const API_KEY = process.env.VITE_OPENROUTER_API_KEY;

if (!API_KEY) {
  console.error('Error: VITE_OPENROUTER_API_KEY is not set in .env');
  process.exit(1);
}

async function testOpenRouter() {
  console.log('Testing OpenRouter connection...');

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Li Xia Blog Test',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-pro-1.5-exp-0801:free',
        messages: [
          { role: 'user', content: 'Say hello in one word.' }
        ]
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Success! Response from AI:', data.choices[0].message.content);
    } else {
      console.error('API Error:', data.error || data);
    }
  } catch (error) {
    console.error('Network Error:', error.message);
  }
}

testOpenRouter();
