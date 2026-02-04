# Vincent Velasco Vila - Portfolio

A modern, responsive portfolio website built with React.js, Tailwind CSS, and Express.js backend for project uploads.

## Features

✨ **Frontend**
- Modern, responsive design
- Dark theme with accent colors
- Project portfolio with category filters
- Upload functionality for new projects
- Contact form with email integration
- Social media links
- Mobile-friendly navigation

🚀 **Backend**
- Express.js server for file uploads
- Multer for image handling
- Organized project storage by category
- CORS support for API requests

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup

1. **Navigate to project directory**
```bash
cd c:\Users\user\Documents\Personal_Projects\Portfolio\Vincent-Vila
```

2. **Install dependencies**
```bash
npm install
```

3. **Create upload directories**
```bash
# Already created in public/uploads/
```

## Running the Project

### Option 1: Run Frontend Only
```bash
npm run dev
```
Visit: http://localhost:5173

### Option 2: Run Both Frontend & Backend
**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```
or
```bash
node server.js
```

Frontend: http://localhost:5173
Backend API: http://localhost:5000

## Project Structure

```
Vincent-Vila/
├── public/
│   ├── uploads/          # Uploaded project images organized by category
│   ├── Crown_Logo.svg
│   ├── VincentVila.jpg
│   └── VincentVila_Resume.pdf
├── src/
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS
├── server.js            # Express backend server
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Upload Categories

Projects are automatically organized in these folders:
- `web/` - Websites & Web Applications
- `cert/` - Certifications
- `painting/` - Paintings
- `portrait/` - Portraits
- `3d/` - 3D/Animation
- `digital/` - Digital Art

## Features Explained

### Upload Projects
1. Fill in project title
2. Select category
3. Upload project image (5MB max)
4. Add project link (optional)
5. Add tags (comma-separated)
6. Click "Add Project to Portfolio"

Images are stored in `/public/uploads/[category]/` and displayed dynamically.

### Contact Form
- Sends emails using Gmail web interface
- Form validation ensures all fields are completed
- Supports direct mailto integration

### Portfolio Filtering
- Filter projects by category
- View all projects
- Responsive grid layout

## API Endpoints

### Upload Project
**POST** `/api/upload`
- Request: multipart/form-data with image, category, title
- Response: JSON with imageUrl

### Get All Projects
**GET** `/api/projects`
- Response: JSON array of all uploaded projects

## Customization

### Colors & Theme
Edit `tailwind.config.js` and `src/index.css` for color customization.

### Portfolio Items
Projects are dynamically loaded from the backend API. No hardcoding needed.

### Navigation
Update `NAV_LINKS` in `src/App.jsx` to modify navigation menu.

## Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

## Deployment

The app is ready to deploy to:
- Vercel (React frontend)
- Netlify (React frontend)
- Heroku (Backend + Frontend)
- AWS (EC2, S3 for uploads)

## Troubleshooting

**Port Already in Use:**
```bash
# Change port in server.js
const PORT = 5001; // Change from 5000
```

**CORS Errors:**
- Ensure backend is running on localhost:5000
- Check browser console for specific errors

**Images Not Uploading:**
- Check `/public/uploads/` directory exists
- Verify file size < 5MB
- Check browser console for errors

## Notes

- Backend server must be running for upload functionality to work
- Images are stored locally in the public folder
- Portfolio persists as long as files remain in the uploads directory

## Contact

- Email: vincent.vila00@gmail.com
- GitHub: https://github.com/penzero00
- LinkedIn: https://www.linkedin.com/in/vincent-vila-ba829727a
- Facebook: https://www.facebook.com/vncntvv

---

Built with React.js, Tailwind CSS, and Express.js
