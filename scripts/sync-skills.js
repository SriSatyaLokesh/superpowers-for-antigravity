#!/usr/bin/env node

/**
 * Sync upstream Superpowers skills into the Antigravity workspace layout.
 *
 * `skills/` is the canonical upstream tree (kept byte-for-byte identical to
 * obra/superpowers so future syncs are a plain `git checkout upstream/main --
 * skills`). Antigravity discovers workspace skills in `.agents/skills/`, so
 * that directory is generated from `skills/` plus the fork-specific skills
 * that only exist here.
 *
 * Usage:
 *   node scripts/sync-skills.js          # copy upstream skills -> .agents/skills
 *   node scripts/sync-skills.js --check  # verify parity, exit 1 on drift
 *   node scripts/sync-skills.js --verbose
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const UPSTREAM_SKILLS = path.join(REPO_ROOT, 'skills');
const ANTIGRAVITY_SKILLS = path.join(REPO_ROOT, '.agents', 'skills');

const args = new Set(process.argv.slice(2));
const CHECK_ONLY = args.has('--check');
const VERBOSE = args.has('--verbose');

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const child of listFiles(full)) {
        results.push(path.join(entry.name, child));
      }
    } else if (entry.isFile()) {
      results.push(entry.name);
    }
  }

  return results.sort();
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(source, target);
    } else if (entry.isFile()) {
      fs.copyFileSync(source, target);
    }
  }
}

function compareSkill(name) {
  const source = path.join(UPSTREAM_SKILLS, name);
  const target = path.join(ANTIGRAVITY_SKILLS, name);
  const problems = [];

  if (!fs.existsSync(target)) {
    return [`${name}: missing from .agents/skills`];
  }

  const sourceFiles = listFiles(source);
  const targetFiles = listFiles(target);

  for (const file of sourceFiles) {
    if (!targetFiles.includes(file)) {
      problems.push(`${name}: missing file ${file}`);
      continue;
    }
    const a = fs.readFileSync(path.join(source, file));
    const b = fs.readFileSync(path.join(target, file));
    if (!a.equals(b)) {
      problems.push(`${name}: content differs in ${file}`);
    }
  }

  const removed = targetFiles.filter((file) => !sourceFiles.includes(file));
  for (const file of removed) {
    problems.push(`${name}: stale file ${file} (not in upstream)`);
  }

  return problems;
}

function main() {
  if (!fs.existsSync(UPSTREAM_SKILLS)) {
    console.error(`❌ Canonical upstream skills directory not found: ${UPSTREAM_SKILLS}`);
    process.exit(1);
  }

  const upstream = listDirs(UPSTREAM_SKILLS);
  console.log(`📚 Upstream core skills: ${upstream.length}`);

  if (CHECK_ONLY) {
    const custom = listDirs(ANTIGRAVITY_SKILLS).filter((name) => !upstream.includes(name));
    const problems = upstream.flatMap(compareSkill);

    if (problems.length > 0) {
      console.error('\n❌ Skill parity check failed:');
      for (const problem of problems) console.error(`   - ${problem}`);
      console.error('\nRun `npm run sync:skills` to regenerate .agents/skills.');
      process.exit(1);
    }

    console.log(`✅ Upstream core skills match .agents/skills byte-for-byte.`);
    console.log(`🧩 Fork-specific skills: ${custom.length} (${custom.join(', ')})`);
    console.log(`📦 Total workspace skills: ${listDirs(ANTIGRAVITY_SKILLS).length}`);
    return;
  }

  let copied = 0;
  for (const name of upstream) {
    const source = path.join(UPSTREAM_SKILLS, name);
    const target = path.join(ANTIGRAVITY_SKILLS, name);

    // Replace the directory so files deleted upstream do not linger here.
    fs.rmSync(target, { recursive: true, force: true });
    copyDir(source, target);
    copied += 1;
    if (VERBOSE) console.log(`   ✓ ${name}`);
  }

  const all = listDirs(ANTIGRAVITY_SKILLS);
  console.log(`✅ Synced ${copied} upstream skills into .agents/skills.`);
  console.log(`📦 Total workspace skills: ${all.length}`);
}

main();
