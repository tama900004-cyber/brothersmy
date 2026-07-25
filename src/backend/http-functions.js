import { ok, badRequest, forbidden, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

const COLLECTION = 'CustomerRequests';
const ALLOWED_TYPES = new Set(['vehicle', 'spareParts']);
const ALLOWED_PAYMENT_METHODS = new Set([
    'Cash at Store',
    'Visa at Store',
    'Touch ’n Go at Store'
]);
const ALLOWED_ORIGIN_PARTS = [
    'tama900004.wixsite.com',
    'htmlcomponentservice.com',
    'wixstatic.com',
    'parastorage.com',
    'filesusr.com'
];
const PROMOTION = Object.freeze({
    code: 'WELCOME25',
    discountRate: 25,
    currency: 'MYR'
});

export function options_submitCustomerRequest() {
    return ok({
        headers: corsHeaders(),
        body: ''
    });
}

export async function post_submitCustomerRequest(request) {
    try {
        const origin = getRequestOrigin(request);
        if (origin && !isAllowedOrigin(origin)) {
            return json(forbidden, { ok: false, message: 'Origin not allowed.' });
        }

        const data = await request.body.json();
        const validationError = validateRequest(data);
        if (validationError) {
            return json(badRequest, { ok: false, message: validationError });
        }

        const reference = makeReference();
        const quote = calculateQuote(data);
        const item = buildItem(data, reference, quote);
        await wixData.insert(COLLECTION, item, { suppressAuth: true });

        return json(ok, { ok: true, reference, quote });
    } catch (error) {
        console.error('submitCustomerRequest failed', error);
        return json(serverError, {
            ok: false,
            message: 'Unable to save the request. Please try again.'
        });
    }
}

function validateRequest(data) {
    const requestType = cleanText(data?.requestType, 30);
    const paymentMethod = cleanText(data?.paymentMethod, 30) || 'Cash at Store';
    const fullName = cleanText(data?.fullName, 80);
    const phone = cleanText(data?.phone, 30);
    const phoneDigits = phone.replace(/\D/g, '');

    if (!ALLOWED_TYPES.has(requestType)) {
        return 'Choose a valid request type.';
    }
    if (!ALLOWED_PAYMENT_METHODS.has(paymentMethod)) {
        return 'Choose a valid payment preference.';
    }
    if (fullName.length < 2) {
        return 'Enter your full name.';
    }
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        return 'Enter a valid phone number.';
    }
    if (cleanText(data?.company, 100)) {
        return 'Request rejected.';
    }

    if (requestType === 'vehicle' && !cleanText(data?.productName, 100)) {
        return 'Vehicle name is required.';
    }

    if (requestType === 'spareParts') {
        if (!cleanText(data?.partName, 100)) {
            return 'Part name is required.';
        }
        if (!cleanText(data?.vehicleMakeModel, 100)) {
            return 'Vehicle make and model are required.';
        }
        if (!cleanText(data?.deliveryAddress, 300)) {
            return 'Delivery address is required.';
        }

        const promoCode = cleanText(data?.promoCode, 40).toUpperCase();
        if (promoCode && promoCode !== PROMOTION.code) {
            return 'Enter a valid promotion code.';
        }
        if (promoCode && data?.couponEligible !== true) {
            return 'This promotion applies only to selected accessories.';
        }
    }

    const rentalStart = parseDate(data?.rentalStart);
    const rentalEnd = parseDate(data?.rentalEnd);
    if (cleanText(data?.requestPurpose, 60) === 'Car Rental') {
        if (!rentalStart || !rentalEnd) {
            return 'Choose the rental start and return dates.';
        }
        if (rentalEnd < rentalStart) {
            return 'Return date must be after the rental start date.';
        }
    }

    return '';
}

