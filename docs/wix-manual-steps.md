# Wix Manual Steps

Complete these steps in order. Publish only after preview checks pass.

## 1. Replace the old global footer

1. Open the site in Wix Editor.
2. Scroll to the footer and click the footer area so Wix shows that the section is global.
3. Delete or replace every Black Royal/RedRoyal item: Cyberjaya address, old email, old phone/fax, old social links, `2035`, `Powered and secured by black royal`, rental FAQs, and unsupported claims.
4. Enter exactly:
   - BROTHER'S
   - 03 7803 8911
   - Daily, 10:00 AM–10:00 PM
   - No. 10, Jalan SS6/12, Kelana Jaya, 47301 Petaling Jaya, Selangor, Malaysia
5. Link the phone to `tel:+60378038911`.
6. Link the map button to the confirmed Google Maps URL in `src/public/siteConfig.js`.
7. Keep only approved social links. Remove unknown Black Royal and Wix-demo accounts.
8. Preview Home, Search, Shop, Services, About and Location. Confirm the corrected footer appears once on each page.
9. Capture one desktop and one mobile footer screenshot.

## 2. Rebuild the global header with native Wix controls

1. Click the global header area in Wix Editor.
2. Add or keep a native Wix image for the BROTHER'S logo and link it to Home.
3. Add a native site menu with these visible labels:
   - Home
   - Shop
   - Services
   - Car Rental
   - About Us
   - Contact / Location
4. Link the labels to the current working pages before changing any slug:
   - Home → `/`
   - Shop → `/category/all-products`
   - Services → `/book-online`
   - Car Rental → `/new-inventory`
   - About Us → `/pre-owned`
   - Contact / Location → `/financing`
5. Add Wix Site Search and connect it to `/search`.
6. Add the Wix Members login bar. Remove `My Subscriptions` from the main menu.
7. Add the Wix Stores cart icon.
8. Add a native phone button linked to `tel:+60378038911`.
9. Add a native Location button linked to the confirmed Google Maps destination.
10. Set interactive controls to about 44 px minimum height/width and confirm visible focus in Preview.
11. Keep the old full-header Embed until all native controls pass Preview and published-site tests.

## 3. Replace the full-header Embed with the promotion strip

1. In the global header, select the HTML Embed element.
2. Choose the option to enter or edit the Embed code.
3. Copy the complete contents of `docs/wix-embed/brothers-header.html` and paste them into the code box.
4. Set the element width to the full available header width.
5. Set the desktop height to 48 px. If text wraps on mobile, set the mobile height to 72 px.
6. Place the Embed above the native logo/menu row.
7. Preview at desktop and mobile widths. Verify there is no horizontal scrollbar.
8. Test that the WELCOME25 button copies exactly `WELCOME25` and that `TERMS APPLY` remains visible.
9. Publish only after native Home, Shop, Search, Location, Account and Cart controls work.

## 4. Fix Home page links and placeholder content

1. Open Home.
2. Select `Order Now`; change its link from the `blackroyal` site to `/category/all-products`.
3. Select the `Offers` link in the services/rental slideshow; remove the old `blackroyal` link and connect it to a verified BROTHER'S page or hide it.
4. Replace the placeholder testimonial and `Alexa Young, CA`. If there is no approved testimonial, remove the entire testimonial section.
5. Replace `RedRoyal offers...` with approved BROTHER'S copy.
6. Change `20% Off for New Users` to the confirmed `25% off selected accessories` or remove it.
7. Keep one H1 with a space in `Trusted Experience Since 1989` only if the 1989 claim is approved from the original business source.
8. Preview every Home CTA and capture the final hero screenshot.

## 5. Fix Contact / Location page

1. Open the page currently displayed as LOCATION at `/financing`.
2. Remove Black Royal rental text, Cyberjaya map, 24/7 support, unsupported offers, and old contact data.
3. Add native Wix text for the confirmed phone, hours and full Kelana Jaya address.
4. Add a native map button using the confirmed Google Maps URL.
5. Add a short Wix Form with persistent labels: Name, Email, Phone and Message.
6. Mark Name, Email and Message as required.
7. Configure a clear success message and a clear failure message.
8. Submit only with approved test details; do not use real customer data.
9. Capture address, map, validation-error and success screenshots.

