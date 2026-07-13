# BIT2073 HCI Assignment Requirements

Status date: 2026-07-13. A requirement is marked Complete only when it was verified on the published site.

| Requirement | Existing implementation | Status | Repository evidence | Wix-side evidence required | Fix implemented | Remaining action | Manual test | Final verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home page | Published `/` with product gallery, service and rental sections | Partial | `src/pages/HOME.c1dmp.js` exists | Clean hero, correct footer, correct links, no overflow | Audit and design guidance | Remove Black Royal/RedRoyal, placeholders, old links, and overflow | Open `/`; check primary and secondary CTAs | Pending Wix changes |
| About Us | Published `/pre-owned` titled About Us | Partial | `src/pages/About Us .mm1rt.js` | Final BROTHER'S copy and verified images | Route and content actions documented | Replace RedRoyal rental copy; later change slug with redirect | Check title, copy, images, and footer | Pending |
| Contact and Location | `/financing` is labeled LOCATION | Missing/Partial | `src/pages/LOCATION.oenlx.js` | Confirmed phone, hours, address, map, contact form and feedback | Confirmed data centralized | Replace Cyberjaya details/map and add form validation | Test phone, map, required fields, success and error states | Pending |
| Products or Services | Wix Stores catalog and Wix Bookings are installed | Partial | Category, Product, Service and Booking page files exist | Valid BROTHER'S items and confirmed service details | Product count and content gaps documented | Replace generic rental-car catalog or confirm project direction | Open shop and services; verify names, images, prices, filters | Pending owner data |
| Login and Sign Up | Wix Members is installed; `/my-subscriptions` opens Sign Up/Log In | Complete at app level | Member page files exist | Native Login/Account control in header | Native-control architecture documented | Replace `My Subscriptions` menu label with account control | Open sign-up and login; test empty/invalid fields without creating test data unless approved | Pending header change |
| Booking, cart, reservation or ordering | Bookings list and Wix Stores cart are present | Partial | Booking, cart, checkout and product page files exist | Verified service details and complete cart flow | Test plan created | Confirm booking data and test cart with an approved test item | Bookings validation; add/remove/update cart; empty cart | Pending |
| Payment method interface | Checkout route exists but payment stage was not reached | Missing/Unverified | `src/pages/Checkout.r72jt.js` exists | Screen showing only Cash, Visa and TNG, with honest prototype wording if not live | Allowed labels documented | Configure or mock the interface in Wix; do not claim processing | Reach payment step with approved test item; do not complete real payment | Pending |
| Minimum 100 items with pictures | Wix Stores reports 34 visible products | Missing | Product-content checklist and staging CSV | Wix dashboard screenshot showing at least 100 valid items with images | Exact count verified through Wix Stores V1 API | Add 66 owner-approved products; do not fabricate data | Compare Wix dashboard count and live gallery | 34/100 |
| Additional feature: coupon | WELCOME25 appears in the header Embed with copy action | Partial | `docs/wix-embed/brothers-header.html` | Coupon visible, selected-accessories wording, expiry behavior, checkout validation | Accessible canonical promo Embed | Confirm whether it is a real Wix coupon or prototype-only | Copy code, verify expiry state, test eligible item if approved | Pending checkout verification |

## Important content rule

Existing public prices and rental claims are not treated as confirmed business data. They must be confirmed by the owner before final submission. The interface must not claim that a payment, booking, or reservation succeeded unless the connected Wix app actually confirms it.

## Evidence needed for completion

- Published desktop and mobile screenshots for every main page.
- Wix dashboard product count.
- Working login/sign-up entry.
- Working cart and checkout progression.
- Payment-method interface showing only Cash, Visa, and TNG.
- Coupon visibility and honest status.
- Validation error and success feedback examples.

Use `docs/evidence-checklist.md` when capturing the final evidence.
