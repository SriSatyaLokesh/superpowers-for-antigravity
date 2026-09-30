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
