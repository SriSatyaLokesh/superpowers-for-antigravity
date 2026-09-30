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
