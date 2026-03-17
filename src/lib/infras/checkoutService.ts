import CheckoutResource from "./checkoutResource";

type OrderProduct = {
  productId: string;
  quantity: number;
};

export default class CheckoutService {

  public static checkouForPaymanage(orderProducts: OrderProduct[], agencyCode: string, subscription: boolean) {
    if (subscription) {
      return this.checkoutSubscriptionForPaymanage(orderProducts, agencyCode);
    } else {
      return this.checkoutPaymentForPaymanage(orderProducts, agencyCode);
    }
  }

  public static checkoutPaymentForPaymanage(orderProducts: OrderProduct[], agencyCode: string) {
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: window.location.href,
      checkoutCancelUrl: window.location.href,
      orderProducts
    }
    return CheckoutResource.post(`/api/v1/checkout/payment-url`, data);
  }

  public static checkoutSubscriptionForPaymanage(orderProducts: OrderProduct[], agencyCode: string) {
    const data = {
      agencyCode: agencyCode,
      checkoutSuccessUrl: window.location.href,
      checkoutCancelUrl: window.location.href,
      orderProducts
    }
    return CheckoutResource.post(`/api/v1/checkout/subscription-url`, data);
  }

  public static getSubscriptionPortalUrl(shopId: string, mailAddress: string, returnUrl: string) {
    return CheckoutResource.get(`/api/v1/subscription/portal-url`, {
      params: {
        shopId,
        mail_address: mailAddress,
        return_url: returnUrl
      }
    });
  }
}
