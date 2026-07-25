import { loadPaymentContext, placeCounterOrder } from 'backend/counterOrders.web';

$w.onReady(function () {
  const paymentFrame = findPaymentFrame();
  if (!paymentFrame) {
    console.error('[BROTHERS checkout] Payment HTML component was not found.');
    return;
  }

  async function sendContext() {
    try {
      const context = await loadPaymentContext();
      paymentFrame.postMessage({ type: 'paymentContext', payload: context });
    } catch (error) {
      paymentFrame.postMessage({
        type: 'orderError',
        payload: { message: error.message || 'Your cart could not be loaded.' }
      });
    }
  }

  paymentFrame.onMessage(async (event) => {
    if (event.data?.type === 'paymentReady') {
      await sendContext();
      return;
    }

    if (event.data?.type === 'placeCounterOrder') {
      try {
        const result = await placeCounterOrder(event.data.payload?.customer);
        paymentFrame.postMessage({ type: 'orderSuccess', payload: result });
      } catch (error) {
        paymentFrame.postMessage({
          type: 'orderError',
          payload: { message: error.message || 'Your order could not be reserved.' }
        });
      }
    }
  });

  sendContext();
});

function findPaymentFrame() {
  for (const selector of ['#paymentFrame', '#html7']) {
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
      // Try the next HTML component ID.
    }
  }

  return null;
}
