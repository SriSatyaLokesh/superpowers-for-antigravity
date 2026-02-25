# Testing Infrastructure Redesign (Antigravity-Native)

**Objective**: Establish a testing strategy that works natively for Antigravity, completely removing legacy dependencies on the `claude` or `opencode` headless CLI tools, which do not apply here.

## Problem Statement
The legacy Superpowers repository used bash scripts to spin up a headless Claude Code CLI and parse `.jsonl` session transcripts to verify if agent skills were triggered correctly. **Antigravity does not operate via a headless bash CLI in this manner.** Therefore, the entire `tests/` directory was fundamentally incompatible and has been removed to avoid confusing users.

## Proposed Testing Strategy

We must split our testing approach into two tracks: **Environment Automation** (what we can test in CI) and **Agentic Verification** (how we test the LLM behavior).

### 1. Environment & Script Testing (Automated CI)
We *can* and *should* automate testing of our setup scripts (like `scripts/init.js`) to ensure they configure the Antigravity workspace correctly.

- **Proposed Action**: Create `tests/test-init.js`.
- **Mechanism**: A Node.js test script that creates a temporary directory, runs `node scripts/init.js` inside it, and verifies that `.agent/`, `.gemini/`, and all required SOP markdowns are copied exactly as expected.
- **Why**: This guarantees the `npx` installation flow is flawless across all operating systems.

### 2. Skill Verification (Agentic)
Because Antigravity skills run within the Antigravity host environment rather than a Unix subshell script, we cannot wrap them in a bash integration test.

- **Proposed Action 1: Standardized Manual Protocol**: Create `tests/MANUAL_TESTING.md`. This document will define the exact prompt sequences a human or QA agent should run to verify the core `/brainstorm`, `/plan`, and `/execute` loops.
- **Proposed Action 2: Meta-Testing Skill**: (Optional/Future) We can create an Antigravity-native skill (e.g., `.agent/skills/test-superpowers`) that instructs the Antigravity agent to spin up a subagent, feed it a mock planning task, and verify if the subagent produces the correct artifacts.

## Execution Plan
1. Review this design doc.
2. Implement `tests/test-init.js` to verify the Node-based installer without needing Antigravity.
3. Write `tests/MANUAL_TESTING.md` to define the SOP for verifying skills natively inside an Antigravity chat session.
