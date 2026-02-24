/* eslint-disable @typescript-eslint/no-empty-object-type */
// A shell command was issued over ADB via “adb shell command”.
export type AdbShellCommandEvent = {
  // Redacted to empty string on organization-owned managed profile devices.
  shellCmd: string;
};

// Flags used to control personal usage on the managed device.
export enum AllowPersonalUsage {
  // Personal usage restriction is not specified
  ALLOW_PERSONAL_USAGE_UNSPECIFIED = 'ALLOW_PERSONAL_USAGE_UNSPECIFIED',

  // Personal usage is allowed
  PERSONAL_USAGE_ALLOWED = 'PERSONAL_USAGE_ALLOWED',

  // Personal usage is disallowed
  PERSONAL_USAGE_DISALLOWED = 'PERSONAL_USAGE_DISALLOWED',

  // Device is not associated with a single user, and thus both personal usage and corporate identity authentication are not expected.
  PERSONAL_USAGE_DISALLOWED_USERLESS = 'PERSONAL_USAGE_DISALLOWED_USERLESS',
}

// Information about a process. It contains process name, start time, app Uid, app Pid, seinfo tag, hash of the base APK.
export type AppProcessInfo = {
  // Process name.
  processName: string;

  // Process start time. Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted.
  startTime: string;

  // UID of the package.
  uid: number;

  // PID of the process.
  pid: number;

  // SELinux policy info.
  seinfo: string;

  // SHA-256 hash of the base APK, in hexadecimal format.
  apkSha256Hash: string;

  // Package names of all packages that are associated with the particular user ID. In most cases, this will be a single package name, the package that has been assigned that user ID. If multiple application share a UID then all packages sharing UID will be included.
  packageNames: string[];
};

// An app process was started. This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type AppProcessStartEvent = {
  // Information about a process.
  processInfo: AppProcessInfo;
};

// Whether the backup service is enabled
export enum BackupServiceState {
  // No value is set.
  BACKUP_SERVICE_STATE_UNSPECIFIED = 'BACKUP_SERVICE_STATE_UNSPECIFIED',

  // Backup service is disabled.
  BACKUP_SERVICE_DISABLED = 'BACKUP_SERVICE_DISABLED',

  // Backup service is enabled.
  BACKUP_SERVICE_ENABLED = 'BACKUP_SERVICE_ENABLED',
}

// An admin has enabled or disabled backup service.
export type BackupServiceToggledEvent = {
  // Package name of the admin app requesting the change.
  adminPackageName: string;

  // User ID of the admin app from the which the change was requested.
  adminUserId: number;

  // Whether the backup service is enabled
  backupServiceState: BackupServiceState;
};

// Batched event logs of events from the device.
export type BatchUsageLogEvents = {
  // If present, the name of the device in the form ‘enterprises/{enterpriseId}/devices/{deviceId}’
  device: string;

  // If present, the resource name of the user that owns this device in the form ‘enterprises/{enterpriseId}/users/{userId}’.
  user: string;

  // The device timestamp when the batch of events were collected from the device.

  // Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: "2014-10-02T15:01:23Z", "2014-10-02T15:01:23.045123456Z" or "2014-10-02T15:01:23+05:30".
  retrievalTime: string;

  // The list of UsageLogEvent that were reported by the device, sorted chronologically by the event time.
  usageLogEvents: UsageLogEvent[];
};

