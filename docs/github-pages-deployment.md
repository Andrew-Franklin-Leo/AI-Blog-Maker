# GitHub Pages Deployment Guide

## Issue: Blank Screen After Deployment

If you're seeing a blank screen after deploying to GitHub Pages while the app works locally, this is typically due to incorrect routing and base URL configuration. Here's how to fix it:

## Required Changes

### 1. Package.json Updates

Add the homepage field to specify the correct base URL:

```json
{
  "name": "li-xia-blog",
  "homepage": "https://andrew-franklin-leo.github.io/AI-Blog-Maker/",
  ...
}
```

### 2. Vite Configuration Updates

Update vite.config.ts to handle GitHub Pages routing:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/AI-Blog-Maker/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    }
  }
});
```

### 3. Router Configuration

Update the router configuration to use HashRouter instead of BrowserRouter for GitHub Pages compatibility:

```typescript
// src/main.tsx
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
```

## Implementation Steps

1. Switch to Code mode
2. Apply the above changes to the respective files
3. Test the changes locally using:
   ```bash
   npm run build
   npm run preview
   ```
4. Commit and push the changes
5. Wait for the GitHub Actions workflow to complete
6. Verify the deployment on GitHub Pages

## Why These Changes Work

- The `homepage` field in package.json tells the build process where the app will be hosted
- The `base` option in Vite config ensures assets are loaded from the correct path
- HashRouter uses URL hashes for routing, which works better with GitHub Pages than BrowserRouter

## Additional Considerations

- Make sure GitHub Pages is enabled in your repository settings
- Verify all assets (images, fonts, etc.) use relative paths
- Check the browser console for any 404 errors on assets
- Ensure all environment variables are properly set in the GitHub repository secrets

After implementing these changes, the app should load correctly on GitHub Pages instead of showing a blank screen.