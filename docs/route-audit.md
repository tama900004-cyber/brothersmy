# Route Audit

Verified against the published site on 2026-07-13.

| Current URL | Actual purpose | Status | Confusing name | Main buttons/links | Recommended final route | Change risk | Required Wix Editor action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Home, products, rental and services overview | Working but mixed/stale content | No | Logo, HOME, Back to Top | `/` | Low | Replace old links, placeholder sections, RedRoyal text, and footer |
| `/book-online` | Services and Wix Bookings list | Working; data unverified | Mild | SERVICES, Book Now | `/services` or keep current | Medium | Rename menu label to Services; confirm service names, prices, and durations before any slug change |
| `/new-inventory` | Small rental/vehicle inventory page | Working; only two visible content items in live page | Yes: sounds like vehicle sales inventory | NEW INVENTORY, Car Types | `/car-rental` | High | Change visible page name first; after approval change slug and create a 301 redirect |
| `/pre-owned` | About Us | Working but contains RedRoyal rental copy | Yes: slug suggests used cars | About Us, Car Rental | `/about-us` | High | Replace copy, then change slug only with redirect and link review |
| `/financing` | Intended Contact/Location page | Working route; wrong Black Royal content | Yes: no financing task remains | LOCATION | `/contact-location` | High | Replace address/map/form first; then change slug with redirect |
| `/search` | Wix Site Search results | Working | No | Header search | `/search` | Low | Keep route; remove old footer and map; verify product indexing |
| `/category/all-products` | Wix Stores catalog | Working; 34 products | Label `CARS` is misleading | CARS, All Products, View All Offers | Keep Wix route | Low | Change navigation label to Shop; replace placeholder category description |
| `/cart-page` | Wix Stores cart | Working with empty cart | No | Rent Now and cart actions | Keep Wix route | Low | Add native cart icon and verify quantity/remove/checkout states |
| `/checkout` | Wix checkout | Route loads; empty-cart payment flow not testable | No | Checkout from cart | Keep Wix route | Low | Verify Cash, Visa, and TNG configuration using a test product; do not submit real payment |
| `/my-subscriptions` | Wix Members entry/account area | Opens Sign Up/Log In when signed out | Menu label is unclear | My Subscriptions | Wix-managed | Medium | Replace main-menu item with native Login/Account control |

## Safe sequence for route changes

1. Correct page content and navigation labels without changing slugs.
2. Test all current links on desktop and mobile.
3. Change one slug at a time in Wix SEO settings.
4. Add a 301 redirect from the old path to the new path.
5. Update buttons, menus, documentation, and screenshots.
6. Publish and verify the old and new URLs.

Do not rename the generated files inside `src/pages`; their filenames are Wix bindings, not public route names.
