# Greeting Service Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a customizable greeting service with fallback logic.

**Architecture:** Functional utility with optional parameters.

**Tech Stack:** JavaScript (ESM).

---

### Task 1: Basic Greeting with Fallback

**Files:**
- Create: `src/greeting.js`
- Create: `tests/greeting.test.js`

**Step 1: Write the failing test**
```javascript
import { greet } from '../src/greeting.js';
test('returns default greeting for null name', () => {
    expect(greet(null)).toBe('Hello, Stranger!');
});
```

**Step 2: Run test to verify it fails**
Run: `npm test tests/greeting.test.js`
Expected: FAIL (module not found or function not defined)

**Step 3: Write minimal implementation**
```javascript
export const greet = (name) => {
    return `Hello, ${name || 'Stranger'}!`;
};
```

**Step 4: Run test to verify it passes**
Run: `npm test tests/greeting.test.js`
Expected: PASS

**Step 5: Commit**
`feat(greeting): add basic greet function with fallback`

---

### Task 2: Custom Prefix Support

**Files:**
- Modify: `src/greeting.js`
- Modify: `tests/greeting.test.js`

**Step 1: Write the failing test**
```javascript
test('returns personalized greeting with prefix', () => {
    expect(greet('Alice', 'Welcome')).toBe('Welcome, Alice!');
});
```

**Step 2: Run test to verify it fails**
Run: `npm test tests/greeting.test.js`
Expected: FAIL (received "Hello, Alice!")

**Step 3: Update implementation**
```javascript
export const greet = (name, prefix = 'Hello') => {
    return `${prefix}, ${name || 'Stranger'}!`;
};
```

**Step 4: Run test to verify it passes**
Run: `npm test tests/greeting.test.js`
Expected: PASS

**Step 5: Commit**
`feat(greeting): support custom greeting prefixes`
