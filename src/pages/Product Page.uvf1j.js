import wixLocationFrontend from 'wix-location-frontend';
import { REQUEST_FORM } from 'public/siteConfig';

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
    const sku = String(product.sku || '').trim().toUpperCase();
    return sku.startsWith('BA-');
}

function buildRequestUrl(product, requestType) {
    const query = new URLSearchParams({
        type: requestType,
        product: String(product.name || ''),
        productId: String(product._id || product.id || '')
    });

    return `${REQUEST_FORM.route}?${query.toString()}`;
}

function findElement(selector) {
    try {
        return $w(selector);
    } catch (error) {
        return null;
    }
}
