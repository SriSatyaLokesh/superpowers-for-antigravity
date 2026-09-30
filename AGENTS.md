# 🤖 AGENTS.md — Agent Operating Standards & GitHub Workflow Rules

> **Single Source of Truth for Autonomous AI Agents** working in the `SriSatyaLokesh/superpowers-for-antigravity` repository.
> Every agent (Claude, Gemini, Antigravity `agy`, Cursor, Codex) MUST strictly obey these rules on every turn.

---

## ⚡ Core Philosophy

1. **Process Over Guessing** — Follow the 5-phase Superpowers lifecycle:
   `Brainstorm (/brainstorm)` → `Plan (/plan)` → `Execute (/execute with TDD)` → `Review (/review)` → `Verify (Hard Proof)`.
2. **Evidence Before Assertion** — Never declare a task complete or a test passing without captured terminal output in the conversation transcript.
3. **Atomic Changes** — One task = one small verifiable step. Keep changes focused and clean.

---

## 🔄 Mandatory GitHub Workflow & PR Auto-Closing Rules

To prevent orphan issues and ensure all GitHub Issues automatically close when Pull Requests merge, all agents MUST execute this exact 6-step lifecycle:

### Step 1: Create the GitHub Issue First
Before touching any code, create an issue to document the task scope:
```bash
gh issue create --title "<type>(<scope>): <clear description>" --body "<issue description and acceptance criteria>"
```
Capture and record the resulting issue number: `#<issue-number>`.

---

### Step 2: Synchronize with Latest `main`
Always base your feature branch on the freshest state of `main`:
```bash
git checkout main
git pull origin main
git checkout -b <type>/<short-feature-name>
```

---

### Step 3: Implement & Test with TDD
- Write failing tests first (RED).
- Implement minimal code to pass (GREEN).
- Refactor and run the full test suite:
  ```bash
  npm test
  ```
  Both `tests/test-skills.js` and `tests/test-init.js` MUST pass 100%.

---

### Step 4: Open Pull Request with Raw Closing Keyword
Open the PR using `gh pr create`. You MUST format the closing reference on its own line:

```bash
gh pr create --title "<type>(<scope>): <clear description>" --body "## 📋 Description of Changes
<summary of what was changed>

## 🔗 Related Issue
Closes #<issue-number>

## 🧬 Type of Change
- [x] <type>

## ✅ Contributor Checklist
- [x] Branch is rebased on latest main with 0 conflicts.
- [x] All tests (npm test) pass with hard terminal proof.
" --base main
```

> [!CAUTION]
> **SYNTAX RULE:**
> - Write `Closes #<issue-number>` as plain text on its own line.
> - **DO NOT** enclose in backticks or code blocks (e.g. `Closes #5` is FORBIDDEN). Backticks break GitHub's issue-closing regex parser.

---

### Step 5: Merge with Explicit Squash Message
GitHub's squash merge command can strip the PR body unless explicitly provided. To ensure GitHub's default branch commit history triggers auto-closing, **always pass `--subject` and `--body`**:

```bash
gh pr merge <pr-number> --squash \
  --subject "<type>(<scope>): <summary> (Closes #<issue-number>)" \
  --body "Closes #<issue-number>"
```

Immediately verify that the issue transitioned to `CLOSED`:
```bash
gh issue view <issue-number> --json state
```

> [!IMPORTANT]
> If `gh issue view` does not report `"state": "CLOSED"`, immediately close it manually:
> ```bash
> gh issue close <issue-number> --comment "Closed automatically via PR #<pr-number>"
> ```

---

### Step 6: Fast-Forward Local `main`
Never leave local workspace on a detached or stale branch:
```bash
git checkout main
git pull origin main
git status
npm test
```
Verify `git status` reports: `Your branch is up to date with 'origin/main'. nothing to commit, working tree clean`.

---

## 🛠️ Antigravity Tool Usage Guidelines

- **File Modifications:** Prefer targeted `replace_file_content` edits over wholesale file overwrites whenever possible.
- **Terminal Execution:** When running commands, inspect stdout and stderr. Never suppress errors.
- **Network Requests:** Use `read_url_content` or `search_web` for inspecting remote pages or APIs.
- **No Hallucinated Paths:** Always verify directories exist using `run_command` or read tools before creating or referencing paths.

---

*Maintain the process. Build better software.*
