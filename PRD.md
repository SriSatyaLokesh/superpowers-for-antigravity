# 📘 PRODUCT REQUIREMENTS DOCUMENT (PRD): Superpowers for Antigravity

## Business-Friendly | Agent-Optimized | Enterprise-Ready

------------------------------------------------------------------------

# 1. Document Control

-   Product / Feature Name: Superpowers for Antigravity
-   Version: 1.0.0
-   Author(s): Sri Satya Lokesh, Antigravity AI
-   Stakeholders: Sri Satya Lokesh, Superpowers Users, Antigravity Users
-   Status: Complete
-   Created Date: 2026-02-25
-   Last Updated: 2026-02-25

------------------------------------------------------------------------

# 2. Executive Summary

## 2.1 Purpose

To extend the "Superpowers" ecosystem to the Antigravity platform, providing a seamless, process-driven development experience for Antigravity agents. This involves a native integration that allows Antigravity to discover and execute Superpowers skills via `.agent` and `.gemini` protocols.

## 2.2 Problem Statement

Previously, Superpowers was optimized for multi-platform usage (Claude, Cursor, Codex), leading to friction when used with Antigravity's specific native discovery patterns. Users lacked a "one-command" setup for this ecosystem.

## 2.3 Vision Statement

Superpowers is the "Standard Operating Procedure" (SOP) for professional development in Antigravity. Any Antigravity agent instantly gains expert-level software engineering processes—TDD, Socratic Brainstorming, and Systematic Debugging—by loading the Superpowers library.

------------------------------------------------------------------------

# 3. Business Context

## 3.1 Background

The agentic coding space is moving towards standardizing "skills" and "workflows." Superpowers has already established a robust set of these for various agent platforms. Extending this to Antigravity aligns with the goal of being IDE/Agent-agnostic while providing deep integration where it matters.

## 3.2 Business Objectives

-   Increase adoption of Superpowers by supporting the Antigravity user base.
-   Provide a "Get Shit Done" (GSD) equivalent for Superpowers that is optimized for Antigravity's toolset.

## 3.3 Success Metrics (KPIs)

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| Integration Reliability | 100% skill discovery | Internal test suite firing all skills |
| User Setup Time | < 2 minutes | One-liner installation script |
| Feature Parity | 100% parity with original plugin | Verification of all skills in `skills/` library |

------------------------------------------------------------------------

# 4. Scope

## 4.1 In Scope

-   **Multi-Mode Installation Support**:
    -   **Global**: Centralized skills library accessible across projects via user-profile symlinking.
    -   **Local**: Full copy of skills/workflows into project-specific `.agent/` directory for isolation.
    -   **Hybrid**: Project-local configuration (`.gemini/`) referencing a global Superpowers installation.
-   **Antigravity Integration Layer**:
    -   `.gemini` folder for Gemini-specific rules and adapters.
    -   `.agent/skills` and `.agent/workflows` structure mapping for native discovery.
    -   `INSTALL.md` with cross-platform (Bash/PowerShell) instructions.
-   **Tool Mapping**: Utilizing Antigravity native tools like `run_command` (with `SafeToAutoRun`) and `browser_subagent`.

## 4.2 Out of Scope

-   Modifying the core logic of existing skills (unless necessary for Antigravity tool compatibility).
-   Creating an Antigravity Marketplace (initial release focuses on manual/scripted installation).

------------------------------------------------------------------------

# 5. Stakeholders & Roles

| Role | Name | Responsibility |
| :--- | :--- | :--- |
| Product Owner | Sri Satya Lokesh | Vision, final approval |
| Lead Developer | Antigravity AI | Implementation, PRD drafting |
| Quality Assurance | Antigravity AI | Testing across different projects |

------------------------------------------------------------------------

# 6. User Personas

For each persona:

-   **Name**: Anji
-   **Role**: Senior Software Engineer / Agentic Developer
-   **Goals**: Automate repetitive tasks using agents while maintaining high code quality and systematic process.
-   **Pain Points**: Agents hallucinating code, skipping tests, or lacking a systematic approach to debugging.
-   **Technical Proficiency**: High (expert in Git, TDD, and project architecture).

------------------------------------------------------------------------

# 7. User Journeys

