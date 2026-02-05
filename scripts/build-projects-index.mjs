import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const projectsDir = path.join(rootDir, 'public', 'projects');
const outputPath = path.join(projectsDir, 'index.json');

const normalizeCategory = (category) => {
  if (category === 'painting' || category === 'portrait') return 'traditional';
  return category;
};

const isImageFile = (filename) => /\.(jpg|jpeg|png|gif|svg)$/i.test(filename);

const readProjects = () => {
  if (!fs.existsSync(projectsDir)) return [];

  const projects = [];
  const categories = fs.readdirSync(projectsDir);

  categories.forEach((category) => {
    const categoryPath = path.join(projectsDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) return;

    const files = fs.readdirSync(categoryPath);
    const mappedCategory = normalizeCategory(category);

    const metadataFiles = files.filter((file) => file.endsWith('-metadata.json'));
    const processedProjects = new Set(metadataFiles.map((file) => file.replace('-metadata.json', '')));

    metadataFiles.forEach((metaFile) => {
      try {
        const metaPath = path.join(categoryPath, metaFile);
        const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

        metadata.category = mappedCategory;
        if (!metadata.id) metadata.id = Date.now() + Math.random();
        if (metadata.images && metadata.images.length > 0) {
          metadata.image = metadata.images[0];
        }

        projects.push(metadata);
      } catch (error) {
        console.error(`Failed to read ${metaFile}:`, error);
      }
    });

    const imageFiles = files.filter((file) => !file.endsWith('-metadata.json') && isImageFile(file));
    const legacyProjects = new Map();

    imageFiles.forEach((file) => {
      const nameMatch = file.match(/^(.+?)(?:-\d+)?\.[^.]+$/);
      const projectName = nameMatch ? nameMatch[1] : file.split('.')[0];

      if (processedProjects.has(projectName)) return;

      const imageUrl = `/projects/${category}/${file}`;

      if (!legacyProjects.has(projectName)) {
        legacyProjects.set(projectName, {
          id: Date.now() + Math.random(),
          title: projectName
            .replace(/-/g, ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
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
  });

  return projects;
};

const projects = readProjects();
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
console.log(`Generated ${projects.length} projects -> ${outputPath}`);
