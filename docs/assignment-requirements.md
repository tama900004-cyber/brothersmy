# BIT2073 HCI Assignment Requirements

Status date: 2026-07-13. A requirement is marked Complete only when it was verified on the published site.

| Requirement | Existing implementation | Status | Repository evidence | Wix-side evidence required | Fix implemented | Remaining action | Manual test | Final verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home page | Published `/` with product gallery, service and rental sections | Partial | `src/pages/HOME.c1dmp.js` exists | Clean hero, correct footer, correct links, no overflow | Audit and design guidance | Remove Black Royal/RedRoyal, placeholders, old links, and overflow | Open `/`; check primary and secondary CTAs | Pending Wix changes |
| About Us | Published `/pre-owned` titled About Us | Partial | `src/pages/About Us .mm1rt.js` | Final BROTHER'S copy and verified images | Route and content actions documented | Replace RedRoyal rental copy; later change slug with redirect | Check title, copy, images, and footer | Pending |
| Contact and Location | `/financing` is labeled LOCATION | Missing/Partial | `src/pages/LOCATION.oenlx.js` | Confirmed phone, hours, address, map, contact form and feedback | Confirmed data centralized | Replace Cyberjaya details/map and add form validation | Test phone, map, required fields, success and error states | Pending |
| Products or Services | Wix Stores has 100 visible products with images; Wix Bookings is installed | Partial | Category, Product, Service and Booking files plus `data/automotive-catalog.json` | Final business-approved prices, fitment, stock and service details | Added 66 automotive items, images and seven collections | Confirm commercial values; replace the placeholder category description | Open shop and services; verify names, images, prices, filters | Catalog implemented; commercial data pending |
| Login and Sign Up | Wix Members is installed; `/my-subscriptions` opens Sign Up/Log In | Complete at app level | Member page files exist | Native Login/Account control in header | Native-control architecture documented | Replace `My Subscriptions` menu label with account control | Open sign-up and login; test empty/invalid fields without creating test data unless approved | Pending header change |
| Booking, cart, reservation or ordering | Bookings list and Wix Stores cart are present | Partial | Booking, cart, checkout and product page files exist | Verified service details and complete cart flow | Test plan created | Confirm booking data and test cart with an approved test item | Bookings validation; add/remove/update cart; empty cart | Pending |
| Payment method interface | Checkout route exists but payment stage was not reached | Missing/Unverified | `src/pages/Checkout.r72jt.js` exists | Screen showing only Cash, Visa and TNG, with honest prototype wording if not live | Allowed labels documented | Configure or mock the interface in Wix; do not claim processing | Reach payment step with approved test item; do not complete real payment | Pending |
| Minimum 100 items with pictures | Wix Stores reports 100 visible products and 100 products with images | Complete | `data/automotive-catalog.json`, image generator, staging CSV and implementation record | Wix dashboard screenshot still required for the final evidence pack | Added 66 automotive items to the 34 existing products and verified all media | Confirm final commercial values and capture dashboard evidence | Compare Wix API, dashboard count and live gallery | 100/100 published |
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
