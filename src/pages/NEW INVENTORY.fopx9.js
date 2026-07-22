import wixLocationFrontend from 'wix-location-frontend';
import { currentMember } from 'wix-members-frontend';
import { REQUEST_FORM } from 'public/siteConfig';

$w.onReady(function () {
    connectRequestForm().catch((error) => {
        console.error('Could not initialize the request form.', error);
    });
});

async function connectRequestForm() {
    const component = findRequestFormComponent();
    if (!component) {
        console.warn('Request form HTML component was not found.');
        return;
    }

    let context = null;
    const sendContext = () => {
        if (!context) {
            return;
        }
        component.postMessage({
            source: REQUEST_FORM.outboundSource,
            type: 'requestFormInit',
            payload: context
        });
    };

    component.onMessage((event) => {
        const message = event.data || {};
        if (message.source !== REQUEST_FORM.inboundSource || message.type !== 'ready') {
            return;
        }
        sendContext();
    });

    context = await buildRequestContext();
    sendContext();
}

async function buildRequestContext() {
    const query = wixLocationFrontend.query || {};
    const member = await getCurrentMember();
    const contactDetails = member?.contactDetails || {};
    const fullName = [contactDetails.firstName, contactDetails.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();

    return {
        requestType: normalizeRequestType(query.type),
        productName: cleanQueryValue(query.product, 100),
        productId: cleanQueryValue(query.productId, 80),
        fullName,
        email: firstValue(contactDetails.emails) || member?.loginEmail || '',
        phone: firstValue(contactDetails.phones)
    };
}

async function getCurrentMember() {
    try {
        return await currentMember.getMember();
    } catch (error) {
        return null;
    }
}

function findRequestFormComponent() {
    for (const selector of REQUEST_FORM.componentIds) {
        try {
            const component = $w(selector);
            if (component && typeof component.postMessage === 'function') {
                return component;
            }
        } catch (error) {
            // Wix throws when an element ID is not present on the page.
        }
    }
    return null;
}

function normalizeRequestType(value) {
    return cleanQueryValue(value, 30) === 'spareParts' ? 'spareParts' : 'vehicle';
}

function cleanQueryValue(value, maxLength) {
    const first = Array.isArray(value) ? value[0] : value;
    return String(first || '').trim().slice(0, maxLength);
}

function firstValue(value) {
    if (Array.isArray(value)) {
        return String(value[0] || '').trim();
    }
    return String(value || '').trim();
}
