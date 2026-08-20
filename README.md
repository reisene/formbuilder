<div align="center">
<img height='130' src='https://raw.githubusercontent.com/reisene/formbuilder/main/public/icon.png' alt="Form Builder" />
<h1>Form Builder</h1>

![GitHub License](https://img.shields.io/github/license/reisene/formbuilder)
![GitHub Release](https://img.shields.io/github/v/release/reisene/formbuilder)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.0-brightgreen?logo=node.js)](https://nodejs.org)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5647358b807d4f1fa032f03d166632ad)](https://app.codacy.com/gh/reisene/formbuilder/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![codecov](https://codecov.io/gh/reisene/formbuilder/graph/badge.svg?token=3LJFR180S0)](https://codecov.io/gh/reisene/formbuilder)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/G9R5r1gJVxu9sH9yYjxb4W/E3ZwVyJCSSjjo6NN7ucJzz/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/G9R5r1gJVxu9sH9yYjxb4W/E3ZwVyJCSSjjo6NN7ucJzz/tree/main)
[![CodeFactor](https://www.codefactor.io/repository/github/reisene/formbuilder/badge)](https://www.codefactor.io/repository/github/reisene/formbuilder)
[![Maintainability](https://qlty.sh/gh/reisene/projects/formbuilder/maintainability.svg)](https://qlty.sh/gh/reisene/projects/formbuilder)

</div>

A visual drag-and-drop form builder built with [Next.js](https://nextjs.org) (App Router), React, TypeScript and React Bootstrap. This is a portfolio project focused on clean architecture, scalability, maintainability and developer experience.

> **Status:** early development. The project skeleton, theming, navigation and documentation routing are in place. The drag-and-drop editor is the next milestone — see [Roadmap](#roadmap).

## Key Features

- **Light / dark theme** — server-rendered initial theme (no flash of incorrect theme), persisted in `localStorage` and synced through a `theme` cookie via the `/api/theme` route handler
- **Responsive navigation** — animated active-link indicator and an off-canvas mobile menu (React Bootstrap)
- **Custom 404 page** — typewriter headline and a responsive illustration
- **SEO & Open Graph metadata** — with a full favicon set (ICO, PNG, apple-touch-icon, Android Chrome)
- **Modular SCSS architecture** — `_variables`, `_reset`, `_theme`, `_theme-switch`, `_navbar` partials aggregated in `global.scss`
- **App Router structure** — typed route handlers and a centralized, env-driven site configuration

## Technology Stack

| Layer                          | Technology                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Framework                      | [Next.js 16](https://nextjs.org) (App Router)                                                                                  |
| UI                             | [React 19](https://react.dev), [React Bootstrap 2](https://react-bootstrap.github.io), [Bootstrap 5](https://getbootstrap.com) |
| Language                       | [TypeScript](https://www.typescriptlang.org) (`strict` mode)                                                                   |
| Styling                        | SCSS (Sass) with CSS custom properties                                                                                         |
| Icons                          | [react-icons](https://react-icons.github.io/react-icons)                                                                       |
| Forms & validation _(planned)_ | React Hook Form, Zod                                                                                                           |
| Drag & drop _(planned)_        | dnd-kit                                                                                                                        |
| State management _(planned)_   | Zustand                                                                                                                        |

## Project Goals

- Provide a modern, visual and accessible way to design forms.
- Keep a clean, scalable and maintainable codebase.
- Serve as a portfolio project that demonstrates engineering quality, developer experience and up-to-date tooling.

## Screenshots

> Screenshots will be added once the core editor functionality is available.

## Installation

Requirements:

- [Node.js](https://nodejs.org) >= 22 (see `.nvmrc`; developed on Node 24)
- npm

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
```

Set `NEXT_DEV_HOST` in `.env.local` to your local IP address if you want the development server to be reachable from other devices on your network (e.g. `192.168.x.x`). All other variables in `.env.example` customize site metadata (author, links, Open Graph).

## Development

```bash
npm run dev          # Start the dev server (listens on 0.0.0.0)
npm run build        # Create a production build
npm run start        # Start the production server
npm run lint         # Lint the codebase with ESLint
npm run format       # Format all files with Prettier
npm run format:check # Verify formatting without editing
```

> **Note:** `npm run lint` is temporarily unavailable until `typescript-eslint` adds support for TypeScript 7. Type checking and production builds work via `experimental.useTypeScriptCli` in `next.config.ts`.

## Project Structure

```
formbuilder/
├── public/                      # Static assets (images, favicons, OG image)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/theme/route.ts   # Theme persistence endpoint (cookie)
│   │   ├── docs/[...slug]/      # Documentation catch-all route
│   │   ├── editor/              # Form builder editor (planned)
│   │   ├── about/               # About page (planned)
│   │   ├── layout.tsx           # Root layout (SSR theme, fonts, SEO)
│   │   ├── not-found.tsx        # Custom 404 page
│   │   └── page.tsx             # Home page
│   ├── components/              # Reusable React components
│   ├── config/site.ts           # Centralized site configuration (env-driven)
│   ├── content/docs/            # Documentation content (MDX) — planned
│   ├── hooks/useTheme.tsx       # Theme provider + useTheme hook
│   └── styles/                  # SCSS architecture (partials + global.scss)
├── .editorconfig
├── .gitattributes
├── .github/                     # Issue & PR templates
├── .nvmrc
├── .prettierrc
├── .prettierignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Roadmap

- [x] Visual drag-and-drop form builder editor (dnd-kit) at `/editor`
- [x] Form state and validation with React Hook Form + Zod
- [x] Global state management with Zustand
- [ ] Render documentation content from `src/content/docs` (MDX)
- [ ] About page
- [x] Theme refinements (accessibility, more palettes)

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) first, and use the provided issue and pull request templates.

## License

[MIT](LICENSE)

## Acknowledgements

- Built with [Next.js](https://nextjs.org), [React](https://react.dev) and [React Bootstrap](https://react-bootstrap.github.io)
- Icons by [react-icons](https://react-icons.github.io/react-icons)
