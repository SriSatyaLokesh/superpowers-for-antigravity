# Antigravity Manual Testing Protocol

Because Antigravity agent skills run natively within a stateful IDE context (rather than a headless CLI batch script), fully automated integration testing of LLM behavior is not currently reliable. 

To ensure the Superpowers integrations are functioning correctly, developers should conduct the following localized manual test protocol after major workflow changes.

---

## Pre-Requisites
1. Open Google Antigravity in an empty test repository.
2. Run `npx superpowers-for-antigravity` (or the local equivalent setup command) inside the test repository to inject the `.agent` and `.gemini` dependencies.
3. Open a new Antigravity chat session.

---

## 🟢 Test 1: Skill Discovery & Rules Injection
**Objective**: Verify the initial agent prompt loads `PROJECT_RULES.md` and discovers the baseline skills.

1. **User Prompt**: "What rules are governing this workspace, and what engineering workflows are available to me?"
2. **Expected Behavior**: 
    - The Antigravity agent explicitly references `PROJECT_RULES.md` and the Mission Control mandate.
    - The agent lists out workflows like `/brainstorm`, `/plan`, and `/execute` that it has sourced from the `.agent/workflows/` directory.

---

## 🟡 Test 2: The Socratic Brainstorm Flow
**Objective**: Verify the agent successfully throttles natural conversation into a methodical, one-question-at-a-time design loop using the `<EXPLORE>` capabilities.

1. **User Prompt**: "`/brainstorm` I want to build a simple Python script that takes a URL, downloads the HTML, and counts the frequency of `<h1>` tags."
2. **Expected Behavior**:
    - The agent triggers the `brainstorming` skill immediately.
    - The agent **does not write code**.
    - The agent asks exactly ONE clarifying question (e.g., "How should the tool handle SSL errors or generic HTTP redirects?").
3. **User Action**: Answer the question.
4. **Expected Behavior**: After 1-3 questions, the agent proposes 2-3 technical approaches.

---

## 🔵 Test 3: The Planning Lifecycle
**Objective**: Verify the agent takes the approved design and breaks it into atomic, checklist-style tasks.

1. **User Prompt**: "`/plan` Let's move forward with approach 1."
2. **Expected Behavior**:
    - The agent triggers the `writing-plans` skill.
    - The agent creates a `docs/plans/YYYY-MM-DD-html-parser-design.md` file natively in the workspace.
    - The agent creates a `docs/plans/YYYY-MM-DD-html-parser-plan.md` (or updates an overarching `task.md`) containing atomic steps (each taking 2-5 minutes of implementation time), explicitly mapped to testing verification steps.

---

## 🔴 Test 4: Systematic Execution & TDD
**Objective**: Verify the agent defaults to writing tests BEFORE functional code.

1. **User Prompt**: "`/execute` Start on Phase 1."
2. **Expected Behavior**:
    - The agent writes a test file (e.g., `test_parser.py`) for the target module before modifying any application code.
    - The agent runs the test (it should fail).
    - The agent then writes the minimal code to pass the test.
    - The agent uses the `task_boundary` tool or specific status updates to mark the task as `<verify>` or Complete.

---

*Maintain the process. Build better software.*
