# BROTHER'S Full Site Audit

Audit date: 2026-07-13

Live site: https://tama900004.wixsite.com/brothersmy

Repository: `tama900004-cyber/brothersmy`

## Executive summary

The published site is reachable and its main Wix apps are present. All Products, product search, Wix Members sign-up, the cart route, and Wix Bookings routes load. The highest risk is not a missing application: it is an incomplete redesign that still exposes Black Royal/RedRoyal content, wrong contact information, old-site links, confusing route names, placeholder text, unverified prices and service claims, and a desktop horizontal-overflow defect.

The current header actions work on the published site after previous fixes. The reliable long-term solution is to move critical actions to native Wix controls and limit the custom Embed to the promotion strip.

## Evidence and limitations

- The repository, branches, merged pull requests, and all tracked source files were inspected.
- The published site and listed routes were inspected in a public desktop browser.
- All Products, Search, Location, cart, checkout, member sign-up, and booking pages were checked without submitting data or payments.
- Wix Stores V1 was queried through the Wix API after implementation. It reports 100 total products, 100 visible products, and 100 products with images.
- The 66 added automotive items were also verified by expected name: none were missing, duplicated, hidden, or missing media.
- The published All Products page reports 100 products and exposes all seven new collection links.
- Desktop layout was measured at 1602 px document width in a 1348 px viewport.
- Mobile and tablet viewport resizing was not available in this browser session. Those layouts remain manual tests.
- No checkout, booking, login, form, or payment was submitted.

## Repository audit

| Area | Finding | Priority | Ownership |
| --- | --- | --- | --- |
| Page code | All generated page files except `masterPage.js` contain only Wix starter code | Medium | Requires Wix Editor/design decisions before adding element-specific code |
| Header bridge | Central action whitelist exists and published actions work | Medium | Hardened in GitHub; migrate controls in Wix Editor |
| Shared data | Routes and business facts were repeated or embedded in one file | Medium | Completed in GitHub using `src/public/siteConfig.js` |
| Header source | Live Embed HTML was stored only in Wix, not in the repository | High | Canonical promo Embed added in GitHub |
| Documentation | Only one short header guide existed | High | Expanded in GitHub |
| Dependencies | `@wix/cli` and ESLint use broad old `^1.0.0` ranges | Medium | Validate first; do not upgrade blindly |
| Backend permissions | Default web-module permissions allow anonymous invocation, but no web modules exist | Low | Monitor; narrow if backend methods are added |
| Secrets | No tracked credentials or tokens found | Low | Continue secret checks before every commit |

## Live-site issues

| Issue | Evidence | HCI principle | Priority | Ownership |
| --- | --- | --- | --- | --- |
| Old Black Royal footer on all audited pages | Wrong name, Cyberjaya address, old email, phone, social links, and 2035 copyright | Consistency, trust, error prevention | Critical | Wix Editor |
| RedRoyal text remains | Home Services and About Us copy mention RedRoyal | Consistency, credibility | Critical | Wix Editor |
| Links leave the BROTHER'S site | Home `Order Now` and `Offers` point to `tama900004.wixsite.com/blackroyal` | User control, error prevention | Critical | Wix Editor |
| Location page contains wrong business content | `/financing` displays Black Royal rental copy and Cyberjaya details | Visibility, trust | Critical | Wix Editor |
| Horizontal overflow | 1602 px document width in a 1348 px desktop viewport | Efficiency, responsive usability | High | Wix Editor |
| Route names do not match purpose | `/pre-owned` is About Us; `/financing` is Location | Recognition over recall | High | Wix Editor and redirects |
| Commercial catalog values need confirmation | The 66 new items use project display prices and compatibility warnings; the 34 older vehicle prices also remain unverified | Relevance, trust, error prevention | High | Business confirmation and Wix Stores |
| Placeholder testimonial | “Testimonials provide…” and “Alexa Young, CA” | Credibility, satisfaction | High | Wix Editor |
| Placeholder category description | “This is your category description…” | Clarity | Medium | Wix Stores category settings |
| Navigation label `CARS` | Opens All Products but does not explain whether items are products or rentals | Recognition over recall | Medium | Wix Editor |
| `My Subscriptions` in main menu | Opens Wix Members sign-up; account action is unclear | Affordance, consistency | Medium | Wix Editor |
| Car Rental has no future class sessions | The card shows `Loading days...` because no approved schedule exists | Visibility, trust, error prevention | High | Owner schedule decision in Wix Bookings |
| Rental claims are unverified | 24/7 support, delivery, deposits, rates, and drivers are claimed | Trust, error prevention | High | Owner confirmation |
| Search page carries wrong footer/map | Product search works, but the surrounding page shows Black Royal content | Consistency | High | Wix Editor |
| Third-party form script error | Console reports a PurpleBear forms app-not-found error | Feedback, performance | Medium | Wix Apps/Editor |
| Repeated FAQ and map content | Large unrelated footer content repeats on every page | Simplicity, efficiency | Medium | Wix Editor |

