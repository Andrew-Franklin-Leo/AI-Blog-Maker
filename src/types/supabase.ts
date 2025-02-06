export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
          author: string;
          is_published: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
          author: string;
          is_published?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
          author?: string;
          is_published?: boolean;
        };
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [key: string]: string[];
    };
  };
}