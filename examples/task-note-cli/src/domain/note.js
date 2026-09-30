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
