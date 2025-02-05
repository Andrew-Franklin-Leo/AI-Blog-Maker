/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase Configuration
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  
  // OpenRouter Configuration
  readonly VITE_OPENROUTER_API_KEY: string
  
  // API Rate Limiting (optional)
  readonly VITE_API_RATE_LIMIT?: string
  readonly VITE_API_RATE_WINDOW?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Validate environment variables at runtime
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_OPENROUTER_API_KEY'
] as const

const validateEnv = () => {
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName])
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  // Validate URL format
  try {
    new URL(import.meta.env.VITE_SUPABASE_URL)
  } catch {
    throw new Error('VITE_SUPABASE_URL must be a valid URL')
  }

  // Validate API key formats
  if (!/^[A-Za-z0-9-_]+$/.test(import.meta.env.VITE_SUPABASE_ANON_KEY)) {
    throw new Error('VITE_SUPABASE_ANON_KEY has invalid format')
  }

  if (!/^sk-or-v1-[A-Za-z0-9]+$/.test(import.meta.env.VITE_OPENROUTER_API_KEY)) {
    throw new Error('VITE_OPENROUTER_API_KEY has invalid format')
  }

  // Validate optional rate limiting values
  if (import.meta.env.VITE_API_RATE_LIMIT) {
    const limit = parseInt(import.meta.env.VITE_API_RATE_LIMIT)
    if (isNaN(limit) || limit < 1) {
      throw new Error('VITE_API_RATE_LIMIT must be a positive number')
    }
  }

  if (import.meta.env.VITE_API_RATE_WINDOW) {
    const window = parseInt(import.meta.env.VITE_API_RATE_WINDOW)
    if (isNaN(window) || window < 1) {
      throw new Error('VITE_API_RATE_WINDOW must be a positive number')
    }
  }
}

// Run validation when the app starts
validateEnv()