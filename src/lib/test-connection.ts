import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { Database } from '../types/supabase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../../.env') });

// Get environment variables
const supabaseUrl = process.env['VITE_SUPABASE_URL'];
const supabaseAnonKey = process.env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

async function testConnection() {
  // Now TypeScript knows these are definitely strings
  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseAnonKey as string
  );

  try {
    const { data, error } = await supabase.from('posts').select('*').limit(1);

    if (error) {
      throw error;
    }

    console.log('Successfully connected to Supabase!');
    console.log('Sample data:', data);
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    process.exit(1);
  }
}

testConnection();