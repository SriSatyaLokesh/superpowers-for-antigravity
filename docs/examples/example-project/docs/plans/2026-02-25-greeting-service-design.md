# Design: Greeting Service

## 1. Objective
Build a robust, customizable greeting utility follow the Socratic Design process.

## 2. Architecture
- **Input**: `name` (string), `prefix` (optional string).
- **Output**: `greeting` (string).
- **Core Logic**: String concatenation with fallback for missing name.

## 3. Alternative Approaches
- **Option A (Static template)**: Simple `Hello, ${name}!`.
- **Option B (Customizable prefix - Recommended)**: Allows dynamic prefixes for internationalization or context-specific greetings.

## 4. Validation Plan
- **Unit Tests**: Verify default greeting, custom prefix, and edge cases (null, empty string).
- **Manual Proof**: Verify via `console.log` in a sample script.
