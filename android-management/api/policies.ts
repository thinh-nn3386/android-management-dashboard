import type { ApplicationPolicyChange, Policy } from '../resource';

export abstract class PoliciesApi {
  /**
   * Deletes a policy. This operation is only permitted if no devices are currently referencing the policy.\
   *
   * @param name The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
   *
   */
  abstract delete(name: string): Promise<void>;

  /**
   * Gets a policy.
   *
   * @param name The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
   *
   * @returns If successful, the response body contains an instance of Policy.
   *
   */
  abstract get(name: string): Promise<Policy>;

  /**
   * Lists policies for a given enterprise.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   * @param query Optional query parameters for pagination.
   *
   */
  abstract list(
    parent: string,
    query?: { pageSize?: number; pageToken?: string },
  ): Promise<{
    policies: Policy[];
    nextPageToken: string;
  }>;

  /**
   * Updates or creates applications in a policy.
   *
   * @param name Required. The name of the Policy containing the ApplicationPolicy objects to be updated, in the form enterprises/{enterpriseId}/policies/{policyId}.
   * @param payload The request body contains data with the following structure:
   *
   */
  abstract modifyPolicyApplications(
    name: string,
    payload: {
      changes: ApplicationPolicyChange[];
    },
  ): Promise<{
    // The updated policy.
    policy: Policy;
  }>;

  /**
   * Updates or creates a policy.
   * @param name  The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
   * @param payload
   */
  abstract patch(
    name: string,
    query?: {
      // The field mask indicating the fields to update. If not set, all modifiable fields will be modified.
      updateMask: string;
    },
    payload?: Partial<Policy>,
  ): Promise<Policy>;

  /**
   * Removes applications in a policy.
   *
   * @param name Required. The name of the policy containing the ApplicationPolicy objects to be removed, in the form enterprises/{enterpriseId}/policies/{policyId}.
   * @param payload The request body contains data with the following structure:
   *
   * @returns If successful, the response body contains an instance of Policy with the updated list of applications.
   */
  abstract removePolicyApplications(
    name: string,
    payload?: {
      packageNames: string[];
    },
  ): Promise<{
    policy: Policy;
  }>;
}
