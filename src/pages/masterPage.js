import wixLocationFrontend from 'wix-location-frontend';
import wixEcomFrontend from 'wix-ecom-frontend';
import { HEADER_BRIDGE, REQUEST_FORM, ROUTES } from 'public/siteConfig';
import { ensureCheckoutRoute } from 'backend/counterOrders.web';

const VEHICLE_COMPONENT_IDS = Object.freeze([
    '#comp-ms0ecq24',
    '#html17',
    '#htmlCars',
    '#carsCatalog',
    '#vehicleCatalog',
    '#html1',
    '#html2',
    '#html3',
    '#html4',
    '#html5',
    '#html6',
    '#html7',
    '#html8',
    '#html9',
    '#html10',
    '#html11',
    '#html12'
]);

const VEHICLE_ACTIONS = new Set([
    'book',
    'booknow',
    'bookcar',
    'bookvehicle',
    'booking',
    'reserve',
    'reservenow',
    'rent',
    'rentnow',
    'rentalrequest',
    'selectcar',
    'selectvehicle',
    'vehiclebooking',
    'vehiclerequest',
    'openbookingform',
    'openform',
    'request',
    'requestbooking',
    'requestcar',
    'requestvehicle'
]);

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
    if (isNativeCheckoutPage()) {
        wixLocationFrontend.to('/payment-options');
        return;
    }

    fixNativeCarsMenu();
    wireVehicleBooking();
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

function isNativeCheckoutPage() {
    const path = Array.isArray(wixLocationFrontend.path)
        ? wixLocationFrontend.path
        : [];

    return path.some((segment) => String(segment).toLowerCase() === 'checkout');
}

function fixNativeCarsMenu() {
    const menuSelector = '#comp-mrhg15xp';
    const carsRoute = ROUTES.cars;

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

function wireVehicleBooking() {
    if (!isCarsPage()) {
        return;
    }

    const components = [];

    for (const selector of VEHICLE_COMPONENT_IDS) {
        try {
            const component = $w(selector);

            if (
                component &&
                typeof component.onMessage === 'function' &&
                !components.some((item) => item.id === component.id)
            ) {
                components.push(component);
            }
        } catch {
            // This selector is not present on the Cars page.
        }
    }

    for (const component of components) {
        component.onMessage((event) => {
            if (isWixInternalMessage(event.data)) {
                return;
            }

            const booking = normalizeVehicleBooking(event.data);

            if (!booking) {
                return;
            }

            const vehicleQuery = booking.vehicle
                ? `&vehicle=${encodeURIComponent(booking.vehicle)}`
                : '';

            navigateTo(`${REQUEST_FORM.route}?type=vehicle${vehicleQuery}`);
        });

        try {
            component.postMessage({
                source: 'brothersWix',
                type: 'vehicleBookingReady',
                formRoute: REQUEST_FORM.route
            });
        } catch (error) {
            console.warn('[BROTHERS vehicles] Could not initialize booking bridge:', error);
        }
    }
}

function isCarsPage() {
    const path = Array.isArray(wixLocationFrontend.path)
        ? wixLocationFrontend.path.map((segment) => String(segment).toLowerCase())
        : [];

    return path.includes('cars');
}

function normalizeVehicleBooking(data) {
    if (!data) {
        return null;
    }

    if (typeof data === 'string') {
        try {
            return normalizeVehicleBooking(JSON.parse(data));
        } catch {
            const vehicle = data.trim();

            return vehicle.length >= 2 && vehicle.length <= 120
                ? { vehicle }
                : null;
        }
    }

    if (typeof data !== 'object') {
        return null;
    }

    const rawAction =
        data.action ||
        data.command ||
        data.type ||
        data.event ||
        data.eventName ||
        data.payload?.action ||
        data.payload?.type;
    const action = String(rawAction || '')
        .toLowerCase()
        .replace(/[^a-z]/g, '');

    const rawVehicle =
        data.vehicleName ||
        data.vehicle ||
        data.carName ||
        data.car ||
        data.model ||
        data.title ||
        data.payload?.vehicleName ||
        data.payload?.vehicle ||
        data.payload?.carName ||
        data.payload?.car ||
        data.payload?.model ||
        data.payload?.title ||
        '';
    const vehicle = typeof rawVehicle === 'object'
        ? rawVehicle.name || rawVehicle.title || rawVehicle.model || ''
        : rawVehicle;

    if (!VEHICLE_ACTIONS.has(action) && !vehicle) {
        return null;
    }

    return {
        vehicle: String(vehicle || '').trim().slice(0, 120)
    };
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
