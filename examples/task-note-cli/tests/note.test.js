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
