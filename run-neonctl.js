const { spawnSync } = require('child_process');
const data = JSON.stringify({
  step: "getting-started",
  data: JSON.stringify({
    framework: "next",
    orm: "prisma",
    migrationTool: "prisma",
    migrationDir: "none",
    features: ["database"]
  })
});
const child = spawnSync('cmd.exe', ['/c', 'npx', 'neonctl', 'init', '--agent', '--data', data], { stdio: 'inherit' });
if (child.error) {
  console.error(child.error);
}
