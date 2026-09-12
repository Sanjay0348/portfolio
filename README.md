# Sanjay V — portfolio

Interactive React + TypeScript portfolio built with Vite, Sass, Framer Motion, and Lucide icons. Fonts are bundled locally.

## Run locally

```sh
npm ci
npm start
```

## Verify

```sh
npm run build
npm test
```

The Playwright suite uses an installed Google Chrome and starts its own local server for the production build. Run the build before testing. It covers desktop and mobile layouts, workflow simulations, case-study dialogs, filters, themes, navigation, animation, and reduced motion. Visual captures are written to the ignored `artifacts/` directory.

## Content and interactions

Profile details, project case studies, and impact metrics live in `src/data/portfolio.ts`. The hero playground is a client-side simulation; it does not call an AI backend. Project previews and sample review findings are illustrative. Resume and contact links use the existing profile data.

Analytics initialize only when `VITE_APP_PUBLIC_POSTHOG_KEY` is provided. Set `VITE_APP_PUBLIC_POSTHOG_HOST` for the appropriate PostHog host.
