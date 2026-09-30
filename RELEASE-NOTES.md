# Superpowers for Antigravity — Release Notes

## v1.1.0 (2026-09-30)

This release synchronizes our Antigravity Superpowers fork with upstream [`obra/superpowers`](https://github.com/obra/superpowers) at **v6.4.2**, while streamlining our custom skills for pure Superpowers focus.

### 🚀 Highlights

- **Upstream v6.4.2 Core Skills Synchronized**:
  - **`diagnosing-superpowers`**: Brand new forensic transcript analysis skill for diagnosing failed or runaway sessions, repeated work, plan adherence issues, and generating scrubbed bug report bundles.
  - **`brainstorming` (v6.3.0)**: Socratic design with a three-path router (fast / standard / deep) and a local WebSocket/HTTP Visual Companion server (`scripts/server.cjs`).
  - **`writing-plans` (v6.4.2)**: Leaner plans with Global Constraints headers, per-task Interfaces blocks, and 2-5 minute task sizing with complete code.
  - **`subagent-driven-development` (v6.2.0/v6.3.0)**: Plan-scoped workspaces (`.superpowers/sdd/<plan>`), unified task-reviewer and re-review prompts with resume-based fix loop, and a 5-round circuit breaker.
  - **`test-driven-development` (v6.2.0)**: Modern falsifiability test design in `writing-good-tests.md` closing change-detector holes.
  - **`executing-plans` (v6.3.0/v6.4.1)**: Inline native execution support with lifecycle helper scripts (`task-start`, `task-done`).
  - **`using-superpowers`**: Direct inclusion of `references/antigravity-tools.md` officially mapping Antigravity CLI bindings (`agy`, `invoke_subagent`, and task artifacts).
  - **Skills Compression**: Standardized rationalization tables across all core skills.

- **Streamlined Custom Skills**:
  - Removed GSD skills and references to keep the methodology 100% focused on pure Superpowers.
  - Retained all 8 specialized engineering skills: `frontend-design`, `mcp-builder`, `senior-architect`, `senior-backend`, `senior-fullstack`, `skill-creator`, `web-artifacts-builder`, `webapp-testing`.
  - Total skills available: **23 skills** (15 core + 8 custom).

- **Automated Verification**:
  - Added `tests/test-skills.js` to ensure all 23 skills maintain valid YAML frontmatter, names, descriptions, and required files.
  - Updated `tests/test-init.js` to ensure cross-platform initialization packages all skills and confirms absence of deprecated files.

---

## v1.0.0 (2026-02-25)

This is the official initial release of **Superpowers for Antigravity**. 

This project was forged by taking a snapshot of the professional **Superpowers** ecosystem (v4.3.1) and refactoring it into a lean, Antigravity-native **Standard Operating Procedure (SOP)**. 

### 🚀 The Evolution

We transitioned from a monolithic plugin supporting multiple platforms (Claude, Codex, Cursor, OpenCode) to a specialized, high-performance integration designed exclusively for Google Antigravity and Gemini models.

### ✨ Key Deliverables in v1.0.0

- **Antigravity-Native Structure**: Full migration to `.agent/skills` and `.agent/workflows`.
- **Gemini Optimization**: Native support for Gemini Pro and Flash via bespoke instruction sets.
- **Synthesized Skills Library**:
    - **Technical Excellence**: Integrated official Anthropic technical skills (Webapp testing, MCP builder, etc.).
- **Canonical Process Rules**: Established `PROJECT_RULES.md` and `SUPERPOWER-STYLE.md` as the unified constitution for the workflow.
- **Mission Control**: Robust slash command support for `/brainstorm`, `/plan`, `/execute`, `/debug`, `/review`, and `/help`.

### 🤝 Origins & Credits

1.  **[Original Superpowers](https://github.com/obra/superpowers)**: By Jesse Vincent (obra) and Prime Radiant.
2.  **[Google Antigravity](https://antigravity.google)**: Next-generation AI-first development platform.

---
*Process over guessing.*
**Full Changelog:** https://github.com/SriSatyaLokesh/superpowers-for-antigravity/commits/main
**Skills Repository:** https://github.com/SriSatyaLokesh/superpowers-for-antigravity/tree/main/.agent/skills
**Issues:** https://github.com/SriSatyaLokesh/superpowers-for-antigravity/issues
