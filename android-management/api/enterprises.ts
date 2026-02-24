import type { Enterprise, EnterpriseView } from '../resource';

export abstract class EnterprisesApi {
  /**
   * Creates an enterprise. This is the last step in the enterprise signup flow. See also: SigninDetail
   *
   * @param query Optional query parameters.
   * @param query.projectId Optional. The ID of the Google Cloud Platform project which will own the enterprise.
   * @param query.signupUrlName Optional. The name of the SignupUrl used to sign up for the enterprise. Set this when creating a customer-managed enterprise and not when creating a deprecated EMM-managed enterprise.
   * @param query.enterpriseToken Optional. The enterprise token appended to the callback URL. Set this when creating a customer-managed enterprise and not when creating a deprecated EMM-managed enterprise.
   *
   * @returns If successful, the response body contains a newly created instance of Enterprise.
   */
  abstract create(
    query?: {
      projectId?: string;
      signupUrlName?: string;
      enterpriseToken?: string;
    },
    payload?: Partial<Enterprise>,
  ): Promise<Enterprise>;

  /**
   * Permanently deletes an enterprise and all accounts and data associated with it. Warning: this will result in a cascaded deletion of all AM API devices associated with the deleted enterprise. Only available for EMM-managed enterprises.
   *
   * @param name The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  abstract delete(name: string): Promise<void>;

  /**
   * Gets an enterprise.
   *
   * @param name The name of the enterprise in the form enterprises/{enterpriseId}.
   *
   * @returns If successful, the response body contains an instance of Enterprise.
   */
  abstract get(name: string): Promise<Enterprise>;

  /**
   * Lists EMM-managed enterprises. Only BASIC fields are returned.
   *
   * @param query Optional query parameters.
   * @param query.projectId Required. The Cloud project ID of the EMM managing the enterprises.
   * @param query.pageToken Optional. The requested page size. The actual page size may be fixed to a min or max value.
   * @param query.pageSize Optional. A token identifying a page of results returned by the server.
   * @param query.view Optional. Specifies which Enterprise fields to return. This method only supports BASIC.
   *
   */
  abstract list(query?: {
    projectId?: string;
    pageSize?: number;
    pageToken?: string;
    view?: EnterpriseView;
  }): Promise<{
    enterprises: Enterprise[];
    nextPageToken: string;
  }>;

  /**
   * Updates an enterprise. See also: SigninDetail
   *
   * @param name The name of the enterprise in the form enterprises/{enterpriseId}.
   * @param query Optional query parameters.
   * @param query.updateMask Optional. The field mask indicating the fields to update. If not set, all modifiable fields will be modified.
   * @param payload The request body contains an instance of Enterprise.
   *
   * @returns If successful, the response body contains an instance of Enterprise.
   */
  abstract patch(
    name: string,
    query?: { updateMask?: string },
    payload?: Partial<Enterprise>,
  ): Promise<Enterprise>;
}
