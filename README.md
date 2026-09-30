<div align="center">

<img src="https://img.shields.io/badge/Superpowers-for_Antigravity-FF6D00?style=for-the-badge&logoColor=white" alt="Superpowers for Antigravity" />

# 🚀 Superpowers for Antigravity

### A process-driven development workflow for agentic software engineering

[![Version](https://img.shields.io/badge/version-1.1.0-00C853?style=flat-square)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-2196F3?style=flat-square)](LICENSE)
[![Upstream](https://img.shields.io/badge/upstream-obra%2Fsuperpowers%20v6.4.2-blue?style=flat-square)](https://github.com/obra/superpowers)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20Mac-FF6D00?style=flat-square)](#-getting-started)

<br/>

**Process Over Guessing.**

*Design First → Plan Atomic → Implementation with TDD → Verification with Hard Proof.*

<br/>

[Getting Started](#-getting-started) · [The Core Process](#-the-core-process) · [Commands](#-mission-control-slash-commands) · [Philosophy](#-philosophy)

</div>

---

## 🧠 The Problem

AI coding agents are powerful but often **undisciplined**. They might:
- ❌ Dive into code without understanding the "Why"
- ❌ Add extra features nobody asked for (scope creep)
- ❌ Skip tests or provide "trust me, it works" claims
- ❌ Get stuck in circular debugging loops

**Superpowers** provides the **Standard Operating Procedure (SOP)** that wraps agents in a professional engineering lifecycle, ensuring consistent, robust, and verifiable results.

---

## ⚡ Getting Started

The fastest way to install the Superpowers methodology into your project:

```bash
npx github:SriSatyaLokesh/superpowers-for-antigravity
```

<details>
<summary><b>Manual Installation (Standard Workflow)</b></summary>

### 🪟 PowerShell (Windows)

```powershell
# 1. Download the superpowers library to a temporary folder
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git powers-temp

# 2. Copy the core logic into your project root (./)
xcopy /E /I powers-temp\.agent .agent
xcopy /E /I powers-temp\.gemini .gemini
xcopy /E /I powers-temp\adapters adapters
copy powers-temp\PROJECT_RULES.md .\
copy powers-temp\SUPERPOWER-STYLE.md .\

# 3. Cleanup the temporary folder
Remove-Item -Recurse -Force powers-temp
```

### 🐧 Bash (Linux / Mac)

```bash
# 1. Download the superpowers library to a temporary folder
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git powers-temp

# 2. Copy the core logic into your project root (./)
cp -r powers-temp/.agent ./
cp -r powers-temp/.gemini ./
cp -r powers-temp/adapters ./
cp powers-temp/PROJECT_RULES.md ./
cp powers-temp/SUPERPOWER-STYLE.md ./

# 3. Cleanup the temporary folder
rm -rf powers-temp
```

> [!NOTE]
> The `./` or `.\` in these commands refers to the **root of your project**. Using a temporary `powers-temp` folder ensures we only copy the necessary files without polluting your git history with the Superpowers library's own internal git metadata.

</details>

Once installed, simply send `/help` or `Superpowers help` to your Antigravity agent.

---

## � Recommended Path for New Users

If you are new to the Superpowers methodology, we highly recommend following this path:

1.  **Read the [Workflow Guideline](docs/GUIDELINE.md)**: A visual and step-by-step primer on the methodology.
2.  **Explore the [Example Project](docs/examples/example-project/README.md)**: See exactly how PRDs, designs, plans, and code look in a real scenario.
3.  **Run `/help`**: Get a list of commands available in your current session.


---

## �🔄 The Core Process

```mermaid
graph LR
    A["💡 /brainstorm"] --> B["📐 /plan"]
    B --> C["⚙️ /execute"]
    C --> D["🔍 /review"]
    D --> E["✅ Done"]

    style A fill:#7B2D8E,color:#fff,stroke:none
    style B fill:#FF6D00,color:#fff,stroke:none
    style C fill:#E91E63,color:#fff,stroke:none
    style D fill:#2196F3,color:#fff,stroke:none
    style E fill:#00C853,color:#fff,stroke:none
```

| Phase | Command | Output |
|:----:|---------|--------|
| **1. Design** | `/brainstorm` | Socratic exploration → Finalized Design Doc |
| **2. Strategy** | `/plan` | Goal-backward assembly → Atomic Implementation Plan |
| **3. Build** | `/execute` | TDD (Red-Green-Refactor) → Atomic Git Commits |
| **4. Critique** | `/review` | Compliance & quality analysis → Acceptance |

---

## 🧬 Complete Skills Library (23 Total Skills)

Antigravity Superpowers combines the full upstream Superpowers methodology with production-grade engineering capabilities:

### 🧠 Core Superpowers (Synced with Upstream v6.4.2)
- **`brainstorming`**: Socratic design refinement featuring a three-path router (fast / standard / deep) & interactive Visual Companion server.
- **`diagnosing-superpowers`**: Forensic transcript analysis, stumble and repeated-work detection, and scrubbed bug report generation.
- **`writing-plans`**: Leaner plans with Global Constraints and per-task Interfaces blocks (v6.4.2).
- **`executing-plans`**: Inline plan execution and batch checkpoints.
- **`subagent-driven-development`**: Plan-scoped workspaces (`.superpowers/sdd/<plan>`) and resume-based task review loop.
- **`test-driven-development`**: Red-Green-Refactor cycle with modern falsifiability design (`writing-good-tests.md`).
- **`systematic-debugging`**: 4-phase root cause analysis and polluter isolation.
- **`verification-before-completion`**: Strict hard proof and evidence-first completion.
- **`requesting-code-review` & `receiving-code-review`**: Structured reviewer contracts.
- **`using-git-worktrees` & `finishing-a-development-branch`**: Clean branch isolation and forge-agnostic PR options.
- **`dispatching-parallel-agents`**: Concurrency without shared state conflicts.
- **`using-superpowers`**: Streamlined bootstrap with native Antigravity tool mappings (`references/antigravity-tools.md`).
- **`writing-skills`**: Skill authoring and rigorous subagent-based testing.

### 🛠️ Specialized Engineering Skills
- **`senior-fullstack`**: Scaffolding, architecture, and code quality analysis for fullstack web applications.
- **`senior-backend`**: High-performance backend architectures, database design, and API optimization.
- **`senior-architect`**: Scalable system design, architecture diagrams, and tech stack decision matrices.
- **`webapp-testing`**: Professional Playwright-based frontend verification.
- **`mcp-builder`**: Guided creation of Model Context Protocol servers.
- **`frontend-design`**: Stunning, production-grade UI components with rich aesthetics.
- **`web-artifacts-builder`**: Complex React/Tailwind/shadcn dashboard generation.
- **`skill-creator`**: Interactive toolkit for crafting and packaging custom skills.

---

## 🎮 Mission Control (Slash Commands)

| Command | Purpose |
|---------|---------|
| `/brainstorm` | 💡 Design First — Refine ideas into designs |
| `/plan` | 📐 The Strategist — Create execution plans |
| `/execute` | ⚙️ The Engineer — Implement with TDD |
| `/review` | 🔍 The Critic — Review implementation against plan |
| `/debug` | 🐛 Systematic Debug — Solve root causes |
| `/help` | ❓ Show all available commands |

---

## 📜 Canonical Rules & Documentation

- [PROJECT_RULES.md](PROJECT_RULES.md): The "Constitution" of the Superpowers workflow.
- [SUPERPOWER-STYLE.md](SUPERPOWER-STYLE.md): Standards for documentation and agent communication.
- [Workflow Guideline](docs/GUIDELINE.md): visual guide to the core methodology.
- [Example Project](docs/examples/example-project/README.md): End-to-end demonstration of the workflow in action.
- [PRD.md](PRD.md): The original Product Requirements Document for this integration.
- [INSTALL.md](antigravity/INSTALL.md): Detailed installation guide for all environments.
- `docs/plans/`: Recommended directory for all design and implementation artifacts.

---

## ✨ Best Practices

1. **Never Skip Brainstorming**: Even for "simple" fixes, the `/brainstorm` phase prevents logic errors.
2. **Aggressive Atomicity**: Keep tasks under 5 minutes. If it's longer, break it down.
3. **Hard Proof Only**: Never accept "it should work." Require captured evidence.
4. **Clean State Check**: Use `/help` to ensure the agent has loaded the process correctly at the start of a session.

---

## 🛠️ For Maintainers: Publishing

If you want to update the version available via `npx`, follow these steps:

### 1. Using GitHub (Direct)
The command `npx github:SriSatyaLokesh/superpowers-for-antigravity` works immediately after you push to the `main` branch. No extra publishing step is required!

### 2. Using NPM (Optional)
To allow users to just run `npx superpowers-for-antigravity`, you must publish to the NPM registry:
1.  **Login**: `npm login`
2.  **Version Update**: `npm version patch` (or minor/major)
3.  **Publish**: `npm publish --access public`

---

## 🤝 Credits & Inspiration

This project honors its roots and peers:

1. **[Superpowers](https://github.com/obra/superpowers)** (Original): By **Jesse Vincent (obra)** and Prime Radiant. The pioneer of process-driven agentic software engineering.
2. **[Google Antigravity](https://antigravity.google)**: Next-generation agentic coding platform and runtime.
3. **[Anthropic Skills](https://github.com/anthropics/skills)**: For technical capability templates and patterns.

---

<div align="center">

<sub>Created by Sri Satya Lokesh & Antigravity AI</sub>

<br/>

*Maintain the process. Build better software.*

</div>
