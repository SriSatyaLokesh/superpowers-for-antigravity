# antigravity Support Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add full superpowers support for antigravity.ai with a native JavaScript plugin that shares core functionality with the existing antigravity implementation.

**Architecture:** Extract common skill discovery/parsing logic into `lib/skills-core.js`, refactor antigravity to use it, then build antigravity plugin using their native plugin API with custom tools and session hooks.

**Tech Stack:** Node.js, JavaScript, antigravity Plugin API, Git worktrees

---

## Phase 1: Create Shared Core Module

### Task 1: Extract Frontmatter Parsing

**Files:**
- Create: `lib/skills-core.js`
- Reference: `.antigravity/superpowers-antigravity` (lines 40-74)

**Step 1: Create lib/skills-core.js with extractFrontmatter function**

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extract YAML frontmatter from a skill file.
 * Current format:
 * ---
 * name: skill-name
 * description: Use when [condition] - [what it does]
 * ---
 *
 * @param {string} filePath - Path to SKILL.md file
 * @returns {{name: string, description: string}}
 */
function extractFrontmatter(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        let inFrontmatter = false;
        let name = '';
        let description = '';

        for (const line of lines) {
            if (line.trim() === '---') {
                if (inFrontmatter) break;
                inFrontmatter = true;
                continue;
            }

            if (inFrontmatter) {
                const match = line.match(/^(\w+):\s*(.*)$/);
                if (match) {
                    const [, key, value] = match;
                    switch (key) {
                        case 'name':
                            name = value.trim();
                            break;
                        case 'description':
                            description = value.trim();
                            break;
                    }
                }
            }
        }

        return { name, description };
    } catch (error) {
        return { name: '', description: '' };
    }
}

module.exports = {
    extractFrontmatter
};
```

**Step 2: Verify file was created**

Run: `ls -l lib/skills-core.js`
Expected: File exists

**Step 3: Commit**

```bash
git add lib/skills-core.js
git commit -m "feat: create shared skills core module with frontmatter parser"
```

---

### Task 2: Extract Skill Discovery Logic

**Files:**
- Modify: `lib/skills-core.js`
- Reference: `.antigravity/superpowers-antigravity` (lines 97-136)

**Step 1: Add findSkillsInDir function to skills-core.js**

Add before `module.exports`:

```javascript
/**
 * Find all SKILL.md files in a directory recursively.
 *
 * @param {string} dir - Directory to search
 * @param {string} sourceType - 'personal' or 'superpowers' for namespacing
 * @param {number} maxDepth - Maximum recursion depth (default: 3)
 * @returns {Array<{path: string, name: string, description: string, sourceType: string}>}
 */
function findSkillsInDir(dir, sourceType, maxDepth = 3) {
    const skills = [];

    if (!fs.existsSync(dir)) return skills;

    function recurse(currentDir, depth) {
        if (depth > maxDepth) return;

        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                // Check for SKILL.md in this directory
                const skillFile = path.join(fullPath, 'SKILL.md');
                if (fs.existsSync(skillFile)) {
                    const { name, description } = extractFrontmatter(skillFile);
                    skills.push({
                        path: fullPath,
                        skillFile: skillFile,
                        name: name || entry.name,
                        description: description || '',
                        sourceType: sourceType
                    });
                }

                // Recurse into subdirectories
                recurse(fullPath, depth + 1);
            }
        }
    }

    recurse(dir, 0);
    return skills;
}
```

**Step 2: Update module.exports**

Replace the exports line with:

```javascript
module.exports = {
    extractFrontmatter,
    findSkillsInDir
};
```

**Step 3: Verify syntax**

Run: `node -c lib/skills-core.js`
Expected: No output (success)

**Step 4: Commit**

```bash
git add lib/skills-core.js
git commit -m "feat: add skill discovery function to core module"
```

---

### Task 3: Extract Skill Resolution Logic

**Files:**
- Modify: `lib/skills-core.js`
- Reference: `.antigravity/superpowers-antigravity` (lines 212-280)

**Step 1: Add resolveSkillPath function**

Add before `module.exports`:

```javascript
/**
 * Resolve a skill name to its file path, handling shadowing
 * (personal skills override superpowers skills).
 *
 * @param {string} skillName - Name like "superpowers:brainstorming" or "my-skill"
 * @param {string} superpowersDir - Path to superpowers skills directory
 * @param {string} personalDir - Path to personal skills directory
 * @returns {{skillFile: string, sourceType: string, skillPath: string} | null}
 */
