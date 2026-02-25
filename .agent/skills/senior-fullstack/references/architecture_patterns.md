# Architecture Patterns

## 1. Domain-Driven Design (Simplified)
Organize code by feature directories rather than technical roles (e.g., `features/auth`, `features/projects`).

## 2. Server-Side Rendering (SSR) & Streaming
Leverage Next.js Server Components for data fetching to reduce client-side JS.

## 3. Database Schema Design
- Use UUIDs for public-facing IDs.
- Implement soft deletes where appropriate.
- Maintain `createdAt` and `updatedAt` timestamps on all tables.

## 4. API Layer
- Use Zod for runtime validation.
- Implement proper error handling middleware.
- Leverage GraphQL fragments for efficient data fetching.
