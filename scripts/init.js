#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Superpowers for Antigravity - Setup Script
 * Automates the copying of core components into a project root.
 */

const projectRoot = process.cwd();
const sourceDir = path.resolve(__dirname, '..');

// Folders and files to copy
const components = [
  '.agent',
  '.gemini',
  'adapters',
  'PROJECT_RULES.md',
  'SUPERPOWER-STYLE.md'
];

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function install() {
  console.log('🚀 Initializing Superpowers for Antigravity...');
  
  components.forEach(item => {
    const srcPath = path.join(sourceDir, item);
    const destPath = path.join(projectRoot, item);
    
    if (fs.existsSync(srcPath)) {
      console.log(`  - Installing ${item}...`);
      if (fs.lstatSync(srcPath).isDirectory()) {
        copyFolderSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    } else {
      // Fallback for STYLE name if we haven't renamed it yet in the target zip
      if (item === 'SUPERPOWER-STYLE.md' && fs.existsSync(path.join(sourceDir, 'Superpowers-STYLE.md'))) {
        console.log(`  - Installing Superpowers-STYLE.md as SUPERPOWER-STYLE.md...`);
        fs.copyFileSync(path.join(sourceDir, 'Superpowers-STYLE.md'), destPath);
      }
    }
  });

  console.log('\n✅ Installation complete!');
  console.log('\n--- Next Steps ---');
  console.log('1. Open Antigravity in this project.');
  console.log('2. Type "/help" to verify Mission Control.');
  console.log('3. Maintain the process. Build better software.');
}

install();
