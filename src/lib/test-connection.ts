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

const testConnection = async () => {
  try {
    // Try to query the posts table
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Database error:', error)
      if (error.message.includes('relation "posts" does not exist')) {
        console.error('\nThe posts table does not exist. Please create it using the SQL commands from database-setup.md')
      }
      throw error
    }

    console.log('✅ Connection successful!')
    console.log('Retrieved data:', data)
    return true
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    return false
  }
}

// Run the test
console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
testConnection()
  .then((success) => {
    if (!success) {
      console.log('\nPlease check:')
      console.log('1. Your Supabase credentials in .env are correct')
      console.log('2. The database tables are set up correctly (see database-setup.md)')
      console.log('3. Your Supabase project is running')
    }
  })
  .catch((error) => {
    console.error('Unexpected error:', error)
  })