import { greet } from '../src/greeting.js';

describe('Greeting Service', () => {
    test('returns default greeting for provided name', () => {
        expect(greet('Satya')).toBe('Hello, Satya!');
    });

    test('returns fallback greeting for null name', () => {
        expect(greet(null)).toBe('Hello, Stranger!');
    });

    test('returns fallback greeting for empty string', () => {
        expect(greet('')).toBe('Hello, Stranger!');
    });

    test('returns personalized greeting with custom prefix', () => {
        expect(greet('Alice', 'Welcome')).toBe('Welcome, Alice!');
    });

    test('returns custom prefix with fallback for null name', () => {
        expect(greet(null, 'Greet')).toBe('Greet, Stranger!');
    });
});
