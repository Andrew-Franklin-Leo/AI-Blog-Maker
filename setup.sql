-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_title_idx ON public.posts(title);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow public read access to all posts
CREATE POLICY "Allow public read access"
  ON public.posts
  FOR SELECT
  USING (true);

-- Allow anyone to create posts (no auth required for demo)
CREATE POLICY "Allow public create access"
  ON public.posts
  FOR INSERT
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic updated_at
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert a test post
INSERT INTO public.posts (
  title,
  content,
  metadata
) VALUES (
  'Welcome to Li Xia''s Blog',
  'This is the first post on our blog platform. Welcome to this journey of authenticity and personal growth.',
  '{"tags": ["welcome", "introduction"], "category": "General", "readTime": 2}'::jsonb
);