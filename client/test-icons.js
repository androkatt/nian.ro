import https from 'https';

const tests = {
  aws: ['amazonaws', 'amazon', 'aws', 'amazonwebservices'],
  azure: ['azure', 'microsoftazure', 'azuredevops'],
  openai: ['openai'],
  bash: ['gnubash', 'bash', 'gnu-bash'],
  node: ['nodedotjs', 'node.js', 'node-dot-js', 'node']
};

const checkUrl = (slug) => {
  return new Promise((resolve) => {
    const url = `https://cdn.simpleicons.org/${slug}/FF0000`;
    https.get(url, (res) => {
      resolve({ slug, code: res.statusCode });
    }).on('error', () => {
      resolve({ slug, code: 500 });
    });
  });
};

(async () => {
  console.log('Testing icon slugs...');
  for (const [tech, slugs] of Object.entries(tests)) {
    console.log(`
Checking ${tech}:
`);
    for (const slug of slugs) {
      const result = await checkUrl(slug);
      console.log(`  ${result.slug}: ${result.code}`);
      if (result.code === 200) break; // Found a working one
    }
  }
})();
