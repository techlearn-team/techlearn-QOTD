# QOTD Platform - Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Git installed
- GitHub account
- Vercel account (free tier works great)

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: QOTD platform"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/qotd-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your `qotd-platform` repository
5. Vercel will automatically detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

🎉 Your site will be live in ~30 seconds!

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### Alternative: Vercel CLI Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

## Deploy to Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

Or use Netlify's GitHub integration (similar to Vercel).

### GitHub Pages

Add to `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/qotd-platform"
}
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Add scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Update `vite.config.js`:
```js
export default defineConfig({
  base: '/qotd-platform/',
  plugins: [react()],
})
```

Deploy:
```bash
npm run deploy
```

### Cloudflare Pages

1. Go to Cloudflare Pages dashboard
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
4. Deploy

## Environment Configuration

No environment variables needed! The app uses static mock data.

For future API integration, create `.env`:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```js
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Checklist

Before deploying to production, verify:

- [ ] All images are optimized
- [ ] Bundle size is acceptable (`npm run build` shows stats)
- [ ] No console errors in production build
- [ ] Mobile responsiveness tested
- [ ] Accessibility tested (keyboard navigation, screen readers)
- [ ] Performance tested (Lighthouse score)

## Monitoring Your Deployment

### Vercel Analytics (Free)

Add to your project:
```bash
npm install @vercel/analytics
```

In `src/main.jsx`:
```js
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
```

## Troubleshooting

### Build Fails

1. Check Node version: `node --version` (should be 18+)
2. Clear cache: `rm -rf node_modules package-lock.json && npm install`
3. Test local build: `npm run build`

### Blank Page After Deploy

1. Check browser console for errors
2. Verify `base` in `vite.config.js` matches deployment URL
3. Ensure all imports use correct casing (case-sensitive in production)

### Slow Performance

1. Run Lighthouse audit
2. Enable compression in hosting platform
3. Consider code splitting for larger apps

## Next Steps

Once deployed:

1. **Share your link** and gather feedback
2. **Set up monitoring** (Vercel Analytics, Google Analytics)
3. **Test on real devices** across different networks
4. **Iterate based on user behavior** data

---

Happy deploying! 🚀
