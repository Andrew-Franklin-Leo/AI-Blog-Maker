# Database Setup Instructions

## Supabase Schema Setup

1. Create a new project in Supabase Dashboard
2. Navigate to the SQL Editor
3. Execute the following SQL commands:

```sql
-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create posts table
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL
);

-- Create RLS policies
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON public.posts
  FOR SELECT
  USING (true);

-- Allow anyone to create posts
CREATE POLICY "Allow public create access"
  ON public.posts
  FOR INSERT
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX posts_title_idx ON posts(title);
```

## Environment Configuration

1. Get your Supabase project URL and anon key from the project settings
2. Update your `.env` file with:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

## Database Schema Details

### Posts Table
- `id`: UUID primary key
- `title`: Text field for post title
- `content`: Text field for post content
- `created_at`: Timestamp for creation date
- `updated_at`: Timestamp for last update
- `metadata`: JSONB field for tags, category, and read time

### Security
- Row Level Security (RLS) enabled
- Public read access allowed
- Public create access allowed
- No update/delete policies by default

### Automated Features
- UUID generation for post IDs
- Automatic timestamps for created_at
- Trigger-based updates for updated_at
- Indexes for common queries

## Data Model

The posts table follows this structure:
```typescript
interface Post {
  id: string;          // UUID
  title: string;       // Post title
  content: string;     // Post content
  created_at: string;  // ISO timestamp
  updated_at: string;  // ISO timestamp
  metadata: {
    tags: string[];    // Array of tags
    category: string;  // Post category
    readTime: number;  // Estimated read time in minutes
  };
}
```

## Testing the Setup

After setting up the database:

1. Try inserting a test post:
```sql
INSERT INTO posts (title, content, metadata)
VALUES (
  'Test Post',
  'This is a test post content',
  '{"tags": ["test"], "category": "Testing", "readTime": 1}'::jsonb
);
```

2. Verify the post was created:
```sql
SELECT * FROM posts ORDER BY created_at DESC LIMIT 1;
```

## Next Steps

1. Create your Supabase project
2. Execute the schema SQL
3. Update environment variables
4. Test database connection
5. Start the application