function buildItem(data, reference, quote) {
    const requestType = cleanText(data.requestType, 30);
    const productName = cleanText(data.productName, 100);
    const partName = cleanText(data.partName, 100);
    const mainItem = requestType === 'vehicle' ? productName : partName;
    const item = {
        title: reference,
        description: `${requestType === 'vehicle' ? 'Vehicle' : 'Spare part'} request: ${mainItem}`,
        referenceNumber: reference,
        status: 'New',
        submittedAt: new Date(),
        requestType,
        fullName: cleanText(data.fullName, 80),
        phone: cleanText(data.phone, 30),
        email: cleanText(data.email, 120),
        contactMethod: cleanText(data.contactMethod, 30) || 'WhatsApp',
        requestPurpose: cleanText(data.requestPurpose, 60),
        productName,
        productId: cleanText(data.productId, 80),
        vehicleMakeModel: cleanText(data.vehicleMakeModel, 100),
        vehicleYear: cleanText(data.vehicleYear, 10),
        partName,
        quantity: clampNumber(data.quantity, 1, 50),
        partCondition: cleanText(data.partCondition, 30),
        installationRequired: Boolean(data.installationRequired),
        deliveryAddress: cleanText(data.deliveryAddress, 300),
        preferredDate: parseDate(data.preferredDate),
        preferredTime: cleanText(data.preferredTime, 10),
        rentalStart: parseDate(data.rentalStart),
        rentalEnd: parseDate(data.rentalEnd),
        paymentMethod: cleanText(data.paymentMethod, 30) || 'Cash at Store',
        notes: buildNotes(data, quote),
        source: cleanText(data.source, 80) || 'Website request form'
    };

    Object.keys(item).forEach((key) => {
        if (item[key] === undefined) {
            delete item[key];
        }
    });

    return item;
}

function calculateQuote(data) {
    if (cleanText(data?.requestType, 30) !== 'spareParts') {
        return {
            estimated: true,
            currency: PROMOTION.currency,
            quantity: 1,
            unitPrice: 0,
            subtotal: 0,
            promoCode: '',
            discountRate: 0,
            discount: 0,
            total: 0
        };
    }

    const quantity = clampNumber(data?.quantity, 1, 50);
    const unitPrice = clampMoney(data?.unitPrice, 0, 100000);
    const promoCode = cleanText(data?.promoCode, 40).toUpperCase();
    const couponApplied = promoCode === PROMOTION.code &&
        data?.couponEligible === true &&
        unitPrice > 0;
    const subtotal = roundMoney(unitPrice * quantity);
    const discountRate = couponApplied ? PROMOTION.discountRate : 0;
    const discount = roundMoney(subtotal * discountRate / 100);

    return {
        estimated: true,
        currency: PROMOTION.currency,
        quantity,
        unitPrice,
        subtotal,
        promoCode: couponApplied ? PROMOTION.code : '',
        discountRate,
        discount,
        total: roundMoney(subtotal - discount)
    };
}

function buildNotes(data, quote) {
    const notes = cleanText(data?.notes, 800);
    if (!quote?.subtotal) {
        return notes;
    }

    const pricingLine = [
        'Estimated online summary:',
        `${quote.currency} ${quote.subtotal.toFixed(2)} subtotal`,
        quote.promoCode
            ? `${quote.promoCode} (-${quote.discountRate}% / ${quote.currency} ${quote.discount.toFixed(2)})`
            : 'no promotion applied',
        `${quote.currency} ${quote.total.toFixed(2)} estimated total`,
        'final price subject to staff confirmation'
    ].join(' | ');

    return [notes, pricingLine].filter(Boolean).join('\n').slice(0, 1000);
}

function getRequestOrigin(request) {
    const headers = request?.headers || {};
    return cleanText(headers.origin || headers.referer, 300).toLowerCase();
}

function isAllowedOrigin(origin) {
    return ALLOWED_ORIGIN_PARTS.some((host) => origin.includes(host));
}

function cleanText(value, maxLength) {
    return String(value ?? '').trim().slice(0, maxLength);
}

function parseDate(value) {
    const raw = cleanText(value, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        return undefined;
    }

    const parsed = new Date(`${raw}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function clampNumber(value, minimum, maximum) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return minimum;
    }
    return Math.min(maximum, Math.max(minimum, Math.round(number)));
}

function clampMoney(value, minimum, maximum) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return minimum;
    }
    return roundMoney(Math.min(maximum, Math.max(minimum, number)));
}

function roundMoney(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function makeReference() {
    const now = new Date();
    const stamp = [
        now.getFullYear().toString().slice(-2),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
    ].join('');
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `BR-${stamp}-${suffix}`;
}

function corsHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}

function json(responseFactory, body) {
    return responseFactory({
        headers: corsHeaders(),
        body: JSON.stringify(body)
    });
}
