import type { SignupUrl } from '../resource';

export abstract class SignupUrlsApi {
  /**
   * Creates an enterprise signup URL.
   *
   * @param query Optional query parameters.
   *
   * @returns If successful, the response body contains a newly created instance of SignupUrl.
   */
  abstract create(query?: {
    projectId?: string;

    // The callback URL that the admin will be redirected to after successfully creating an enterprise. Before redirecting there the system will add a query parameter to this URL named enterpriseToken which will contain an opaque token to be used for the create enterprise request. The URL will be parsed then reformatted in order to add the enterpriseToken parameter, so there may be some minor formatting changes.
    callbackUrl?: string;

    // Optional. Email address used to prefill the admin field of the enterprise signup form. This value is a hint only and can be altered by the user. If allowedDomains is non-empty then this must belong to one of the allowedDomains.
    adminEmail?: string;

    //Optional. A list of domains that are permitted for the admin email. The IT admin cannot enter an email address with a domain name that is not in this list. Subdomains of domains in this list are not allowed but can be allowed by adding a second entry which has *. prefixed to the domain name (e.g. *.example.com). If the field is not present or is an empty list then the IT admin is free to use any valid domain name. Personal email domains are always allowed, but will result in the creation of a managed Google Play Accounts enterprise.
    allowedDomains: string[];
  }): Promise<SignupUrl>;
}
