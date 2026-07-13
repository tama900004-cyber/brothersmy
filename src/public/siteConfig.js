export const BUSINESS = Object.freeze({
    name: "BROTHER'S",
    phoneDisplay: '03 7803 8911',
    phoneHref: 'tel:+60378038911',
    hours: 'Daily, 10:00 AM–10:00 PM',
    address: 'No. 10, Jalan SS6/12, Kelana Jaya, 47301 Petaling Jaya, Selangor, Malaysia'
});

export const HEADER_BRIDGE = Object.freeze({
    componentIds: Object.freeze(['#htmlHeader', '#html2']),
    inboundSource: 'brothersHeader',
    outboundSource: 'brothersWix',
    maxSearchLength: 120
});

export const ROUTES = Object.freeze({
    home: '/',
    shop: '/category/all-products',
    services: '/book-online',
    rental: '/new-inventory',
    about: '/pre-owned',
    locationPage: '/financing',
    search: '/search',
    maps: 'https://www.google.com/maps/search/?api=1&query=No.10%20Jalan%20SS6%2F12%2C%20Kelana%20Jaya%2C%2047301%20Petaling%20Jaya%2C%20Selangor%2C%20Malaysia'
});
