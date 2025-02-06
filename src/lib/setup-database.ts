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

async function setupDatabase() {
  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseAnonKey as string
  );

  try {
    // Create tables
    const { error: createError } = await supabase.from('posts').upsert([
      {
        id: '1',
        title: 'Test Post',
        content: 'This is a test post.',
        author: 'Test Author',
        is_published: true,
      },
    ]);

    if (createError) {
      throw createError;
    }

    console.log('Successfully set up database!');
    const { data: posts } = await supabase.from('posts').select('*');
    console.log('Current posts:', posts);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();