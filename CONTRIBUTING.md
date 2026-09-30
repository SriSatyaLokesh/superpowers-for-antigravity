# 🤝 Contributing to Superpowers for Google Antigravity

Thank you for your interest in contributing to **Superpowers for Google Antigravity**! 🚀

Our mission is to establish the definitive **Standard Operating Procedure (SOP)** for agentic software engineering—combining Socratic brainstorming, atomic planning, rigorous Red-Green-Refactor TDD, adversarial code reviews, and forensic hard proof.

Whether you're fixing a bug, adding a new specialized engineering skill, or improving documentation, we welcome your contributions.

---

## 📜 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can You Contribute?](#-how-can-you-contribute)
- [Local Development Setup](#-local-development-setup)
- [Skill Authoring Standards](#-skill-authoring-standards)
- [Commit Message Conventions](#-commit-message-conventions)
- [Pull Request Workflow](#-pull-request-workflow)
- [Community & Support](#-community--support)

---

## 🛡️ Code of Conduct

This project adheres to the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the repository maintainers.

---

## 💡 How Can You Contribute?

1. **Suggest a New Skill:** Propose new agentic capabilities (e.g., cloud infrastructure, security audits, database migration).
2. **Improve Existing Skills:** Enhance prompts, edge-case coverage, or tool integration in `.agent/skills/`.
3. **Enhance Documentation:** Improve guides, cheat sheets, or prompt templates.
4. **Report Bugs:** Open a forensic bug report with transcripts and error logs.

---

## 💻 Local Development Setup

### 1. Fork & Clone
```bash
git clone https://github.com/<your-username>/superpowers-for-antigravity.git
cd superpowers-for-antigravity
```

### 2. Verify Prerequisites
- **Node.js**: v18.0.0 or higher
- **Git**: v2.30 or higher
- **Google Antigravity (`agy`)**: [Antigravity Runtime](https://antigravity.google)

### 3. Run the Test Suite
Before making any changes, verify that all test suites pass:
```bash
npm test
```
This runs:
- `tests/test-skills.js`: Verifies skill directory structure, YAML frontmatter syntax, absence of deprecated skills, and core feature integrity.
- `tests/test-init.js`: Tests the cross-platform project initializer in an isolated temporary environment.

---

## 🧬 Skill Authoring Standards

When adding a new skill to `.agent/skills/<skill-name>/`:

### 1. Directory Structure
```
.agent/skills/<skill-name>/
├── SKILL.md                 # Required: Main instruction file with YAML frontmatter
├── references/              # Optional: In-depth documentation, APIs, cheat sheets
├── scripts/                 # Optional: Helper CLI utilities or validation scripts
└── templates/               # Optional: Reusable prompt or artifact templates
```

### 2. Strict YAML Frontmatter
Every `SKILL.md` file **must** begin with valid YAML frontmatter:

```yaml
---
name: your-skill-name
description: >
  Concise 2-4 sentence description of the skill's capabilities, primary domain,
  and trigger phrases. Explain exactly WHEN Antigravity should invoke this skill.
---
```

### 3. The Superpowers Standard
- **Clarity Over Cleverness:** Write instructions that guide agents with explicit step-by-step procedures.
- **Evidence Before Assertion:** Mandate that agents produce terminal output, verifiable test logs, or concrete artifacts.
- **Cross-Platform:** Ensure scripts work seamlessly on Windows (PowerShell/cmd), macOS (zsh), and Linux (bash).
- **Test Registration:** Register your skill in `tests/test-skills.js` under `EXPECTED_CUSTOM_SKILLS`.

---

## 📝 Commit Message Conventions

We adhere to [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description | Example |
| :--- | :--- | :--- |
| `feat` | A new feature or skill | `feat(skills): add seo-geo-aeo website audit skill` |
| `fix` | A bug fix | `fix(installer): handle spaces in Windows user profiles` |
| `docs` | Documentation changes | `docs: add daily developer prompt templates to README` |
| `test` | Adding or updating tests | `test: add YAML frontmatter schema validation` |
| `refactor` | Code restructuring without behavior change | `refactor: simplify skill discovery logic` |
| `chore` | Maintenance and dependencies | `chore: bump version to 1.2.0 in package.json` |

---

## 🚀 Pull Request Workflow

1. **Always base your branch on the latest `main`:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/your-feature-name
   ```
2. **Implement your changes using Red-Green TDD:**
   Write tests, verify they fail, make them pass, and refactor.
3. **Verify the entire test suite passes:**
   ```bash
   npm test
   ```
4. **Push your branch & open a Pull Request:**
   ```bash
   git push -u origin feat/your-feature-name
   ```
   Open a PR against `main` on GitHub and fill out the PR template.
5. **Address Code Review:**
   Reviewers will provide feedback. Treat feedback with technical rigor, make updates, and re-verify tests before re-requesting review.

---

## 💬 Community & Support

- **Issues & Feature Requests:** [GitHub Issues](https://github.com/SriSatyaLokesh/superpowers-for-antigravity/issues)
- **Discussions & Feedback:** Share your agentic workflows and prompt templates.

*Maintain the process. Build better software.*
