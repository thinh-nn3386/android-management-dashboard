/* eslint-disable @typescript-eslint/no-explicit-any */
// This resource represents a long-running operation that is the result of a network API call.
export type Operation = {
  // The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}.
  name: string;

  // Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any.
  metadata: Map<string, string>;

  // If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available.
  done: boolean;

  // Union field result can be only one of the following:

  // The error result of the operation in case of failure or cancellation.
  error?: Status;
  response?: Map<string, string>;
  // End of list of possible types for union field result.
};

// The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC. Each Status message contains three pieces of data: error code, error message, and error details.
export type Status = {
  // The status code, which should be an enum value of google.rpc.Code.
  code: number;

  // A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.
  message: string;

  // A list of messages that carry the error details. There is a common set of message types for APIs to use.
  details: any;
};