// An event logged on the device.
// https://developers.google.com/android/management/reference/rest/v1/BatchUsageLogEvents#usagelogevent
export type UsageLogEvent = {
  // Unique id of the event.
  eventId: string;

  // Device timestamp when the event was logged.
  // Examples: "2014-10-02T15:01:23Z", "2014-10-02T15:01:23.045123456Z" or "2014-10-02T15:01:23+05:30".
  eventTime: string;

  // The particular usage log event type that was reported on the device. Use this to determine which event field to access.
  eventType: EventType;

  // Union field event can be only one of the following:
  adbShellCommandEvent?: AdbShellCommandEvent;
  adbShellInteractiveEvent?: AdbShellInteractiveEvent;
  appProcessStartEvent?: AppProcessStartEvent;
  keyguardDismissedEvent?: KeyguardDismissedEvent;
  keyguardDismissAuthAttemptEvent?: KeyguardDismissAuthAttemptEvent;
  keyguardSecuredEvent?: KeyguardSecuredEvent;
  filePulledEvent?: FilePulledEvent;
  filePushedEvent?: FilePushedEvent;
  certAuthorityInstalledEvent?: CertAuthorityInstalledEvent;
  certAuthorityRemovedEvent?: CertAuthorityRemovedEvent;
  certValidationFailureEvent?: CertValidationFailureEvent;
  cryptoSelfTestCompletedEvent?: CryptoSelfTestCompletedEvent;
  keyDestructionEvent?: KeyDestructionEvent;
  keyGeneratedEvent?: KeyGeneratedEvent;
  keyImportEvent?: KeyImportEvent;
  keyIntegrityViolationEvent?: KeyIntegrityViolationEvent;
  loggingStartedEvent?: LoggingStartedEvent;
  loggingStoppedEvent?: LoggingStoppedEvent;
  logBufferSizeCriticalEvent?: LogBufferSizeCriticalEvent;
  mediaMountEvent?: MediaMountEvent;
  mediaUnmountEvent?: MediaUnmountEvent;
  osShutdownEvent?: OsShutdownEvent;
  osStartupEvent?: OsStartupEvent;
  remoteLockEvent?: RemoteLockEvent;
  wipeFailureEvent?: WipeFailureEvent;
  connectEvent?: ConnectEvent;
  dnsEvent?: DnsEvent;
  stopLostModeUserAttemptEvent?: StopLostModeUserAttemptEvent;
  lostModeOutgoingPhoneCallEvent?: LostModeOutgoingPhoneCallEvent;
  lostModeLocationEvent?: LostModeLocationEvent;
  enrollmentCompleteEvent?: EnrollmentCompleteEvent;
  backupServiceToggledEvent?: BackupServiceToggledEvent;
  // End of list of possible types for union field event.
};

// An ADB interactive shell was opened via “adb shell”. Intentionally empty.
export type AdbShellInteractiveEvent = {
  // This type has no fields.
};

// The keyguard was dismissed. Intentionally empty.
export type KeyguardDismissedEvent = {
  // This type has no fields.
};

// An attempt was made to unlock the device.
export type KeyguardDismissAuthAttemptEvent = {
  // Whether the unlock attempt was successful.
  success: boolean;

  // Whether a strong form of authentication (password, PIN, or pattern) was used to unlock device.
  strongAuthMethodUsed: boolean;
};

// The device was locked either by user or timeout. Intentionally empty.
export type KeyguardSecuredEvent = {
  // This type has no fields.
};

// A file was downloaded from the device.
export type FilePulledEvent = {
  // The path of the file being pulled.
  filePath: string;
};

// A file was uploaded onto the device.
export type FilePushedEvent = {
  // The path of the file being pushed.
  filePath: string;
};

// A new root certificate was installed into the system's trusted credential storage. This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type CertAuthorityInstalledEvent = {
  // Subject of the certificate.
  certificate: string;

  // The user in which the certificate install event happened. Only available for devices running Android 11 and above.
  userId: number;

  // Whether the installation event succeeded.
  success: boolean;
};

// A root certificate was removed from the system's trusted credential storage. This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type CertAuthorityRemovedEvent = {
  certificate: string;

  // The user in which the certificate removal event happened. Only available for devices running Android 11 and above.
  userId: number;

  // Whether the removal event succeeded.
  success: boolean;
};

// An X.509v3 certificate failed to validate, currently this validation is performed on the Wi-FI access point and failure may be due to a mismatch upon server certificate validation. However it may in the future include other validation events of an X.509v3 certificate.
export type CertValidationFailureEvent = {
  // The reason why certification validation failed.
  failureReason: string;
};

// Validates whether Android’s built-in cryptographic library (BoringSSL) is valid. Should always succeed on device boot, if it fails, the device should be considered untrusted.
export type CryptoSelfTestCompletedEvent = {
  // Whether the test succeeded.
  success: boolean;
};

// A cryptographic key including user installed, admin installed and system maintained private key is removed from the device either by the user or management. This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type KeyDestructionEvent = {
  // Alias of the key.
  keyAlias: string;

  // UID of the application which owns the key.
  applicationUid: number;

  // Whether the operation was successful.
  success: boolean;
};

