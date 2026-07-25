import { Permissions, webMethod } from 'wix-web-module';
import { currentCart, checkout, orders } from 'wix-ecom-backend';
import { elevate } from 'wix-auth';

const elevatedCreateOrder = elevate(orders.createOrder);
const PAYMENT_OPTIONS_URL = 'https://tama900004.wixsite.com/brothersmy/payment-options';

function imageUrl(media) {
  const value = typeof media === 'string'
    ? media
    : media?.mainMedia?.image?.url || media?.image?.url || media?.url || media?.id || '';
  if (/^[\w-]+_[\w-]+~mv2\.[a-z0-9]+$/i.test(value)) {
    return `https://static.wixstatic.com/media/${value}`;
  }
  if (!value.startsWith('wix:image://v1/')) return value;
  const mediaId = value.slice('wix:image://v1/'.length).split('/')[0];
  return mediaId ? `https://static.wixstatic.com/media/${mediaId}` : '';
}

function formattedMoney(money) {
  if (!money) return { amount: '0', formattedAmount: 'RM 0.00' };
  return {
    amount: String(money.amount || '0'),
    formattedAmount: money.formattedAmount || `RM ${Number(money.amount || 0).toFixed(2)}`
  };
}

function sanitizeCheckout(checkoutData) {
  const items = (checkoutData.lineItems || []).map((item) => ({
    id: item._id || item.id,
    name: item.productName?.original || item.productName || 'Item',
    sku: item.physicalProperties?.sku || item.sku || '',
    quantity: item.quantity || 1,
    image: imageUrl(item.media),
    total: formattedMoney(item.totalPriceAfterTax || item.lineItemPrice || item.price)
  }));

  return {
    checkoutId: checkoutData._id || checkoutData.id,
    items,
    itemCount: items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    currency: checkoutData.currency || 'MYR',
    priceSummary: {
      subtotal: formattedMoney(checkoutData.priceSummary?.subtotal),
      discount: formattedMoney(checkoutData.priceSummary?.discount),
      total: formattedMoney(checkoutData.priceSummary?.total)
    }
  };
}

async function getCurrentCheckout() {
  const cart = await currentCart.getCurrentCart();
  if (!cart?.lineItems?.length) {
    throw new Error('Your cart is empty. Add an item before continuing.');
  }

  const created = await currentCart.createCheckoutFromCurrentCart({ channelType: 'WEB' });
  const checkoutId = created.checkoutId || created._id || created.id;
  if (!checkoutId) throw new Error('The order summary could not be prepared.');
  return checkout.getCheckout(checkoutId);
}

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts.shift() || '',
    lastName: parts.join(' ') || '-'
  };
}

function validateCustomer(customer) {
  const fullName = String(customer?.fullName || '').trim();
  const phone = String(customer?.phone || '').trim();
  const email = String(customer?.email || '').trim();
  if (fullName.length < 2) throw new Error('Please enter your full name.');
  if (phone.replace(/\D/g, '').length < 8) throw new Error('Please enter a valid phone number.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }
  return { fullName, phone, email };
}

function orderLineItem(item) {
  return {
    id: item._id || item.id,
    productName: item.productName,
    catalogReference: item.catalogReference,
    quantity: item.quantity,
    descriptionLines: item.descriptionLines || [],
    media: item.media,
    physicalProperties: item.physicalProperties,
    itemType: item.itemType,
    price: item.price,
    totalDiscount: item.discount,
    totalPriceBeforeTax: item.totalPriceBeforeTax,
    totalPriceAfterTax: item.totalPriceAfterTax,
    paymentOption: 'FULL_PAYMENT_OFFLINE'
  };
}

export const loadPaymentContext = webMethod(Permissions.Anyone, async () => {
  const checkoutData = await getCurrentCheckout();
  return sanitizeCheckout(checkoutData);
});

export const ensureCheckoutRoute = webMethod(Permissions.Anyone, async () => {
  const cart = await currentCart.getCurrentCart();
  if (!cart?.lineItems?.length) {
    return { updated: false, reason: 'EMPTY_CART' };
  }

  if (cart.overrideCheckoutUrl !== PAYMENT_OPTIONS_URL) {
    await currentCart.updateCurrentCart({
      overrideCheckoutUrl: PAYMENT_OPTIONS_URL
    });
    return { updated: true };
  }

  return { updated: false, reason: 'ALREADY_SET' };
});

export const placeCounterOrder = webMethod(Permissions.Anyone, async (customerInput) => {
  const customer = validateCustomer(customerInput);
  const checkoutData = await getCurrentCheckout();
  const summary = sanitizeCheckout(checkoutData);
  const name = splitName(customer.fullName);

  const orderDraft = {
    lineItems: (checkoutData.lineItems || []).map(orderLineItem),
    priceSummary: checkoutData.priceSummary,
    currency: checkoutData.currency || 'MYR',
    weightUnit: checkoutData.weightUnit || 'KG',
    status: 'APPROVED',
    paymentStatus: 'NOT_PAID',
    channelInfo: { type: 'BACKOFFICE_MERCHANT' },
    buyerLanguage: checkoutData.buyerLanguage || 'en',
    buyerNote: "Cash at counter. Present the order number at the BROTHER'S cashier.",
    buyerInfo: customer.email ? { email: customer.email } : undefined,
    billingInfo: {
      address: {
        country: 'MY',
        subdivision: 'MY-10',
        city: 'Petaling Jaya',
        postalCode: '47301',
        addressLine: 'No.17C, Jalan SS6/12, Kelana Jaya',
        countryFullname: 'Malaysia',
        subdivisionFullname: 'Selangor'
      },
      contactDetails: {
        firstName: name.firstName,
        lastName: name.lastName,
        phone: customer.phone
      }
    },
    balanceSummary: { balance: checkoutData.priceSummary?.total }
  };

  const created = await elevatedCreateOrder(orderDraft);
  const order = created.order || created;
  if (!order?.number) throw new Error('The order number could not be created.');

  await currentCart.deleteCurrentCart();

  return {
    orderId: order._id || order.id,
    orderNumber: order.number,
    itemCount: summary.itemCount,
    total: summary.priceSummary.total,
    paymentStatus: 'NOT_PAID'
  };
});
