# Task & Note CLI Implementation Plan

> **For Claude / Antigravity:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Build a zero-dependency, hexagonal Task & Note CLI with tagging, priority management, statistics, and GitHub-flavored Markdown export.

**Architecture:** Pure Node.js standard library architecture with clean boundaries separating Domain entities (`Task`, `Note`), Atomic Persistence (`JsonStore`), Presentation Formatters (`MarkdownFormatter`, `TerminalFormatter`), and the Command Line Router (`CliRouter`).

**Tech Stack:** Node.js (>=18.0.0), `node:fs`, `node:path`, `node:util`, `node:test`, `node:assert`. Zero npm runtime dependencies.

---

### Global Constraints
- **Zero External Dependencies**: Must not install or rely on any 3rd party npm packages.
- **Atomic File Operations**: Must write storage files to `.tmp` before renaming to prevent data corruption.
- **Test-Driven Development**: Every component must have a test written and failing before implementation code is added.

---

### Task 1: Package Scaffolding & Task Domain Entity

**Files:**
- Create: `examples/task-note-cli/package.json`
- Create: `examples/task-note-cli/src/domain/task.js`
- Test: `examples/task-note-cli/tests/task.test.js`

**Step 1: Create package.json and write the failing test**

File: `examples/task-note-cli/package.json`
```json
{
  "name": "task-note-cli",
  "version": "1.0.0",
  "description": "Zero-dependency Task and Note CLI with Markdown export",
  "main": "src/cli.js",
  "bin": {
    "task-cli": "bin/task-cli.js"
  },
  "scripts": {
    "test": "node --test tests/*.test.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": ["cli", "tasks", "notes", "markdown", "zero-dependency"],
  "author": "Antigravity AI",
  "license": "MIT"
}
```

File: `examples/task-note-cli/tests/task.test.js`
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { createTask, completeTask } = require('../src/domain/task.js');

test('createTask creates a valid task with defaults', () => {
  const task = createTask({ id: 't-1', title: 'Buy milk' });
  assert.equal(task.id, 't-1');
  assert.equal(task.title, 'Buy milk');
  assert.deepEqual(task.tags, []);
  assert.equal(task.status, 'pending');
  assert.equal(task.priority, 'medium');
  assert.ok(task.createdAt);
  assert.equal(task.completedAt, null);
});

test('createTask accepts tags and priority', () => {
  const task = createTask({
    id: 't-2',
    title: 'Deploy to prod',
    tags: ['devops', 'urgent'],
    priority: 'high'
  });
  assert.deepEqual(task.tags, ['devops', 'urgent']);
  assert.equal(task.priority, 'high');
});

test('createTask throws on empty title', () => {
  assert.throws(() => createTask({ id: 't-3', title: '' }), /Title is required/);
});

test('completeTask updates status and completedAt', () => {
  const task = createTask({ id: 't-4', title: 'Write tests' });
  const completed = completeTask(task);
  assert.equal(completed.status, 'completed');
  assert.ok(completed.completedAt);
});
```

**Step 2: Run test to verify it fails**
Run: `node --test examples/task-note-cli/tests/task.test.js`
Expected: FAIL (Cannot find module `../src/domain/task.js`)

**Step 3: Write minimal implementation**
File: `examples/task-note-cli/src/domain/task.js`
```javascript
function createTask({ id, title, tags = [], priority = 'medium' }) {
  if (!id || typeof id !== 'string') {
    throw new Error('Task ID is required');
  }
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required');
  }

  const validPriorities = ['low', 'medium', 'high'];
  const normalizedPriority = validPriorities.includes(priority) ? priority : 'medium';

  return {
    id,
    title: title.trim(),
    tags: Array.isArray(tags) ? tags.map(t => t.trim().toLowerCase()).filter(Boolean) : [],
    status: 'pending',
    priority: normalizedPriority,
    createdAt: new Date().toISOString(),
    completedAt: null
  };
}

function completeTask(task) {
  if (!task) throw new Error('Task object is required');
  return {
    ...task,
    status: 'completed',
    completedAt: new Date().toISOString()
  };
}

