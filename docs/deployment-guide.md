# Deployment Guide

## Environment Variables

The following environment variables must be set before deploying the application:

### Required Variables
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENROUTER_API_KEY=your-openrouter-api-key
```

## Security Checklist

1. Environment Configuration
   - [ ] Create `.env` file locally
   - [ ] Add all required environment variables
   - [ ] Verify `.env` is in `.gitignore`
   - [ ] Create `.env.example` with placeholder values

2. Repository Security
   - [ ] Review all files for hardcoded credentials
   - [ ] Check commit history for sensitive data
   - [ ] Set up branch protection rules
   - [ ] Configure repository secrets in GitHub

3. Application Security
   - [ ] Validate environment variables on startup
   - [ ] Implement rate limiting for AI endpoints
   - [ ] Add error boundaries for component failures
   - [ ] Sanitize markdown content

4. API Security
   - [ ] Verify Supabase RLS policies
   - [ ] Configure CORS for production domain
   - [ ] Set up API key rotation schedule
   - [ ] Monitor API usage and costs

## Deployment Steps

1. Environment Setup
   ```bash
   # Copy example environment file
   cp .env.example .env

   # Add your secrets
   nano .env
   ```

2. Build Configuration
   ```bash
   # Install dependencies
   npm install

   # Build for production
   npm run build
   ```

3. Repository Setup
   ```bash
   # Initialize repository
   git init

   # Add .gitignore
   echo "node_modules/
   dist/
   .env
   *.log" > .gitignore

   # Initial commit
   git add .
   git commit -m "Initial commit"
   ```

4. GitHub Setup
   - Create new repository
   - Add repository secrets:
     * `SUPABASE_URL`
     * `SUPABASE_ANON_KEY`
     * `OPENROUTER_API_KEY`

5. CI/CD Configuration
   - Set up GitHub Actions workflow
   - Configure deployment environment
   - Add environment variables to build process

## Production Requirements

1. SSL/TLS Configuration
   - Enable HTTPS
   - Configure SSL certificate
   - Set up automatic renewal

2. Performance Optimization
   - Enable compression
   - Configure caching
   - Set up CDN for static assets

3. Monitoring
   - Set up error tracking
   - Configure performance monitoring
   - Enable API usage alerts

4. Backup and Recovery
   - Configure database backups
   - Document recovery procedures
   - Test restore process

## Maintenance

1. Regular Tasks
   - Rotate API keys monthly
   - Review security logs
   - Update dependencies
   - Monitor usage costs

2. Update Process
   - Test changes locally
   - Deploy to staging
   - Verify functionality
   - Deploy to production

3. Incident Response
   - Document emergency contacts
   - Create incident response plan
   - Set up alerting system