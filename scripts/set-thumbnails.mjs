import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const projectsDir = path.join(rootDir, 'public', 'projects');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const updateThumbnails = async () => {
  console.log('\n=== Manual Thumbnail Selector ===\n');
  
  if (!fs.existsSync(projectsDir)) {
    console.log('Projects directory not found!');
    rl.close();
    return;
  }

  const categories = fs.readdirSync(projectsDir).filter(f => {
    const stat = fs.statSync(path.join(projectsDir, f));
    return stat.isDirectory();
  });

  for (const category of categories) {
    const categoryPath = path.join(projectsDir, category);
    const files = fs.readdirSync(categoryPath);
    const metadataFiles = files.filter(f => f.endsWith('-metadata.json'));

    for (const metaFile of metadataFiles) {
      try {
        const metaPath = path.join(categoryPath, metaFile);
        const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

        // Skip if already has thumbnailIndex
        if (typeof metadata.thumbnailIndex === 'number') {
          console.log(`✓ ${metadata.title} - already has thumbnail set (index ${metadata.thumbnailIndex})`);
          continue;
        }

        // Skip if only one image
        if (!metadata.images || metadata.images.length <= 1) {
          console.log(`↓ ${metadata.title} - only 1 image, skipping`);
          continue;
        }

        console.log(`\n📁 Project: ${metadata.title}`);
        console.log(`   Category: ${metadata.category}`);
        console.log(`   Images:`);
        metadata.images.forEach((img, i) => {
          const filename = path.basename(img);
          console.log(`   [${i}] ${filename}`);
        });

        const answer = await question(`   Select thumbnail index (0-${metadata.images.length - 1}) or press Enter to keep [0]: `);
        
        let selectedIndex = 0;
        if (answer.trim() !== '') {
          selectedIndex = parseInt(answer, 10);
          if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= metadata.images.length) {
            console.log(`   Invalid index, keeping 0`);
            selectedIndex = 0;
          }
        }

        metadata.thumbnailIndex = selectedIndex;
        fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
        console.log(`   ✓ Saved with thumbnailIndex: ${selectedIndex}`);

      } catch (error) {
        console.error(`   ✗ Error processing ${metaFile}:`, error.message);
      }
    }
  }

  console.log('\n✓ Done! Run "npm run prebuild" to regenerate the index.\n');
  rl.close();
};

updateThumbnails();
