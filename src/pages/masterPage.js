import wixLocationFrontend from 'wix-location-frontend';
import wixEcomFrontend from 'wix-ecom-frontend';
import { HEADER_BRIDGE, ROUTES } from 'public/siteConfig';
import { ensureCheckoutRoute } from 'backend/counterOrders.web';

const ACTION_ALIASES = Object.freeze({
    home: 'home',
    logo: 'home',
    products: 'products',
    product: 'products',
    allproducts: 'products',
    shop: 'products',
    search: 'search',
    location: 'location',
    map: 'location',
    maps: 'location'
});

$w.onReady(async function () {
    fixNativeCarsMenu();
    const initialCheckoutRoute = await routeCheckoutToPaymentOptions();

    // Refresh once before registering the cart-change listener. This updates
    // stale native Checkout links without creating a refresh event loop.
    if (initialCheckoutRoute && initialCheckoutRoute.reason !== 'EMPTY_CART') {
        await wixEcomFrontend.refreshCart();
    }

    wixEcomFrontend.onCartChange(async () => {
        const changedCheckoutRoute = await routeCheckoutToPaymentOptions();

        if (changedCheckoutRoute?.updated) {
            await wixEcomFrontend.refreshCart();
        }
    });

    const htmlHeader = findHeaderComponent();

    if (!htmlHeader) {
        return;
    }

    htmlHeader.onMessage((event) => {
        if (isWixInternalMessage(event.data)) {
            return;
        }

        const message = normalizeMessage(event.data);

        if (!message) {
            return;
        }

        try {
            handleHeaderAction(message, htmlHeader);
        } catch (error) {
            console.error('[BROTHERS header] Action failed:', error);
            sendStatus(htmlHeader, {
                status: 'error',
                action: message.action,
                message: 'The requested action could not be completed.'
            });
        }
    });

    sendStatus(htmlHeader, {
        status: 'ready',
        componentId: htmlHeader.id
    });
});

async function routeCheckoutToPaymentOptions() {
    try {
        return await ensureCheckoutRoute();
    } catch (error) {
        console.warn('[BROTHERS checkout] Could not update the checkout route:', error);
        return null;
    }
}

function fixNativeCarsMenu() {
    const menuSelector = '#comp-mrhg15xp';
    const carsRoute = '/category/cars';

    try {
        const menu = $w(menuSelector);

        if (!menu || !Array.isArray(menu.menuItems)) {
            return;
        }

        const updateItems = (items) => items.map((item) => {
            const children = Array.isArray(item.children)
                ? updateItems(item.children)
                : item.children;
            const isCarsItem = String(item.label || '').trim().toLowerCase() === 'cars';

            return {
                ...item,
                ...(isCarsItem ? { link: carsRoute, target: '_self' } : {}),
                ...(Array.isArray(children) ? { children } : {})
            };
        });

        const updatedItems = updateItems(menu.menuItems);
        const changed = JSON.stringify(updatedItems) !== JSON.stringify(menu.menuItems);

        if (changed) {
            menu.menuItems = updatedItems;
        }
    } catch (error) {
        console.warn('[BROTHERS menu] Could not update Cars link:', error);
    }
}

function findHeaderComponent() {
    for (const selector of HEADER_BRIDGE.componentIds) {
        try {
            const component = $w(selector);

            if (
                component &&
                typeof component.onMessage === 'function' &&
                typeof component.postMessage === 'function'
            ) {
                return component;
            }
        } catch {
            // The selector does not exist on this site version. Try the next one.
        }
    }

    return null;
}

function isWixInternalMessage(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }

    const type = typeof data.type === 'string' ? data.type : '';

    return Boolean(
        type.endsWith('Internal') ||
        data.intent === 'TPA2' ||
        data.namespace === 'Utils'
    );
}

function normalizeMessage(data) {
    if (!data || typeof data !== 'object') {
        return null;
    }

    if (data.source !== HEADER_BRIDGE.inboundSource) {
        return null;
    }

    const rawAction = data.action || data.command || data.type;
    const query = typeof data.query === 'string' ? data.query : '';

    const actionKey = String(rawAction || '')
        .toLowerCase()
        .replace(/[^a-z]/g, '');

    const action = ACTION_ALIASES[actionKey];

    if (!action) {
        console.warn('[BROTHERS header] Ignored unknown action:', rawAction);
        return null;
    }

    return {
        action,
        query: query.trim().slice(0, HEADER_BRIDGE.maxSearchLength)
    };
}

function handleHeaderAction(message, htmlHeader) {
    const { action, query } = message;

    sendStatus(htmlHeader, {
        status: 'working',
        action
    });

    switch (action) {
        case 'home':
            navigateTo(ROUTES.home);
            break;

        case 'products':
            navigateTo(ROUTES.shop);
            break;

        case 'search':
            navigateTo(
                query
                    ? `${ROUTES.search}?q=${encodeURIComponent(query)}`
                    : ROUTES.shop
            );
            break;

        case 'location':
            navigateTo(ROUTES.maps);
            break;

        default:
            throw new Error(`Unsupported header action: ${action}`);
    }
}

function navigateTo(url) {
    wixLocationFrontend.to(url);
}

function sendStatus(htmlHeader, payload) {
    try {
        htmlHeader.postMessage({
            source: HEADER_BRIDGE.outboundSource,
            ...payload
        });
    } catch (error) {
        console.warn('[BROTHERS header] Could not send status to HTML component:', error);
    }
}
