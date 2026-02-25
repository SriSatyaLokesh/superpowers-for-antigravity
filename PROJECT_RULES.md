# PROJECT_RULES.md — Superpowers Canonical Rules

> **Single Source of Truth** for the Superpowers development methodology.
> 
> Model-agnostic. All adapters and extensions reference this file.

---

## Core Protocol

**BRAINSTORM → PLAN → EXECUTE → VERIFY → COMMIT**

1. **BRAINSTORM**: Socratic design refinement before any code.
2. **PLAN**: Decompose into atomic implementation tasks (2-5 mins).
3. **EXECUTE**: Implement with TDD and atomic commits.
4. **VERIFY**: Prove completion with empirical evidence.
5. **COMMIT**: One task = one commit, format: `type(scope): description`.

---

## Proof Requirements

Every change requires verification evidence:

| Change Type | Required Proof |
|-------------|----------------|
| API endpoint | curl/HTTP response |
| UI change | Screenshot |
| Build/compile | Command output |
| Test | Test runner output |
| Config | Verification command |

**Never accept**: "It looks correct", "This should work".
**Always require**: Captured output, screenshot, or test result.

---

## Discipline

### Search-First Mode
1. **Search before reading** — Use grep/find to locate relevant code.
2. **Targeted reads** — Only read specific files when confirmed relevant.

### Test-Driven Development
1. Write failing test (RED).
2. Minimal code to pass (GREEN).
3. Refactor with protection (REFACTOR).

---

## Project Structure

```
.
├── .agent/
│   ├── skills/          # Superpowers library
│   └── workflows/       # Slash commands
├── .gemini/             # Gemini integration
├── adapters/            # Model-specific enhancements
├── agents/              # Custom agent definitions
├── commands/            # Global command scripts
├── docs/                # Design plans and documentation
└── lib/                 # Shared libraries
```

---

*Superpowers for Antigravity*
*Process over guessing.*
