/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_OPENROUTER_API_KEY: string;
  readonly NODE_ENV: 'development' | 'production' | 'test';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare module '@heroicons/*' {
  const content: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}