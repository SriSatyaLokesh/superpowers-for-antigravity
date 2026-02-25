# PRD: Greeting Service

## 1. Purpose
Provide a simple utility that generates personalized greetings for users.

## 2. User Stories
- As a developer, I want to be able to get a greeting string given a name.
- As a developer, I want the greeting to be "Hello, [Name]!" by default.
- As a developer, I want to be able to customize the greeting prefix (e.g., "Welcome, [Name]!").

## 3. Functional Requirements
- `greet(name)`: Returns "Hello, [Name]!".
- `greet(name, prefix)`: Returns "[Prefix], [Name]!".
- Should handle empty strings or null values gracefully (e.g., return "Hello, Stranger!").

## 4. Acceptance Criteria
- 100% test coverage for the greeting logic.
- Documented API.
