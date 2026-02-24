import type { EnrollmentToken, Enterprise, SignupUrl, WebToken } from 'android-management/resource';
import type { ApiResponseType } from '../api.types';
import axiosClient from '../axiosClient';

export const enterpriseApi = {
  /**
   * Get an enterprise map with the authenticated user's email
   *
   * @returns If successful, the response body contains an enterprise resource. The enterprise resource will be empty if no enterprise is associated with the authenticated user.
   */
  getEnterprise: async (): Promise<ApiResponseType<Enterprise | null>> => {
    const response = await axiosClient.get('/api/v1/emm-android');
    return response.data;
  },

  /**
   * Creates an enterprise signup URL.
   *
   * @param query.callback_url The callback URL that the admin will be redirected to after successfully creating an enterprise. Before redirecting there the system will add a query parameter to this URL named enterpriseToken which will contain an opaque token to be used for the create enterprise request. The URL will be parsed then reformatted in order to add the enterpriseToken parameter, so there may be some minor formatting changes.
   *
   * @returns If successful, the response body contains a newly created instance of SignupUrl.
   */
  createSignupUrl: async (query: { callback_url: string }): Promise<ApiResponseType<SignupUrl>> => {
    const response = await axiosClient.post('/api/v1/emm-android/signup-url', query);
    return response.data;
  },

  /**
   * Register new enterprise map with the user email using signup URL token
   *
   * @param query.signup_url_name  The name of the SignupUrl used to sign up for the enterprise. Set this when creating a customer-managed enterprise and not when creating a deprecated EMM-managed enterprise.
   * @param query.enterprise_token The enterprise token appended to the callback URL. Set this when creating a customer-managed enterprise and not when creating a deprecated EMM-managed enterprise.
   *
   * @returns
   */
  createEnterprise: async (query: {
    signup_url_name: string;
    enterprise_token: string;
  }): Promise<ApiResponseType<Enterprise>> => {
    const response = await axiosClient.post('/api/v1/emm-android', query);
    return response.data;
  },

  /**
   * Creates a web token to access an embeddable managed Google Play web UI for a given enterprise.
   *
   * @param name The resource name of the enterprise in the format `enterprises/{enterpriseId}`.
   * @param query.parent_frame_url The URL of the parent frame hosting the embeddable UI. The generated web token will only be valid for requests from this URL. If not specified, a web token will be generated that is valid for any URL. This should be used to ensure that the web token is only usable from an expected context. See the [Managed Google Play iframe embedding guide](https://developers.google.com/android/management/iframe) for details.
   *
   * @returns If successful, the response body contains an instance of WebToken.
   */
  createWebToken: async (
    name: string,
    query: {
      parent_frame_url: string;
    },
  ): Promise<ApiResponseType<WebToken>> => {
    const response = await axiosClient.post(`/api/v1/emm-android/${name}/web-token`, query);
    return response.data;
  },

  /**
   * Creates an enrollment token for a given enterprise. It's up to the caller's responsibility to manage the lifecycle of newly created tokens and deleting them when they're not intended to be used anymore.
   *
   * @param name The resource name of the enterprise in the format `enterprises/{enterpriseId}`.
   * @param query.body The request body contains an instance of EnrollmentToken.
   *
   * @returns If successful, the response body contains an instance of EnrollmentToken.
   */
  createEnrollmentToken: async (
    name: string,
    query: {
      body: Partial<EnrollmentToken>;
    },
  ): Promise<ApiResponseType<EnrollmentToken>> => {
    const response = await axiosClient.post(`/api/v1/emm-android/${name}/enrollment-token`, query);
    return response.data;
  },
};
