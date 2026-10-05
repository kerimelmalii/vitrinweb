declare module "iyzipay" {
  interface IyzipayOptions {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  interface CheckoutFormApi {
    initialize(
      request: Record<string, unknown>,
      callback: (error: unknown, result: any) => void,
    ): void;
    retrieve(
      request: Record<string, unknown>,
      callback: (error: unknown, result: any) => void,
    ): void;
  }

  export default class Iyzipay {
    constructor(options: IyzipayOptions);
    checkoutForm: CheckoutFormApi;
  }
}
