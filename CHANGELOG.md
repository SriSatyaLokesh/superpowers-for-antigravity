# Changelog

All notable changes to this project will be documented in this file.

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