function resolveSkillPath(skillName, superpowersDir, personalDir) {
    // Strip superpowers: prefix if present
    const forceSuperpowers = skillName.startsWith('superpowers:');
    const actualSkillName = forceSuperpowers ? skillName.replace(/^superpowers:/, '') : skillName;

    // Try personal skills first (unless explicitly superpowers:)
    if (!forceSuperpowers && personalDir) {
        const personalPath = path.join(personalDir, actualSkillName);
        const personalSkillFile = path.join(personalPath, 'SKILL.md');
        if (fs.existsSync(personalSkillFile)) {
            return {
                skillFile: personalSkillFile,
                sourceType: 'personal',
                skillPath: actualSkillName
            };
        }
    }

    // Try superpowers skills
    if (superpowersDir) {
        const superpowersPath = path.join(superpowersDir, actualSkillName);
        const superpowersSkillFile = path.join(superpowersPath, 'SKILL.md');
        if (fs.existsSync(superpowersSkillFile)) {
            return {
                skillFile: superpowersSkillFile,
                sourceType: 'superpowers',
                skillPath: actualSkillName
            };
        }
    }

    return null;
}
```

**Step 2: Update module.exports**

```javascript
module.exports = {
    extractFrontmatter,
    findSkillsInDir,
    resolveSkillPath
};
```

**Step 3: Verify syntax**

Run: `node -c lib/skills-core.js`
Expected: No output

**Step 4: Commit**

```bash
git add lib/skills-core.js
git commit -m "feat: add skill path resolution with shadowing support"
```

---

### Task 4: Extract Update Check Logic

**Files:**
- Modify: `lib/skills-core.js`
- Reference: `.antigravity/superpowers-antigravity` (lines 16-38)

**Step 1: Add checkForUpdates function**

Add at top after requires:

```javascript
const { execSync } = require('child_process');
```

Add before `module.exports`:

```javascript
/**
 * Check if a git repository has updates available.
 *
 * @param {string} repoDir - Path to git repository
 * @returns {boolean} - True if updates are available
 */
