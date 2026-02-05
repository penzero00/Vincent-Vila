import Busboy from 'busboy';
import path from 'path';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }
  return value;
};

const sanitizeTitle = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const parseMultipart = (req) => new Promise((resolve, reject) => {
  const busboy = new Busboy({
    headers: req.headers,
    limits: { files: MAX_FILES, fileSize: MAX_FILE_SIZE }
  });

  const fields = {};
  const files = [];

  busboy.on('field', (name, value) => {
    fields[name] = value;
  });

  busboy.on('file', (name, file, info) => {
    const { filename, mimeType } = info;
    const chunks = [];

    file.on('data', (data) => chunks.push(data));
    file.on('limit', () => reject(new Error('File size limit exceeded')));
    file.on('end', () => {
      files.push({
        fieldName: name,
        filename,
        mimeType,
        buffer: Buffer.concat(chunks)
      });
    });
  });

  busboy.on('error', reject);
  busboy.on('finish', () => resolve({ fields, files }));

  req.pipe(busboy);
});

const encodeGitHubPath = (filePath) => filePath
  .split('/')
  .map(segment => encodeURIComponent(segment))
  .join('/');

const githubRequest = async (method, url, body) => {
  const token = getRequiredEnv('GITHUB_TOKEN');
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'vincent-vila-portfolio',
      Accept: 'application/vnd.github+json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (response.status === 404) {
    return { notFound: true };
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${errorText}`);
  }

  return response.json();
};

const getContentSha = async (owner, repo, branch, filePath) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGitHubPath(filePath)}?ref=${branch}`;
  const result = await githubRequest('GET', url);
  if (result.notFound) return null;
  return result.sha;
};

const getFileContent = async (owner, repo, branch, filePath) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGitHubPath(filePath)}?ref=${branch}`;
  const result = await githubRequest('GET', url);
  if (result.notFound) return null;

  const content = Buffer.from(result.content, 'base64').toString('utf-8');
  return { content, sha: result.sha };
};

const upsertFile = async ({ owner, repo, branch, filePath, contentBase64, message }) => {
  const sha = await getContentSha(owner, repo, branch, filePath);
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGitHubPath(filePath)}`;

  return githubRequest('PUT', url, {
    message,
    content: contentBase64,
    branch,
    sha: sha || undefined
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const owner = getRequiredEnv('GITHUB_OWNER');
    const repo = getRequiredEnv('GITHUB_REPO');
    const branch = process.env.GITHUB_BRANCH || 'main';

    const { fields, files } = await parseMultipart(req);

    if (!files.length) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    }

    const category = fields.category || 'other';
    const title = fields.title || 'Untitled';
    const description = fields.description || '';
    const link = fields.link || '';
    const tags = fields.tags ? fields.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const thumbnailIndex = fields.thumbnailIndex !== undefined ? parseInt(fields.thumbnailIndex, 10) : 0;

    const sanitizedTitle = sanitizeTitle(title) || 'untitled';
    const categoryDir = `public/projects/${category}`;

    const imageUrls = [];
    const commitMessage = `Upload project: ${title}`;

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const ext = path.extname(file.filename || '').toLowerCase() || '.png';
      const finalFilename = files.length > 1
        ? `${sanitizedTitle}-${i + 1}${ext}`
        : `${sanitizedTitle}${ext}`;

      const repoPath = `${categoryDir}/${finalFilename}`;
      await upsertFile({
        owner,
        repo,
        branch,
        filePath: repoPath,
        contentBase64: file.buffer.toString('base64'),
        message: commitMessage
      });

      imageUrls.push(`/projects/${category}/${finalFilename}`);
    }

    const metadata = {
      title,
      category,
      description,
      link,
      tags,
      images: imageUrls,
      thumbnailIndex: Math.min(thumbnailIndex, imageUrls.length - 1),
      createdAt: new Date().toISOString()
    };

    const metadataPath = `${categoryDir}/${sanitizedTitle}-metadata.json`;
    await upsertFile({
      owner,
      repo,
      branch,
      filePath: metadataPath,
      contentBase64: Buffer.from(JSON.stringify(metadata, null, 2)).toString('base64'),
      message: commitMessage
    });

    const indexPath = 'public/projects/index.json';
    const existingIndex = await getFileContent(owner, repo, branch, indexPath);
    const indexData = existingIndex?.content ? JSON.parse(existingIndex.content) : [];

    const selectedThumbnailIndex = Math.min(thumbnailIndex, imageUrls.length - 1);
    const projectData = {
      id: Date.now(),
      ...metadata,
      image: imageUrls[selectedThumbnailIndex]
    };

    indexData.push(projectData);

    await upsertFile({
      owner,
      repo,
      branch,
      filePath: indexPath,
      contentBase64: Buffer.from(JSON.stringify(indexData, null, 2)).toString('base64'),
      message: commitMessage
    });

    res.status(200).json({
      success: true,
      message: `${files.length} file(s) uploaded successfully`,
      project: projectData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Failed to process upload' });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};
