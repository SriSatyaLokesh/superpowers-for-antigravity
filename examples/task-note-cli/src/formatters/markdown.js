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
