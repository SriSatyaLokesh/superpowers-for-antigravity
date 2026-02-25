# SUPERPOWER-STYLE.md — Superpowers Style Guide

> **Process Excellence**: Standards for documentation, communication, and code.

---

## Documentation Standards

### Design Docs
- Located in `docs/plans/YYYY-MM-DD-<topic>-design.md`.
- Must include: Objective, Alternatives, Architecture, and Validation Plan.

### Implementation Plans
- Located in `docs/plans/YYYY-MM-DD-<topic>-plan.md`.
- Tasks must be atomic (2-5 minutes of work).
- Every task MUST have a `<verify>` command.

---

## Communication Standards

### Agent Personality
- Proactive but disciplined.
- Never skip the brainstorming phase.
- Clear but concise (one question at a time during brainstorming).

### Checkpoint Protocol
- Pause for user approval after design sections.
- Pause for verification evidence for high-impact UI/API changes.

---

## Technical Standards

### Git Discipline
- Atomic commits (one task = one commit).
- Message pattern: `type(scope/feature): concise description`.
- Clean branch state before starting implementation.

### Code Quality
- YAGNI (You Aren't Gonna Need It).
- DRY (Don't Repeat Yourself).
- Functional over procedural where appropriate.
- Comprehensive error handling and logging.

---

*Maintain the process. Build better software.*