// A cryptographic key including user installed, admin installed and system maintained private key is installed on the device either by the user or management.This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type KeyGeneratedEvent = {
  // Alias of the key.
  keyAlias: string;

  // UID of the application which owns the key.
  applicationUid: number;

  // Whether the operation was successful.
  success: boolean;
};

// A cryptographic key including user installed, admin installed and system maintained private key is imported on the device either by the user or management. This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type KeyImportEvent = {
  // Alias of the key.
  keyAlias: string;

  // UID of the application which owns the key.
  applicationUid: number;

  // Whether the operation was successful.
  success: boolean;
};

// A cryptographic key including user installed, admin installed and system maintained private key is determined to be corrupted due to storage corruption, hardware failure or some OS issue. This is available device-wide on fully managed devices and within the work profile on organization-owned devices with a work profile.
export type KeyIntegrityViolationEvent = {
  // Alias of the key.
  keyAlias: string;

  // UID of the application which owns the key.
  applicationUid: number;
};

// usageLog policy has been enabled. Intentionally empty.
export type LoggingStartedEvent = {
  // This type has no fields.
};

// usageLog policy has been disabled. Intentionally empty.
export type LoggingStoppedEvent = {
  // This type has no fields.
};

// The usageLog buffer on the device has reached 90% of its capacity, therefore older events may be dropped. Intentionally empty.
export type LogBufferSizeCriticalEvent = {
  // This type has no fields.
};

// Removable media was mounted.
export type MediaMountEvent = {
  // Mount point.
  mountPoint: string;

  // Volume label. Redacted to empty string on organization-owned managed profile devices.
  volumeLabel: string;
};

// Removable media was unmounted.
export type MediaUnmountEvent = {
  // Mount point.
  mountPoint: string;

  // Volume label. Redacted to empty string on organization-owned managed profile devices.
  volumeLabel: string;
};

// Device was shutdown. Intentionally empty.
export type OsShutdownEvent = {
  // This type has no fields.
};

// Device was started.
export type OsStartupEvent = {
  // Verified Boot state.
  verifiedBootState: VerifiedBootState;

  // dm-verity mode.
  verityMode: DmVerityMode;
};

// The device or profile has been remotely locked via the LOCK command.
export type RemoteLockEvent = {
  // Package name of the admin app requesting the change.
  adminPackageName: string;

  // User ID of the admin app from the which the change was requested.
  adminUserId: number;

  // User ID in which the change was requested in.
  targetUserId: number;
};

// The work profile or company-owned device failed to wipe when requested. This could be user initiated or admin initiated e.g. delete was received. Intentionally empty.
export type WipeFailureEvent = {
  // This type has no fields.
};

// A TCP connect event was initiated through the standard network stack.
export type ConnectEvent = {
  // Destination IP address.
  destinationIpAddress: string;

  // Destination port.
  destinationPort: number;

  // Package name of the app initiating the connection.
  packageName: string;
};

// A DNS lookup event was initiated through the standard network stack.
export type DnsEvent = {
  // The hostname that was looked up.
  hostname: string;

  // The (possibly truncated) list of the IP addresses returned for DNS lookup (max 10 IPv4 or IPv6 addresses).
  ipAddresses: string[];

  // The number of IP addresses returned from the DNS lookup event. May be higher than the amount of ipAddresses if there were too many addresses to log.
  totalIpAddressesReturned: string;

  // The package name of the UID that performed the DNS lookup.
  packageName: string;
};

// A lost mode event indicating the user has attempted to stop lost mode.
export type StopLostModeUserAttemptEvent = {
  // The status of the attempt to stop lost mode.
  status: Status;
};

// An event indicating an outgoing phone call has been made when a device is in lost mode. Intentionally empty.
export type LostModeOutgoingPhoneCallEvent = {
  // This type has no fields.
};

// A lost mode event containing the device location and battery level as a percentage.
export type LostModeLocationEvent = {
  location: Location;
  batteryLevel: number;
};

// The device location containing the latitude and longitude.
export type Location = {
  // The latitude position of the location
  latitude: number;

  // The longitude position of the location
  longitude: number;
};

// Represents that the device has completed enrollment. User should be in the launcher at this point, device at this point will be compliant and all setup steps have been completed. Intentionally empty.
export type EnrollmentCompleteEvent = {
  // This type has no fields.
};

