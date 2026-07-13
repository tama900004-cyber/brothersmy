import wixLocationFrontend from 'wix-location-frontend';

const HEADER_COMPONENT_IDS = ['#htmlHeader', '#html2'];

const ROUTES = Object.freeze({
    home: '/',
    products: '/category/all-products',
    search: '/search',
    location: 'https://www.google.com/maps/search/?api=1&query=No.10%20Jalan%20SS6%2F12%2C%20Kelana%20Jaya%2C%2047301%20Petaling%20Jaya%2C%20Selangor%2C%20Malaysia'
});

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

$w.onReady(function () {
    const htmlHeader = findHeaderComponent();

    if (!htmlHeader) {
        console.warn(
            '[BROTHERS header] No HTML component found. Expected #htmlHeader or #html2.'
        );
        return;
    }

    htmlHeader.onMessage((event) => {
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

function findHeaderComponent() {
    for (const selector of HEADER_COMPONENT_IDS) {
        try {
            const component = $w(selector);

            if (
                component &&
                typeof component.onMessage === 'function' &&
                typeof component.postMessage === 'function'
            ) {
                return component;
            }
        } catch (error) {
            // The selector does not exist on this site version. Try the next one.
        }
    }

    return null;
}

function normalizeMessage(data) {
    let rawAction;
    let query = '';
    let source = '';

    if (typeof data === 'string') {
        rawAction = data;
    } else if (data && typeof data === 'object') {
        rawAction = data.action || data.type || data.command;
        query = typeof data.query === 'string' ? data.query : '';
        source = typeof data.source === 'string' ? data.source : '';
    } else {
        return null;
    }

    if (source && source !== 'brothersHeader') {
        return null;
    }

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
        query: query.trim().slice(0, 120)
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
            navigateTo(ROUTES.products);
            break;

        case 'search':
            if (!query) {
                navigateTo(ROUTES.products);
                break;
            }

            navigateTo(`${ROUTES.search}?q=${encodeURIComponent(query)}`);
            break;

        case 'location':
            navigateTo(ROUTES.location);
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
            source: 'brothersWix',
            ...payload
        });
    } catch (error) {
        console.warn('[BROTHERS header] Could not send status to HTML component:', error);
    }
}
