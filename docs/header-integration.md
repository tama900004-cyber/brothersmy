# BROTHER'S Header Integration Decision

## Decision

Use native Wix controls for the logo, primary menu, product search, account, cart, phone, and location. Keep the HTML Embed only for the promotion strip.

This is more reliable because native controls are part of the Wix page, work with Wix routing and accessibility features, and do not depend on cross-frame messages or popup permissions.

## Root cause

The live header Embed runs inside a Wix iframe. Its current script:

1. Prevents the default link action.
2. Sends a `postMessage()` action to the parent Wix page.
3. Waits 1.2 seconds.
4. Tries `window.open()` as a fallback.

That design has several failure points: the Embed may be page-specific instead of global, its Wix element ID may differ, the Velo bridge may not be synchronized or published, and delayed popups may be blocked. A `working` acknowledgement only proves the message was received; it does not prove navigation completed.

Published-site testing on 2026-07-13 confirmed that All Products, Search, and Location now work after the two previous header pull requests were merged. The bridge should therefore be preserved during migration, not patched again at random.

## Recommended final structure

| Header part | Final implementation | Reason |
| --- | --- | --- |
| Promotion and coupon | HTML Embed using `docs/wix-embed/brothers-header.html` | Small, self-contained visual behavior |
| Logo and Home | Native Wix image/button | Reliable same-site navigation |
| Main menu | Native Wix menu | Keyboard, mobile, and route support |
| Product search | Native Wix Site Search | Product indexing and result feedback |
| All Products | Native Wix button | Direct `/category/all-products` link |
| Account | Wix Members login bar | Native sign-up, login, and account state |
| Cart | Wix Stores cart icon | Native cart state and checkout |
| Phone | Native Wix text/button | Direct `tel:+60378038911` link |
| Location | Native Wix button | Direct confirmed Google Maps destination |

## Transitional bridge

Until the native controls are published, the current Embed must send an object with the exact source identifier:

```js
window.parent.postMessage({
  source: 'brothersHeader',
  action: 'products'
}, '*');
```

Supported actions are `home`, `products`, `search`, and `location`. Search may include a `query` string. `src/pages/masterPage.js` rejects missing sources, unknown actions, arbitrary URLs, and search input beyond 120 characters.

## Do not use

- `window.top.location`
- Delayed `window.open()` fallbacks
- Multiple click handlers for the same control
- Arbitrary URLs received from `postMessage`
- Acknowledgement messages as proof that navigation succeeded
- Critical navigation inside a page-only Embed

## Verification

After rebuilding the header with native controls, publish and test:

1. Logo opens Home in the same tab.
2. Shop opens `/category/all-products`.
3. Search for `Tesla Model 3` returns product results.
4. Empty search shows clear feedback or opens the shop.
5. Location opens the confirmed Kelana Jaya address.
6. Account opens Wix Members login/sign-up.
7. Cart opens the Wix Stores cart.
8. Keyboard focus is visible and follows a logical order.
9. Mobile controls are at least about 44 × 44 CSS pixels.

Exact editor actions are in `docs/wix-manual-steps.md`.