// The scope to which the policy should be applied.
export enum DefaultApplicationScope {
  // Unspecified. This value must not be used.
  DEFAULT_APPLICATION_SCOPE_UNSPECIFIED = 'DEFAULT_APPLICATION_SCOPE_UNSPECIFIED',

  // Sets the application as the default on fully managed devices.
  SCOPE_FULLY_MANAGED = 'SCOPE_FULLY_MANAGED',

  // Sets the application as the work profile default.
  // Only supported for DEFAULT_BROWSER, DEFAULT_CALL_REDIRECTION, DEFAULT_CALL_SCREENING, DEFAULT_DIALER and DEFAULT_WALLET.
  SCOPE_WORK_PROFILE = 'SCOPE_WORK_PROFILE',

  // Sets the application as the personal profile default on company-owned devices with a work profile. Only pre-installed system apps can be set as the default.
  SCOPE_PERSONAL_PROFILE = 'SCOPE_PERSONAL_PROFILE',
}

// Categories for which a default application can be specified.
export enum DefaultApplicationType {
  // Unspecified. This value must not be used.
  DEFAULT_APPLICATION_TYPE_UNSPECIFIED = 'DEFAULT_APPLICATION_TYPE_UNSPECIFIED',

  /**
   *   The assistant app type. This app type is only allowed to be set for SCOPE_FULLY_MANAGED.
   *   Supported on fully managed devices on Android 16 and above. A NonComplianceDetail with MANAGEMENT_MODE is reported for other management modes. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 16.
   */

  DEFAULT_ASSISTANT = 'DEFAULT_ASSISTANT',

  /**
   *   The browser app type.
   *   Supported on Android 16 and above. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 16.
   */
  DEFAULT_BROWSER = 'DEFAULT_BROWSER',

  /**
   *   The call redirection app type. This app type cannot be set for SCOPE_PERSONAL_PROFILE.
   *   Supported on Android 16 and above. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 16.
   */
  DEFAULT_CALL_REDIRECTION = 'DEFAULT_CALL_REDIRECTION',

  /**
   *   The call screening app type. This app type cannot be set for SCOPE_PERSONAL_PROFILE.
   *   Supported on Android 16 and above. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 16.
   */
  DEFAULT_CALL_SCREENING = 'DEFAULT_CALL_SCREENING',

  /**
   *   The dialer app type. This app type cannot be set for SCOPE_PERSONAL_PROFILE.
   *   Supported on fully managed devices on Android 14 and 15. A NonComplianceDetail with MANAGEMENT_MODE is reported for other management modes. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 14.
   * Supported on all management modes on Android 16 and above.
   */
  DEFAULT_DIALER = 'DEFAULT_DIALER',

  /**
   * 	The home app type. This app type is only allowed to be set for SCOPE_FULLY_MANAGED.
   *   Supported on fully managed devices on Android 16 and above. A NonComplianceDetail with MANAGEMENT_MODE is reported for other management modes. A NonComplianceDetail with API_LEVEL is reported if the Android version is less than 16.
   */
  DEFAULT_HOME = 'DEFAULT_HOME',

  // 	The SMS app type. This app type cannot be set for SCOPE_WORK_PROFILE.
  DEFAULT_SMS = 'DEFAULT_SMS',

  // 	The wallet app type. The default application of this type applies across profiles.
  DEFAULT_WALLET = 'DEFAULT_WALLET',
}

// The dm-verity mode during Android OS startup.
export enum DmVerityMode {
  // Unknown value.
  DM_VERITY_MODE_UNSPECIFIED = 'DM_VERITY_MODE_UNSPECIFIED',

  // Indicates that the device will be restarted when corruption is detected.
  ENFORCING = 'ENFORCING',

  // Indicates that an I/O error will be returned for an attempt to read corrupted data blocks (also known as eio boot state).
  IO_ERROR = 'IO_ERROR',

  // Indicates that dm-verity is disabled on device.
  DISABLED = 'DISABLED',
}

// An event sent for an enterprise upgrade. An enterprise upgrade is a process that upgrades a managed Google Play Accounts enterprise to a managed Google domain.
export type EnterpriseUpgradeEvent = {
  // The name of upgraded enterprise in the format "enterprises/{enterprise}"
  enterprise: string;

  // Output only. The upgrade state of the enterprise.
  upgradeState: UpgradeState;
};

