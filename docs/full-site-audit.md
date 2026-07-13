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
- Wix Stores V1 was queried through the Wix API. It reports 34 total products and 34 visible products.
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
| Product count below requirement | 34 visible products; target is 100 | Assignment completeness | High | Product/content data |
| Products are rental cars, not BROTHER'S accessories | Store shows generic US vehicle inventory and unverified prices | Relevance, trust | High | Owner confirmation and Wix Stores |
| Placeholder testimonial | “Testimonials provide…” and “Alexa Young, CA” | Credibility, satisfaction | High | Wix Editor |
| Placeholder category description | “This is your category description…” | Clarity | Medium | Wix Stores category settings |
| Navigation label `CARS` | Opens All Products but does not explain whether items are products or rentals | Recognition over recall | Medium | Wix Editor |
| `My Subscriptions` in main menu | Opens Wix Members sign-up; account action is unclear | Affordance, consistency | Medium | Wix Editor |
| Services show prices and durations not confirmed in project data | RM225, RM70, RM30 and durations appear publicly | Trust, error prevention | High | Owner confirmation |
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
| Wix Stores catalog | Pass, incomplete content | 34 visible products returned by Wix Stores V1 API |
| Services/booking route | Loads | `/book-online` shows three bookable services; values are unverified |
| Cart route | Loads | `/cart-page` shows My cart and Order summary |
| Checkout route | Not fully testable | Empty-cart visit did not expose a payment flow |
| Member entry | Pass | `/my-subscriptions` shows Sign Up and Log In options |
| Contact form | Missing/unclear | No verified BROTHER'S contact form was found |
| Coupon | Partial | WELCOME25 is visible and copy behavior exists; checkout application was not tested |

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
- Keep one countdown interval only and stop it when the offer expires.
- Avoid new animation until navigation, content, layout, and form feedback are correct.

## Completed in GitHub

- Central route and business constants.
- Strict header message source and action validation.
- Canonical accessible promotion Embed without popup navigation.
- Route, HCI, assignment, test, evidence, content, presentation, design-system, and Wix-action documentation.

## Requires Wix Editor or owner data

- Replace old branding, contact data, footer, map, social links, testimonials, and unsupported claims.
- Rebuild the global header using native Wix elements.
- Correct desktop overflow and verify mobile/tablet layouts.
- Decide final page slugs and add redirects.
- Confirm product/service/rental data and grow the catalog from 34 to at least 100 valid items.
- Configure and verify Cash, Visa, and TNG labels without claiming a real payment gateway unless verified.
