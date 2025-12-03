# 🚀 Deployment Guide

## Deploying to GitHub

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `expense-tracker`)
5. Choose "Public" or "Private"
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 2: Initialize Git and Push to GitHub

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Expense Tracker application"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### Step 3: Enable GitHub Pages (Optional)

To deploy your app on GitHub Pages:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy your app when you push to main

Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Alternative Deployment Options

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Follow the prompts
4. For production: `netlify deploy --prod`

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to any static hosting service

## Environment Variables

If you need environment variables:

1. Create a `.env` file in the root directory
2. Add your variables with `VITE_` prefix:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Access in code: `import.meta.env.VITE_API_URL`
4. **Never commit `.env` to GitHub** (it's already in .gitignore)

## Updating Your Deployment

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Actions will automatically rebuild and deploy your app.

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify Node.js version: `node --version` (should be v14+)
- Check for errors: `npm run build`

### GitHub Pages Not Working
- Ensure GitHub Actions is enabled in repository settings
- Check the Actions tab for build errors
- Verify the base path in `vite.config.js`

### Routes Not Working on GitHub Pages
- The app uses client-side routing
- If you get 404 errors, add a `404.html` that redirects to `index.html`

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/issues)
- Review the [README.md](README.md) for setup instructions
