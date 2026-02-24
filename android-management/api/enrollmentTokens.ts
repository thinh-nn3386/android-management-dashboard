import type { EnrollmentToken } from '../resource';

export abstract class EnrollmentTokensApi {
  /**
   * Creates an enrollment token for a given enterprise. It's up to the caller's responsibility to manage the lifecycle of newly created tokens and deleting them when they're not intended to be used anymore.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   * @param payload The request body contains an instance of EnrollmentToken.
   *
   * @returns If successful, the response body contains a newly created instance of EnrollmentToken.
   */
  abstract create(parent: string, payload: Partial<EnrollmentToken>): Promise<EnrollmentToken>;

  /**
   * Deletes an enrollment token. This operation invalidates the token, preventing its future use.
   *
   * @param name The name of the enrollment token in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}.
   *
   */
  abstract delete(name: string): Promise<void>;

  /**
   * Gets an active, unexpired enrollment token. A partial view of the enrollment token is returned. Only the following fields are populated: name, expirationTimestamp, allowPersonalUsage, value, qrCode. This method is meant to help manage active enrollment tokens lifecycle. For security reasons, it's recommended to delete active enrollment tokens as soon as they're not intended to be used anymore.
   *
   * @param name Required. The name of the enrollment token in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}.
   *
   * @returns If successful, the response body contains an instance of EnrollmentToken.
   */
  abstract get(name: string): Promise<EnrollmentToken>;

  /**
   * Lists active, unexpired enrollment tokens for a given enterprise. The list items contain only a partial view of EnrollmentToken object. Only the following fields are populated: name, expirationTimestamp, allowPersonalUsage, value, qrCode. This method is meant to help manage active enrollment tokens lifecycle. For security reasons, it's recommended to delete active enrollment tokens as soon as they're not intended to be used anymore.
   *
   * @param parent Required. The name of the enterprise in the form enterprises/{enterpriseId}.
   * @param query Optional query parameters.
   * @param query.pageSize Optional. The requested page size. If unspecified, at most 10 devices will be returned. The maximum value is 100; values above 100 will be coerced to 100. The limits can change over time.
   * @param query.pageToken Optional. A token identifying a page of results returned by the server.
   *
   * @returns
   */
  abstract list(
    parent: string,
    query?: { pageSize?: number; pageToken?: string },
  ): Promise<{
    enrollmentTokens: EnrollmentToken[];
    nextPageToken: string;
  }>;
}
