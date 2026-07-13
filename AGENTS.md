# Repository Guidance for AI Coding Agents

## Project

This repository is connected to a Wix site through Git Integration & Wix CLI.

## Safe areas to edit

- `src/pages/*.js`
- `src/public/**`
- `src/backend/**`
- `docs/**`

## Do not change without explicit approval

- Do not rename files in `src/pages/`; Wix uses generated page filenames to bind code to pages.
- Do not edit generated configuration or dependency files unless the task explicitly requires it.
- Do not remove existing Wix application code.
- Do not commit secrets, credentials, tokens, or private customer data.
- Do not push directly to `main`; use a feature branch and a pull request.

## Header integration

The custom header HTML component communicates with `src/pages/masterPage.js` using `window.parent.postMessage()` and the Wix HTML component `onMessage()` API.

Preferred element ID: `#htmlHeader`
Legacy fallback ID: `#html2`

Supported actions:

- `home`
- `products`
- `search`
- `location`

Keep the message source as `brothersHeader`.

## Validation

- Run `npm run lint` when a local Wix environment is available.
- Test Wix navigation on the published site because frontend navigation may not work in Preview.
- Verify desktop and mobile behavior after every header change.
