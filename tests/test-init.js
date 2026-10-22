const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

/**
 * Superpowers for Antigravity - Installation Integration Test
 *
 * Verifies that scripts/init.js installs the Antigravity-native layout
 * (.agents/skills, workflows, portable GEMINI.md bootstrap) and that the
 * optional --claude flag also produces .claude/skills.
 */

console.log('🧪 Starting Antigravity Installer Integration Test...\n');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'superpowers-test-'));
const projectRoot = path.resolve(__dirname, '..');
const initScript = path.join(projectRoot, 'scripts', 'init.js');

function assertExists(base, relative, label) {
  const fullPath = path.join(base, relative);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ [PASS] Found: ${label || relative}`);
    return 0;
  }
  console.error(`  ❌ [FAIL] Missing: ${label || relative} (${relative})`);
  return 1;
}

try {
  console.log(`📦 Created temporary test directory: ${tmpDir}`);

  fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({ name: 'mock-project' }));

  // Simulate a project that already has its own GEMINI.md content.
  fs.writeFileSync(path.join(tmpDir, 'GEMINI.md'), '# Existing project rules\n\nKeep this line.\n');

  console.log(`⚙️ Executing installer: node ${initScript}`);
  execSync(`node "${initScript}"`, { cwd: tmpDir, stdio: 'inherit' });

  console.log('\n🔍 Verifying installation outputs...');
  let testsFailed = 0;

  const requiredPaths = [
    ['.agents/skills/using-superpowers/SKILL.md', 'Antigravity using-superpowers skill'],
    ['.agents/skills/using-superpowers/references/antigravity-tools.md', 'Antigravity tool bindings'],
    ['.agents/skills/brainstorming/SKILL.md', 'brainstorming skill'],
    ['.agents/skills/subagent-driven-development/SKILL.md', 'SDD skill'],
    ['.agents/skills/writing-skills/references/discovery.md', 'writing-skills v7 references'],
    ['.agents/skills/test-driven-development/writing-good-tests.md', 'TDD writing-good-tests'],
    ['.agents/skills/seo-geo-aeo/SKILL.md', 'fork-specific seo-geo-aeo skill'],
    ['.agents/workflows/brainstorm.md', 'legacy /brainstorm workflow alias'],
    ['adapters/GEMINI.md', 'Gemini model adapter'],
    ['PROJECT_RULES.md', 'project rules'],
    ['SUPERPOWER-STYLE.md', 'style guide']
  ];

  for (const [relative, label] of requiredPaths) {
    testsFailed += assertExists(tmpDir, relative, comparable(relative, label));
  }

  // GEMINI.md must preserve existing content and gain the bootstrap block once.
  const gemini = fs.readFileSync(path.join(tmpDir, 'GEMINI.md'), 'utf8');
  if (gemini.includes('Keep this line.')) {
    console.log('  ✅ [PASS] Preserved existing user content in GEMINI.md');
  } else {
    console.error('  ❌ [FAIL] Existing GEMINI.md content was overwritten');
    testsFailed++;
  }
  if (gemini.includes('@./.agents/skills/using-superpowers/SKILL.md')) {
    console.log('  ✅ [PASS] GEMINI.md includes portable Antigravity bootstrap pointers');
  } else {
    console.error('  ❌ [FAIL] GEMINI.md is missing the Superpowers bootstrap pointers');
    testsFailed++;
  }
  if (/file:\/\/\/[a-zA-Z]:/.test(gemini)) {
    console.error('  ❌ [FAIL] GEMINI.md contains a hardcoded absolute path');
    testsFailed++;
  } else {
    console.log('  ✅ [PASS] GEMINI.md contains no hardcoded absolute paths');
  }

  // Second run must be idempotent (no duplicated marker block).
  execSync(`node "${initScript}"`, { cwd: tmpDir, stdio: 'pipe' });
  const geminiTwice = fs.readFileSync(path.join(tmpDir, 'GEMINI.md'), 'utf8');
  const markerCount = (geminiTwice.match(/<!-- superpowers:start -->/g) || []).length;
  if (markerCount === 1) {
    console.log('  ✅ [PASS] Installer is idempotent (one Superpowers block in GEMINI.md)');
  } else {
    console.error(`  ❌ [FAIL] Expected 1 Superpowers block after re-run, found ${markerCount}`);
    testsFailed++;
  }

  // Legacy paths must not be installed any more.
  const forbiddenPaths = [
    '.agent/skills/using-superpowers/SKILL.md',
    '.gemini/GEMINI.md',
    '.agents/plugins/marketplace.json',
    '.agents/skills/gsd-codebase-mapper',
    '.agents/skills/gsd-context-fetch',
    '.agents/skills/gsd-context-health-monitor',
    '.agents/skills/gsd-empirical-validation',
    '.agents/skills/gsd-verifier',
    '.agents/skills/test-driven-development/testing-anti-patterns.md'
  ];

  for (const forbiddenPath of forbiddenPaths) {
    const fullPath = path.join(tmpDir, forbiddenPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`  ✅ [PASS] Confirmed absence of: ${forbiddenPath}`);
    } else {
      console.error(`  ❌ [FAIL] Unexpectedly found deprecated/removed item: ${forbiddenPath}`);
      testsFailed++;
    }
  }

  // Optional Claude Code project installation.
  const claudeTmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'superpowers-claude-test-'));
  try {
    execSync(`node "${initScript}" --claude`, { cwd: claudeTmpDir, stdio: 'pipe' });
    testsFailed += assertExists(
      claudeTmpDir,
      '.claude/skills/using-superpowers/SKILL.md',
      'Claude Code project skill'
    );
    testsFailed += assertExists(
      claudeTmpDir,
      '.claude/skills/seo-geo-aeo/SKILL.md',
      'Claude Code fork-specific skill'
    );
  } finally {
    fs.rmSync(claudeTmpDir, { recursive: true, force: true });
  }

  if (testsFailed > 0) {
    console.error(`\n💥 Test Failed: ${testsFailed} checks failed during installation.`);
    process.exit(1);
  }

  console.log('\n🎉 All automated installer tests passed successfully!');
} catch (err) {
  console.error('\n❌ Test execution failed with error:', err.message);
  process.exit(1);
} finally {
  console.log(`\n🧹 Cleaning up temporary directory: ${tmpDir}`);
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

function comparable(relative, label) {
  return label ? `${label} (${relative})` : relative;
}
