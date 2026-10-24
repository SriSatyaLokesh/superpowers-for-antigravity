# Claude Superpowers Sync & Drop-in Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pull latest upstream hook performance and shell resilience updates from `obra/superpowers`, ensure 100% drop-in compatibility for users switching from Claude Superpowers to this plugin (preserving plans, ledgers, and files), and verify via automated tests.

**Architecture:** Update hook files (`hooks/hooks.json`, `hooks/run-hook.cmd`, `hooks/session-start`) to match upstream's zero-fork Windows optimization and polyglot shell fallback; update test suite in `tests/test-skills.js` to lock in hook resilience; update documentation (`README.md`, `CHANGELOG.md`, `RELEASE-NOTES.md`) with a dedicated Claude Superpowers migration guide.

**Tech Stack:** Node.js, Bash/CMD polyglot hooks, Git, GitHub CLI.

**Spec:** Issue #13.

## Global Constraints

- Preserve upstream byte-for-byte fidelity in `skills/` (15 core skills).
- Preserve all 24 workspace skills in `.agents/skills/`.
- Ensure zero regression in `tests/test-skills.js`, `tests/test-init.js`, `tests/test-readme.js`, and `scripts/sync-skills.js`.
- All tests in `npm test` must pass 100%.

---

### Task 1: Add automated tests for hook resilience and Claude migration compatibility (TDD RED)

**Files:**
- Modify: `tests/test-skills.js`

**Steps:**
- [ ] Add assertions in `tests/test-skills.js` checking:
  - `hooks/hooks.json` includes `powershell` dispatch for Windows.
  - `hooks/run-hook.cmd` includes zsh fallback and zero-subshell directory resolution.
  - `hooks/session-start` uses zero-subshell read builtin and EPIPE trap.
  - Verification that Claude plugin metadata matches drop-in plugin name `superpowers`.
- [ ] Run `npm test` to observe test failure (RED).

`<verify>` `npm test` shows failures on the new hook assertions before code changes.

---

### Task 2: Implement upstream hook performance & shell compatibility fixes (TDD GREEN)

**Files:**
- Modify: `hooks/hooks.json`
- Modify: `hooks/run-hook.cmd`
- Modify: `hooks/session-start`

**Steps:**
- [ ] Update `hooks/hooks.json` with the PowerShell hook execution entry.
- [ ] Update `hooks/run-hook.cmd` with zero-subshell directory resolution and zsh/sh fallback logic.
- [ ] Update `hooks/session-start` with the zero-fork read loop, single-pass variable substitution, and `trap '' PIPE`.
- [ ] Run `npm test` to verify all tests pass (GREEN).
- [ ] Commit: `git commit -m "fix(hooks): sync upstream zero-fork SessionStart hook and shell fallbacks"`

`<verify>` `npm test` passes 100%.

---

### Task 3: Document Claude Superpowers Drop-In Migration Guide

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `RELEASE-NOTES.md`

**Steps:**
- [ ] Add a dedicated "Switching from Claude Superpowers (`obra/superpowers`)" section to `README.md` explaining:
  - How to switch the plugin in Claude Code (`/plugin marketplace add SriSatyaLokesh/superpowers-for-antigravity`, `/plugin install superpowers@superpowers-antigravity`).
  - How existing plans in `docs/plans/` and ledgers in `.superpowers/sdd/` are 100% preserved and resumed without lost state.
  - How to take advantage of the 9 extra engineering skills (`--claude`).
- [ ] Update `CHANGELOG.md` and `RELEASE-NOTES.md` detailing the hook performance fixes and Claude migration compatibility.
- [ ] Verify Jekyll and formatting checks via `node tests/test-readme.js`.
- [ ] Commit: `git commit -m "docs: add Claude Superpowers drop-in migration guide and update changelog"`

`<verify>` `node tests/test-readme.js` and `npm test` pass.

---

### Task 4: Final verification, PR submission, and workflow completion

**Files:**
- None (verification & git operations)

**Steps:**
- [ ] Run full test suite: `npm test`.
- [ ] Verify git status is clean and push branch: `git push -u origin chore/claude-superpowers-sync-and-migration`.
- [ ] Open Pull Request using `gh pr create` with `Closes #13`.
- [ ] Merge PR using `gh pr merge --squash` with explicit subject and body.
- [ ] Verify issue #13 is CLOSED.
- [ ] Fast-forward local `main`: `git checkout main`, `git pull origin main`, `git status`, `npm test`.

`<verify>` `gh issue view 13 --json state` reports CLOSED, `git status` reports working tree clean.