function checkForUpdates(repoDir) {
    try {
        // Quick check with 3 second timeout to avoid delays if network is down
        const output = execSync('git fetch origin && git status --porcelain=v1 --branch', {
            cwd: repoDir,
            timeout: 3000,
            encoding: 'utf8',
            stdio: 'pipe'
        });

        // Parse git status output to see if we're behind
        const statusLines = output.split('\n');
        for (const line of statusLines) {
            if (line.startsWith('## ') && line.includes('[behind ')) {
                return true; // We're behind remote
            }
        }
        return false; // Up to date
    } catch (error) {
        // Network down, git error, timeout, etc. - don't block bootstrap
        return false;
    }
}
```

**Step 2: Update module.exports**

```javascript
module.exports = {
    extractFrontmatter,
    findSkillsInDir,
    resolveSkillPath,
    checkForUpdates
};
```

**Step 3: Verify syntax**

Run: `node -c lib/skills-core.js`
Expected: No output

**Step 4: Commit**

```bash
git add lib/skills-core.js
git commit -m "feat: add git update checking to core module"
```

---

## Phase 2: Refactor antigravity to Use Shared Core

### Task 5: Update antigravity to Import Shared Core

**Files:**
- Modify: `.antigravity/superpowers-antigravity` (add import at top)

**Step 1: Add import statement**

After the existing requires at top of file (around line 6), add:

```javascript
const skillsCore = require('../lib/skills-core');
```

**Step 2: Verify syntax**

Run: `node -c .antigravity/superpowers-antigravity`
Expected: No output

**Step 3: Commit**

```bash
git add .antigravity/superpowers-antigravity
git commit -m "refactor: import shared skills core in antigravity"
```

---

### Task 6: Replace extractFrontmatter with Core Version

**Files:**
- Modify: `.antigravity/superpowers-antigravity` (lines 40-74)

**Step 1: Remove local extractFrontmatter function**

Delete lines 40-74 (the entire extractFrontmatter function definition).

**Step 2: Update all extractFrontmatter calls**

Find and replace all calls from `extractFrontmatter(` to `skillsCore.extractFrontmatter(`

Affected lines approximately: 90, 310

**Step 3: Verify script still works**

Run: `.antigravity/superpowers-antigravity find-skills | head -20`
Expected: Shows list of skills

**Step 4: Commit**

```bash
git add .antigravity/superpowers-antigravity
git commit -m "refactor: use shared extractFrontmatter in antigravity"
```

---

### Task 7: Replace findSkillsInDir with Core Version

**Files:**
- Modify: `.antigravity/superpowers-antigravity` (lines 97-136, approximately)

**Step 1: Remove local findSkillsInDir function**

Delete the entire `findSkillsInDir` function definition (approximately lines 97-136).

**Step 2: Update all findSkillsInDir calls**

Replace calls from `findSkillsInDir(` to `skillsCore.findSkillsInDir(`

**Step 3: Verify script still works**

Run: `.antigravity/superpowers-antigravity find-skills | head -20`
Expected: Shows list of skills

**Step 4: Commit**

```bash
git add .antigravity/superpowers-antigravity
git commit -m "refactor: use shared findSkillsInDir in antigravity"
```

---

### Task 8: Replace checkForUpdates with Core Version

**Files:**
- Modify: `.antigravity/superpowers-antigravity` (lines 16-38, approximately)

**Step 1: Remove local checkForUpdates function**

Delete the entire `checkForUpdates` function definition.

**Step 2: Update all checkForUpdates calls**

Replace calls from `checkForUpdates(` to `skillsCore.checkForUpdates(`

**Step 3: Verify script still works**

Run: `.antigravity/superpowers-antigravity bootstrap | head -50`
Expected: Shows bootstrap content

**Step 4: Commit**

```bash
git add .antigravity/superpowers-antigravity
git commit -m "refactor: use shared checkForUpdates in antigravity"
```

---

## Phase 3: Build antigravity Plugin

### Task 9: Create antigravity Plugin Directory Structure

**Files:**
- Create: `.antigravity/plugin/superpowers.js`

**Step 1: Create directory**

Run: `mkdir -p .antigravity/plugin`

**Step 2: Create basic plugin file**

```javascript
#!/usr/bin/env node

/**
 * Superpowers plugin for antigravity.ai
 *
 * Provides custom tools for loading and discovering skills,
 * with automatic bootstrap on session start.
 */

const skillsCore = require('../../lib/skills-core');
const path = require('path');
const fs = require('fs');
const os = require('os');

const homeDir = os.homedir();
const superpowersSkillsDir = path.join(homeDir, '.config/antigravity/superpowers/skills');
const personalSkillsDir = path.join(homeDir, '.config/antigravity/skills');

/**
 * antigravity plugin entry point
 */
export const SuperpowersPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // Custom tools and hooks will go here
  };
};
```

**Step 3: Verify file was created**

Run: `ls -l .antigravity/plugin/superpowers.js`
Expected: File exists

**Step 4: Commit**

```bash
git add .antigravity/plugin/superpowers.js
git commit -m "feat: create antigravity plugin scaffold"
```

---

### Task 10: Implement use_skill Tool

**Files:**
- Modify: `.antigravity/plugin/superpowers.js`

**Step 1: Add use_skill tool implementation**

Replace the plugin return statement with:

```javascript
export const SuperpowersPlugin = async ({ project, client, $, directory, worktree }) => {
  // Import zod for schema validation
  const { z } = await import('zod');

  return {
    tools: [
      {
        name: 'use_skill',
        description: 'Load and read a specific skill to guide your work. Skills contain proven workflows, mandatory processes, and expert techniques.',
        schema: z.object({
          skill_name: z.string().describe('Name of the skill to load (e.g., "superpowers:brainstorming" or "my-custom-skill")')
        }),
        execute: async ({ skill_name }) => {
          // Resolve skill path (handles shadowing: personal > superpowers)
          const resolved = skillsCore.resolveSkillPath(
            skill_name,
            superpowersSkillsDir,
            personalSkillsDir
          );

          if (!resolved) {
            return `Error: Skill "${skill_name}" not found.\n\nRun find_skills to see available skills.`;
          }

          // Read skill content
          const fullContent = fs.readFileSync(resolved.skillFile, 'utf8');
          const { name, description } = skillsCore.extractFrontmatter(resolved.skillFile);

          // Extract content after frontmatter
          const lines = fullContent.split('\n');
          let inFrontmatter = false;
          let frontmatterEnded = false;
          const contentLines = [];

          for (const line of lines) {
            if (line.trim() === '---') {
              if (inFrontmatter) {
                frontmatterEnded = true;
                continue;
              }
              inFrontmatter = true;
              continue;
            }

            if (frontmatterEnded || !inFrontmatter) {
              contentLines.push(line);
            }
          }

          const content = contentLines.join('\n').trim();
          const skillDirectory = path.dirname(resolved.skillFile);

          // Format output similar to Antigravity's Skill tool
          return `# ${name || skill_name}
# ${description || ''}
# Supporting tools and docs are in ${skillDirectory}
# ============================================

${content}`;
        }
      }
    ]
  };
};
```

**Step 2: Verify syntax**

Run: `node -c .antigravity/plugin/superpowers.js`
Expected: No output

**Step 3: Commit**

```bash
git add .antigravity/plugin/superpowers.js
git commit -m "feat: implement use_skill tool for antigravity"
```

---

### Task 11: Implement find_skills Tool

**Files:**
- Modify: `.antigravity/plugin/superpowers.js`

**Step 1: Add find_skills tool to tools array**

Add after the use_skill tool definition, before closing the tools array:

```javascript
      {
        name: 'find_skills',
        description: 'List all available skills in the superpowers and personal skill libraries.',
        schema: z.object({}),
        execute: async () => {
          // Find skills in both directories
          const superpowersSkills = skillsCore.findSkillsInDir(
            superpowersSkillsDir,
            'superpowers',
            3
          );
          const personalSkills = skillsCore.findSkillsInDir(
            personalSkillsDir,
            'personal',
            3
          );

          // Combine and format skills list
          const allSkills = [...personalSkills, ...superpowersSkills];

          if (allSkills.length === 0) {
            return 'No skills found. Install superpowers skills to ~/.config/antigravity/superpowers/skills/';
          }

          let output = 'Available skills:\n\n';

          for (const skill of allSkills) {
            const namespace = skill.sourceType === 'personal' ? '' : 'superpowers:';
            const skillName = skill.name || path.basename(skill.path);

            output += `${namespace}${skillName}\n`;
            if (skill.description) {
              output += `  ${skill.description}\n`;
            }
            output += `  Directory: ${skill.path}\n\n`;
          }

          return output;
        }
      }
```

**Step 2: Verify syntax**

Run: `node -c .antigravity/plugin/superpowers.js`
Expected: No output

**Step 3: Commit**

```bash
git add .antigravity/plugin/superpowers.js
git commit -m "feat: implement find_skills tool for antigravity"
```

---

### Task 12: Implement Session Start Hook

**Files:**
- Modify: `.antigravity/plugin/superpowers.js`

**Step 1: Add session.started hook**

After the tools array, add:

```javascript
    'session.started': async () => {
      // Read using-superpowers skill content
      const usingSuperpowersPath = skillsCore.resolveSkillPath(
        'using-superpowers',
        superpowersSkillsDir,
        personalSkillsDir
      );

      let usingSuperpowersContent = '';
      if (usingSuperpowersPath) {
        const fullContent = fs.readFileSync(usingSuperpowersPath.skillFile, 'utf8');
        // Strip frontmatter
        const lines = fullContent.split('\n');
        let inFrontmatter = false;
        let frontmatterEnded = false;
        const contentLines = [];

        for (const line of lines) {
          if (line.trim() === '---') {
            if (inFrontmatter) {
              frontmatterEnded = true;
              continue;
            }
            inFrontmatter = true;
            continue;
          }

          if (frontmatterEnded || !inFrontmatter) {
            contentLines.push(line);
          }
        }

        usingSuperpowersContent = contentLines.join('\n').trim();
      }

      // Tool mapping instructions
      const toolMapping = `
**Tool Mapping for antigravity:**
When skills reference tools you don't have, substitute antigravity equivalents:
- \`TodoWrite\` → \`update_plan\` (your planning/task tracking tool)
- \`Task\` tool with subagents → Use antigravity's subagent system (@mention syntax or automatic dispatch)
- \`Skill\` tool → \`use_skill\` custom tool (already available)
- \`Read\`, \`Write\`, \`Edit\`, \`Bash\` → Use your native tools

**Skill directories contain supporting files:**
- Scripts you can run with bash tool
- Additional documentation you can read
- Utilities and helpers specific to that skill

**Skills naming:**
- Superpowers skills: \`superpowers:skill-name\` (from ~/.config/antigravity/superpowers/skills/)
- Personal skills: \`skill-name\` (from ~/.config/antigravity/skills/)
- Personal skills override superpowers skills when names match
`;

      // Check for updates (non-blocking)
      const hasUpdates = skillsCore.checkForUpdates(
        path.join(homeDir, '.config/antigravity/superpowers')
      );

      const updateNotice = hasUpdates ?
        '\n\n⚠️ **Updates available!** Run `cd ~/.config/antigravity/superpowers && git pull` to update superpowers.' :
        '';

      // Return context to inject into session
      return {
        context: `<EXTREMELY_IMPORTANT>
You have superpowers.

**Below is the full content of your 'superpowers:using-superpowers' skill - your introduction to using skills. For all other skills, use the 'use_skill' tool:**

${usingSuperpowersContent}

${toolMapping}${updateNotice}
</EXTREMELY_IMPORTANT>`
      };
    }
```

**Step 2: Verify syntax**

Run: `node -c .antigravity/plugin/superpowers.js`
Expected: No output

**Step 3: Commit**

```bash
git add .antigravity/plugin/superpowers.js
git commit -m "feat: implement session.started hook for antigravity"
```

---

## Phase 4: Documentation

### Task 13: Create antigravity Installation Guide

**Files:**
- Create: `.antigravity/INSTALL.md`

**Step 1: Create installation guide**

```markdown
# Installing Superpowers for antigravity

## Prerequisites

- [antigravity.ai](https://antigravity.ai) installed
- Node.js installed
- Git installed

## Installation Steps

### 1. Install Superpowers Skills

```bash
# Clone superpowers skills to antigravity config directory
mkdir -p ~/.config/antigravity/superpowers
git clone https://github.com/obra/superpowers.git ~/.config/antigravity/superpowers
```

### 2. Install the Plugin

The plugin is included in the superpowers repository you just cloned.

antigravity will automatically discover it from:
- `~/.config/antigravity/superpowers/.antigravity/plugin/superpowers.js`

Or you can link it to the project-local plugin directory:

```bash
# In your antigravity project
mkdir -p .antigravity/plugin
ln -s ~/.config/antigravity/superpowers/.antigravity/plugin/superpowers.js .antigravity/plugin/superpowers.js
```

### 3. Restart antigravity

Restart antigravity to load the plugin. On the next session, you should see:

```
You have superpowers.
```

## Usage

### Finding Skills

Use the `find_skills` tool to list all available skills:

```
use find_skills tool
```

### Loading a Skill

Use the `use_skill` tool to load a specific skill:

```
use use_skill tool with skill_name: "superpowers:brainstorming"
```

### Personal Skills

Create your own skills in `~/.config/antigravity/skills/`:

```bash
mkdir -p ~/.config/antigravity/skills/my-skill
```

Create `~/.config/antigravity/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[Your skill content here]
```

Personal skills override superpowers skills with the same name.

## Updating

```bash
cd ~/.config/antigravity/superpowers
git pull
```

## Troubleshooting

### Plugin not loading

1. Check plugin file exists: `ls ~/.config/antigravity/superpowers/.antigravity/plugin/superpowers.js`
2. Check antigravity logs for errors
3. Verify Node.js is installed: `node --version`

### Skills not found

1. Verify skills directory exists: `ls ~/.config/antigravity/superpowers/skills`
2. Use `find_skills` tool to see what's discovered
3. Check file structure: each skill should have a `SKILL.md` file

### Tool mapping issues

When a skill references a Antigravity tool you don't have:
- `TodoWrite` → use `update_plan`
- `Task` with subagents → use `@mention` syntax to invoke antigravity subagents
- `Skill` → use `use_skill` tool
- File operations → use your native tools

## Getting Help

- Report issues: https://github.com/obra/superpowers/issues
- Documentation: https://github.com/obra/superpowers
```

**Step 2: Verify file created**

Run: `ls -l .antigravity/INSTALL.md`
Expected: File exists

**Step 3: Commit**

```bash
git add .antigravity/INSTALL.md
git commit -m "docs: add antigravity installation guide"
```

---

### Task 14: Update Main README

**Files:**
- Modify: `README.md`

**Step 1: Add antigravity section**

Find the section about supported platforms (search for "antigravity" in the file), and add after it:

```markdown
### antigravity

Superpowers works with [antigravity.ai](https://antigravity.ai) through a native JavaScript plugin.

**Installation:** See [.antigravity/INSTALL.md](.antigravity/INSTALL.md)

**Features:**
- Custom tools: `use_skill` and `find_skills`
- Automatic session bootstrap
- Personal skills with shadowing
- Supporting files and scripts access
```

**Step 2: Verify formatting**

Run: `grep -A 10 "### antigravity" README.md`
Expected: Shows the section you added

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add antigravity support to readme"
```

---

### Task 15: Update Release Notes

**Files:**
- Modify: `RELEASE-NOTES.md`

**Step 1: Add entry for antigravity support**

At the top of the file (after the header), add:

```markdown
## [Unreleased]

### Added

- **antigravity Support**: Native JavaScript plugin for antigravity.ai
  - Custom tools: `use_skill` and `find_skills`
  - Automatic session bootstrap with tool mapping instructions
  - Shared core module (`lib/skills-core.js`) for code reuse
  - Installation guide in `.antigravity/INSTALL.md`

### Changed

- **Refactored antigravity Implementation**: Now uses shared `lib/skills-core.js` module
  - Eliminates code duplication between antigravity and antigravity
  - Single source of truth for skill discovery and parsing

---

```

**Step 2: Verify formatting**

Run: `head -30 RELEASE-NOTES.md`
Expected: Shows your new section

**Step 3: Commit**

```bash
git add RELEASE-NOTES.md
git commit -m "docs: add antigravity support to release notes"
```

---

## Phase 5: Final Verification

### Task 16: Test antigravity Still Works

**Files:**
- Test: `.antigravity/superpowers-antigravity`

**Step 1: Test find-skills command**

Run: `.antigravity/superpowers-antigravity find-skills | head -20`
Expected: Shows list of skills with names and descriptions

**Step 2: Test use-skill command**

Run: `.antigravity/superpowers-antigravity use-skill superpowers:brainstorming | head -20`
Expected: Shows brainstorming skill content

**Step 3: Test bootstrap command**

Run: `.antigravity/superpowers-antigravity bootstrap | head -30`
Expected: Shows bootstrap content with instructions

**Step 4: If all tests pass, record success**

No commit needed - this is verification only.

---

### Task 17: Verify File Structure

**Files:**
- Check: All new files exist

**Step 1: Verify all files created**

Run:
```bash
ls -l lib/skills-core.js
ls -l .antigravity/plugin/superpowers.js
ls -l .antigravity/INSTALL.md
```

Expected: All files exist

**Step 2: Verify directory structure**

Run: `tree -L 2 .antigravity/` (or `find .antigravity -type f` if tree not available)
Expected:
```
.antigravity/
├── INSTALL.md
└── plugin/
    └── superpowers.js
```

**Step 3: If structure correct, proceed**

No commit needed - this is verification only.

---

### Task 18: Final Commit and Summary

**Files:**
- Check: `git status`

**Step 1: Check git status**

Run: `git status`
Expected: Working tree clean, all changes committed

**Step 2: Review commit log**

Run: `git log --oneline -20`
Expected: Shows all commits from this implementation

**Step 3: Create summary document**

Create a completion summary showing:
- Total commits made
- Files created: `lib/skills-core.js`, `.antigravity/plugin/superpowers.js`, `.antigravity/INSTALL.md`
- Files modified: `.antigravity/superpowers-antigravity`, `README.md`, `RELEASE-NOTES.md`
- Testing performed: antigravity commands verified
- Ready for: Testing with actual antigravity installation

**Step 4: Report completion**

Present summary to user and offer to:
1. Push to remote
2. Create pull request
3. Test with real antigravity installation (requires antigravity installed)

---

## Testing Guide (Manual - Requires antigravity)

These steps require antigravity to be installed and are not part of the automated implementation:

1. **Install skills**: Follow `.antigravity/INSTALL.md`
2. **Start antigravity session**: Verify bootstrap appears
3. **Test find_skills**: Should list all available skills
4. **Test use_skill**: Load a skill and verify content appears
5. **Test supporting files**: Verify skill directory paths are accessible
6. **Test personal skills**: Create a personal skill and verify it shadows core
7. **Test tool mapping**: Verify TodoWrite → update_plan mapping works

## Success Criteria

- [ ] `lib/skills-core.js` created with all core functions
- [ ] `.antigravity/superpowers-antigravity` refactored to use shared core
- [ ] antigravity commands still work (find-skills, use-skill, bootstrap)
- [ ] `.antigravity/plugin/superpowers.js` created with tools and hooks
- [ ] Installation guide created
- [ ] README and RELEASE-NOTES updated
- [ ] All changes committed
- [ ] Working tree clean