### Journey 1: Installation
1. User clones `superpowers` repo (or uses a marketplace command).
2. User runs `install-antigravity.sh` or follows `INSTALL.md`.
3. System symlinks the superpowers library to Antigravity's search path.
4. User starts a new Antigravity session.
5. System displays "Superpowers Loaded" (via an initial prompt).

### Journey 2: Executing a Skill
1. User asks: "Help me plan a new feature."
2. Antigravity detects the `brainstorming` skill.
3. Antigravity executes the skill, guiding the user through the Socratic design process.

------------------------------------------------------------------------

# 8. Functional Requirements

| ID | Requirement | Description | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| FR1 | Skill Discovery | Antigravity must automatically find all skills in the `skills/` directory. | P0 | Listing available skills includes Brainstorming, TDD, etc. |
| FR2 | Workflow Mapping | Mapping existing `.md` workflows to Antigravity's `.agent/workflows`. | P0 | Slash commands like `/brainstorm` or automatic triggers work. |
| FR3 | Tool Integration | Map `run_command` in skills to Antigravity's `run_command` with `SafeToAutoRun`. | P1 | Commands defined in skills execute without redundant user approval. |
| FR4 | Installation Script | Provide a script to automate symlinking and configuration. | P1 | Script completes without errors on Windows/macOS/Linux. |

------------------------------------------------------------------------

# 9. Non-Functional Requirements

| Category | Requirement | Target |
| :--- | :--- | :--- |
| Performance | Skill discovery latency | < 500ms |
| Security | Permission boundaries | Skills only access project files/allow-listed tools |
| Reliability | Error recovery | Clear error messages when a skill fails to load |
| Scalability | Future-proof | Easily add new skills by dropping a folder in `skills/` |

------------------------------------------------------------------------

# 10. Assumptions & Dependencies

-   Assumption: Antigravity follows the folder-based skill discovery pattern (similar to GSD).
-   Dependency: User must have Git installed to clone/update.
-   Dependency: Antigravity version must support `.agent/skills` and `.agent/workflows`.

------------------------------------------------------------------------

# 11. Risks & Mitigation

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Skill Collision | High | Use unique namespaces (e.g., `superpowers-tdd`) if collisions occur. |
| Tool Incompatibility | Medium | Provide wrappers or adapter logic for Antigravity-specific tools. |
| User Error during install | Medium | Robust, idempotent installation script. |

------------------------------------------------------------------------

# 12. High-Level Architecture Overview

-   **Library Layer**: The core `skills/` and `workflows/` provided by Superpowers.
-   **Adapter Layer**: `.gemini/` and `.agent/` configuration that tells Antigravity how to use the Library Layer.
-   **Process Layer**: Established `PROJECT_RULES.md` and `SUPERPOWER-STYLE.md` as the unified constitution for the workflow.
-   **Discovery Layer**: Symlinks or relative paths from the project root to the Central Library.

------------------------------------------------------------------------

# 13. Testing Strategy (Business Level)

-   **Functional testing**: Manual verification of each core skill (Brainstorming -> Planning -> TDD).
-   **UAT testing**: Trial run by the Product Owner (Sri Satya Lokesh).
-   **Performance benchmarks**: Timing the "startup" cost of loading superpowers.

------------------------------------------------------------------------

# 14. Release Plan

-   **Phase 1**: Initial PRD Approval.
-   **Phase 2**: Creation of `.gemini` and Antigravity-specific `README`/`INSTALL`.
-   **Phase 3**: Alpha test with Brainstorming skill.
-   **Phase 4**: Full Skill library validation.
-   **Phase 5**: Public release.

------------------------------------------------------------------------

# 15. Open Questions (Agent Prompts)

-   Should we use `.gemini` or `.Gemini`? (Defaulting to `.gemini`).
-   Will users prefer a global install (one-time) or a per-repo install (more isolated)?
-   How should we handle Antigravity's specific `browser_subagent` tool? Should it be integrated into the research skills?

------------------------------------------------------------------------

# 16. Glossary

-   **Skill**: A defined behavioral capability for an agent (e.g., TDD).
-   **Workflow**: A sequence of steps or a slash-command (e.g., `/plan`).
-   **Antigravity**: The agent platform we are integrating with.

------------------------------------------------------------------------

# 17. Revision History

| Version | Date | Author | Notes |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 2026-02-25 | Antigravity AI | Approved version |

------------------------------------------------------------------------

# END OF PRD
