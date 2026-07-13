# BROTHER'S Critical Repair Record

Date: 2026-07-13  
Site: https://tama900004.wixsite.com/brothersmy  
Wix site ID: `d614da0b-b045-4eec-adac-93e8f690d974`

## Outcome

The Wix business data, store categories, coupon, booking policy, visible booking-service safeguards, and default business location were repaired. The public store and service-detail pages reflect those data changes.

Several critical visual-editor issues remain because Wix Editor page elements are not exposed through the available site-management APIs or the Git-linked Velo files. They are listed below with exact editor actions and replacement copy. They must not be reported as fixed until they are changed, previewed and published in Wix Editor.

## Changes completed in Wix

| Area | Before | After | Verification |
| --- | --- | --- | --- |
| Business identity | RedRoyal business name and rental description | BROTHER'S; automotive products, vehicles, parts, accessories and booking requests | Site Properties version 29 read back successfully |
| Contact | Phone/schedule missing from business properties | `+60378038911`; daily 10:00 AM–10:00 PM | Site Properties read back successfully |
| Default location | Country-only `Location 1` | BROTHER'S Kelana Jaya with confirmed full address | Location revision 5 read back successfully |
| Store catalog | 100 visible items; placeholder category descriptions | 100 visible items; All Products plus seven automotive category descriptions | Wix Stores Catalog V1 category query |
| Coupon | No coupons | Active `WELCOME25`, 25% off Accessories, one use/customer, no expiry, all eligible items | Coupon ID `10f42558-fe6f-4872-9d1c-5cc73921dc07` read back successfully |
| Booking policy | Black Royal claims, fee/card language and unsupported terms | BROTHER'S prototype notice requiring direct confirmation | Policy revision 3 read back successfully |
| Visible services | Online payment settings and ambiguous copy | In-person only, no deposit, manual approval, multiple requests disabled, honest descriptions | All three visible services read back successfully |
| Service location | Car Rental included Cyberjaya | New availability uses BROTHER'S Kelana Jaya | Service locations read back successfully |

No product, booking, customer, order or site was deleted. No live payment provider was enabled. The three hidden AI-created services were left hidden.

## Published-site verification

| Test | Actual result | Status |
| --- | --- | --- |
| All Products | Page displays 100 products and the new All Products description | Pass |
| Representative product | Universal Car Phone Holder loads at RM39 with its compatibility warning | Pass |
| Add to cart | Product was added; cart showed item, quantity, RM39 subtotal and Checkout | Pass |
| Checkout | Displayed `We can’t accept online payments`; no coupon field was available | Blocked by payment/checkout configuration |
| Cleanup | Temporary item removed; cart returned to `Cart is empty` | Pass |
| Services list | Cards now use `Request to Book` | Pass |
| Car Cleaning detail | New description, confirmed address, phone and prototype policy are public | Pass |
| Car Rental card | Still shows `Loading days...` because it is a class with no approved future sessions | Fail — business schedule decision required |
| Desktop layout | Document width remains 1602 px in a 1348 px viewport | Fail — Wix Editor change required |

## Required Wix Editor repairs

Complete the following in order, using Preview before Publish.

### 1. Global header and navigation

1. Wix Editor → click the global header → Manage Menu.
2. Use these visible labels and preserve the current working destinations:
   - HOME → `/`
   - SHOP → `/category/all-products`
   - RENT A CAR → `/new-inventory`
   - SERVICES → `/book-online`
   - ABOUT → `/pre-owned`
   - CONTACT → `/financing`
3. Remove `My Subscriptions` from the primary menu; keep Wix Members as a separate login/account control.
4. Remove links to the old `blackroyal` site and the old Twitter/X account.
5. Add native Wix controls for logo/Home, menu, search, Members login, cart, phone and location.
6. Phone link: `tel:+60378038911`.
7. Location link: use `ROUTES.maps` from `src/public/siteConfig.js`.
8. Keep each touch target at least about 44 × 44 CSS pixels and verify keyboard focus.

### 2. Promotion strip

1. Select the existing HTML Embed in the global header → Enter Code.
2. Replace its contents with `docs/wix-embed/brothers-header.html` from this repository.
3. Use full available width, 48 px desktop height and up to 72 px mobile height.
4. Verify the strip says `25% OFF SELECTED ACCESSORIES`, `WELCOME25`, and `TERMS APPLY`.
5. Do not display an expiry/countdown unless the real Wix coupon is updated to the same approved expiry date.

### 3. Global footer

1. Select the global footer and delete Black Royal/RedRoyal, Cyberjaya, the old email/phone/fax, `2035`, old social links, duplicate FAQ blocks and unsupported claims.
2. Add exactly:
   - BROTHER'S
   - 03 7803 8911
   - Daily, 10:00 AM–10:00 PM
   - No. 10, Jalan SS6/12, Kelana Jaya, 47301 Petaling Jaya, Selangor, Malaysia
3. Link the phone and confirmed Google Maps destination.
4. Show the corrected footer once on every page.

### 4. Home

1. Delete `Trusted ExperienceSince 1989`; the date is not verified.
2. H1: `Automotive essentials for every journey.`
3. Supporting copy: `Shop vehicles, parts, accessories and car-care essentials, or request a service in Kelana Jaya.`
4. Primary CTA: `SHOP PRODUCTS` → `/category/all-products`.
5. Secondary CTA: `REQUEST A SERVICE` → `/book-online`.
6. Delete `Alexa Young, CA` and the placeholder testimonial section unless an approved real testimonial is supplied.
7. Replace any RedRoyal/Black Royal copy with the supporting copy above.
8. Remove `Order Now` and `Offers` links to the old site.

