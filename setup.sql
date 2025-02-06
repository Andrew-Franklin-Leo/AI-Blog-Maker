-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_prompt TEXT
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access"
  ON posts
  FOR SELECT
  USING (true);

-- Allow authenticated insert access
CREATE POLICY "Allow authenticated insert access"
  ON posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authors to update their own posts
CREATE POLICY "Allow authors to update their own posts"
  ON posts
  FOR UPDATE
  USING (auth.uid()::text = author)
  WITH CHECK (auth.uid()::text = author);

-- Allow authors to delete their own posts
CREATE POLICY "Allow authors to delete their own posts"
  ON posts
  FOR DELETE
  USING (auth.uid()::text = author);

-- Create indexes
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts (created_at DESC);
CREATE INDEX IF NOT EXISTS posts_author_idx ON posts (author);