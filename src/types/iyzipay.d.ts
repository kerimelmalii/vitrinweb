declare module "iyzipay" {
  interface IyzipayOptions {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  interface IyzicoResourceApi {
    create<T = unknown>(
      request: Record<string, unknown>,
      callback: (error: unknown, result: T) => void,
    ): void;
    retrieve<T = unknown>(
      request: Record<string, unknown>,
      callback: (error: unknown, result: T) => void,
    ): void;
  }

  export default class Iyzipay {
    constructor(options: IyzipayOptions);
    checkoutFormInitialize: IyzicoResourceApi;
    checkoutForm: IyzicoResourceApi;
  }
}
