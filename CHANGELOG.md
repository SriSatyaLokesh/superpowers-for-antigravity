# Changelog

All notable changes to this project will be documented in this file.

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