## 6. Correct page names before changing slugs

1. In Pages & Menu, change visible page/menu names first:
   - NEW INVENTORY → Car Rental
   - CARS → Shop
   - LOCATION → Contact / Location
2. Do not rename generated files inside `src/pages`.
3. Test all menu items on desktop and mobile.
4. If the instructor requires clean URLs, open each page's SEO settings and change one slug at a time.
5. Add a 301 redirect from each old path to its new path in the Wix URL Redirect Manager.
6. Verify both the old and new URLs after publishing.

## 7. Correct horizontal overflow

1. In Wix Editor, enable gridlines and open the Layers panel.
2. Inspect the global header, both HTML Embeds, galleries, product sections, map, footer and social bar.
3. For every normal content element, keep its left and right edges inside the gridlines.
4. For true full-width strips, use Wix's stretch/full-width option instead of a fixed 1600 px width.
5. Check the first Embed width and height; it should not be wider than its container.
6. Open Mobile Editor and set product/repeater layouts to one column where needed with 16 px horizontal padding.
7. Preview at common desktop, tablet and 390 px mobile widths.
8. Confirm no element crosses the viewport and no horizontal scrollbar appears.

## 8. Clean Wix apps and console errors

1. Open Apps / Manage Apps in the Wix dashboard.
2. Find the PurpleBear forms integration that produced `App not found` in the public console.
3. If it is unused, remove its widget and uninstall it.
4. If it is required, reconnect/reinstall it and verify the public console no longer reports the error.
5. Do not remove Wix Stores, Wix Bookings, Wix Members, Wix Search, Wix Forms or Wix Chat without confirming their assignment role.

## 9. Review the implemented 100-product catalog

1. Open Wix Dashboard → Store Products.
2. Confirm the current catalog is 100 visible products and that every product has an image.
3. Review the 66 new `BA-001`–`BA-066` items against `docs/product-content-staging.csv`.
4. Confirm or correct each display price, brand, stock state, vehicle fitment and installation requirement with the business.
5. Keep the confirmation warning until the item's final commercial values are approved.
6. Review the seven new collections and confirm their product counts are 12, 8, 10, 10, 12, 8 and 6.
7. Replace any project illustration with an approved real product photo later without changing the product SKU.
8. Recheck product pages, images, categories, filters, mobile layout and search indexing after every correction.
9. Capture a Wix dashboard screenshot showing 100 products and a live gallery screenshot showing the 100-product count.

## 10. Configure payment presentation honestly

1. Open Wix Dashboard → Accept Payments and checkout settings.
2. Confirm which providers are genuinely connected.
3. Show only Cash, Visa and TNG in the assignment interface.
4. If a method is a non-live prototype, label it `Prototype only — no payment will be processed`.
5. Use an approved test item to reach checkout, but do not submit a real payment.
6. The published checkout currently says `We can’t accept online payments` and does not expose a coupon field. Do not claim that WELCOME25 was applied at checkout until a genuinely supported checkout method and coupon field are visible.
7. Capture the payment-method screen and prototype disclosure.

## 11. Fix the Shop product action label and search index

1. Open the All Products page in Wix Editor.
2. Select the product gallery and open its Settings / Display / Buttons controls.
3. Change the product action text from `BOOK NOW` to `Add to Cart`, or use Wix Stores' native Add to Cart action.
4. Confirm the action adds a store product to the cart instead of opening Wix Bookings.
5. Open Wix Dashboard → Site Search → Search Settings.
6. Confirm Wix Stores products are included in search and request/re-run indexing if Wix shows that option.
7. Publish, search for `Universal Car Phone Holder`, and confirm the result count no longer relies on the old 34-product index.

## 12. Handle the Car Rental loading state honestly

1. Open Wix Dashboard → Booking Services → Car Rental.
2. Keep manual approval enabled and keep online payment disabled.
3. The service is currently a class with no future sessions, so the public card shows `Loading days...`.
4. Do not invent dates or availability. Either add approved future sessions from the real rental schedule, or hide this service until the schedule is confirmed.
5. If the business wants a rental enquiry instead of a class, create a new appointment-style `Vehicle Rental Enquiry` service with an approved duration and price before hiding the old class.
6. Preview the Services page and verify every visible card has a clear state and `Request to Book` wording.
