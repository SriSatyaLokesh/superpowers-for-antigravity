#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Superpowers for Antigravity - Setup Script
 *
 * Installs the Antigravity-native layout into the current project:
 *   .agents/skills/       24 skills (15 upstream core + 9 fork-specific)
 *   .agents/workflows/    legacy /brainstorm, /plan, ... aliases
 *   adapters/             Gemini model guidance
 *   PROJECT_RULES.md      process constitution
 *   SUPERPOWER-STYLE.md   communication standards
 *   GEMINI.md             bootstrap pointers (merged, never overwritten)
 *
 * With --claude it additionally installs the skills into .claude/skills/ so
 * Claude Code discovers them as project skills.
 */

const args = new Set(process.argv.slice(2));
const WITH_CLAUDE = args.has('--claude') || args.has('--all');

const projectRoot = process.cwd();
const sourceDir = path.resolve(__dirname, '..');

const ANTIGRAVITY_COMPONENTS = [
  '.agents/skills',
  '.agents/workflows',
  'adapters',
  'PROJECT_RULES.md',
  'SUPERPOWER-STYLE.md'
];

const BOOTSTRAP_MARKER_START = '<!-- superpowers:start -->';
const BOOTSTRAP_MARKER_END = '<!-- superpowers:end -->';

const BOOTSTRAP_BLOCK = [
  BOOTSTRAP_MARKER_START,
  '## Superpowers',
  '',
  'You have Superpowers. Read and follow these files before starting work.',
  '',
  '@./.agents/skills/using-superpowers/SKILL.md',
  '@./.agents/skills/using-superpowers/references/antigravity-tools.md',
  '@./PROJECT_RULES.md',
  '@./SUPERPOWER-STYLE.md',
  BOOTSTRAP_MARKER_END
].join('\n');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach((element) => {
    const sourcePath = path.join(from, element);
    const targetPath = path.join(to, element);
    if (fs.lstatSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      copyFolderSync(sourcePath, targetPath);
    }
  });
}

function installComponent(item) {
  const srcPath = path.join(sourceDir, item);
  const destPath = path.join(projectRoot, item);

  if (!fs.existsSync(srcPath)) {
    console.warn(`  - Skipping ${item} (not found in package)`);
    return;
  }

  console.log(`  - Installing ${item}...`);
  if (fs.lstatSync(srcPath).isDirectory()) {
    copyFolderSync(srcPath, destPath);
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

function installGeminiBootstrap() {
  const geminiPath = path.join(projectRoot, 'GEMINI.md');
  const existing = fs.existsSync(geminiPath) ? fs.readFileSync(geminiPath, 'utf8') : '';

  if (existing.includes(BOOTSTRAP_MARKER_START)) {
    console.log('  - GEMINI.md already has a Superpowers block, leaving it untouched.');
    return;
  }

  const next = existing.trim().length > 0
    ? `${existing.trimEnd()}\n\n${BOOTSTRAP_BLOCK}\n`
    : `# Project Rules\n\n${BOOTSTRAP_BLOCK}\n`;

  fs.writeFileSync(geminiPath, next, 'utf8');
  console.log('  - Added Superpowers bootstrap block to GEMINI.md');
}

function installForClaude() {
  const skillsSource = path.join(sourceDir, '.agents', 'skills');
  const skillsTarget = path.join(projectRoot, '.claude', 'skills');

  if (!fs.existsSync(skillsSource)) {
    console.warn('  - Skipping Claude skills (no .agents/skills in package)');
    return;
  }

  console.log('  - Installing Claude Code project skills into .claude/skills...');
  copyFolderSync(skillsSource, skillsTarget);
}

function install() {
  console.log('🚀 Initializing Superpowers for Antigravity...\n');

  ANTIGRAVITY_COMPONENTS.forEach(installComponent);
  installGeminiBootstrap();

  if (WITH_CLAUDE) {
    installForClaude();
  }

  console.log('\n✅ Installation complete!');
  console.log('\n--- Next Steps ---');
  console.log('1. Start the Antigravity CLI in this project: agy');
  console.log('2. Type /skills to confirm the Superpowers skills are visible.');
  console.log('3. Maintain the process. Build better software.');
}

install();
