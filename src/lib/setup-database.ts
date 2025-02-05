import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../../.env') })

// Get environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables:')
  if (!supabaseUrl) console.error('- VITE_SUPABASE_URL')
  if (!supabaseKey) console.error('- VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

const setupDatabase = async () => {
  try {
    console.log('Setting up database schema...')

    // Create posts table
    const { error: createTableError } = await supabase.rpc('setup_blog_schema', {
      schema_sql: `
        -- Create posts table
        CREATE TABLE IF NOT EXISTS public.posts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          metadata JSONB DEFAULT '{}'::jsonb NOT NULL
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at DESC);
        CREATE INDEX IF NOT EXISTS posts_title_idx ON public.posts(title);

        -- Enable RLS
        ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

        -- Create RLS policies
        DO $$
        BEGIN
          -- Drop existing policies if they exist
          DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
          DROP POLICY IF EXISTS "Allow public create access" ON public.posts;

          -- Create new policies
          CREATE POLICY "Allow public read access"
            ON public.posts
            FOR SELECT
            USING (true);

          CREATE POLICY "Allow public create access"
            ON public.posts
            FOR INSERT
            WITH CHECK (true);
        END
        $$;

        -- Create updated_at trigger
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Create trigger
        DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
        CREATE TRIGGER update_posts_updated_at
          BEFORE UPDATE ON posts
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
      `
    })

    if (createTableError) {
      console.error('Error creating schema:', createTableError)
      return false
    }

    // Insert test post
    const { error: insertError } = await supabase
      .from('posts')
      .insert({
        title: 'Test Post',
        content: 'This is a test post to verify the database setup.',
        metadata: {
          tags: ['test'],
          category: 'Setup',
          readTime: 1
        }
      })

    if (insertError) {
      console.error('Error inserting test post:', insertError)
      return false
    }

    console.log('✅ Database schema setup completed successfully!')
    console.log('✅ Test post created successfully!')
    return true
  } catch (error) {
    console.error('❌ Error setting up database:', error)
    return false
  }
}

// Run the setup
console.log('Starting database setup...')
setupDatabase()
  .then((success) => {
    if (!success) {
      console.log('\nPlease check:')
      console.log('1. Your Supabase credentials have the necessary permissions')
      console.log('2. Your Supabase project is running')
      console.log('3. The SQL syntax is compatible with your Supabase version')
    }
  })
  .catch((error) => {
    console.error('Unexpected error:', error)
  })