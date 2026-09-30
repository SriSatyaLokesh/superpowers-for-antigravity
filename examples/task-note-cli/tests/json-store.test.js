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
