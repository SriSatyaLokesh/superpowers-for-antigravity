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