module.exports = { createTask, completeTask };
```

**Step 4: Run test to verify it passes**
Run: `node --test examples/task-note-cli/tests/task.test.js`
Expected: PASS (4 tests passed)

**Step 5: Commit**
```bash
git add examples/task-note-cli/package.json examples/task-note-cli/src/domain/task.js examples/task-note-cli/tests/task.test.js
git commit -m "feat(task-cli): implement task domain entity with validation"
```

---

### Task 2: Note Domain Entity

**Files:**
- Create: `examples/task-note-cli/src/domain/note.js`
- Test: `examples/task-note-cli/tests/note.test.js`

**Step 1: Write the failing test**
File: `examples/task-note-cli/tests/note.test.js`
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { createNote, updateNote } = require('../src/domain/note.js');

test('createNote creates a valid note', () => {
  const note = createNote({ id: 'n-1', title: 'Meeting', content: 'Discussed roadmap' });
  assert.equal(note.id, 'n-1');
  assert.equal(note.title, 'Meeting');
  assert.equal(note.content, 'Discussed roadmap');
  assert.deepEqual(note.tags, []);
  assert.ok(note.createdAt);
  assert.ok(note.updatedAt);
});

test('createNote throws on empty title or content', () => {
  assert.throws(() => createNote({ id: 'n-2', title: '' }), /Title is required/);
  assert.throws(() => createNote({ id: 'n-3', title: 'Title', content: '' }), /Content is required/);
});

test('updateNote updates content and timestamp', () => {
  const note = createNote({ id: 'n-4', title: 'Original', content: 'v1' });
  const updated = updateNote(note, { content: 'v2' });
  assert.equal(updated.content, 'v2');
  assert.equal(updated.title, 'Original');
  assert.ok(new Date(updated.updatedAt) >= new Date(note.updatedAt));
});
```

**Step 2: Run test to verify it fails**
Run: `node --test examples/task-note-cli/tests/note.test.js`
Expected: FAIL (Cannot find module `../src/domain/note.js`)

**Step 3: Write minimal implementation**
File: `examples/task-note-cli/src/domain/note.js`
```javascript
function createNote({ id, title, content, tags = [] }) {
  if (!id || typeof id !== 'string') {
    throw new Error('Note ID is required');
  }
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Title is required');
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    throw new Error('Content is required');
  }

  const now = new Date().toISOString();
  return {
    id,
    title: title.trim(),
    content: content.trim(),
    tags: Array.isArray(tags) ? tags.map(t => t.trim().toLowerCase()).filter(Boolean) : [],
    createdAt: now,
    updatedAt: now
  };
}

function updateNote(note, { title, content, tags }) {
  if (!note) throw new Error('Note object is required');
  return {
    ...note,
    title: title !== undefined ? title.trim() : note.title,
    content: content !== undefined ? content.trim() : note.content,
    tags: tags !== undefined ? tags.map(t => t.trim().toLowerCase()).filter(Boolean) : note.tags,
    updatedAt: new Date().toISOString()
  };
}

module.exports = { createNote, updateNote };
```

**Step 4: Run test to verify it passes**
Run: `node --test examples/task-note-cli/tests/note.test.js`
Expected: PASS (3 tests passed)

**Step 5: Commit**
```bash
git add examples/task-note-cli/src/domain/note.js examples/task-note-cli/tests/note.test.js
git commit -m "feat(task-cli): implement note domain entity with validation"
```

---

### Task 3: Atomic JSON Storage Repository

**Files:**
- Create: `examples/task-note-cli/src/storage/json-store.js`
- Test: `examples/task-note-cli/tests/json-store.test.js`

**Step 1: Write the failing test**
File: `examples/task-note-cli/tests/json-store.test.js`
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { JsonStore } = require('../src/storage/json-store.js');

