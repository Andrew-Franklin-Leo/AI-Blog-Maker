# Setup Guide

This guide will walk you through setting up the Li Xia Blog Platform locally and deploying it to production.

## Prerequisites

1. Node.js 18+ and npm
2. Supabase account
3. OpenRouter account
4. GitHub account (for deployment)

## Step 1: Supabase Setup

1. Create a new Supabase project:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Click "New Project"
   - Choose a name and password
   - Select the closest region

2. Get your credentials:
   - Go to Project Settings > API
   - Copy the `Project URL`
   - Copy the `anon` public API key

3. Set up the database:
   - Go to SQL Editor
   - Copy and paste the SQL from `database-setup.md`
   - Execute the SQL commands
   - Verify tables were created in Table Editor

## Step 2: OpenRouter Setup

1. Create an OpenRouter account:
   - Visit [OpenRouter](https://openrouter.ai)
   - Sign up for an account
   - Navigate to the API Keys section

2. Create an API key:
   - Create a new key with appropriate rate limits
   - Copy the API key for later use
   - Note: Only use free models for this project

## Step 3: Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd li-xia-blog
   ```

2. Create environment file:
   - Copy `.env.example` to `.env`
   - Update with your credentials:
     ```env
     VITE_SUPABASE_URL=your_project_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key
     ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Verify setup:
   - Open http://localhost:3000
   - Create a test post
   - Verify database connection
   - Test AI content generation

## Step 4: GitHub Pages Deployment

1. Create GitHub repository:
   - Create a new repository on GitHub
   - Push your code to the repository

2. Configure GitHub secrets:
   - Go to repository Settings > Secrets
   - Add the following secrets:
     ```
     VITE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY
     VITE_OPENROUTER_API_KEY
     ```

3. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Set source to GitHub Actions

4. Deploy:
   - Push to main branch
   - GitHub Actions will handle deployment
   - Site will be available at: https://<username>.github.io/<repository>

## Common Issues and Solutions

### Database Issues
1. Connection failures:
   - Check Supabase credentials
   - Verify database is active
   - Check RLS policies

2. Query errors:
   - Verify schema matches
   - Check data types
   - Review SQL syntax

### OpenRouter Issues
1. API errors:
   - Verify API key
   - Check rate limits
   - Confirm using free models

2. Content generation:
   - Review prompt formatting
   - Check response handling
   - Verify error handling

### Development Issues
1. Build failures:
   - Check Node.js version
   - Clear npm cache
   - Remove node_modules and reinstall

2. Runtime errors:
   - Check console for errors
   - Verify environment variables
   - Review component props

## Testing

1. Database tests:
   ```sql
   -- Test post creation
   INSERT INTO posts (title, content, metadata)
   VALUES (
     'Test Post',
     'Test content',
     '{"tags": ["test"], "category": "Test", "readTime": 1}'
   );

   -- Verify post
   SELECT * FROM posts ORDER BY created_at DESC LIMIT 1;
   ```

2. API tests:
   - Use browser console or Postman
   - Test CRUD operations
   - Verify error handling

## Maintenance

1. Regular tasks:
   - Update dependencies
   - Monitor error logs
   - Check performance metrics
   - Review security updates

2. Backup:
   - Enable Supabase backups
   - Download local backups
   - Document recovery process

## Support

- Review documentation in `/docs`
- Check GitHub issues
- Contact maintainers

## Next Steps

1. Complete database setup
2. Configure environment variables
3. Test local development
4. Deploy to GitHub Pages
5. Monitor application
6. Add content