// Usage log event type.
export enum EventType {
  // This value is not used
  EVENT_TYPE_UNSPECIFIED = 'EVENT_TYPE_UNSPECIFIED',

  // Indicates adbShellCommandEvent has been set.
  ADB_SHELL_COMMAND = 'ADB_SHELL_COMMAND',

  // Indicates adbShellInteractiveEvent has been set.
  ADB_SHELL_INTERACTIVE = 'ADB_SHELL_INTERACTIVE',

  // Indicates appProcessStartEvent has been set.
  APP_PROCESS_START = 'APP_PROCESS_START',

  // Indicates keyguardDismissedEvent has been set.
  KEYGUARD_DISMISSED = 'KEYGUARD_DISMISSED',

  // Indicates keyguardDismissAuthAttemptEvent has been set.
  KEYGUARD_DISMISS_AUTH_ATTEMPT = 'KEYGUARD_DISMISS_AUTH_ATTEMPT',

  // 	Indicates keyguardSecuredEvent has been set.
  KEYGUARD_SECURED = 'KEYGUARD_SECURED',

  // Indicates filePulledEvent has been set.
  FILE_PULLED = 'FILE_PULLED',

  // Indicates filePushedEvent has been set.
  FILE_PUSHED = 'FILE_PUSHED',

  // Indicates certAuthorityInstalledEvent has been set.
  CERT_AUTHORITY_INSTALLED = 'CERT_AUTHORITY_INSTALLED',
  // Indicates certAuthorityRemovedEvent has been set.
  CERT_AUTHORITY_REMOVED = 'CERT_AUTHORITY_REMOVED',
  // Indicates certValidationFailureEvent has been set.
  CERT_VALIDATION_FAILURE = 'CERT_VALIDATION_FAILURE',
  // Indicates cryptoSelfTestCompletedEvent has been set.
  CRYPTO_SELF_TEST_COMPLETED = 'CRYPTO_SELF_TEST_COMPLETED',
  // Indicates keyDestructionEvent has been set.
  KEY_DESTRUCTION = 'KEY_DESTRUCTION',
  // Indicates keyGeneratedEvent has been set.
  KEY_GENERATED = 'KEY_GENERATED',
  // Indicates keyImportEvent has been set.
  KEY_IMPORT = 'KEY_IMPORT',
  // Indicates keyIntegrityViolationEvent has been set.
  KEY_INTEGRITY_VIOLATION = 'KEY_INTEGRITY_VIOLATION',
  // Indicates loggingStartedEvent has been set.
  LOGGING_STARTED = 'LOGGING_STARTED',
  // Indicates loggingStoppedEvent has been set.
  LOGGING_STOPPED = 'LOGGING_STOPPED',
  // Indicates logBufferSizeCriticalEvent has been set.
  LOG_BUFFER_SIZE_CRITICAL = 'LOG_BUFFER_SIZE_CRITICAL',
  // Indicates mediaMountEvent has been set.
  MEDIA_MOUNT = 'MEDIA_MOUNT',
  // Indicates mediaUnmountEvent has been set.
  MEDIA_UNMOUNT = 'MEDIA_UNMOUNT',
  // Indicates osShutdownEvent has been set.
  OS_SHUTDOWN = 'OS_SHUTDOWN',
  // Indicates osStartupEvent has been set.
  OS_STARTUP = 'OS_STARTUP',
  // Indicates remoteLockEvent has been set.
  REMOTE_LOCK = 'REMOTE_LOCK',
  // Indicates wipeFailureEvent has been set.
  WIPE_FAILURE = 'WIPE_FAILURE',
  // Indicates connectEvent has been set.
  CONNECT = 'CONNECT',
  // Indicates dnsEvent has been set.
  DNS = 'DNS',
  // Indicates stopLostModeUserAttemptEvent has been set.
  STOP_LOST_MODE_USER_ATTEMPT = 'STOP_LOST_MODE_USER_ATTEMPT',
  // Indicates lostModeOutgoingPhoneCallEvent has been set.
  LOST_MODE_OUTGOING_PHONE_CALL = 'LOST_MODE_OUTGOING_PHONE_CALL',
  // Indicates lostModeLocationEvent has been set.
  LOST_MODE_LOCATION = 'LOST_MODE_LOCATION',
  // Indicates enrollmentCompleteEvent has been set.
  ENROLLMENT_COMPLETE = 'ENROLLMENT_COMPLETE',
  // Indicates backupServiceToggledEvent has been set.
  BACKUP_SERVICE_TOGGLED = 'BACKUP_SERVICE_TOGGLED',
}

