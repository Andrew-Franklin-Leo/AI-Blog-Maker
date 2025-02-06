// Set up test environment variables
process.env = {
  ...process.env,
  ['VITE_SUPABASE_URL']: 'https://test-supabase-url.com',
  ['VITE_SUPABASE_ANON_KEY']: 'test-anon-key',
  ['VITE_OPENROUTER_API_KEY']: 'test-openrouter-key',
  ['NODE_ENV']: 'test'
};