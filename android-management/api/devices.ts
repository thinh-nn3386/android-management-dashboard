import type { WipeDataFlag } from 'android-management/types';
import type { Command, Device, Operation } from '../resource';

export abstract class DevicesApi {
  /**
   * Deletes a device. This operation attempts to wipe the device but this is not guaranteed to succeed if the device is offline for an extended period. Deleted devices do not show up in list calls and a 404 is returned from get.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   * @param query Optional query parameters.
   * @param query.wipeDataFlags Optional flags that control the device wiping behavior.
   * @param query.wipeReasonMessage OOptional. A short message displayed to the user before wiping the work profile on personal devices. This has no effect on company owned devices. The maximum message length is 200 characters.
   *
   */
  abstract delete(
    name: string,
    query?: {
      wipeDataFlags?: WipeDataFlag[];
      wipeReasonMessage?: string;
    },
  ): Promise<void>;

  /**
   * Gets a device. Deleted devices will respond with a 404 error.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   *
   * @return If successful, the response body contains an instance of Device.
   */
  abstract get(name: string): Promise<Device>;

  /**
   * Gets a device. Deleted devices will respond with a 404 error.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   * @param payload The request body contains an instance of Command.
   *
   * @return If successful, the response body contains an instance of Operation.
   */
  abstract issueCommand(name: string, payload: Command): Promise<Operation>;

  /**
   * Lists devices for a given enterprise. Deleted devices are not returned in the response.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   * @param query Optional query parameters.
   * @param query.pageSize Optional. The requested page size. If unspecified, at most 10 devices will be returned. The maximum value is 100; values above 100 will be coerced to 100. The limits can change over time.
   * @param query.pageToken Optional. A token identifying a page of results returned by the server.
   *
   * @return Response to a request to list devices for a given enterprise.
   */
  abstract list(
    parent: string,
    query?: {
      pageSize?: number;
      pageToken?: string;
    },
  ): Promise<{
    devices: Device[];
    nextPageToken: string;
  }>;

  /**
   * Updates a device.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   * @param payload The request body contains an instance of Device.
   *
   * @return If successful, the response body contains an instance of Device.
   */
  abstract patch(name: string, payload?: Partial<Device>): Promise<Device>;
}
