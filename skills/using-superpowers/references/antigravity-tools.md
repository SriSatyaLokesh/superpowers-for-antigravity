# Antigravity CLI (`agy`) Tool Mapping

Skills speak in actions ("dispatch a subagent", "create a todo", "read a file"). On the Antigravity CLI (`agy`) these resolve to the tools below.

| Action skills request | Antigravity CLI equivalent |
|----------------------|----------------------|
| Dispatch a subagent (`Subagent (general-purpose):` template) | `invoke_subagent` with a built-in `TypeName` — `self` for full-capability work, `research` for read-only |
| Task tracking ("create a todo", "mark complete") | a **task artifact** — `write_to_file` with `IsArtifact: true` and `ArtifactType: "task"` (see [Task tracking](#task-tracking)). **Not** `manage_task`, which manages background processes. |

## Task tracking

Antigravity has **no todo tool** (`manage_task` manages background
processes — `list`/`kill`/`status`/`send_input` — it is *not* a checklist). When a
skill says to create a todo list or track tasks, maintain a **task artifact**: a
markdown checklist saved with `write_to_file` (`IsArtifact: true`,
`ArtifactMetadata.ArtifactType: "task"`), edited with `replace_file_content` /
`multi_replace_file_content` as you go.

At the start of any multi-step task, create the task artifact listing every step of
your plan. As you complete each step, edit the artifact to mark it done (`- [x]`).
If the plan changes, update the checklist. Keep it current — it is your source of
truth for what remains; once the conversation gets long, re-read it before starting
each step.

## Continuing Claude Superpowers Sessions in Antigravity

When continuing a project or session that was previously running in Claude Code with Superpowers:
- **Plans**: Existing plans in `docs/plans/` (or `docs/superpowers/plans/`) are canonical. Do not re-create or alter them; read the existing plan file directly.
- **Progress Ledgers**: The SDD progress ledger is located at `.superpowers/sdd/<plan-slug>/progress.md`. Tasks already marked `complete` or `DONE` in the ledger are finished — never re-execute them. Resume execution at the next uncompleted task.
- **Task Tracking in Antigravity**: Create an Antigravity task artifact (tracking checklist saved with `write_to_file`) reflecting only the remaining tasks from the ledger.
- **Subagent Dispatch**: Dispatch subagents using Antigravity's `invoke_subagent` (`TypeName: "self"` for implementer and reviewer subagents).
- **Ledger Continuity**: As tasks complete in Antigravity, append completions and rulings to the existing `.superpowers/sdd/<plan-slug>/progress.md` ledger so the audit trail remains intact across harnesses.

