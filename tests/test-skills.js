const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const skillsDir = path.join(repoRoot, '.agent', 'skills');

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

const FORBIDDEN_GSD_SKILLS = [
  'gsd-codebase-mapper',
  'gsd-context-fetch',
  'gsd-context-health-monitor',
  'gsd-empirical-validation',
  'gsd-verifier'
];

let failed = false;

function fail(msg) {
  console.error(`  ❌ [FAIL] ${msg}`);
  failed = true;
}

function pass(msg) {
  console.log(`  ✅ [PASS] ${msg}`);
}

// 1. Check directory exists
if (!fs.existsSync(skillsDir)) {
  fail(`Skills directory not found at ${skillsDir}`);
  process.exit(1);
}

const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
const skillDirs = entries.filter(e => e.isDirectory()).map(e => e.name).sort();

console.log(`Found ${skillDirs.length} skill directories.`);

// 2. Check no forbidden GSD skills exist
for (const forbidden of FORBIDDEN_GSD_SKILLS) {
  if (skillDirs.includes(forbidden)) {
    fail(`Found removed GSD skill that should not exist: ${forbidden}`);
  } else {
    pass(`Confirmed absence of removed GSD skill: ${forbidden}`);
  }
}

// 3. Check all expected core skills exist
for (const core of EXPECTED_CORE_SKILLS) {
  if (!skillDirs.includes(core)) {
    fail(`Missing expected core skill: ${core}`);
  } else {
    pass(`Found expected core skill: ${core}`);
  }
}

// 4. Check all expected custom skills exist
for (const custom of EXPECTED_CUSTOM_SKILLS) {
  if (!skillDirs.includes(custom)) {
    fail(`Missing expected custom skill: ${custom}`);
  } else {
    pass(`Found expected custom skill: ${custom}`);
  }
}

// 5. Total count check
const expectedTotal = EXPECTED_CORE_SKILLS.length + EXPECTED_CUSTOM_SKILLS.length;
if (skillDirs.length === expectedTotal) {
  pass(`Exact count match: found ${skillDirs.length} skills (expected ${expectedTotal})`);
} else {
  fail(`Skill count mismatch: found ${skillDirs.length}, expected ${expectedTotal}`);
}

// 6. Validate YAML frontmatter in each SKILL.md
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

// 7. Validate specific upstream improvements
console.log('\nValidating specific upstream v6.4.2 features:');

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

const writingGoodTests = path.join(skillsDir, 'test-driven-development', 'writing-good-tests.md');
if (fs.existsSync(writingGoodTests)) {
  pass('test-driven-development includes writing-good-tests.md');
} else {
  fail(`Missing writing-good-tests.md at ${writingGoodTests}`);
}

const sddTaskReviewer = path.join(skillsDir, 'subagent-driven-development', 'task-reviewer-prompt.md');
if (fs.existsSync(sddTaskReviewer)) {
  pass('subagent-driven-development includes task-reviewer-prompt.md');
} else {
  fail(`Missing task-reviewer-prompt.md at ${sddTaskReviewer}`);
}

const diagSkill = path.join(skillsDir, 'diagnosing-superpowers', 'SKILL.md');
if (fs.existsSync(diagSkill)) {
  pass('diagnosing-superpowers skill exists and has SKILL.md');
} else {
  fail(`Missing diagnosing-superpowers SKILL.md at ${diagSkill}`);
}

console.log('\n' + (failed ? '❌ SKILLS VALIDATION FAILED' : '🎉 ALL SKILLS VALIDATION CHECKS PASSED'));
process.exit(failed ? 1 : 0);
