const getOptionalEnv = (name) => process.env[name];

const encodeGitHubPath = (filePath) => filePath
  .split('/')
  .map(segment => encodeURIComponent(segment))
  .join('/');

const githubRequest = async (method, url) => {
  const token = getOptionalEnv('GITHUB_TOKEN');
  const headers = {
    'User-Agent': 'vincent-vila-portfolio',
    Accept: 'application/vnd.github+json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { method, headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${errorText}`);
  }
  return response.json();
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const owner = getOptionalEnv('GITHUB_OWNER');
    const repo = getOptionalEnv('GITHUB_REPO');
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!owner || !repo) {
      res.status(500).json({ error: 'Missing GITHUB_OWNER or GITHUB_REPO' });
      return;
    }

    const filePath = 'public/projects/index.json';
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGitHubPath(filePath)}?ref=${branch}`;
    const result = await githubRequest('GET', url);

    const content = Buffer.from(result.content, 'base64').toString('utf-8');
    const data = JSON.parse(content);

    res.status(200).json(data);
  } catch (error) {
    console.error('Projects API error:', error);
    res.status(500).json({ error: error.message || 'Failed to load projects' });
  }
}
