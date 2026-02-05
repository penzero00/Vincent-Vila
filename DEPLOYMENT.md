# Deployment Guide

## How It Works

### Localhost Development
- **Frontend**: Runs on `http://localhost:5173` (Vite dev server)
- **Backend**: Runs on `http://localhost:5000` (Express server)
- **Data Source**: Live API from Express server (`/api/projects`, `/api/upload`)

### Vercel Production (Static)
- **Frontend**: Deployed on Vercel
- **Backend**: Not deployed (static only)
- **Data Source**: Pre-built static file (`/projects/index.json`)
- **Uploads**: Disabled (no backend available)

### Vercel + Separate Backend (Full Featured)
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed separately (Render, Railway, Fly.io, etc.)
- **Data Source**: Live API from deployed backend
- **Uploads**: Fully functional

---

## Running Locally

### 1. Start Both Servers
```bash
npm run dev:all
```

Or start them separately:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

### 2. Access the Site
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 3. Upload Projects (Optional)
Visit: http://localhost:5173/#v-upload

---

## Deploying to Vercel (Static - No Uploads)

### Prerequisites
- All project images and metadata files committed to git in `/public/projects/`
- Vercel CLI installed: `npm i -g vercel`

### Steps

1. **Generate Static Index**
```bash
npm run prebuild
```
This creates `/public/projects/index.json` from all your project files.

2. **Commit the Index**
```bash
git add public/projects/index.json
git commit -m "Generate projects index for Vercel"
git push
```

3. **Deploy to Vercel**
```bash
vercel --prod
```

Or push to GitHub and connect the repo in Vercel dashboard.

### What Happens
- Vercel runs `npm run build` which automatically runs `prebuild` first
- The build generates `index.json` containing all your projects
- The app fetches from `/projects/index.json` when the API is unavailable
- Images display from `/projects/[category]/[filename]`

---

## Deploying with Backend (Full Featured)

### 1. Deploy Backend Separately

#### Option A: Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

Copy the deployed URL (e.g., `https://your-app.railway.app`)

#### Option B: Render
1. Create new Web Service on Render
2. Connect your GitHub repo
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Copy the deployed URL

#### Option C: Fly.io
```bash
# Install Fly CLI
fly auth login
fly launch
fly deploy
```

### 2. Configure Vercel

Set environment variable in Vercel dashboard:
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

Or via CLI:
```bash
vercel env add VITE_API_BASE_URL
```

### 3. Redeploy Frontend
```bash
vercel --prod
```

### What Happens
- App fetches from your deployed backend first
- Uploads work and persist on your backend server
- Falls back to static index if backend is down

---

## File Structure

```
public/
  projects/
    index.json          # Auto-generated, commit to git
    web/
      project-1.png
      project-1-metadata.json
    cert/
      cert-1.png
      cert-1-metadata.json
    digital/
    3d/
    traditional/

scripts/
  build-projects-index.mjs  # Generates index.json

src/
  App.jsx               # Fetches from API or static index
```

---

## Environment Variables

### Development (Optional)
Create `.env.local`:
```
VITE_API_BASE_URL=http://localhost:5000
```

### Production - Vercel
```
VITE_API_BASE_URL=https://your-backend.railway.app
```
(Only needed if using separate backend)

---

## Troubleshooting

### Images not showing on localhost
**Problem**: Cannot fetch from `http://localhost:5000`  
**Solution**: Make sure backend is running (`npm run server`)

### Images not showing on Vercel
**Problem**: `index.json` not found  
**Solution**: Run `npm run prebuild` and commit the generated file

### Uploads not working on Vercel
**Expected**: Uploads require a backend server  
**Solution**: Deploy backend separately and set `VITE_API_BASE_URL`

### Old data showing
**Problem**: `index.json` is outdated  
**Solution**: Run `npm run prebuild` and redeploy

---

## Best Practices

1. **Always commit** `/public/projects/index.json` to git
2. **Run prebuild** before deploying if you added new projects
3. **Use metadata files** for better project information
4. **Keep images** under 5MB for faster loading
5. **Test locally** with `npm run dev:all` before deploying