// Response on issuing a command. This is currently empty as a placeholder.
export type IssueCommandResponse = {
  // This type has no fields.
};

// The type of management mode Android Device Policy takes on the device.
export enum ManagementMode {
  // This value is disallowed.
  MANAGEMENT_MODE_UNSPECIFIED = 'MANAGEMENT_MODE_UNSPECIFIED',
  // Device owner. Android Device Policy has full control over the device.
  DEVICE_OWNER = 'DEVICE_OWNER',
  // 	Profile owner. Android Device Policy has control over a managed profile on the device.
  PROFILE_OWNER = 'PROFILE_OWNER',
}

// Reasons a device might not be compliant with a policy setting. See also specificNonComplianceReason.
export enum NonComplianceReason {
  // This value is not used.
  NON_COMPLIANCE_REASON_UNSPECIFIED = 'NON_COMPLIANCE_REASON_UNSPECIFIED',

  // The setting is not supported in the API level of the Android version running on the device.
  API_LEVEL = 'API_LEVEL',

  // The management mode (such as fully managed or work profile) doesn't support the setting.
  MANAGEMENT_MODE = 'MANAGEMENT_MODE',

  // The user has not taken required action to comply with the setting.
  USER_ACTION = 'USER_ACTION',

  // 	The setting has an invalid value.
  INVALID_VALUE = 'INVALID_VALUE',

  // The app required to implement the policy is not installed.
  APP_NOT_INSTALLED = 'APP_NOT_INSTALLED',

  // The policy is not supported by the version of Android Device Policy on the device.
  UNSUPPORTED = 'UNSUPPORTED',

  // A blocked app is installed.
  APP_INSTALLED = 'APP_INSTALLED',

  // The setting hasn't been applied at the time of the report, but is expected to be applied shortly.
  PENDING = 'PENDING',

  // The setting can't be applied to the app because the app doesn't support it, for example because its target SDK version is not high enough.
  APP_INCOMPATIBLE = 'APP_INCOMPATIBLE',

  // The app is installed, but it hasn't been updated to the minimum version code specified by policy.
  APP_NOT_UPDATED = 'APP_NOT_UPDATED',

  // The device is incompatible with the policy requirements.
  DEVICE_INCOMPATIBLE = 'DEVICE_INCOMPATIBLE',

  // The app's signing certificate does not match the setting value.
  APP_SIGNING_CERT_MISMATCH = 'APP_SIGNING_CERT_MISMATCH',

  // The Google Cloud Platform project used to manage the device is not permitted to use this policy.
  PROJECT_NOT_PERMITTED = 'PROJECT_NOT_PERMITTED',
}

export enum Ownership {
  // Ownership is unspecified.
  OWNERSHIP_UNSPECIFIED = 'OWNERSHIP_UNSPECIFIED',

  // Device is company-owned.
  COMPANY_OWNED = 'COMPANY_OWNED',

  // Device is personally-owned.
  PERSONAL = 'PERSONAL',
}

// Scope that the password requirement applies to.
export enum PasswordPolicyScope {
  // The scope is unspecified. The password requirements are applied to the work profile for work profile devices and the whole device for fully managed or dedicated devices.
  SCOPE_UNSPECIFIED = 'SCOPE_UNSPECIFIED',

  // The password requirements are only applied to the device.
  SCOPE_DEVICE = 'SCOPE_DEVICE',

  // The password requirements are only applied to the work profile.
  SCOPE_PROFILE = 'SCOPE_PROFILE',
}

