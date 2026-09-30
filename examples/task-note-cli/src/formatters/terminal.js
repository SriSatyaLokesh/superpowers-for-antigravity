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
