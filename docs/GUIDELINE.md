# Superpowers for Antigravity: Workflow Guideline

This document provides a comprehensive, step-by-step guideline on how to use the "Superpowers" ecosystem in Antigravity to build high-quality software with a disciplined, process-driven approach.

## The Superpowers Blueprint

The core methodology follows a strict sequence of phases to ensure that implementation is always preceded by design and followed by verification.

```mermaid
graph TD
    User([User Idea]) --> PRD[Step 0: Requirements (PRD/TRD)]
    PRD --> Brainstorm["Step 1: Brainstorming (/brainstorm)"]
    Brainstorm --> DesignDoc[Design Document Created]
    DesignDoc --> Plan["Step 2: Planning (/plan)"]
    Plan --> ImplPlan[Implementation Plan Created]
    ImplPlan --> Execute["Step 3: Execution (/execute)"]
    Execute --> TDD{TDD Loop}
    TDD -- Fail --> Test[Write Failing Test]
    Test --> Code[Minimal Implementation]
    Code -- Pass --> Commit[Atomic Commit]
    Commit --> TDD
    TDD -- Done --> Review["Step 4: Review (/review)"]
    Review -- Approved --> Final([Feature Complete])
    Review -- Issues --> Execute
```

---

## Step-by-Step Workflow

### Step 0: Requirements (PRD & TRD)
Before involving the agent, define *what* you want to build and *within what* constraints.
- **PRD (Product Requirements Document)**: Define the user goals, success metrics, and functional requirements.
- **TRD (Technical Requirements Document)**: Define the tech stack, architectural constraints, and performance targets.

### Step 1: Brainstorming (`/brainstorm`)
Turn your requirements into a concrete design.
1.  **Trigger**: Type `/brainstorm` and point the agent to your PRD/TRD.
2.  **Socratic Dialogue**: The agent will ask clarifying questions one at a time.
3.  **Approaches**: The agent will propose 2-3 technical approaches.
4.  **Design Doc**: Once approved, the agent writes a Design Document to `docs/plans/YYYY-MM-DD-<topic>-design.md`.

### Step 2: Planning (`/plan`)
Decompose the design into bite-sized, executable tasks.
1.  **Trigger**: Type `/plan` (or the agent will transition automatically).
2.  **Implementation Plan**: The agent creates an Implementation Plan at `docs/plans/YYYY-MM-DD-<topic>-plan.md`.
3.  **Task Granularity**: Each task should take 2-5 minutes and include exact files, actions, and verification commands.

### Step 3: Execution (`/execute`)
Implement the plan using Test-Driven Development (TDD).
1.  **Trigger**: Use the `/execute` command or dispatch subagents for specific tasks.
2.  **Atomic Tasks**: Work on one task at a time.
3.  **TDD Loop**:
    -   **Red**: Write a failing test first.
    -   **Green**: Write the minimal code to make it pass.
    -   **Refactor**: Clean up the code while keeping tests passing.
4.  **Atomic Commits**: Commit each completed task individually.

### Step 4: Review (`/review`)
Verify that the implementation meets the standards.
1.  **Trigger**: Type `/review` once implementation is complete.
2.  **Verification**: The agent checks the implementation against the plan, coding standards, and architectural integrity.
3.  **Evidence**: Provide captured output or screenshots as proof of completion.

---

## Example Project Structure

The [Example Project Guide](./examples/example-project/README.md) provides a concrete demonstration of these files in action. 

### How to Navigate the Example
1.  **Start with [README.md](./examples/example-project/README.md)**: This is your roadmap.
2.  **Compare [PRD.md](./examples/example-project/PRD.md)** vs **[Design Doc](./examples/example-project/docs/plans/2026-02-25-greeting-service-design.md)**: Notice how one defines "What" and the other defines "How".
3.  **Study the [Implementation Plan](./examples/example-project/docs/plans/2026-02-25-greeting-service-plan.md)**: Pay attention to the verifiable tasks and TDD steps.
4.  **Check [Code](./examples/example-project/src/greeting.js) and [Tests](./examples/example-project/tests/greeting.test.js)**: See the final result of the execution phase.
