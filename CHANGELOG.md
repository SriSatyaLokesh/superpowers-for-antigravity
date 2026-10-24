# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-10-24

### Seamless Claude Session Resumption & Upstream Hook Performance

#### Added
- **Claude Superpowers Session Resumption**:
  - `antigravity-tools.md` officially defines session resumption protocols for projects started in Claude Code with `obra/superpowers`.
  - In-flight implementation plans in `docs/plans/` and progress ledgers in `.superpowers/sdd/<plan>/progress.md` are 100% recognized and resumed in Antigravity (`agy`) without repeating completed work.
  - Dedicated "Continuing Claude Superpowers Sessions in Antigravity" guide added to README with full compatibility matrix.
- **PowerShell Hook Dispatch**: added `powershell` hook command in `hooks/hooks.json` for Copilot CLI and Windows shells (`obra/superpowers#2189`).

#### Changed
- **Zero-Subshell Hook Wrapper (`hooks/run-hook.cmd`)**: Unix portion uses parameter expansion instead of subshell `$(cd ... && pwd)`, saving fork latency on Windows Git Bash, with zsh/sh fallback when bash is absent (`obra/superpowers#2503`).
- **Zero-Fork SessionStart Hook (`hooks/session-start`)**:
  - Eliminates all command substitutions and pipes; reads `using-superpowers` skill via bash `read` builtin.
  - Absorbs EPIPE cleanly with `trap '' PIPE` and `printf 2>/dev/null` (`obra/superpowers#2081`).
  - Parameter substitution string escaping executes orders of magnitude faster.
- **Synchronized Skills**: updated `skills/` and `.agents/skills` to incorporate Antigravity session resumption guidance.

## [2.0.0] - 2026-10-22

### Upstream Synchronization (obra/superpowers v7.0.1) & Dual-Harness Support

#### Added
- **Canonical upstream tree**: `skills/` now mirrors `obra/superpowers` **v7.0.1** (`2ce8aa1`) byte-for-byte for all 15 core skills.
- **Claude Code support**: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and the `hooks/` session bootstrap (`hooks.json`, `run-hook.cmd`, `session-start`).
- **Antigravity plugin support**: `.antigravity-plugin/plugin.json` and `.agents/plugins/marketplace.json`, so `agy plugin validate .` and `agy plugin install <repo>` work.
- **Root `GEMINI.md`**: portable `@`-reference bootstrap for workspace and plugin installs.
- **`scripts/sync-skills.js`**: regenerates the Antigravity view from the canonical tree, with a `--check` drift guard wired into `npm test`.
- **`npx ... --claude`**: optional Claude Code project installation into `.claude/skills/`.

#### Changed
- **Antigravity skill location**: `.agent/skills/` → **`.agents/skills/`**, the path the `agy` CLI actually scans. Workflows moved to `.agents/workflows/`.
- **Installer (`scripts/init.js`)**: installs `.agents/`, merges a marked bootstrap block into `GEMINI.md` instead of overwriting it, and is idempotent.
- **`brainstorming`**: rebuilt upstream skill — reads project context before asking, plays requests back, sizes the work, and writes the design doc before building.
- **`subagent-driven-development`** and **`writing-skills`**: supporting docs moved into `references/` so they survive Claude Code compaction.
- **Documentation**: README, `antigravity/INSTALL.md`, and CONTRIBUTING updated for the dual-harness layout and `agy` 1.4.x behavior.

#### Removed
- **`.gemini/GEMINI.md`**: replaced by the portable root `GEMINI.md`; the old file contained hardcoded `file:///d:/professional/...` paths.
- **Deprecated upstream files**: `brainstorming/spec-document-reviewer-prompt.md` and `test-driven-development/testing-anti-patterns.md`.

#### Fixed
- `agy plugin validate .` no longer fails with `no plugin.json found`.
- `agy` now discovers workspace skills without relying on the legacy `.agent/skills` compatibility path.
- Hardcoded machine-specific absolute paths removed from installable files.