test('JsonStore initializes empty state when file does not exist', () => {
  const tmpPath = path.join(os.tmpdir(), `store-test-${Date.now()}.json`);
  try {
    const store = new JsonStore(tmpPath);
    const data = store.load();
    assert.deepEqual(data.tasks, []);
    assert.deepEqual(data.notes, []);
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});

test('JsonStore persists tasks and notes atomically', () => {
  const tmpPath = path.join(os.tmpdir(), `store-test-persist-${Date.now()}.json`);
  try {
    const store = new JsonStore(tmpPath);
    store.save({
      tasks: [{ id: 't-1', title: 'Task 1' }],
      notes: [{ id: 'n-1', title: 'Note 1' }]
    });

    assert.ok(fs.existsSync(tmpPath));
    const reloaded = new JsonStore(tmpPath).load();
    assert.equal(reloaded.tasks.length, 1);
    assert.equal(reloaded.notes.length, 1);
    assert.equal(reloaded.tasks[0].id, 't-1');
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});

test('JsonStore generates next sequential IDs', () => {
  const tmpPath = path.join(os.tmpdir(), `store-test-ids-${Date.now()}.json`);
  try {
    const store = new JsonStore(tmpPath);
    assert.equal(store.nextTaskId([]), 't-1');
    assert.equal(store.nextTaskId([{ id: 't-1' }, { id: 't-2' }]), 't-3');
    assert.equal(store.nextNoteId([]), 'n-1');
    assert.equal(store.nextNoteId([{ id: 'n-5' }]), 'n-6');
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});
```

**Step 2: Run test to verify it fails**
Run: `node --test examples/task-note-cli/tests/json-store.test.js`
Expected: FAIL (Cannot find module `../src/storage/json-store.js`)

**Step 3: Write minimal implementation**
File: `examples/task-note-cli/src/storage/json-store.js`
```javascript
const fs = require('node:fs');
const path = require('node:path');

class JsonStore {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  load() {
    if (!fs.existsSync(this.filePath)) {
      return { tasks: [], notes: [] };
    }
    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const data = JSON.parse(raw);
      return {
        tasks: Array.isArray(data.tasks) ? data.tasks : [],
        notes: Array.isArray(data.notes) ? data.notes : []
      };
    } catch {
      return { tasks: [], notes: [] };
    }
  }

  save(data) {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const payload = JSON.stringify(
      {
        tasks: Array.isArray(data.tasks) ? data.tasks : [],
        notes: Array.isArray(data.notes) ? data.notes : []
      },
      null,
      2
    );

    const tmpFile = `${this.filePath}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
    fs.writeFileSync(tmpFile, payload, 'utf8');
    fs.renameSync(tmpFile, this.filePath);
  }

  nextTaskId(existingTasks) {
    let maxNum = 0;
    for (const t of existingTasks) {
      const match = /^t-(\d+)$/.exec(t.id);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `t-${maxNum + 1}`;
  }

  nextNoteId(existingNotes) {
    let maxNum = 0;
    for (const n of existingNotes) {
      const match = /^n-(\d+)$/.exec(n.id);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `n-${maxNum + 1}`;
  }
}

module.exports = { JsonStore };
```

**Step 4: Run test to verify it passes**
Run: `node --test examples/task-note-cli/tests/json-store.test.js`
Expected: PASS (3 tests passed)

**Step 5: Commit**
```bash
git add examples/task-note-cli/src/storage/json-store.js examples/task-note-cli/tests/json-store.test.js
git commit -m "feat(task-cli): implement atomic JSON storage repository"
```

---

### Task 4: Terminal and Markdown Formatters

**Files:**
- Create: `examples/task-note-cli/src/formatters/terminal.js`
- Create: `examples/task-note-cli/src/formatters/markdown.js`
- Test: `examples/task-note-cli/tests/formatters.test.js`

**Step 1: Write the failing test**
File: `examples/task-note-cli/tests/formatters.test.js`
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { formatTasksTable, formatNotesList, formatStats } = require('../src/formatters/terminal.js');
const { exportMarkdown } = require('../src/formatters/markdown.js');

test('formatTasksTable renders formatted tasks list', () => {
  const tasks = [
    { id: 't-1', title: 'Task 1', status: 'pending', priority: 'high', tags: ['work'] },
    { id: 't-2', title: 'Task 2', status: 'completed', priority: 'low', tags: [] }
  ];
  const output = formatTasksTable(tasks);
  assert.ok(output.includes('t-1'));
  assert.ok(output.includes('[ ] Task 1'));
  assert.ok(output.includes('[x] Task 2'));
  assert.ok(output.includes('#work'));
});

test('exportMarkdown generates GitHub-flavored markdown digest', () => {
  const data = {
    tasks: [
      { id: 't-1', title: 'Finish feature', status: 'pending', priority: 'high', tags: ['dev'] },
      { id: 't-2', title: 'Write tests', status: 'completed', priority: 'medium', tags: [] }
    ],
    notes: [
      { id: 'n-1', title: 'Architecture', content: 'Hexagonal structure', tags: ['design'] }
    ]
  };
  const md = exportMarkdown(data);
  assert.ok(md.includes('# Task & Note Digest'));
  assert.ok(md.includes('- [ ] `t-1` **[HIGH]** Finish feature #dev'));
  assert.ok(md.includes('- [x] `t-2` **[MEDIUM]** Write tests'));
  assert.ok(md.includes('### n-1: Architecture'));
  assert.ok(md.includes('Hexagonal structure'));
});

test('formatStats returns summary counts', () => {
  const data = {
    tasks: [
      { id: 't-1', status: 'completed', tags: ['frontend'] },
      { id: 't-2', status: 'pending', tags: ['backend'] }
    ],
    notes: [{ id: 'n-1', tags: ['docs'] }]
  };
  const stats = formatStats(data);
  assert.ok(stats.includes('Total Tasks: 2'));
  assert.ok(stats.includes('Completed: 1'));
  assert.ok(stats.includes('Pending: 1'));
  assert.ok(stats.includes('Total Notes: 1'));
});
```

**Step 2: Run test to verify it fails**
Run: `node --test examples/task-note-cli/tests/formatters.test.js`
Expected: FAIL (Cannot find modules `terminal.js` / `markdown.js`)

**Step 3: Write minimal implementation**
File: `examples/task-note-cli/src/formatters/terminal.js`
```javascript
function formatTasksTable(tasks) {
  if (!tasks || tasks.length === 0) {
    return 'No tasks found.';
  }
  return tasks.map(t => {
    const box = t.status === 'completed' ? '[x]' : '[ ]';
    const prio = t.priority ? `[${t.priority.toUpperCase()}]` : '';
    const tags = t.tags && t.tags.length > 0 ? t.tags.map(tag => `#${tag}`).join(' ') : '';
    return `${t.id.padEnd(5)} ${box} ${t.title} ${prio} ${tags}`.trim();
  }).join('\n');
}

function formatNotesList(notes) {
  if (!notes || notes.length === 0) {
    return 'No notes found.';
  }
  return notes.map(n => {
    const tags = n.tags && n.tags.length > 0 ? n.tags.map(tag => `#${tag}`).join(' ') : '';
    return `[${n.id}] ${n.title} ${tags}\n    ${n.content}`.trim();
  }).join('\n\n');
}

function formatStats(data) {
  const tasks = data.tasks || [];
  const notes = data.notes || [];
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;

  const tagCounts = {};
  for (const item of [...tasks, ...notes]) {
    for (const tag of (item.tags || [])) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const tagsFormatted = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => `#${tag} (${count})`)
    .join(', ') || 'None';

  return [
    '=== Task & Note CLI Statistics ===',
    `Total Tasks: ${tasks.length}`,
    `  - Completed: ${completed}`,
    `  - Pending: ${pending}`,
    `Total Notes: ${notes.length}`,
    `Top Tags: ${tagsFormatted}`
  ].join('\n');
}

module.exports = { formatTasksTable, formatNotesList, formatStats };
```

File: `examples/task-note-cli/src/formatters/markdown.js`
```javascript
function exportMarkdown(data) {
  const tasks = data.tasks || [];
  const notes = data.notes || [];

  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const lines = [
    '# Task & Note Digest',
    `*Generated on ${new Date().toISOString()}*\n`,
    '## Pending Tasks',
    pendingTasks.length > 0
      ? pendingTasks.map(t => {
          const prio = `**[${t.priority.toUpperCase()}]**`;
          const tags = t.tags && t.tags.length > 0 ? t.tags.map(tag => `#${tag}`).join(' ') : '';
          return `- [ ] \`${t.id}\` ${prio} ${t.title} ${tags}`.trim();
        }).join('\n')
      : '_No pending tasks._',
    '',
    '## Completed Tasks',
    completedTasks.length > 0
      ? completedTasks.map(t => {
          const prio = `**[${t.priority.toUpperCase()}]**`;
          const tags = t.tags && t.tags.length > 0 ? t.tags.map(tag => `#${tag}`).join(' ') : '';
          return `- [x] \`${t.id}\` ${prio} ${t.title} ${tags}`.trim();
        }).join('\n')
      : '_No completed tasks._',
    '',
    '## Notes'
  ];

  if (notes.length === 0) {
    lines.push('_No notes recorded._');
  } else {
    for (const note of notes) {
      const tags = note.tags && note.tags.length > 0 ? note.tags.map(tag => `#${tag}`).join(' ') : '';
      lines.push(`### ${note.id}: ${note.title}`);
      if (tags) lines.push(`*Tags:* ${tags}\n`);
      lines.push(note.content, '');
    }
  }

  return lines.join('\n');
}

module.exports = { exportMarkdown };
```

**Step 4: Run test to verify it passes**
Run: `node --test examples/task-note-cli/tests/formatters.test.js`
Expected: PASS (3 tests passed)

**Step 5: Commit**
```bash
git add examples/task-note-cli/src/formatters/ examples/task-note-cli/tests/formatters.test.js
git commit -m "feat(task-cli): implement terminal and markdown formatters"
```

---

### Task 5: CLI Command Router & Entrypoint

**Files:**
- Create: `examples/task-note-cli/src/cli.js`
- Create: `examples/task-note-cli/bin/task-cli.js`
- Test: `examples/task-note-cli/tests/cli.test.js`

**Step 1: Write the failing integration test**
File: `examples/task-note-cli/tests/cli.test.js`
```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');
const { runCli } = require('../src/cli.js');

test('CLI adds task and lists it', () => {
  const tmpPath = path.join(os.tmpdir(), `cli-test-${Date.now()}.json`);
  try {
    const resAdd = runCli(['task', 'add', 'My Test Task', '--tag', 'dev', '--priority', 'high', '--storage', tmpPath]);
    assert.ok(resAdd.includes('Created task t-1'));

    const resList = runCli(['task', 'list', '--storage', tmpPath]);
    assert.ok(resList.includes('t-1'));
    assert.ok(resList.includes('My Test Task'));
    assert.ok(resList.includes('#dev'));
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});

test('CLI marks task done and displays stats', () => {
  const tmpPath = path.join(os.tmpdir(), `cli-test-done-${Date.now()}.json`);
  try {
    runCli(['task', 'add', 'Sample Task', '--storage', tmpPath]);
    const resDone = runCli(['task', 'done', 't-1', '--storage', tmpPath]);
    assert.ok(resDone.includes('Marked task t-1 as completed'));

    const resStats = runCli(['stats', '--storage', tmpPath]);
    assert.ok(resStats.includes('Completed: 1'));
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});

test('CLI adds and displays notes', () => {
  const tmpPath = path.join(os.tmpdir(), `cli-test-note-${Date.now()}.json`);
  try {
    const resAdd = runCli(['note', 'add', 'Meeting Note', '--content', 'Important decisions', '--tag', 'team', '--storage', tmpPath]);
    assert.ok(resAdd.includes('Created note n-1'));

    const resShow = runCli(['note', 'show', 'n-1', '--storage', tmpPath]);
    assert.ok(resShow.includes('Important decisions'));
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
});
```

**Step 2: Run test to verify it fails**
Run: `node --test examples/task-note-cli/tests/cli.test.js`
Expected: FAIL (Cannot find module `../src/cli.js`)

**Step 3: Write minimal implementation**
File: `examples/task-note-cli/src/cli.js`
```javascript
const fs = require('node:fs');
const path = require('node:path');
const { JsonStore } = require('./storage/json-store.js');
const { createTask, completeTask } = require('./domain/task.js');
const { createNote } = require('./domain/note.js');
const { formatTasksTable, formatNotesList, formatStats } = require('./formatters/terminal.js');
const { exportMarkdown } = require('./formatters/markdown.js');

function parseArgs(args) {
  const positional = [];
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        options[key] = args[i + 1];
        i++;
      } else {
        options[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { positional, options };
}

function runCli(rawArgs) {
  const { positional, options } = parseArgs(rawArgs);
  const storagePath = options.storage || process.env.TASK_CLI_STORAGE || './.task-note-data.json';
  const store = new JsonStore(storagePath);
  const data = store.load();

  const command = positional[0] || 'help';

  switch (command) {
    case 'task': {
      const sub = positional[1] || 'list';
      if (sub === 'add') {
        const title = positional[2];
        if (!title) return 'Error: Task title is required. Usage: task add <title>';
        const tags = options.tag ? options.tag.split(',').map(s => s.trim()) : [];
        const priority = options.priority || 'medium';
        const id = store.nextTaskId(data.tasks);
        const task = createTask({ id, title, tags, priority });
        data.tasks.push(task);
        store.save(data);
        return `Created task ${task.id}: "${task.title}"`;
      }
      if (sub === 'list') {
        let tasks = data.tasks;
        if (options.tag) {
          tasks = tasks.filter(t => t.tags.includes(options.tag.toLowerCase()));
        }
        if (options.status) {
          tasks = tasks.filter(t => t.status === options.status);
        }
        if (options.json) {
          return JSON.stringify(tasks, null, 2);
        }
        return formatTasksTable(tasks);
      }
      if (sub === 'done') {
        const id = positional[2];
        const idx = data.tasks.findIndex(t => t.id === id);
        if (idx === -1) return `Error: Task ${id} not found.`;
        data.tasks[idx] = completeTask(data.tasks[idx]);
        store.save(data);
        return `Marked task ${id} as completed.`;
      }
      if (sub === 'delete') {
        const id = positional[2];
        const before = data.tasks.length;
        data.tasks = data.tasks.filter(t => t.id !== id);
        if (data.tasks.length === before) return `Error: Task ${id} not found.`;
        store.save(data);
        return `Deleted task ${id}.`;
      }
      return `Unknown task command "${sub}". Usage: task add|list|done|delete`;
    }

    case 'note': {
      const sub = positional[1] || 'list';
      if (sub === 'add') {
        const title = positional[2];
        const content = options.content || positional[3];
        if (!title || !content) return 'Error: Title and --content are required.';
        const tags = options.tag ? options.tag.split(',').map(s => s.trim()) : [];
        const id = store.nextNoteId(data.notes);
        const note = createNote({ id, title, content, tags });
        data.notes.push(note);
        store.save(data);
        return `Created note ${note.id}: "${note.title}"`;
      }
      if (sub === 'list') {
        let notes = data.notes;
        if (options.tag) {
          notes = notes.filter(n => n.tags.includes(options.tag.toLowerCase()));
        }
        if (options.json) {
          return JSON.stringify(notes, null, 2);
        }
        return formatNotesList(notes);
      }
      if (sub === 'show') {
        const id = positional[2];
        const note = data.notes.find(n => n.id === id);
        if (!note) return `Error: Note ${id} not found.`;
        return `[${note.id}] ${note.title}\nUpdated: ${note.updatedAt}\nTags: ${note.tags.join(', ')}\n\n${note.content}`;
      }
      if (sub === 'delete') {
        const id = positional[2];
        const before = data.notes.length;
        data.notes = data.notes.filter(n => n.id !== id);
        if (data.notes.length === before) return `Error: Note ${id} not found.`;
        store.save(data);
        return `Deleted note ${id}.`;
      }
      return `Unknown note command "${sub}". Usage: note add|list|show|delete`;
    }

    case 'export': {
      const format = options.format || 'md';
      const output = format === 'json' ? JSON.stringify(data, null, 2) : exportMarkdown(data);
      if (options.output) {
        fs.writeFileSync(path.resolve(options.output), output, 'utf8');
        return `Exported to ${options.output}`;
      }
      return output;
    }

    case 'stats': {
      return formatStats(data);
    }

    case 'help':
    default: {
      return [
        'Task & Note CLI (Zero-dependency)',
        '',
        'Usage: task-cli <command> [subcommand] [args] [options]',
        '',
        'Commands:',
        '  task add <title> [--tag <tags>] [--priority low|medium|high]',
        '  task list [--tag <tag>] [--status pending|completed] [--json]',
        '  task done <id>',
        '  task delete <id>',
        '  note add <title> --content <text> [--tag <tags>]',
        '  note list [--tag <tag>] [--json]',
        '  note show <id>',
        '  note delete <id>',
        '  export [--format md|json] [--output <path>]',
        '  stats',
        '  help'
      ].join('\n');
    }
  }
}

module.exports = { runCli, parseArgs };
```

File: `examples/task-note-cli/bin/task-cli.js`
```javascript
#!/usr/bin/env node
const { runCli } = require('../src/cli.js');

const result = runCli(process.argv.slice(2));
if (result) {
  console.log(result);
}
```

**Step 4: Run test to verify it passes**
Run: `node --test examples/task-note-cli/tests/cli.test.js`
Expected: PASS (3 tests passed)

**Step 5: Commit**
```bash
git add examples/task-note-cli/src/cli.js examples/task-note-cli/bin/task-cli.js examples/task-note-cli/tests/cli.test.js
git commit -m "feat(task-cli): implement command line router and executable entrypoint"
```

---

### Task 6: Documentation & Complete Test Suite Verification

**Files:**
- Create: `examples/task-note-cli/README.md`
- Run: `node --test examples/task-note-cli/tests/*.test.js`

**Step 1: Write README.md**
File: `examples/task-note-cli/README.md`
```markdown
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
npm test
```
```

**Step 2: Run all tests in the task-cli project**
Run: `node --test examples/task-note-cli/tests/*.test.js`
Expected: All 16+ tests pass with 0 failures.

**Step 3: Commit**
```bash
git add examples/task-note-cli/README.md
git commit -m "docs(task-cli): add usage documentation and examples"
```