// Requirements for the password used to unlock a device.
export type PasswordRequirements = {
  // The minimum allowed password length. A value of 0 means there is no restriction. Only enforced when passwordQuality is NUMERIC, NUMERIC_COMPLEX, ALPHABETIC, ALPHANUMERIC, or COMPLEX.
  passwordMinimumLength: number;

  // Minimum number of letters required in the password. Only enforced when passwordQuality is COMPLEX.
  passwordMinimumLetters: number;

  // Minimum number of lower case letters required in the password. Only enforced when passwordQuality is COMPLEX.
  passwordMinimumLowerCase: number;

  // Minimum number of non-letter characters (numerical digits or symbols) required in the password. Only enforced when passwordQuality is COMPLEX.
  passwordMinimumNonLetter: number;

  // Minimum number of numerical digits required in the password. Only enforced when passwordQuality is COMPLEX.
  passwordMinimumNumeric: number;

  // Minimum number of symbols required in the password. Only enforced when passwordQuality is COMPLEX.
  passwordMinimumSymbols: number;

  // Minimum number of upper case letters required in the password. Only enforced when passwordQuality is COMPLEX.
  passwordMinimumUpperCase: number;

  // The required password quality.
  passwordQuality: PasswordQuality;

  // The length of the password history. After setting this field, the user won't be able to enter a new password that is the same as any password in the history. A value of 0 means there is no restriction.
  passwordHistoryLength: number;

  // Number of incorrect device-unlock passwords that can be entered before a device is wiped. A value of 0 means there is no restriction.
  maximumFailedPasswordsForWipe: number;

  // Password expiration timeout.
  passwordExpirationTimeout: string;

  // The scope that the password requirement applies to.
  passwordScope: PasswordPolicyScope;

  // The length of time after a device or work profile is unlocked using a strong form of authentication (password, PIN, pattern) that it can be unlocked using any other authentication method (e.g. fingerprint, trust agents, face). After the specified time period elapses, only strong forms of authentication can be used to unlock the device or work profile.
  requirePasswordUnlock: RequirePasswordUnlock;

  // Controls whether a unified lock is allowed for the device and the work profile, on devices running Android 9 and above with a work profile. This can be set only if passwordScope is set to SCOPE_PROFILE, the policy will be rejected otherwise. If user has not set a separate work lock and this field is set to REQUIRE_SEPARATE_WORK_LOCK, a NonComplianceDetail is reported with nonComplianceReason set to USER_ACTION.
  unifiedLockSettings: UnifiedLockSettings;
};

// Password quality requirements.
export enum PasswordQuality {
  // There are no password requirements.
  PASSWORD_QUALITY_UNSPECIFIED = 'PASSWORD_QUALITY_UNSPECIFIED',

  // 	The device must be secured with a low-security biometric recognition technology, at minimum. This includes technologies that can recognize the identity of an individual that are roughly equivalent to a 3-digit PIN (false detection is less than 1 in 1,000).
  BIOMETRIC_WEAK = 'BIOMETRIC_WEAK',

  // A password is required, but there are no restrictions on what the password must contain.
  SOMETHING = 'SOMETHING',

  // The password must contain at least numeric characters.
  NUMERIC = 'NUMERIC',

  // The password must contain numeric characters with no repeating (4444) or ordered (1234, 4321, 2468) sequences.
  NUMERIC_COMPLEX = 'NUMERIC_COMPLEX',

  // The password must contain alphabetic (or symbol) characters.
  ALPHABETIC = 'ALPHABETIC',

  // The password must contain both numeric and alphabetic (or symbol) characters.
  ALPHANUMERIC = 'ALPHANUMERIC',

  // The password must meet the minimum requirements specified in passwordMinimumLength, passwordMinimumLetters, passwordMinimumSymbols, etc. For example, if passwordMinimumSymbols is 2, the password must contain at least two symbols.
  COMPLEX = 'COMPLEX',

  /**
   * 	Define the low password complexity band as:
   * 	  pattern
   * 	  PIN with repeating (4444) or ordered (1234, 4321, 2468) sequences
   * 	This sets the minimum complexity band which the password must meet.
   */
  COMPLEXITY_LOW = 'COMPLEXITY_LOW',

  /**
   * Define the medium password complexity band as:

    PIN with no repeating (4444) or ordered (1234, 4321, 2468) sequences, length at least 4
    alphabetic, length at least 4
    alphanumeric, length at least 4
    This sets the minimum complexity band which the password must meet.
   */
  COMPLEXITY_MEDIUM = 'COMPLEXITY_MEDIUM',

  /**
   * Define the high password complexity band as:

    On Android 12 and above:

    PIN with no repeating (4444) or ordered (1234, 4321, 2468) sequences, length at least 8
    alphabetic, length at least 6
    alphanumeric, length at least 6
    This sets the minimum complexity band which the password must meet.
   */
  COMPLEXITY_HIGH = 'COMPLEXITY_HIGH',
}

