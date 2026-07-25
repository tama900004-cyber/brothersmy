import wixLocationFrontend from 'wix-location-frontend';
import { PROMOTION, REQUEST_FORM } from 'public/siteConfig';

const CARS_COLLECTION_ID = '21583df3-406d-6eb8-20ea-ef607ff05d1b';
const SPARE_PARTS_COLLECTION_ID = '28305e7d-c1fc-40b4-91be-145827cf12a0';
const CAR_PRODUCT_IDS = new Set([
    "f9bc01d7-a7de-60e6-eec2-b5528f5cfa18",
    "c9f40730-ce17-917e-c15c-d3925a6c08f7",
    "a7a0cf59-95fc-a376-5f26-79fe60f4d0d5",
    "cca007d3-fc6e-a044-7073-2fca2e8568b8",
    "366b46c2-c4ad-4527-a252-1e8364b90cf6",
    "af197db8-24dc-8c4b-fb6b-07b8bc6949a5",
    "802397bb-71d4-0af8-680f-1ab6c0b469bf",
    "4a6e1d4f-f18d-3a32-7d8d-a6ae67fd9a0b",
    "0105d729-0a33-ba8f-8e5d-00c658d08465",
    "7ef12d71-ef9e-1c50-be08-4be89b9af605",
    "62c1cbf1-1df3-1efa-b168-6ddf445b83ec",
    "cb396a66-5c07-5a29-2090-b4d6af9fbc97",
    "5f9ddc1a-c66d-2b2f-acdf-0f0c433717a7",
    "eaf35900-48c8-a04a-5055-eb04b767346f",
    "9d558c8c-223e-7523-bd75-f8a11c490a94",
    "bd1913b8-af8b-e717-2886-cbd7077786f9",
    "2c51b545-310d-1fb3-d905-2784e6ab5ff1",
    "14e2dbe3-457b-4d12-c6cf-02e9b940bf82",
    "46b9937d-50c8-c065-890f-c2183558b67b",
    "70c9b082-29d7-d938-2fb3-31b255a62c8b",
    "8a2cc06d-39b5-a6ea-9725-238e0d64415b",
    "9ebfe1e9-49a5-7cca-543c-3116c632b216",
    "0789cc06-1744-2fbb-c527-f8ce425dfa9e",
    "55a35f65-4ae3-9afc-002d-e4ab9880f467",
    "ccb9de51-7b28-d782-dcd5-ea800a4ec7b2",
    "782e25d8-fe91-d2f3-2979-81152c46cc81",
    "db86eb7d-b7af-2b61-b507-f276af643286",
    "c2c18317-70e9-eb12-db01-4b0e2e6922a4",
    "3132558a-947a-b5be-cfd0-616fa2ce865e",
    "4b99fb33-35d8-2b71-4f04-40007b49b4de",
    "93ecdd49-7279-167d-b1e9-b387924eabf1",
    "535c9590-ca35-bf2a-3ba3-7990dcf96f84",
    "e6484fac-211b-f997-30ac-47c7ddb10fa2",
    "9859820b-e2a1-9693-e09a-74f943d5bb6d"
]);

$w.onReady(function () {
    configureRequestButton().catch((error) => {
        console.error('Could not configure the product request button.', error);
    });
});

async function configureRequestButton() {
    const productPage = findElement('#productPage1');
    const requestButton = findElement('#requestButton');

    if (!productPage || !requestButton) {
        return;
    }

    const product = await productPage.getProduct();
    if (!product) {
        return;
    }

    const requestType = isSparePart(product) ? 'spareParts' : 'vehicle';
    requestButton.label = requestType === 'vehicle'
        ? 'BOOK / REQUEST THIS CAR'
        : 'REQUEST THIS PART';
    requestButton.onClick(() => {
        wixLocationFrontend.to(buildRequestUrl(product, requestType));
    });

    if (requestButton.hidden) {
        await requestButton.show();
    }
}

function isSparePart(product) {
    const collectionIds = getCollectionIds(product);
    if (collectionIds.includes(SPARE_PARTS_COLLECTION_ID)) {
        return true;
    }
    if (collectionIds.includes(CARS_COLLECTION_ID)) {
        return false;
    }

    const productId = String(product._id || product.id || '').trim();
    if (CAR_PRODUCT_IDS.has(productId)) {
        return false;
    }

    const sku = String(product.sku || '').trim().toUpperCase();
    return sku.startsWith('BA-') || Boolean(productId);
}

function getCollectionIds(product) {
    const directIds = Array.isArray(product.collectionIds)
        ? product.collectionIds
        : [];
    const collectionItems = Array.isArray(product.collections)
        ? product.collections
        : [];
    const nestedIds = collectionItems.map((collection) => {
        if (typeof collection === 'string') {
            return collection;
        }
        return collection?._id || collection?.id || '';
    });

    return [...directIds, ...nestedIds]
        .map((id) => String(id || '').trim())
        .filter(Boolean);
}

function buildRequestUrl(product, requestType) {
    const collectionIds = getCollectionIds(product);
    const unitPrice = getProductPrice(product);
    const query = new URLSearchParams({
        type: requestType,
        product: String(product.name || ''),
        productId: String(product._id || product.id || ''),
        unitPrice: unitPrice > 0 ? unitPrice.toFixed(2) : '',
        currency: getProductCurrency(product),
        couponEligible: String(
            requestType === 'spareParts' &&
            collectionIds.includes(PROMOTION.collectionId)
        )
    });

    return `${REQUEST_FORM.route}?${query.toString()}`;
}

function getProductPrice(product) {
    const value = product?.priceData?.discountedPrice ??
        product?.priceData?.price ??
        product?.price?.discountedPrice ??
        product?.price?.price ??
        product?.price;
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : 0;
}

function getProductCurrency(product) {
    return String(
        product?.priceData?.currency ||
        product?.price?.currency ||
        PROMOTION.currency
    ).trim().toUpperCase().slice(0, 3);
}

function findElement(selector) {
    try {
        return $w(selector);
    } catch (error) {
        return null;
    }
}
