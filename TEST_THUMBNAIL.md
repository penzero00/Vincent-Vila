# Testing Thumbnail Selection

## Important Note
The thumbnail selection feature works for **NEW uploads**. Existing projects uploaded before this feature was added need to be updated manually.

## For Existing Projects (Manual Update)

Run this interactive script to set thumbnails for existing projects:
```bash
npm run set-thumbnails
```

This will:
- Show each project with multiple images
- Let you select which image should be the thumbnail
- Save `thumbnailIndex` to the metadata file

After setting thumbnails, regenerate the index:
```bash
npm run prebuild
```

## For New Uploads (Automatic)

1. **Start both servers:**
   ```bash
   npm run dev:all
   ```

2. **Go to upload page:**
   - Open: http://localhost:5173/#v-upload

3. **Upload multiple images (at least 3)**

4. **Click on the 2nd or 3rd image** to select it as thumbnail
   - You should see a blue ring around it
   - It should show a star icon and "Thumbnail" badge

5. **Fill in the form** (title, tags, etc.)

6. **Click "Add Project to Portfolio"**

7. **Check browser console** - should show:
   ```
   Uploading with thumbnailIndex: 2  (or whatever you selected)
   ```

8. **Check terminal running server** - should show:
   ```
   Saving metadata with thumbnailIndex: 2 from 2
   Selected thumbnail: /projects/web/yourproject-3.png at index 2
   ```

9. **Go to portfolio** - http://localhost:5173/#portfolio
   - The project should appear with the selected thumbnail (not the first image)

10. **Check the metadata file:**
    - Look in `public/projects/[category]/[projectname]-metadata.json`
    - Should contain: `"thumbnailIndex": 2`

## Verifying It Works

### Check a metadata file:
```bash
cat public/projects/web/your-project-metadata.json
```

Should contain:
```json
{
  "title": "Your Project",
  "images": [
    "/projects/web/your-project-1.png",
    "/projects/web/your-project-2.png",
    "/projects/web/your-project-3.png"
  ],
  "thumbnailIndex": 2,
  ...
}
```

### Rebuild and check index.json:
```bash
npm run prebuild
```

Look at `public/projects/index.json` - the `image` field should match the selected thumbnail.

## If It's Not Working

1. **Check browser console** for the thumbnailIndex log
2. **Check server terminal** for the metadata save logs
3. **Verify the metadata JSON file** has thumbnailIndex saved
4. **Make sure you're clicking on a different image** (not the first one)
5. **For existing projects**, run `npm run set-thumbnails` to update them