// The length of time after a device or work profile is unlocked using a strong form of authentication (password, PIN, pattern) that it can be unlocked using any other authentication method (e.g. fingerprint, trust agents, face). After the specified time period elapses, only strong forms of authentication can be used to unlock the device or work profile.
export enum RequirePasswordUnlock {
  // Unspecified. Defaults to USE_DEFAULT_DEVICE_TIMEOUT.
  REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED = 'REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED',

  // The timeout period is set to the device’s default.
  USE_DEFAULT_DEVICE_TIMEOUT = 'USE_DEFAULT_DEVICE_TIMEOUT',

  // The timeout period is set to 24 hours.
  REQUIRE_EVERY_DAY = 'REQUIRE_EVERY_DAY',
}

// Controls whether a unified lock is allowed for the device and the work profile, on devices running Android 9 and above with a work profile. This has no effect on other devices.
export enum UnifiedLockSettings {
  // Unspecified. Defaults to ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK.
  UNIFIED_LOCK_SETTINGS_UNSPECIFIED = 'UNIFIED_LOCK_SETTINGS_UNSPECIFIED',

  // A common lock for the device and the work profile is allowed.
  ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK = 'ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK',

  // A separate lock for the work profile is required.
  REQUIRE_SEPARATE_WORK_LOCK = 'REQUIRE_SEPARATE_WORK_LOCK',
}

// The status of the attempt to stop lost mode.
export enum Status {
  // This value is not used.
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',

  // 	Indicates that the user successfully stopped lost mode.
  ATTEMPT_SUCCEEDED = 'ATTEMPT_SUCCEEDED',

  // Indicates that the user's attempt to stop lost mode failed.
  ATTEMPT_FAILED = 'ATTEMPT_FAILED',
}

// The upgrade state of the enterprise.
export enum UpgradeState {
  // Unspecified. This value is not used.
  UPGRADE_STATE_UNSPECIFIED = 'UPGRADE_STATE_UNSPECIFIED',

  // The upgrade has succeeded.
  UPGRADE_STATE_SUCCEEDED = 'UPGRADE_STATE_SUCCEEDED',
}

// A user belonging to an enterprise.
export type User = {
  // A unique identifier you create for this user, such as user342 or asset#44418. This field must be set when the user is created and can't be updated. This field must not contain personally identifiable information (PII). This identifier must be 1024 characters or less; otherwise, the update policy request will fail.
  accountIdentifier: string;
};

export type UserFacingMessage = {
  /**
   * A map containing <locale, message> pairs, where locale is a well-formed BCP 47 language code, such as en-US, es-ES, or fr.
   * An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.
   */
  localizedMessages: Map<string, string>;

  // The default message displayed if no localized message is specified or the user's locale doesn't match with any of the localized messages. A default message must be provided if any localized messages are provided.
  defaultMessage: string;
};

// the verified boot state during Android OS startup.
export enum VerifiedBootState {
  // Unknown value.
  VERIFIED_BOOT_STATE_UNSPECIFIED = 'VERIFIED_BOOT_STATE_UNSPECIFIED',
  // Indicates that there is a full chain of trust extending from the bootloader to verified partitions including the bootloader, boot partition, and all verified partitions.
  GREEN = 'GREEN',

  // Indicates that the boot partition has been verified using the embedded certificate and the signature is valid.
  YELLOW = 'YELLOW',

  // Indicates that the device may be freely modified. Device integrity is left to the user to verify out-of-band.
  ORANGE = 'ORANGE',
}

// Flags used to control data wiping behavior when a device is deleted. By default all user data and factory reset protection data is wiped.
export enum WipeDataFlag {
  // This value is ignored.
  WIPE_DATA_FLAG_UNSPECIFIED = 'WIPE_DATA_FLAG_UNSPECIFIED',

  // Preserve the factory reset protection data on the device.
  PRESERVE_RESET_PROTECTION_DATA = 'PRESERVE_RESET_PROTECTION_DATA',

  // Additionally wipe the device's external storage (such as SD cards).
  WIPE_EXTERNAL_STORAGE = 'WIPE_EXTERNAL_STORAGE',

  // For company-owned devices, this removes all eSIMs from the device when the device is wiped.
  WIPE_ESIMS = 'WIPE_ESIMS',
}
