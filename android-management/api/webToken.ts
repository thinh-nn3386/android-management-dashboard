import type { WebToken } from '../resource';

export abstract class WebTokenApi {
  /**
   * Creates a web token to access an embeddable managed Google Play web UI for a given enterprise.
   *
   * @param parent Required. The resource name of the enterprise in the format `enterprises/{enterpriseId}`.
   *
   * @returns If successful, the response body contains a newly created instance of WebToken.
   */
  abstract create(parent: string): Promise<WebToken>;
}
