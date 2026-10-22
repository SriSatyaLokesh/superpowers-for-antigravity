# Backend Security Practices

## 1. Authentication & Authorization
- Use JWTs or sessions securely.
- Implement RBAC (Role-Based Access Control).
- Never store passwords in plain text (use Bcrypt/Argon2).

## 2. Input Validation
- Validate all data using Zod or Joi.
- Sanitize inputs to prevent SQL injection and XSS.

## 3. Sensitive Data Handling
- Use Environment Variables for secrets.
- Encrypt data at rest.
- Implement proper CORS policies.

## 4. Dependency Management
- Regularly run `npm audit`.
- Keep core dependencies updated.
