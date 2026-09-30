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
