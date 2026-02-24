import type { Operation } from '../resource';

export abstract class OperationsApi {
  /**
   * Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED.
   *
   * @param name  The name of the operation resource to be cancelled.
   */
  abstract cancel(name: string): Promise<void>;

  /**
   * Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
   *
   * @param name The name of the operation resource.
   *
   * @returns If successful, the response body contains an instance of Operation.
   *
   */
  abstract get(name: string): Promise<Operation>;

  /**
   * Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param name The name of the operation's parent resource.
   * @param query The query parameters for filtering and pagination.
   * @param query.filter The standard list filter.
   * @param query.pageSize The standard list page size.
   * @param query.pageToken The standard list page token.
   * @param query.returnPartialSuccess When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.
   */
  abstract list(
    name: string,
    query?: {
      filter?: string;
      pageSize?: number;
      pageToken?: string;
      returnPartialSuccess?: boolean;
    },
  ): Promise<{
    operations: Operation[];
    nextPageToken: string;
    unreachable: string[];
  }>;
}