## [1.2.0] - 2026-09-30

### SEO, GEO & AEO Skill Integration & Open-Source Contribution Framework

#### Added
- **`seo-geo-aeo` Skill**: Full-featured website audit engine analyzing technical on-page SEO, Generative Engine Optimization (GEO for ChatGPT Search, Perplexity, and Gemini), and Answer Engine Optimization (AEO for featured snippets and voice search).
- **Mission Control Command**: Added `/audit` slash command shortcut for initiating instant Quick or Full website audits.
- **Open-Source Contribution Infrastructure**:
  - `CONTRIBUTING.md`: Comprehensive contributor guidelines, skill authoring standards, and TDD workflow instructions.
  - `CODE_OF_CONDUCT.md`: Contributor Covenant v2.1 adoption.
  - `.github/ISSUE_TEMPLATE/`: Added structured templates for `bug_report.md`, `skill_proposal.md`, and `feature_request.md`.
  - `.github/PULL_REQUEST_TEMPLATE.md`: Standardized PR checklist requiring zero-conflict rebase on `main` and hard terminal test proof.
- **24-Skill Catalog**: Expanded production skill library to 24 skills (15 core + 9 specialized engineering skills).

#### Credits
- Attribution to **Alex Labat** for the underlying SEO/GEO/AEO audit methodology adapted for Google Antigravity.

## [1.1.0] - 2026-09-30

### Upstream Synchronization (obra/superpowers v6.4.2) & Focus Streamlining

#### Added & Upgraded (Upstream v6.4.2 Sync)
- **`diagnosing-superpowers`**: Added brand new forensic session transcript analyzer skill for diagnosing stumbles, repeated work, and drafting scrubbed bug reports.
- **`brainstorming`**: Upgraded with three-path router (fast / standard / deep) and interactive local WebSocket/HTTP Visual Companion server.
- **`writing-plans`**: Upgraded to upstream v6.4.2 lean plans specification (Global Constraints header, per-task Interfaces blocks, task right-sizing).
- **`subagent-driven-development`**: Upgraded with plan-scoped workspaces (`.superpowers/sdd/<plan>`), unified task-reviewer and re-review prompts with resume-based fix loop, and 5-round circuit breaker.
- **`test-driven-development`**: Adopted `writing-good-tests.md` focusing on test falsifiability and closing change-detector holes.
- **`executing-plans`**: Added native inline execution support and task lifecycle scripts (`task-start`, `task-done`).
- **`using-superpowers`**: Added official Antigravity CLI tool binding reference (`references/antigravity-tools.md`).
- **Skills Compression**: Standardized rationalization tables and streamlined prompts across all core skills.

#### Changed
- Removed GSD skills (`gsd-codebase-mapper`, `gsd-context-fetch`, `gsd-context-health-monitor`, `gsd-empirical-validation`, `gsd-verifier`) and GSD documentation references to maintain 100% focus on Superpowers.
- Retained 8 specialized engineering skills (`frontend-design`, `mcp-builder`, `senior-architect`, `senior-backend`, `senior-fullstack`, `skill-creator`, `web-artifacts-builder`, `webapp-testing`).
- Total skills available: 23 (15 core Superpowers + 8 specialized engineering skills).
- Added automated skills validation test suite in `tests/test-skills.js`.

## [1.0.0] - 2026-02-25

### Antigravity-Native Initial Release

#### Added
- Full integration with Google Antigravity via `.agent/` structure.
- Optimized for Gemini models with bespoke `.gemini/GEMINI.md`.
- Integrated GSD-inspired context engineering skills.
- Integrated official Anthropic technical skills.
- Canonical process rules in `PROJECT_RULES.md`.

#### Credits
- Based on [obra/superpowers](https://github.com/obra/superpowers).
- Inspired by [toonight/get-shit-done-for-antigravity](https://github.com/toonight/get-shit-done-for-antigravity).

---
See [RELEASE-NOTES.md](RELEASE-NOTES.md) for full historical details.
