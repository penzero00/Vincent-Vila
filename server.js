import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'public', 'projects');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads with fields parsed first
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Temporary storage - will move after upload
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Temporary filename
    const tempName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, tempName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Routes
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    // Get category and title from request body
    const category = req.body.category || 'other';
    const title = req.body.title || 'untitled';
    
    // Sanitize title for filename
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    
    // Create category directory if it doesn't exist
    const categoryDir = path.join(uploadDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Process each uploaded file
    const imageUrls = [];
    req.files.forEach((file, index) => {
      const ext = path.extname(file.originalname);
      
      // If multiple files, add iteration number; if single file, no number
      const finalFilename = req.files.length > 1 
        ? `${sanitizedTitle}-${index + 1}${ext}`
        : `${sanitizedTitle}${ext}`;
      
      // Move file from temp location to category folder with proper name
      const oldPath = file.path;
      const newPath = path.join(categoryDir, finalFilename);
      
      fs.renameSync(oldPath, newPath);
      
      imageUrls.push(`/projects/${category}/${finalFilename}`);
    });
    
    // Save metadata to JSON file
    const metadata = {
      title: req.body.title || 'Untitled',
      category: category,
      description: req.body.description || '',
      link: req.body.link || '',
      tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [],
      images: imageUrls,
      createdAt: new Date().toISOString()
    };
    
    const metadataPath = path.join(categoryDir, `${sanitizedTitle}-metadata.json`);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    // Return complete project data with first image as thumbnail
    const projectData = {
      id: Date.now(),
      ...metadata,
      image: imageUrls[0] // First image is the thumbnail
    };
    
    res.json({
      success: true,
      message: `${req.files.length} file(s) uploaded successfully`,
      project: projectData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

app.get('/api/projects', (req, res) => {
  const projects = [];
  const categories = fs.readdirSync(uploadDir);
  
  categories.forEach(category => {
    const categoryPath = path.join(uploadDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      
      // Map old category names to new ones
      const mappedCategory = (category === 'painting' || category === 'portrait') ? 'traditional' : category;
      
      // Find all metadata files
      const metadataFiles = files.filter(f => f.endsWith('-metadata.json'));
      
      metadataFiles.forEach(metaFile => {
        try {
          const metaPath = path.join(categoryPath, metaFile);
          const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
          
          // Update category if mapped
          metadata.category = mappedCategory;
          
          // Add id if not present
          if (!metadata.id) {
            metadata.id = Date.now() + Math.random();
          }
          
          // Set main image (first image as thumbnail)
          if (metadata.images && metadata.images.length > 0) {
            metadata.image = metadata.images[0];
          }
          
          projects.push(metadata);
        } catch (error) {
          console.error(`Error reading metadata file ${metaFile}:`, error);
        }
      });
      
      // Handle projects without metadata (legacy images)
      const imageFiles = files.filter(f => !f.endsWith('-metadata.json') && /\.(jpg|jpeg|png|gif|svg)$/i.test(f));
      const processedProjects = new Set(metadataFiles.map(f => f.replace('-metadata.json', '')));
      
      // Group images by project name
      const legacyProjects = new Map();
      imageFiles.forEach(file => {
        const nameMatch = file.match(/^(.+?)(?:-\d+)?\.[^.]+$/);
        const projectName = nameMatch ? nameMatch[1] : file.split('.')[0];
        
        // Skip if we already have metadata for this project
        if (processedProjects.has(projectName)) return;
        
        const imageUrl = `/projects/${category}/${file}`;
        
        if (!legacyProjects.has(projectName)) {
          legacyProjects.set(projectName, {
            id: Date.now() + Math.random(),
            title: projectName.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            category: mappedCategory,
            description: '',
            link: '',
            tags: [],
            images: [],
            image: imageUrl
          });
        }
        
        const project = legacyProjects.get(projectName);
        project.images.push(imageUrl);
        if (project.images.length === 1) {
          project.image = imageUrl;
        }
      });
      
      projects.push(...Array.from(legacyProjects.values()));
    }
  });
  
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
