# Content Checklist

## Current catalog result

- Wix Stores catalog version: V1
- Total products: 100
- Visible products: 100
- Products with images: 100
- Assignment target: at least 100 items with pictures
- Verified gap: 0 items
- Composition: 34 existing vehicles + 66 added automotive parts/accessories

The numerical and image requirement is complete. The 66 added items use clean project-generated white-background illustrations and explicit confirmation wording. Their display prices, stock, vehicle compatibility, brands and final commercial availability must still be confirmed before the catalog is treated as a live sales inventory.

## Product approval checklist

For every new item, confirm:

- Product name
- BROTHER'S actually offers the item
- Category
- Brand
- Short description
- Price or explicit owner decision to leave it unpublished
- Stock/availability wording
- SKU if used
- Vehicle compatibility where relevant
- Image source and permission
- Alternative text
- Owner approval date
- Whether the item is visible or draft

Never invent values to reach the count.

## Supported category research

The original public BROTHER'S site shows real business categories such as Audio/Car Player, Speaker/Woofer, Reverse Camera/Driving Recorder, Performance, Car Lamps, electronics and related automotive accessories. Use those categories only as a research starting point and verify each imported item with the owner.

Original source: https://brothers.com.my/en/accessories

## Implemented 66-item catalog workflow

1. Defined 66 scope-approved automotive items in `data/automotive-catalog.json` with unique SKUs `BA-001` through `BA-066`.
2. Generated matching 1200 × 1200 white-background SVG and PNG illustrations with `scripts/generate-product-images.mjs`.
3. Generated `docs/product-content-staging.csv` with alt text, compatibility warnings and project-price disclosures.
4. Uploaded all 66 PNGs to Wix Media Manager and verified every upload reached `READY`.
5. Created all 66 Wix Stores V1 products and attached the matching image to each product.
6. Created seven visible automotive collections and linked every new item to its category.
7. Queried the Wix catalog and verified 100 total, 100 visible and 100 with images, with no missing or duplicated expected new names.
8. Reloaded the published gallery and verified the 100-product count, collection links and a representative product page.

See `docs/catalog-implementation.md` for the verified counts, category breakdown and live links.

Official Wix guidance: https://support.wix.com/en/article/wix-stores-updating-products-by-exporting-and-importing-them

## Page-content approval

Confirm before publishing:

- Home value proposition
- Business background and 1989 statement
- Service names, durations and prices
- Rental vehicle specifications and rates
- Deposit, delivery and late-return policies
- 24/7 support or driver availability claims
- Testimonials and reviews
- Social media URLs
- Privacy and terms text
- WELCOME25 eligibility and expiry
- Cash, Visa and TNG availability or prototype status
