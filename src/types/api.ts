// Auth Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  token: string;
  email: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  email: string;
}

export interface EnterpriseInfo {
  name: string;
  display_name: string;
  enterprise_id: string;
}

export interface EnterpriseLoginResponse {
  status: string;
  enterprise_found: boolean;
  message: string;
  email: string;
  enterprise?: EnterpriseInfo;
}

export interface EnterpriseSignUpUrlResponse {
  status: string;
  message: string;
  signup_url: string;
  signup_name: string;
}

export interface EnterpriseRegisterPayload {
  signup_url_name: string;
  enterprise_token: string;
  email: string;
}

export interface EnterpriseRegisterResponse {
  status: string;
  message: string;
  email: string;
  enterprise_name: string;
  enterprise: EnterpriseInfo;
}

// Policy Types
export interface Application {
  packageName: string;
  installType: string;
  [key: string]: any;
}

export interface PolicyBody {
  applications?: Application[];
  [key: string]: any;
}

export interface Policy {
  name: string;
  policy_id: string;
  version: string;
  applications: Application[];
  [key: string]: any;
}

export interface PoliciesResponse {
  status: string;
  message: string;
  enterprise_name: string;
  policies: Policy[];
  count: number;
}

export interface CreatePolicyPayload {
  enterprise_name: string;
  policy_name: string;
  policy_body: PolicyBody;
}

export interface PolicyResponse {
  status: string;
  message: string;
  policy: Policy;
}

export interface DeletePolicyPayload {
  enterprise_name: string;
  policy_name: string;
}

// Device Types
export interface HardwareInfo {
  [key: string]: any;
}

export interface SoftwareInfo {
  [key: string]: any;
}

export interface MemoryInfo {
  [key: string]: any;
}

export interface NetworkInfo {
  [key: string]: any;
}

export interface Device {
  name: string;
  device_id: string;
  state: string;
  appliedPolicyName: string;
  appliedState: string;
  hardwareInfo?: HardwareInfo;
  policyName: string;
  softwareInfo?: SoftwareInfo;
  memoryInfo?: MemoryInfo;
  networkInfo?: NetworkInfo;
  enrollmentTime?: string;
  lastStatusReportTime?: string;
  [key: string]: any;
}

export interface DevicesResponse {
  status: string;
  message: string;
  enterprise_name: string;
  devices: Device[];
  count: number;
}

export interface DeviceDetailResponse {
  status: string;
  message: string;
  device: Device;
}

export interface EnrollmentTokenPayload {
  enterprise_name: string;
  policy_name: string;
}

export interface EnrollmentToken {
  name: string;
  value: string;
  qrCode: string;
  policyName: string;
  expirationTimestamp: string;
}

export interface EnrollmentTokenResponse {
  status: string;
  message: string;
  enrollment_token: EnrollmentToken;
}

export interface DeleteDevicePayload {
  device_id: string;
  enterprise_name: string;
}

// Common Response
export interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}
