# BROTHER'S Design System

## Brand direction

Modern, premium, automotive, minimal, professional, trustworthy and clear. The design may use the calm spacing and strong hierarchy associated with premium technology sites, but must remain recognizably BROTHER'S.

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| Near black | `#0B0D0F` | Header, footer, primary text |
| White | `#FFFFFF` | Main backgrounds and text on dark surfaces |
| Primary red | `#C63222` | Primary CTA, active state, promotion |
| Dark red | `#9F2217` | Hover and pressed state |
| Soft grey | `#F4F5F6` | Alternate sections and cards |
| Border grey | `#E2E4E7` | Dividers, inputs and quiet borders |
| Promotion yellow | `#FFE066` | Small coupon emphasis only |
| Status green | Use a WCAG-compliant dark green | Open, success or availability only |

Never use red or green as the only status signal.

## Typography

- Use one modern sans-serif family available in Wix; use its weight range instead of multiple font families.
- H1: 40–56 px desktop, 32–40 px mobile, bold, short.
- H2: 28–40 px desktop, 24–32 px mobile.
- Body: 16–18 px with 1.5–1.7 line height.
- Labels and buttons: 14–16 px, medium or semibold.
- Avoid all-caps paragraphs and long centered body text.

## Spacing and layout

- Base spacing unit: 8 px.
- Common spacing: 8, 16, 24, 32, 48, 64 and 96 px.
- Desktop content maximum: about 1200 px, centered.
- Section padding: 64–96 px desktop and 40–64 px mobile.
- Mobile horizontal padding: 16–20 px.
- Cards use consistent image ratios, internal padding and action position.
- No element may extend beyond the viewport or Wix gridline without a deliberate full-width setting.

## Buttons

Primary button:

- Red background, white text, minimum 44 px height.
- Hover/pressed state uses dark red.
- Visible focus ring with sufficient contrast.

Secondary button:

- White or transparent background, near-black text, 1 px border.
- Same height, radius and type scale as the primary button.

Do not create more button styles unless a real state requires it. Icon-only controls need an accessible label or visible tooltip.

## Components

- Header: native Wix logo, menu, Search, Account and Cart; promotion Embed only.
- Product card: image, category, product name, verified price, verified availability, one primary action.
- Service card: name, short verified description, confirmed duration/price only, Book Now.
- Rental card: image, vehicle type, confirmed seats/transmission, date flow, prototype disclosure where needed.
- Form: persistent label, required marker, help text, inline error and clear success state.
- Footer: business name, confirmed phone/hours/address, map link, privacy link and approved social links only.

## Motion

- Use short 150–250 ms transitions for hover and expansion.
- No flashing, looping hero animation, or excessive parallax.
- Disable non-essential animation under `prefers-reduced-motion: reduce`.

## Accessibility acceptance criteria

- Logical keyboard order and visible focus.
- Sufficient text/background contrast.
- Descriptive alternative text for meaningful images.
- Decorative images use empty alternative text.
- Inputs have persistent labels.
- Headings follow a logical hierarchy.
- Controls are about 44 × 44 CSS pixels or larger on touch layouts.
- Errors explain what happened and how to fix it.
