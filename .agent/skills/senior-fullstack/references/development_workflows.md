# Development Workflows

## 1. Local Development
1. Clone repository.
2. Run `npm install`.
3. Set up `.env` from `.env.example`.
4. Run `npm run dev`.

## 2. Testing Workflow
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **TDD**: Write a failing test before implementation.

## 3. Git Workflow
- Create feature branches: `feat/name-of-feature`.
- Keep commits atomic.
- Require PR reviews before merging.

## 4. Deployment Workflow
- Automatic deployments on commit to `main` via GitHub Actions.
- Use environment variables for all secrets.
