# Repository Guidance for AI Coding Agents

## Project

This repository is connected to the published Wix site at
`https://tama900004.wixsite.com/brothersmy` through Git Integration and Wix CLI.

- Wix site ID: `d614da0b-b045-4eec-adac-93e8f690d974`
- Editor type: Wix Editor
- Velo: enabled
- Wix Stores catalog: V1
- Default branch: `main`

## Safety

- Work on a feature branch and open a pull request. Never push directly to `main`.
- Do not rename files in `src/pages`; Wix binds pages to the generated filenames.
- Do not edit `wix.config.json`, `wix.lock`, or generated dependency files unless the task requires it.
- Do not remove Wix application code or visual-editor elements without confirming their purpose.
- Never commit credentials, tokens, customer data, payment data, or private environment values.
- Do not invent prices, stock, reviews, specifications, awards, payment support, or business claims.

## Safe areas

- `src/pages/*.js`
- `src/public/**`
- `src/backend/**`
- `docs/**`

## Confirmed business data

- Name: BROTHER'S
- Phone: `03 7803 8911`
- Phone link: `tel:+60378038911`
- Hours: Daily, 10:00 AM–10:00 PM
- Address: No. 10, Jalan SS6/12, Kelana Jaya, 47301 Petaling Jaya, Selangor, Malaysia
- Payment labels allowed in the assignment prototype: Cash, Visa, TNG
- Coupon: `WELCOME25`, 25% off selected accessories

Use `src/public/siteConfig.js` as the code-side source of truth for shared routes and business data.

## Header architecture

Critical navigation should be native Wix elements. Keep custom HTML only for the promotion strip where possible.

The existing full-header HTML Embed is supported temporarily by `src/pages/masterPage.js`:

- Preferred Wix element ID: `#htmlHeader`
- Legacy fallback ID: `#html2`
- Required inbound source: `brothersHeader`
- Supported actions: `home`, `products`, `search`, `location`

Do not add popup fallbacks, delayed `window.open()`, arbitrary URL messages, or duplicate click handlers. Do not remove the bridge until native Wix controls are published and verified.

## Known live-site facts

Verified on 2026-07-13:

- All Products, Search, and Location actions work on the published site.
- Wix Stores contains 34 visible products, not the assignment target of 100.
- Old Black Royal and RedRoyal content remains in the footer and several pages.
- `Order Now` and `Offers` include links to the old `blackroyal` Wix site.
- Desktop pages overflow horizontally: 1602 px document width in a 1348 px viewport.
- Route labels and URLs do not consistently match their page purpose.

## Validation

- Inspect `package.json` before installing or upgrading packages.
- Run `npm run lint` after code changes.
- Run `git diff --check` and search for old branding and unsafe links.
- Use `wix dev` only when the local Wix authentication flow is available.
- Test navigation on the published site after Wix Editor changes.
- Verify desktop and mobile layouts after every global-header or footer change.
