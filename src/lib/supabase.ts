import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface BlogPost {
  id: string
  title: string
  content: string
  created_at: string
  metadata: {
    tags: string[]
    category: string
    readTime: number
  }
}

export const getPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    throw error
  }

  return data || []
}

export const getPost = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    throw error
  }

  return data
}

export const createPost = async (
  title: string,
  content: string,
  metadata: BlogPost['metadata']
): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title,
        content,
        metadata
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw error
  }

  return data
}

export const updatePost = async (
  id: string,
  updates: Partial<Omit<BlogPost, 'id' | 'created_at'>>
): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    throw error
  }

  return data
}

export const deletePost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: Error) => {
  // You can customize error handling here
  console.error('Supabase error:', error)
  throw new Error('Database operation failed. Please try again.')
}