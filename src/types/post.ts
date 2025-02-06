export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  author: string;
  ai_generated: boolean;
  ai_prompt?: string;
}