### 5. Shop, product pages and search

1. All Products → select product gallery → Settings / Display / Buttons.
2. Replace `BOOK NOW` with Wix Stores' native `Add to Cart` action.
3. Verify one product adds to cart and can be removed.
4. Dashboard → Site Search → Search Settings → include Wix Stores products and re-run indexing if available.
5. Search `Universal Car Phone Holder` and confirm it appears; do not keep the stale 34-product claim.
6. Keep product warnings until display prices, stock, brands and fitment are confirmed.

### 6. Car Rental / New Inventory

1. Rename the visible menu/page label from `NEW INVENTORY` to `RENT A CAR` without renaming the generated Velo file.
2. Heading: `Featured rental vehicles`.
3. Copy: `Browse the current showcase and contact BROTHER'S to confirm vehicle, dates, price, eligibility, collection and return terms.`
4. CTA: `REQUEST AVAILABILITY` → `/book-online` or the confirmed contact page.
5. Do not claim that the two featured vehicles are the full fleet or that any vehicle is available before confirmation.

### 7. Services and the Car Rental loading state

1. Dashboard → Booking Services → Car Rental.
2. Keep manual approval on and online payment off.
3. Because this service is a class with no future sessions, choose one honest option:
   - add real approved future sessions; or
   - hide Car Rental until a schedule exists.
4. Do not invent rental dates, duration or availability.
5. If the intended flow is an enquiry, create a separate appointment-style `Vehicle Rental Enquiry` only after its duration and display price are approved.
6. Preview `/book-online`; no visible card should show `Loading days...`.

### 8. About

1. Remove the old RedRoyal story and any unverified history, certification, award, team-size or experience claim.
2. H1: `About BROTHER'S`.
3. Body: `BROTHER'S is an automotive project in Kelana Jaya presenting vehicles, parts, accessories, car-care products and booking requests in one place. Product compatibility, availability, final price and service terms are confirmed directly before purchase or booking.`
4. CTA: `CONTACT US` → `/financing`.

### 9. Contact / Location

1. Remove Cyberjaya, 24/7, old email/fax, Black Royal rental content and unsupported offers.
2. H1: `Contact BROTHER'S`.
3. Add the confirmed phone, daily hours and full Kelana Jaya address.
4. Add a native map button using the confirmed Google Maps URL.
5. Add a Wix Form with persistent labels: Name, Email, Phone, Message.
6. Require Name, Email and Message; use clear success/error messages.
7. Test only with approved test data; do not use customer data.

### 10. Horizontal overflow and mobile layout

1. Enable gridlines and Layers.
2. Inspect global header, Embeds, galleries, maps, social bar and footer on every main page.
3. Keep normal elements inside gridlines; use Stretch for genuine full-width strips instead of fixed 1600 px elements.
4. Set the promo Embed to container width, not 1600 px.
5. In Mobile Editor use one-column product/repeater layouts where needed and about 16 px side padding.
6. Preview desktop, tablet and 390 px mobile; confirm `document.scrollWidth` no longer exceeds the viewport.

### 11. Accessibility and SEO

1. Add meaningful alt text to every informative image; mark decorative images decorative.
2. Keep one H1 per page and preserve visible form labels.
3. Suggested page titles:
   - Home: `BROTHER'S | Automotive Products & Services in Kelana Jaya`
   - Shop: `Shop Automotive Products | BROTHER'S`
   - Rent A Car: `Car Rental Requests | BROTHER'S`
   - Services: `Automotive Service Requests | BROTHER'S`
   - About: `About BROTHER'S`
   - Contact: `Contact BROTHER'S | Kelana Jaya`
4. Suggested meta description: `Explore automotive products, vehicles, parts, accessories and service requests from BROTHER'S in Kelana Jaya.`
5. Do not add unsupported location coverage, guarantees, response times or payment claims.

### 12. Old Cyberjaya location

The old Cyberjaya location remains active but is no longer the default and is no longer used for new Car Rental availability. Archiving is permanent.

1. Dashboard → Business Info / Locations.
2. Check all historical and future bookings for references to the Cyberjaya location.
3. Archive it only if no required booking/history workflow depends on it.

### 13. Payment and coupon presentation

1. Keep Cash, Visa and TNG as assignment labels only unless a real provider is verified and connected.
2. The live checkout currently cannot accept online payments and does not show a coupon field.
3. Do not claim that WELCOME25 works at checkout until the field is visible and an approved non-payment test shows the 25% discount on an Accessories item.
4. Do not submit an order or payment during testing.

## Final publish checklist

- No Black Royal, RedRoyal, Cyberjaya, `2035`, placeholder testimonial or old-site link remains.
- Header and footer appear once and work on desktop/mobile.
- No horizontal scrollbar at desktop, tablet or 390 px mobile.
- Shop action says Add to Cart, not Book Now.
- Search finds a newly added product.
- Cart add/remove works and finishes empty.
- Services use request/confirmation wording; no `Loading days...` card remains visible.
- Contact shows only the confirmed Kelana Jaya details.
- Coupon wording has no fake expiry.
- Checkout and payment claims match the actual connected configuration.
- Preview passes before Publish; published routes are retested afterward.
