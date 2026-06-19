const { spawnSync } = require('child_process');
const data = JSON.stringify({
  step: "setup",
  data: JSON.stringify({
    agent: "antigravity",
    ide: "vscode",
    mcpConfigured: false,
    mode: "defaults",
    features: "database"
  })
});
const child = spawnSync('npx.cmd', ['neonctl', 'init', '--agent', '--data', data], { stdio: 'inherit' });
if (child.error) {
  console.error(child.error);
}
