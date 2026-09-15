import { spawn } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const outputDir = join('C:/Users/necos/.gemini/antigravity/scratch/frontend_estetica', 'temporary screenshots');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

let idx = 1;
while (existsSync(join(outputDir, `screenshot-${idx}.png`))) {
  idx++;
}
const outputPath = join(outputDir, `screenshot-${idx}.png`);

const size = process.argv[3] || '1440,900';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const args = [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  `--window-size=${size}`,
  `--screenshot=${outputPath}`,
  url
];

console.log(`Taking screenshot of ${url} -> ${outputPath}...`);
const p = spawn(chromePath, args);
p.on('close', (code) => {
  if (code === 0) {
    console.log(`Screenshot saved to: ${outputPath}`);
  } else {
    console.error(`Chrome exited with code ${code}`);
  }
});
