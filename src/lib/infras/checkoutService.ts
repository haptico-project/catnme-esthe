import CheckoutResource from "./checkoutResource";

export default class CheckoutService {

  public static checkouForPaymanage(priceId: string, agencyCode: string, subscription: boolean) {
    if (subscription) {
      return this.checkoutSubscriptionForPaymanage(priceId, agencyCode);
    } else {
      return this.checkoutPaymentForPaymanage(priceId, agencyCode);
    }
  }

  public static checkoutPaymentForPaymanage(priceId: string, agencyCode: string) {
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: window.location.href,
      checkoutCancelUrl: window.location.href,
      orderProducts: [
        {
          productId: `${priceId}`,
          quantity: 1
        }
      ]
    }
    return CheckoutResource.post(`/api/v1/checkout/payment-url`, data);
  }

  public static checkoutSubscriptionForPaymanage(priceId: string, agencyCode: string) {
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: window.location.href,
      checkoutCancelUrl: window.location.href,
      orderProducts: [
        {
          productId: `${priceId}`,
          quantity: 1
        }
      ]
    }
    return CheckoutResource.post(`/api/v1/checkout/subscription-url`, data);
  }
}