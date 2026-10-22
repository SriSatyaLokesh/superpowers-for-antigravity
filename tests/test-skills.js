const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const skillsDir = path.join(repoRoot, '.agents', 'skills');
const upstreamSkillsDir = path.join(repoRoot, 'skills');

console.log('🧪 Starting Skills Validation Test...\n');

const EXPECTED_CORE_SKILLS = [
  'brainstorming',
  'diagnosing-superpowers',
  'dispatching-parallel-agents',
  'executing-plans',
  'finishing-a-development-branch',
  'receiving-code-review',
  'requesting-code-review',
  'subagent-driven-development',
  'systematic-debugging',
  'test-driven-development',
  'using-git-worktrees',
  'using-superpowers',
  'verification-before-completion',
  'writing-plans',
  'writing-skills'
];

const EXPECTED_CUSTOM_SKILLS = [
  'frontend-design',
  'mcp-builder',
  'senior-architect',
  'senior-backend',
  'senior-fullstack',
  'seo-geo-aeo',
  'skill-creator',
  'web-artifacts-builder',
  'webapp-testing'
];

let failed = false;

function fail(msg) {
  console.error(`  ❌ [FAIL] ${msg}`);
  failed = true;
}

function pass(msg) {
  console.log(`  ✅ [PASS] ${msg}`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

// 1. Directories exist
if (!fs.existsSync(skillsDir)) {
  fail(`Antigravity skills directory not found at ${skillsDir}`);
  process.exit(1);
}
if (!fs.existsSync(upstreamSkillsDir)) {
  fail(`Canonical upstream skills directory not found at ${upstreamSkillsDir}`);
  process.exit(1);
}

const skillDirs = listDirs(skillsDir);
const upstreamDirs = listDirs(upstreamSkillsDir);

console.log(`Found ${skillDirs.length} Antigravity skills and ${upstreamDirs.length} upstream skills.`);

// 2. Upstream tree is exactly the 15 core skills
if (upstreamDirs.length !== EXPECTED_CORE_SKILLS.length) {
  fail(`Upstream skills count is ${upstreamDirs.length}, expected ${EXPECTED_CORE_SKILLS.length}`);
} else {
  pass(`Upstream skills tree contains exactly ${EXPECTED_CORE_SKILLS.length} core skills`);
}
for (const core of EXPECTED_CORE_SKILLS) {
  if (!upstreamDirs.includes(core)) fail(`Missing upstream core skill: ${core}`);
}

// 3. All expected core + custom skills exist in .agents/skills
for (const core of EXPECTED_CORE_SKILLS) {
  if (!skillDirs.includes(core)) fail(`Missing expected core skill in .agents/skills: ${core}`);
}
for (const custom of EXPECTED_CUSTOM_SKILLS) {
  if (!skillDirs.includes(custom)) fail(`Missing expected custom skill in .agents/skills: ${custom}`);
}
if (EXPECTED_CORE_SKILLS.every((s) => skillDirs.includes(s))) {
  pass('All 15 upstream core skills present in .agents/skills');
}
if (EXPECTED_CUSTOM_SKILLS.every((s) => skillDirs.includes(s))) {
  pass('All 9 fork-specific engineering skills present in .agents/skills');
}

// 4. Total count check
const expectedTotal = EXPECTED_CORE_SKILLS.length + EXPECTED_CUSTOM_SKILLS.length;
if (skillDirs.length === expectedTotal) {
  pass(`Exact count match: found ${skillDirs.length} skills (expected ${expectedTotal})`);
} else {
  fail(`Skill count mismatch: found ${skillDirs.length}, expected ${expectedTotal}`);
}

// 5. Validate YAML frontmatter in each SKILL.md
console.log('\nValidating SKILL.md frontmatter in all skills:');
for (const skill of skillDirs) {
  const skillFile = path.join(skillsDir, skill, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    fail(`Missing SKILL.md in ${skill}`);
    continue;
  }

  const content = fs.readFileSync(skillFile, 'utf8');
  if (!content.startsWith('---')) {
    fail(`${skill}/SKILL.md does not start with YAML frontmatter delimiter (---)`);
    continue;
  }

  const secondDelimiter = content.indexOf('\n---', 3);
  if (secondDelimiter === -1) {
    fail(`${skill}/SKILL.md does not close YAML frontmatter delimiter`);
    continue;
  }

  const frontmatter = content.slice(3, secondDelimiter);
  const hasName = /name:\s*.+/i.test(frontmatter);
  const hasDesc = /description:\s*.+/i.test(frontmatter);

  if (!hasName) {
    fail(`${skill}/SKILL.md is missing 'name' in frontmatter`);
  } else if (!hasDesc) {
    fail(`${skill}/SKILL.md is missing 'description' in frontmatter`);
  } else {
    pass(`${skill} frontmatter valid`);
  }
}

// 6. Upstream v7.0.1 structural markers
console.log('\nValidating upstream v7.0.1 skill structure:');
const v7Markers = [
  ['.agents/skills/brainstorming/builder-check-prompt.md', 'brainstorming builder-check prompt'],
  ['.agents/skills/subagent-driven-development/references/preflight.md', 'SDD preflight reference'],
  ['.agents/skills/subagent-driven-development/references/fix-loop.md', 'SDD fix-loop reference'],
  ['.agents/skills/subagent-driven-development/references/final-review.md', 'SDD final-review reference'],
  ['.agents/skills/writing-skills/references/discovery.md', 'writing-skills discovery reference'],
  ['.agents/skills/writing-skills/references/bulletproofing.md', 'writing-skills bulletproofing reference'],
  ['.agents/skills/test-driven-development/writing-good-tests.md', 'TDD writing-good-tests reference']
];

for (const [relative, label] of v7Markers) {
  if (fs.existsSync(path.join(repoRoot, relative))) {
    pass(`Found ${label} (${relative})`);
  } else {
    fail(`Missing ${label} at ${relative}`);
  }
}

const removedPaths = [
  '.agents/skills/brainstorming/spec-document-reviewer-prompt.md',
  '.agents/skills/test-driven-development/testing-anti-patterns.md'
];
for (const relative of removedPaths) {
  if (!fs.existsSync(path.join(repoRoot, relative))) {
    pass(`Confirmed removal of ${relative}`);
  } else {
    fail(`Deprecated file still present: ${relative}`);
  }
}

// 7. Antigravity tool binding reference
const antigravityRef = path.join(skillsDir, 'using-superpowers', 'references', 'antigravity-tools.md');
if (fs.existsSync(antigravityRef)) {
  const content = fs.readFileSync(antigravityRef, 'utf8');
  if (content.includes('invoke_subagent') && content.includes('agy')) {
    pass('using-superpowers includes antigravity-tools.md with invoke_subagent');
  } else {
    fail('antigravity-tools.md missing invoke_subagent reference');
  }
} else {
  fail(`Missing antigravity-tools.md at ${antigravityRef}`);
}

// 8. Dual-harness manifests
console.log('\nValidating dual-harness manifests:');
const packageJson = readJson(path.join(repoRoot, 'package.json'));

const manifestChecks = [
  ['.claude-plugin/plugin.json', 'Claude Code plugin manifest'],
  ['.claude-plugin/marketplace.json', 'Claude Code marketplace manifest'],
  ['.antigravity-plugin/plugin.json', 'Antigravity plugin manifest'],
  ['.agents/plugins/marketplace.json', 'Antigravity marketplace manifest'],
  ['hooks/hooks.json', 'Claude Code hooks'],
  ['hooks/run-hook.cmd', 'cross-platform hook launcher'],
  ['hooks/session-start', 'session start hook']
];

for (const [relative, label] of manifestChecks) {
  if (fs.existsSync(path.join(repoRoot, relative))) {
    pass(`Found ${label} (${relative})`);
  } else {
    fail(`Missing ${label} at ${relative}`);
  }
}

const claudePlugin = readJson(path.join(repoRoot, '.claude-plugin', 'plugin.json'));
const agyPlugin = readJson(path.join(repoRoot, '.antigravity-plugin', 'plugin.json'));
if (claudePlugin.name !== 'superpowers') fail('Claude plugin name must be "superpowers"');
if (agyPlugin.name !== 'superpowers') fail('Antigravity plugin name must be "superpowers"');
if (claudePlugin.version !== packageJson.version) {
  fail(`Claude plugin version ${claudePlugin.version} does not match package.json ${packageJson.version}`);
} else {
  pass(`Claude plugin version matches package.json (${packageJson.version})`);
}
if (agyPlugin.version !== packageJson.version) {
  fail(`Antigravity plugin version ${agyPlugin.version} does not match package.json ${packageJson.version}`);
} else {
  pass(`Antigravity plugin version matches package.json (${packageJson.version})`);
}

// 9. Portable bootstrap files, no hardcoded machine paths
console.log('\nValidating portable bootstrap files:');
const geminiPath = path.join(repoRoot, 'GEMINI.md');
if (!fs.existsSync(geminiPath)) {
  fail('Root GEMINI.md is missing');
} else {
  const gemini = fs.readFileSync(geminiPath, 'utf8');
  if (gemini.includes('@./.agents/skills/using-superpowers/SKILL.md')) {
    pass('GEMINI.md points at the Antigravity skills directory');
  } else {
    fail('GEMINI.md does not reference .agents/skills/using-superpowers/SKILL.md');
  }
  if (/file:\/\/\/[a-zA-Z]:/.test(gemini)) {
    fail('GEMINI.md contains a hardcoded absolute Windows file:// path');
  } else {
    pass('GEMINI.md contains no hardcoded absolute paths');
  }
}

const legacyGemini = path.join(repoRoot, '.gemini', 'GEMINI.md');
if (!fs.existsSync(legacyGemini)) {
  pass('Legacy .gemini/GEMINI.md removed');
} else {
  fail('Legacy .gemini/GEMINI.md still present');
}

console.log('\n' + (failed ? '❌ SKILLS VALIDATION FAILED' : '🎉 ALL SKILLS VALIDATION CHECKS PASSED'));
process.exit(failed ? 1 : 0);
