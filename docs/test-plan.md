# Test Plan

## Automated and static checks

Update the Actual result column after every implementation.

| Check | Command or method | Expected result | Actual result | Status | Limitation/follow-up |
| --- | --- | --- | --- | --- | --- |
| Repository whitespace | `git diff --check` | No whitespace errors | No errors | Pass | Rerun before commit |
| JavaScript lint | `npm run lint` | No ESLint errors | Completed with exit code 0 | Pass | Dependencies were downloaded locally |
| Old branding in source code | `rg -ni "black royal|blackroyal|redroyal" src` | No old branding in code | No matches | Pass | Audit/history references intentionally remain in docs; Wix visual content is not stored in Git |
| Unsafe navigation patterns | Search `src` and canonical Embed | No popup/top navigation in canonical Embed | No `window.open` or `window.top`; transitional `postMessage` only | Pass | Remove the bridge only after native header verification |
| Secret patterns | Filename-only search for common key/token patterns | No credentials | No matching files | Pass | Manual diff review still required |
| Generated page filenames | `git diff --name-status -- src/pages` | No page file renamed | Only `M src/pages/masterPage.js` | Pass | Content change is allowed |
| Wix CLI availability | `npx wix --version` | Supported CLI is available | Version 1.1.226 | Pass | Meets the Wix app skill minimum version |
| Embed script syntax | Node in-memory syntax check | JavaScript parses | `Embed JavaScript syntax: PASS` | Pass | Visual behavior still needs Wix Preview |
| Wix type sync | `npm install --cache /tmp/npm-cache` postinstall | `wix sync-types` completes | Stopped at Wix device login | Not run | Run locally while signed in to Wix |
| Wix local editor | `npm run dev` | Local Editor starts | Not run | Not run | Requires Wix local authentication and an interactive browser |

## Published-site results recorded on 2026-07-13

| Area | Test | Expected | Actual | Status |
| --- | --- | --- | --- | --- |
| Header | All Products | Same-tab shop navigation | Opened `/category/all-products` | Pass |
| Header | Search `dash cam` | Results or clear no-results feedback | Opened `/search?q=dash+cam` and showed no-results message | Pass |
| Search | Search `Tesla Model 3` | Matching store product | Returned Tesla Model 3 and related results | Pass |
| Header | Location | Confirmed Kelana Jaya map query | Opened confirmed Google Maps URL | Pass |
| Products | Catalog count and media | At least 100 visible products with images | Wix API returned 100 visible products and 100 with images; public gallery reports 100 | Pass |
| Products | New automotive collections | Seven populated category links | All seven links appeared on the published All Products page with verified counts totaling 66 | Pass |
| Products | Representative new item | Correct title, price, image and warning | Digital Tyre Pressure Gauge loaded publicly with RM49, image and confirmation warning | Pass |
| Booking | Services route | Page loads | `/book-online` loaded three services | Pass, data unverified |
| Cart | Empty cart route | Page loads | `/cart-page` showed My cart and Order summary | Pass |
| Members | Signed-out account entry | Login/sign-up available | `/my-subscriptions` showed Sign Up and Log In | Pass |
| Layout | Desktop horizontal overflow | No overflow | 1602 px document in 1348 px viewport | Fail |
| Branding | Global content | BROTHER'S only | Black Royal/RedRoyal found | Fail |
| Console | Major public errors | No site-owned errors | PurpleBear forms app-not-found error observed | Fail |

## Manual regression tests

### Navigation

- Logo opens Home in the same tab.
- Shop opens All Products.
- Services opens Wix Bookings.
- Car Rental opens the intended rental page.
- About Us opens the correct business page.
- Contact / Location shows confirmed details.
- Breadcrumbs return to the correct category/home.
- No link points to `blackroyal`.

### Search

- Known product: `Tesla Model 3`.
- Empty query.
- Special characters such as `&` and apostrophe.
- Query longer than 120 characters.
- No-result query.
- Mobile search layout and keyboard submit.

### Products and cart

- Product image, name, approved price and category.
- Add one approved test item to cart.
- Increment and decrement quantity.
- Remove item.
- Empty-cart state.
- Cart icon count.
- Checkout progression without completing a real payment.

### Booking and rental

- Missing required fields.
- Invalid email/phone where applicable.
- Pickup date in the past.
- Return date before pickup date.
- Duplicate submission prevention.
- Honest success/confirmation state.

### Contact

- Phone opens the correct dial link.
- Map opens the Kelana Jaya destination.
- Empty required fields.
- Invalid email.
- Approved test submission success and failure feedback.

### Members

- Sign Up entry.
- Log In entry.
- Empty fields.
- Invalid password feedback.
- Logout from an approved test account.

### Promotion

- WELCOME25 is visible.
- Copy button copies exactly `WELCOME25`.
- Screen reader status announces copy success.
- Expired offer disables the button and shows Offer ended.
- Reduced-motion preference does not cause animation.

### Responsive and accessibility

- Desktop, tablet and 390 px mobile.
- No horizontal scrollbar.
- No cropped or overlapping text.
- Logical keyboard focus order and visible focus.
- Meaningful image alternative text.
- Form labels remain visible.
- Contrast meets the course/WCAG expectation.
- Touch targets are about 44 × 44 CSS pixels or larger.
