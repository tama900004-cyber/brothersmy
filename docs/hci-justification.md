# HCI Justification

## Home

- User goal: understand the business and choose Shop, Services, Rental, or Location.
- Current problem: mixed identity, placeholder content, unrelated claims, and competing actions.
- Principles: visibility, consistency, simplicity, visual hierarchy, recognition over recall.
- Decision: one automotive hero, one primary Shop Accessories CTA, one secondary Book a Service CTA, then short previews.
- Benefit: a new visitor can identify the business and next action quickly.

## Shop and product pages

- User goal: find a relevant automotive product, compare it, and add it to the cart.
- Current problem: only 34 generic rental-car products, placeholder category text, unclear `CARS` label, and unverified prices.
- Principles: recognition over recall, consistency, feedback, error prevention.
- Decision: use visible accessory categories, consistent product cards, verified price/compatibility fields, breadcrumbs, filters, and explicit empty/no-results messages.
- Benefit: users can narrow choices without remembering product names and understand why a search returned nothing.

## Services and booking

- User goal: understand a service and book an available time.
- Current problem: generic rental services, unverified durations/prices, and no documented success/error evidence.
- Principles: visibility, feedback, Norman's action cycle, error prevention.
- Decision: show verified service scope before Book Now; mark required fields; validate dates; prevent duplicate submission; show a clear Wix confirmation.
- Benefit: the user knows what is being booked, can correct errors, and can see whether the task succeeded.

## Car rental

- User goal: choose a vehicle and request valid pickup and return dates.
- Current problem: route name says New Inventory, content is incomplete, and several rental claims are unsupported.
- Principles: consistency, user control, error prevention, recognition over recall.
- Decision: label the page Car Rental, use comparable vehicle cards, require return date after pickup date, and disclose prototype status if no real rental engine is connected.
- Benefit: users understand the service and avoid invalid reservations or misleading confirmation.

## About Us

- User goal: understand who BROTHER'S is and why it is relevant.
- Current problem: the page mentions RedRoyal and uses a `/pre-owned` route.
- Principles: consistency, trust, memorability.
- Decision: use verified BROTHER'S business background, services, values, and approved images; remove fabricated reviews and claims.
- Benefit: one coherent identity is easier to remember and trust.

## Contact and location

- User goal: call, find the location, check hours, or send a message.
- Current problem: the public page and footer show Black Royal Cyberjaya details instead of the confirmed Kelana Jaya location.
- Principles: visibility, affordance, error prevention, feedback.
- Decision: display phone, hours, full address, a labeled map button, and a short validated contact form.
- Benefit: users do not travel to or contact the wrong business and receive clear form status.

## Login and sign-up

- User goal: create an account or sign in.
- Current problem: the main navigation says My Subscriptions rather than Account or Log In.
- Principles: recognition over recall, consistency, affordance.
- Decision: use the native Wix Members login bar with clear labels and Wix validation.
- Benefit: users recognize the familiar account pattern and do not need to guess what My Subscriptions does.

## Cart, checkout and payment

- User goal: review selected items, correct quantities, and understand payment choices.
- Current problem: cart exists, but the payment stage and allowed methods were not verified.
- Principles: user control, feedback, error prevention, transparency.
- Decision: keep native Wix Stores cart/checkout, show item/quantity/total/remove controls, and show only Cash, Visa, and TNG where configured. Label any non-live interface as a prototype.
- Benefit: users can reverse mistakes and are not misled about payment completion.

## Global interaction rules

- Minimum touch target: approximately 44 × 44 CSS pixels.
- Visible keyboard focus for links, buttons and fields.
- One descriptive H1 per page.
- No color-only status; pair color with text or icon.
- Preserve form data when validation fails where Wix supports it.
- Loading, empty, error and success states must be visible.
- Respect `prefers-reduced-motion` and avoid autoplay or flashing animation.
- Use the same label for the same destination on every page.
