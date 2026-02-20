# GitFlow and Deployment Guide

## Overview

This project implements GitFlow with automated GitHub Pages deployment through GitHub Actions. The workflow handles both standard releases and hotfixes, with automatic deployment to GitHub Pages when changes are merged to the main branch.

## Branch Structure

- `main` - Production code, always deployable
- `develop` - Development code, integration branch
- `release/*` - Release preparation branches
- `hotfix/*` - Production hotfix branches
- `feature/*` - Feature development branches
- `bugfix/*` - Bug fix branches

## Creating a Release

### Via GitHub UI:

1. Go to the "Actions" tab in your repository
2. Select the "Release Workflow"
3. Click "Run workflow"
4. Enter:
   - Version number (e.g., "1.2.0")
   - Type: "release"
5. Click "Run workflow"

### Via Command Line:

```bash
# Ensure you're up to date
git checkout develop
git pull origin develop

# Create release branch (done automatically by workflow)
gh workflow run release.yml -f version=1.2.0 -f type=release
```

## Creating a Hotfix

### Via GitHub UI:

1. Go to the "Actions" tab
2. Select "Release Workflow"
3. Click "Run workflow"
4. Enter:
   - Version number (e.g., "1.2.1")
   - Type: "hotfix"
5. Click "Run workflow"

### Via Command Line:

```bash
# Create hotfix
gh workflow run release.yml -f version=1.2.1 -f type=hotfix
```

## Workflow Steps

1. **Version Validation**
   - Checks semver format (X.Y.Z or X.Y.Z-tag)
   - Ensures unique version number

2. **Branch Creation**
   - Creates release/hotfix branch
   - Updates version in package.json
   - Pushes branch to remote

3. **Pull Request Creation**
   - Creates PR against main
   - Includes auto-generated changelog
   - Requires review and checks

4. **Build & Test**
   - Runs type checking
   - Executes test suite
   - Builds production assets

5. **Deployment**
   - Deploys to GitHub Pages when merged
   - Updates environment variables
   - Configures domain settings

6. **Post-Deployment**
   - Creates Git tag
   - Creates GitHub Release
   - Merges changes back to develop

## Branch Protection

Protection rules are enforced for:

### Main Branch
- Requires 2 approvals
- Must be up to date
- Required checks must pass
- No direct pushes

### Develop Branch
- Requires 1 approval
- Must pass checks
- Linear history required

### Release/Hotfix Branches
- Requires 2 approvals
- Must pass version validation
- Must pass all checks

## GitHub Pages Deployment

The site is automatically deployed to GitHub Pages when:
1. A release/hotfix PR is merged to main
2. All tests pass successfully
3. Build completes without errors

The deployment:
- Uses the `/docs` base URL
- Includes proper 404 handling
- Preserves SPA routing
- Updates environment variables

## Environment Variables

Required for deployment:
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
VITE_OPENROUTER_API_KEY=your-openrouter-key
```

## Troubleshooting

### Common Issues

1. **Version Conflicts**
   ```bash
   # Check existing tags
   git tag
   # Delete if needed
   git tag -d v1.2.0
   git push origin :refs/tags/v1.2.0
   ```

2. **Failed Builds**
   - Check GitHub Actions logs
   - Verify environment variables
   - Ensure all dependencies installed

3. **Deployment Issues**
   - Verify GitHub Pages settings
   - Check build output directory
   - Confirm base URL configuration

### Recovery Steps

1. **Failed Release**
   ```bash
   # Clean up release branch
   git push origin --delete release/1.2.0
   # Start fresh
   gh workflow run release.yml -f version=1.2.0 -f type=release
   ```

2. **Failed Deployment**
   ```bash
   # Retry deployment
   gh workflow run release.yml
   ```

## Best Practices

1. **Version Numbers**
   - Use semantic versioning
   - Document breaking changes
   - Update changelog

2. **Pull Requests**
   - Use provided templates
   - Include test coverage
   - Document changes thoroughly

3. **Reviews**
   - Check for breaking changes
   - Verify documentation updates
   - Test deployment artifacts

4. **Post-Release**
   - Verify deployment
   - Check all features
   - Monitor for issues

## Automation Details

The workflow automatically:
1. Validates version numbers
2. Creates release branches
3. Generates changelogs
4. Creates PRs
5. Handles deployments
6. Tags releases
7. Merges changes back

## Security Considerations

- Environment variables are secure
- Branch protection enforced
- Required reviews configured
- Automated security checks
- Deployment validation