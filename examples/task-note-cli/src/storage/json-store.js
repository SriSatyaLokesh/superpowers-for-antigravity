const fs = require('node:fs');
const path = require('node:path');

class JsonStore {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  load() {
    if (!fs.existsSync(this.filePath)) {
      return { tasks: [], notes: [] };
    }
    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const data = JSON.parse(raw);
      return {
        tasks: Array.isArray(data.tasks) ? data.tasks : [],
        notes: Array.isArray(data.notes) ? data.notes : []
      };
    } catch {
      return { tasks: [], notes: [] };
    }
  }

  save(data) {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const payload = JSON.stringify(
      {
        tasks: Array.isArray(data.tasks) ? data.tasks : [],
        notes: Array.isArray(data.notes) ? data.notes : []
      },
      null,
      2
    );

    const tmpFile = `${this.filePath}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
    fs.writeFileSync(tmpFile, payload, 'utf8');
    fs.renameSync(tmpFile, this.filePath);
  }

  nextTaskId(existingTasks) {
    let maxNum = 0;
    for (const t of existingTasks) {
      const match = /^t-(\d+)$/.exec(t.id);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `t-${maxNum + 1}`;
  }

  nextNoteId(existingNotes) {
    let maxNum = 0;
    for (const n of existingNotes) {
      const match = /^n-(\d+)$/.exec(n.id);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `n-${maxNum + 1}`;
  }
}

module.exports = { JsonStore };
