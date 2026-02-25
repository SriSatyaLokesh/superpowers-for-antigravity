# API Design Patterns

## 1. Resource-Oriented Design
Follow RESTful principles where URLs represent resources (e.g., `GET /users`, `POST /orders`).

## 2. Idempotency
Ensure that redundant API calls do not cause side effects, especially for financial transactions.

## 3. Rate Limiting & Throttling
Implement defensive rate limiting at the infrastructure or application level.

## 4. Documentation First
Always maintain an OpenAPI (Swagger) or GraphQL schema before implementation.
