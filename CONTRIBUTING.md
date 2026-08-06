# Contributing to Form Builder

Thank you for considering contributing. Please read this document and the [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

## Development Workflow

1. Fork the repository (for external contributors) or create a feature branch.
2. Install dependencies with `npm install`.
3. Start the dev server with `npm run dev`.
4. Implement your change.
5. Before committing, run `npm run format` and, if available, `npm run lint`.
6. Open a pull request against the default branch.

> **Note:** `npm run lint` is temporarily unavailable until `typescript-eslint` supports TypeScript 7. Please still keep the code clean and consistent with the existing style.

## Coding Style

- **TypeScript** with `strict` mode enabled (see `tsconfig.json`).
- **Formatting** is handled by [Prettier](https://prettier.io) — run `npm run format` before committing. The project uses:
  - 4-space indentation
  - single quotes
  - semicolons
  - trailing commas
  - LF line endings (enforced via `.gitattributes` and `.editorconfig`)
- **Linting** is configured in `eslint.config.mjs` (ESLint flat config with `eslint-config-next`).
- Write components with the **"use client"** directive only when they need client-side interactivity.
- Keep styles in the SCSS partials under `src/styles/` and reference design tokens from `_variables.scss`.
- Use the `@/` path alias instead of relative imports where practical.

## Branching Strategy

The repository currently uses a single default branch and does not yet enforce a
branching convention. As collaboration begins, we recommend a simple
[GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow):

- Create short-lived branches off the default branch named `feature/...` or `fix/...`.
- Open a pull request early and target the default branch.
- Keep branches up to date with the default branch before merging.

## Commit Recommendations

- Use short, descriptive, imperative messages, e.g. `Add theme toggle` or `Fix offcanvas link indicator`.
- Reference related issues when applicable, e.g. `Fix #42`.
- Keep each commit focused on a single logical change.
- Do not include generated files (`.next/`, `node_modules/`, etc.) in commits.

## Pull Request Expectations

- Use the [pull request template](.github/PULL_REQUEST_TEMPLATE.md).
- Keep pull requests small and focused on one concern.
- Ensure `npm run build` and `npm run format:check` pass.
- Update the README or other documentation if your change affects them.
- Be responsive to review feedback.

## Issue Reporting

- **Bugs** — use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include steps to reproduce, expected vs. actual behavior, screenshots, and environment details.
- **Feature requests** — use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md). Describe the problem you want to solve and the solution you have in mind.
- **Security issues** — do **not** open a public issue. Follow the process in [SECURITY.md](SECURITY.md).
