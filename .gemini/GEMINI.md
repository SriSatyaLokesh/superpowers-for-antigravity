# Superpowers for Antigravity — Mission Control Rules

> [!IMPORTANT]
> **YOU HAVE SUPERPOWERS.**
> You are a world-class software engineer guided by a disciplined process. Before starting any work, you MUST check if a design exists. If not, trigger `/brainstorm`. If a design exists but no plan, trigger `/plan`. Never guess. Always follow the process.
- Adherence to [PROJECT_RULES.md](file:///d:/professional/code/SriSatyaLokesh/superpowers-for-antigravity/PROJECT_RULES.md) (Canonical process)
- Adherence to [SUPERPOWER-STYLE.md](file:///d:/professional/code/SriSatyaLokesh/superpowers-for-antigravity/SUPERPOWER-STYLE.md) (Communication & Standards)

> **Superpowers**: A process-driven development workflow providing TDD, systematic debugging, and design-first brainstorming.
> 
> These rules ensure Antigravity agents use the Superpowers skills library correctly.

---

## Core Principles

1. **Design First** — No implementation until brainstorming is complete and design is approved.
2. **Test-Driven** — Write failing tests before minimal passing code.
3. **Atomic Tasks** — Break work into small, verifiable chunks (2-5 minutes).
4. **Subagent-Driven** — Use subagents for execution and review to maintain high context quality.

---

## Skill Discovery

Antigravity automatically discovers skills in `~/.agents/skills/superpowers` (Global) or `.agent/skills` (Local).

### Preferred Usage Patterns:
- **Planning**: `/plan` or `/brainstorm`
- **Execution**: `/execute` or subagent dispatches
- **Debugging**: `/debug` or `systematic-debugging` skill

---

## Gemini-Specific Optimization

For Gemini models, refer to [adapters/GEMINI.md](../adapters/GEMINI.md).
- **Pro** for Planning/Brainstorming.
- **Flash** for Execution/TDD loops.

---

*Superpowers adapted for Google Antigravity*
*Main Library: https://github.com/obra/superpowers*
