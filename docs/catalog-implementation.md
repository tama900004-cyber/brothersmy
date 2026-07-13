# Automotive Catalog Implementation

Implementation and verification date: 2026-07-13

Live catalog: https://tama900004.wixsite.com/brothersmy/category/all-products

Representative new product: https://tama900004.wixsite.com/brothersmy/product-page/digital-tyre-pressure-gauge

## Result

- Wix Stores catalog: V1
- Existing products retained: 34 vehicles
- New automotive products: 66
- Final total: 100 products
- Visible products: 100
- Products with images: 100
- Expected new names found: 66/66
- Missing, duplicated, hidden or image-less expected new products: 0

The published All Products page was reloaded after implementation. It reports `100 products`, shows the new product cards, and exposes all seven new collection links.

## New collections

| Collection | Slug | Products |
| --- | --- | ---: |
| Accessories | `/category/accessories` | 12 |
| Safety & Security | `/category/safety-security` | 8 |
| Car Care & Detailing | `/category/car-care-detailing` | 10 |
| Electrical & Lighting | `/category/electrical-lighting` | 10 |
| Engine & Maintenance | `/category/engine-maintenance` | 12 |
| Brakes & Suspension | `/category/brakes-suspension` | 8 |
| Tyres & Wheels | `/category/tyres-wheels` | 6 |
| **Total new items** |  | **66** |

## Product and media implementation

- Source dataset: `data/automotive-catalog.json`
- Reproducible generator: `scripts/generate-product-images.mjs`
- Review sheet: `docs/product-content-staging.csv`
- SKU range: `BA-001`–`BA-066`
- Artwork: project-generated SVG and PNG illustrations
- PNG size: 1200 × 1200 pixels
- Background: clean white
- Media status before product creation: 66/66 `READY`
- Alternative text: product-specific title plus clean white-background illustration wording

Generated image files are intentionally not tracked. Run the generator to recreate the exact SVG/PNG set and staging CSV from the catalog dataset.

## Category research references

The product mix was grounded in common automotive aftermarket categories visible in current parts catalogs. These sources were used for category research only; their product images and copy were not copied:

- Bosch Auto Parts: https://www.boschautoparts.com/
- DENSO Auto Parts: https://www.densoautoparts.com/
- VANLI Malaysia automotive parts store: https://store.vanli.com.my/
- NFM Auto Parts Malaysia: https://nfmautoparts.com.my/

## Commercial-data safeguard

The new product names and categories were approved as project scope. Display prices are assignment catalog values, not confirmed final sales quotations. Every new description tells the customer to confirm vehicle compatibility, stock, installation requirements and final price with BROTHER'S before purchase.

Before treating the catalog as production sales inventory, the business must confirm:

- Final price and tax treatment
- Stock and availability wording
- Brand/manufacturer
- Compatible makes, models and years
- Installation requirements
- Warranty and return terms

## Remaining live-site issues

Catalog completion does not close the wider site audit. The published site still needs Wix Editor changes for the Black Royal/RedRoyal footer and page content, old external links, placeholder All Products description, confusing menu labels/routes, desktop horizontal overflow, unverified service/rental claims and the PurpleBear console error.
