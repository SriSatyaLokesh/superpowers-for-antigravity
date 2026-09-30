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
