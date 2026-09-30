# 📝 Task & Note CLI

A high-performance, zero-dependency command-line utility for managing tasks and notes with tagging, priority management, statistics, and GitHub-flavored Markdown export.

Built entirely using native Node.js built-ins (`node:fs`, `node:path`, `node:test`, `node:assert`).

---

## ⚡ Quick Start

```bash
# Add tasks
node bin/task-cli.js task add "Set up database" --priority high --tag backend
node bin/task-cli.js task add "Design UI mockups" --priority medium --tag frontend

# List tasks
node bin/task-cli.js task list

# Complete task
node bin/task-cli.js task done t-1

# Add note
node bin/task-cli.js note add "Meeting Notes" --content "Agreed on hexagonal architecture" --tag dev

# Export to Markdown
node bin/task-cli.js export --format md --output digest.md

# View statistics
node bin/task-cli.js stats
```

---

## 🧪 Testing

Run the native test suite:

```bash
node --test tests/*.test.js
```
