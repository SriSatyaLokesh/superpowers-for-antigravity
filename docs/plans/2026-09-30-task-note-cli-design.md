# Task & Note CLI Design Specification

**Date:** 2026-09-30  
**Status:** Approved  
**Author:** Antigravity AI & Human Partner  

---

## 1. Overview & Objectives

Build a high-performance, zero-dependency command-line utility for managing tasks and notes with rich tagging, priority tracking, statistics, and Markdown export capabilities.

### Key Objectives
1. **Zero External Dependencies**: Implemented entirely with native Node.js built-ins (`node:fs`, `node:path`, `node:util`, `node:test`, `node:assert`).
2. **Hexagonal Architecture**: Clear boundaries between core domain models (`Task`, `Note`), persistence (`JsonStore`), formatters (`MarkdownFormatter`, `TerminalFormatter`), and interface routing (`CliRouter`).
3. **Atomic Persistence**: Prevents data corruption on abnormal termination via write-temp-and-rename mechanics.
4. **Rich Interoperability**: Generates GitHub-flavored Markdown digests for notes and tasks.
5. **Rigorous TDD**: Built following strict Test-Driven Development (RED-GREEN-REFACTOR) using Node.js native test runner.

---

## 2. Architecture & Components

```
examples/task-note-cli/
├── bin/
│   └── task-cli.js               # CLI Entrypoint (# !/usr/bin/env node)
├── src/
│   ├── domain/
│   │   ├── task.js               # Task entity & validation
│   │   └── note.js               # Note entity & validation
│   ├── storage/
│   │   └── json-store.js         # Atomic JSON file persistence repository
│   ├── formatters/
│   │   ├── terminal.js           # CLI table/list output formatter
│   │   └── markdown.js           # GitHub-flavored Markdown export generator
│   └── cli.js                    # Subcommand routing and argument parser
├── tests/
│   ├── task.test.js              # Task domain unit tests
│   ├── note.test.js              # Note domain unit tests
│   ├── json-store.test.js        # Atomic storage integration tests
│   ├── markdown.test.js          # Markdown export tests
│   └── cli.test.js               # End-to-end CLI integration tests
├── package.json
└── README.md
```

---

## 3. Data Model

### 3.1 Task Schema
```json
{
  "id": "t-1",
  "title": "Implement authentication endpoints",
  "tags": ["backend", "security"],
  "status": "pending",
  "priority": "high",
  "createdAt": "2026-09-30T10:00:00.000Z",
  "completedAt": null
}
```
- `id`: Human-readable sequential ID prefixed with `t-`.
- `status`: `'pending' | 'in_progress' | 'completed'`.
- `priority`: `'low' | 'medium' | 'high'` (default: `'medium'`).

### 3.2 Note Schema
```json
{
  "id": "n-1",
  "title": "Architecture Decisions",
  "content": "Selected Hexagonal architecture to ensure pure domain isolation.",
  "tags": ["architecture", "review"],
  "createdAt": "2026-09-30T10:05:00.000Z",
  "updatedAt": "2026-09-30T10:05:00.000Z"
}
```

---

## 4. CLI Command Interface

| Command | Arguments / Flags | Description |
|---|---|---|
| `task-cli task add <title>` | `--tag <tags>`, `--priority <p>` | Add a new task |
| `task-cli task list` | `--tag <tag>`, `--status <s>`, `--json` | List filtered tasks |
| `task-cli task done <id>` | | Mark task as completed |
| `task-cli task delete <id>` | | Delete task by ID |
| `task-cli note add <title>` | `--content <text>`, `--tag <tags>` | Add a new note |
| `task-cli note list` | `--tag <tag>`, `--json` | List notes |
| `task-cli note show <id>` | | Show note content |
| `task-cli note delete <id>` | | Delete note by ID |
| `task-cli export` | `--format <md\|json>`, `--output <path>` | Export Markdown/JSON digest |
| `task-cli stats` | | Summary counts and tag metrics |
| `task-cli help` | | Display manual & options |

---

## 5. Storage & Persistence Strategy

1. **Storage Path Resolution:**
   - Command flag `--storage <path>`
   - Environment variable `TASK_CLI_STORAGE`
   - Default: `./.task-note-data.json`
2. **Atomic Writes:**
   - Serialize state to JSON string with indentation.
   - Write to `<storage_path>.tmp`.
   - Rename `<storage_path>.tmp` to `<storage_path>`.
   - Handle directory creation recursively (`fs.mkdirSync(..., { recursive: true })`).

---

## 6. Verification & Testing Strategy

- Native Node.js test runner: `node --test tests/*.test.js`
- Test suites:
  - Unit: Entity creation, validation errors, state transitions.
  - Storage: Empty load, persistence, concurrent writes, atomic rename.
  - Formatting: Markdown syntax compliance, checklist formatting.
  - CLI: Subcommand execution, exit codes, stdout/stderr formatting.
