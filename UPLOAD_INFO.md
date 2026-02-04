# Upload Functionality Guide

## How It Works

### File Naming & Organization
- **Files are named by project title**: When you upload a project, the image is automatically saved with the project title as the filename (sanitized - spaces become hyphens, special characters removed)
- **Category-based folders**: Images are saved in folders matching the project type:
  - `public/projects/web/` - Web Development projects
  - `public/projects/cert/` - Certifications
  - `public/projects/painting/` - Paintings
  - `public/projects/portrait/` - Portraits
  - `public/projects/3d/` - 3D Art
  - `public/projects/digital/` - Digital Art

### Real-Time Display
- Projects appear **immediately** on the website after upload
- The upload form returns the complete project data from the server
- Portfolio grid updates automatically without page refresh

### Example
If you upload a project with:
- **Title**: "My Amazing Website"
- **Category**: "web"

The file will be saved as:
```
public/projects/web/my-amazing-website.png
```

And will appear instantly in the portfolio grid with the URL:
```
http://localhost:5173/projects/web/my-amazing-website.png
```

## Accessing Your Portfolio

- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:5000/

## Starting the Servers

Run both servers together:
```bash
npm run dev:all
```

Or run them separately:
```bash
npm run dev      # Frontend only
npm run server   # Backend only
```

## Project Structure
```
Vincent-Vila/
├── public/
│   ├── projects/           # All uploaded images saved here
│   │   ├── web/
│   │   ├── cert/
│   │   ├── painting/
│   │   ├── portrait/
│   │   ├── 3d/
│   │   └── digital/
│   ├── Crown_Logo.svg
│   ├── VincentVila.jpg
│   └── VincentVila_Resume.pdf
├── src/
│   └── App.jsx             # Main app with upload logic
└── server.js               # Backend API for uploads
```
