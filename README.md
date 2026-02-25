<div align="center">

<img src="https://img.shields.io/badge/Superpowers-for_Antigravity-FF6D00?style=for-the-badge&logoColor=white" alt="Superpowers for Antigravity" />

# 🚀 Superpowers for Antigravity

### A process-driven development workflow for agentic software engineering

[![Version](https://img.shields.io/badge/version-1.0.0-00C853?style=flat-square)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-2196F3?style=flat-square)](LICENSE)
[![Based on GSD](https://img.shields.io/badge/based%20on-GSD-7B2D8E?style=flat-square)](https://github.com/toonight/get-shit-done-for-antigravity)
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
npx superpowers-for-antigravity
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

## 🔄 The Core Process

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

## 🧬 Expanded Capabilities

We've synthesized the best skills from across the agentic ecosystem:

### 🛡️ Process Excellence (GSD Inspired)
- **Codebase Mapping**: Total system understanding before making changes.
- **Context Fetch**: Smart retrieval to prevent context pollution.
- **Context Health Monitor**: Proactive detection of AI "hallucination thresholds."
- **Empirical Validation**: Requiring hard proof (logs/screenshots) for every task.

### 🛠️ Specialized Tooling (Anthropic Inspired)
- **Webapp Testing**: Professional Playwright-based frontend verification.
- **MCP Builder**: Guided creation of Model Context Protocol servers.
- **Frontend Design**: Stunning, production-grade UI components with rich aesthetics.
- **Web Artifacts**: Complex React/Tailwind/shadcn dashboard generation.

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
- [PRD.md](PRD.md): The original Product Requirements Document for this integration.
- [INSTALL.md](antigravity/INSTALL.md): Detailed installation guide for all environments.
- `docs/plans/`: Recommended directory for all design and implementation artifacts.

---

## ✨ Best Practices

1. **Never Skip Brainstorming**: Even for "simple" fixes, the `/brainstorm` phase prevents logic errors.
2. **Aggressive Atomicity**: Keep tasks under 5 minutes. If it's longer, break it down.
3. **Hard Proof Only**: Never accept "it should work." Require captured evidence.
4. **Clean State Check**: Use `/help` or `/resume` to ensure the agent has loaded the process correctly at the start of a session.

---

## 🌍 Integration with GSD for Antigravity

Superpowers for Antigravity is designed to be **fully compatible** with the [GSD-for-Antigravity](https://github.com/toonight/get-shit-done-for-antigravity) methodology.

- **Synergy**: Use GSD for high-level project management (`SPEC.md`, `ROADMAP.md`) and Superpowers for the low-level implementation cycle (`/brainstorm`, `/plan`).
- **Shared Skills**: Both frameworks share core context-management and verification skills, ensuring a unified experience.

---

## 🤝 Credits & Inspiration

This project honors its roots and peers:

1. **[Superpowers](https://github.com/obra/superpowers)** (Original): By **obra**. The pioneer of process-wrapped skills.
2. **[GSD for Antigravity](https://github.com/toonight/get-shit-done-for-antigravity)**: By **toonight**. The primary architectural inspiration for the Antigravity adapter and `.agent` structure.
3. **[Anthropic Skills](https://github.com/anthropics/skills)**: For the high-quality technical capability templates.

---

<div align="center">

<sub>Created by Sri Satya Lokesh & Antigravity AI</sub>

<br/>

*Maintain the process. Build better software.*

</div>