## Functional results

| Function | Result | Evidence |
| --- | --- | --- |
| All Products header action | Pass | Navigated to `/category/all-products` in the same tab |
| Product search | Pass | `dash cam` produced a no-results message; `Tesla Model 3` returned products |
| Location header action | Pass | Opened the confirmed Kelana Jaya Google Maps query |
| Wix Stores catalog | Pass | 100 visible products and 100 products with images returned by Wix Stores V1 API; public gallery also reports 100 |
| Product collections | Pass | Seven new automotive collection links are visible on the published All Products page |
| Services/booking route | Improved | Three services require manual approval, accept in-person payment only, and use a prototype confirmation policy; Car Rental still needs a real schedule |
| Cart route | Loads | `/cart-page` shows My cart and Order summary |
| Checkout route | Blocked by configuration | A real item reached checkout, which displayed `We can’t accept online payments` and no coupon field; no order or payment was submitted |
| Member entry | Pass | `/my-subscriptions` shows Sign Up and Log In options |
| Contact form | Missing/unclear | No verified BROTHER'S contact form was found |
| Coupon | Configured, UI blocked | Active 25% coupon scopes to Accessories with one use per customer; checkout application cannot be tested until Wix exposes a checkout/coupon field |

## Header root-cause analysis

The live Embed is a full custom header inside a Wix iframe. It cancels normal links, sends messages to `masterPage.js`, and then uses a delayed popup fallback. This adds iframe scope, element-ID, synchronization, preview/published behavior, and popup-blocking risks to basic navigation.

Previous pull requests repaired the bridge, and live testing now passes. The safe approach is therefore:

1. Preserve the bridge while migrating.
2. Build native Wix logo/menu/search/account/cart/phone/location controls.
3. Replace the full Embed with the repository's promotion-only Embed.
4. Publish and verify every route.
5. Remove the bridge only after the native header has passed desktop and mobile tests.

## Accessibility and performance

- The Embed has usable labels, but critical actions should be native Wix controls.
- The document width exceeds the viewport and must be corrected before mobile submission.
- The site has large repeated footer content and several iframes on every page.
- Remove the broken third-party form plugin if it is unused.
- Do not show an offer countdown unless its end date matches the approved Wix coupon configuration.
- Avoid new animation until navigation, content, layout, and form feedback are correct.

## Completed in GitHub

- Central route and business constants.
- Strict header message source and action validation.
- Canonical accessible promotion Embed without popup navigation.
- Route, HCI, assignment, test, evidence, content, presentation, design-system, and Wix-action documentation.
- Reproducible 66-item automotive catalog dataset, white-background image generator, staging CSV, and implementation record.

## Completed in Wix Stores

- Added 66 visible automotive parts, accessories, care, safety, lighting, maintenance, brake, suspension, tyre, and wheel items.
- Uploaded 66 clean 1200 × 1200 PNG illustrations with white backgrounds and meaningful product alt text.
- Created and populated Accessories, Safety & Security, Car Care & Detailing, Electrical & Lighting, Engine & Maintenance, Brakes & Suspension, and Tyres & Wheels collections.
- Reached and publicly verified the assignment target: 100 visible products with 100 images.
- Added a compatibility, stock, installation, and final-price confirmation warning to every new item.
- Replaced all seven placeholder category descriptions with automotive-specific copy and added an All Products description.
- Created active coupon `WELCOME25`: 25% off the Accessories collection, one use per customer, no expiry, not limited to one item.

## Completed in Wix Bookings and business settings

- Replaced the old Black Royal booking policy with a BROTHER'S prototype confirmation policy.
- Enabled manual approval for all three visible services and disabled online payment/deposits.
- Corrected the visible service descriptions without inventing availability.
- Replaced the default location with the confirmed Kelana Jaya address, phone and daily 10:00 AM–10:00 PM schedule.
- Updated the site display name, business name and business description to BROTHER'S.

## Requires Wix Editor or owner data

- Replace old branding, contact data, footer, map, social links, testimonials, and unsupported claims.
- Rebuild the global header using native Wix elements.
- Correct desktop overflow and verify mobile/tablet layouts.
- Decide final page slugs and add redirects.
- Confirm the final prices, stock, vehicle compatibility, brands, and commercial availability of the 66 project catalog items.
- Capture the final Wix Dashboard product-count screenshot for the assignment evidence set.
- Configure and verify Cash, Visa, and TNG labels without claiming a real payment gateway unless verified.
