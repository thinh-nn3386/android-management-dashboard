import type { Application } from '../resource';

export abstract class ApplicationsApi {
  /**
   * Gets info about an application.
   * @param name The name of the application in the form enterprises/{enterpriseId}/applications/{packageName}.
   * @param query Optional query parameters.
   * @param query.languageCode The preferred language for localized application info, as a BCP47 tag (e.g. "en-US", "de"). If not specified the default language of the application will be used.
   *
   * @returns If successful, the response body contains an instance of Application.
   */
  abstract get(
    name: string,
    query?: {
      languageCode?: string;
    },
  ): Promise<Application>;
}
