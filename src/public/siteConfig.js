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
    shop: '/category/parts',
    products: '/category/parts',
    cars: '/cars',
    accessories: '/category/accessories',
    services: '/book-online',
    rental: '/new-inventory',
    about: '/pre-owned',
    locationPage: '/financing',
    search: '/search',
    maps: 'https://www.google.com/maps/search/?api=1&query=No.10%20Jalan%20SS6%2F12%2C%20Kelana%20Jaya%2C%2047301%20Petaling%20Jaya%2C%20Selangor%2C%20Malaysia'
});

export const STORE_COLLECTIONS = Object.freeze({
    cars: '21583df3-406d-6eb8-20ea-ef607ff05d1b',
    spareParts: '28305e7d-c1fc-40b4-91be-145827cf12a0',
    accessories: 'a734bbe9-9153-4c4b-b966-a62fefe7cf67'
});

export const PROMOTION = Object.freeze({
    code: 'WELCOME25',
    discountRate: 25,
    collectionId: STORE_COLLECTIONS.accessories,
    currency: 'MYR'
});

export const REQUEST_FORM = Object.freeze({
    route: '/new-inventory',
    componentIds: Object.freeze(['#htmlRequestForm', '#html1', '#html3']),
    inboundSource: 'brothersRequestForm',
    outboundSource: 'brothersWix'
});

