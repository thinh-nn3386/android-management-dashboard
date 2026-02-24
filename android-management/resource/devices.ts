/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  DefaultApplicationScope,
  DefaultApplicationType,
  ManagementMode,
  NonComplianceReason,
  Ownership,
  PasswordPolicyScope,
  PasswordRequirements,
  UserFacingMessage,
  WipeDataFlag,
} from 'android-management/types';

// A device owned by an enterprise. Unless otherwise noted, all fields are read-only and can't be modified by enterprises.devices.patch.
export type Device = {
  // The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
  name: string;

  // The resource name of the user that owns this device in the form enterprises/{enterpriseId}/users/{userId}.
  userName: string;

  // The type of management mode Android Device Policy takes on the device. This influences which policy settings are supported.
  managementMode: ManagementMode;

  // The state to be applied to the device. This field can be modified by a patch request. Note that when calling enterprises.devices.patch, ACTIVE and DISABLED are the only allowable values. To enter the device into a DELETED state, call enterprises.devices.delete.
  state: DeviceState;

  // The state currently applied to the device.
  appliedState: DeviceState;

  // Whether the device is compliant with its policy.
  policyCompliant: boolean;

  // Details about policy settings that the device is not compliant with.
  nonComplianceDetails: NonComplianceDetail[];

  // The time of device enrollment.

  // Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: "2014-10-02T15:01:23Z", "2014-10-02T15:01:23.045123456Z" or "2014-10-02T15:01:23+05:30".
  enrollmentTime: string;

  // The last time the device sent a status report.
  lastStatusReportTime: string;

  // The last time the device fetched its policy.
  lastPolicySyncTime: string;

  // The name of the policy applied to the device, in the form enterprises/{enterpriseId}/policies/{policyId}. If not specified, the policyName for the device's user is applied. This field can be modified by a patch request. You can specify only the policyId when calling enterprises.devices.patch, as long as the policyId doesn’t contain any slashes. The rest of the policy name is inferred.
  policyName: string;

  // The name of the policy currently applied to the device.
  appliedPolicyName: string;

  // The version of the policy currently applied to the device.
  appliedPolicyVersion: string;

  // The API level of the Android platform version running on the device.
  apiLevel: number;

  // If the device was enrolled with an enrollment token with additional data provided, this field contains that data.
  enrollmentTokenData: string;

  // If the device was enrolled with an enrollment token, this field contains the name of the token.
  enrollmentTokenName: string;

  // If the device state is DISABLED, an optional message that is displayed on the device indicating the reason the device is disabled. This field can be modified by a patch request.
  disabledReason: UserFacingMessage;

  // Detailed information about the device software. This information is only available if softwareInfoEnabled is true in the device's policy.
  softwareInfo: SoftwareInfo;

  // Detailed information about the device hardware.
  hardwareInfo: HardwareInfo;

  // Detailed information about displays on the device. This information is only available if displayInfoEnabled is true in the device's policy.
  displays: Display[];

  // Reports for apps installed on the device. This information is only available when applicationReportsEnabled is true in the device's policy.
  applicationReports: ApplicationReport[];

  // If the same physical device has been enrolled multiple times, this field contains its previous device names. The serial number is used as the unique identifier to determine if the same physical device has enrolled previously. The names are in chronological order.
  previousDeviceNames: string[];

  // Device network information. This information is only available if networkInfoEnabled is true in the device's policy.
  networkInfo: NetworkInfo;

  // Memory information: contains information about device memory and storage.
  memoryInfo: MemoryInfo;

  /**
   * Events related to memory and storage measurements in chronological order. This information is only available if memoryInfoEnabled is true in the device's policy.
   *
   * Events are retained for a certain period of time and old events are deleted.
   */
  memoryEvents: MemoryEvent[];

  // Power management events on the device in chronological order. This information is only available if powerManagementEventsEnabled is true in the device's policy.
  powerManagementEvents: PowerManagementEvent[];

  // Hardware status samples in chronological order. This information is only available if hardwareStatusEnabled is true in the device's policy.
  hardwareStatusSamples: HardwareStatus[];

  // Device settings information. This information is only available if deviceSettingsEnabled is true in the device's policy.
  deviceSettings: DeviceSettings;

  // The user who owns the device.
  user: {
    accountIdentifier: string;
  };

  // Map of selected system properties name and value related to the device. This information is only available if systemPropertiesEnabled is true in the device's policy.
  systemProperties: Map<string, string>;

  // Device's security posture value that reflects how secure the device is.
  securityPosture: SecurityPosture;

  // Ownership of the managed device.
  ownership: Ownership;

  // Information about Common Criteria Mode—security standards defined in the Common Criteria for Information Technology Security Evaluation (CC).
  commonCriteriaModeInfo: CommonCriteriaModeInfo;

  // The password requirements currently applied to the device.
  appliedPasswordPolicies: PasswordRequirements[];

  // Output only. Information related to whether this device was migrated from being managed by another Device Policy Controller (DPC).
  dpcMigrationInfo: DpcMigrationInfo;

  // Output only. The default application information for the DefaultApplicationType.
  defaultApplicationInfo: DefaultApplicationInfo[];
};

// States that may be applied to a device.
export enum DeviceState {
  // This value is disallowed.
  DEVICE_STATE_UNSPECIFIED = 'DEVICE_STATE_UNSPECIFIED',

  // The device is active.
  ACTIVE = 'ACTIVE',

  // The device is disabled.
  DISABLED = 'DISABLED',

  // The device was deleted. This state is never returned by an API call, but is used in the final status report when the device acknowledges the deletion. If the device is deleted via the API call, this state is published to Pub/Sub. If the user deletes the work profile or resets the device, the device state will remain unknown to the server.
  DELETED = 'DELETED',

  // The device is being provisioned. Newly enrolled devices are in this state until they have a policy applied.
  PROVISIONING = 'PROVISIONING',

  // The device is lost. This state is only possible on organization-owned devices
  LOST = 'LOST',

  // The device is preparing for migrating to Android Management API. No further action is needed for the migration to continue.
  PREPARING_FOR_MIGRATION = 'PREPARING_FOR_MIGRATION',

  // This is a financed device that has been "locked" by the financing agent. This means certain policy settings have been applied which limit device functionality until the device has been "unlocked" by the financing agent. The device will continue to apply policy settings excluding those overridden by the financing agent. When the device is "locked", the state is reported in appliedState as DEACTIVATED_BY_DEVICE_FINANCE.
  DEACTIVATED_BY_DEVICE_FINANCE = 'DEACTIVATED_BY_DEVICE_FINANCE',
}

// Provides detail about non-compliance with a policy setting.
export type NonComplianceDetail = {
  // The name of the policy setting. This is the JSON field name of a top-level Policy field.
  settingName: string;

  // The reason the device is not in compliance with the setting.
  nonComplianceReason: NonComplianceReason;

  // The package name indicating which app is out of compliance, if applicable.
  packageName: string;

  // For settings with nested fields, if a particular nested field is out of compliance, this specifies the full path to the offending field. The path is formatted in the same way the policy JSON field would be referenced in JavaScript, that is: 1) For object-typed fields, the field name is followed by a dot then by a subfield name. 2) For array-typed fields, the field name is followed by the array index enclosed in brackets.
  fieldPath: string;

  // If the policy setting could not be applied, the current value of the setting on the device.
  currentValue: any;

  // If packageName is set and the non-compliance reason is APP_NOT_INSTALLED or APP_NOT_UPDATED, the detailed reason the app can't be installed or updated.
  installationFailureReason: InstallationFailureReason;

  // The policy-specific reason the device is not in compliance with the setting.
  specificNonComplianceReason: SpecificNonComplianceReason;

  // Additional context for specificNonComplianceReason.
  specificNonComplianceContext: SpecificNonComplianceContext;
};

// Reasons an app installation might fail.
export enum InstallationFailureReason {
  // This value is disallowed.
  INSTALLATION_FAILURE_REASON_UNSPECIFIED = 'INSTALLATION_FAILURE_REASON_UNSPECIFIED',

  // An unknown condition is preventing the app from being installed. Some potential reasons are that the device doesn't have enough storage, the device network connection is unreliable, or the installation is taking longer than expected. The installation will be retried automatically.
  INSTALLATION_FAILURE_REASON_UNKNOWN = 'INSTALLATION_FAILURE_REASON_UNKNOWN',

  // The installation is still in progress.
  IN_PROGRESS = 'IN_PROGRESS',

  // The app was not found in Play.
  NOT_FOUND = 'NOT_FOUND',

  // The app is incompatible with the device.
  NOT_COMPATIBLE_WITH_DEVICE = 'NOT_COMPATIBLE_WITH_DEVICE',

  // 	The app has not been approved by the admin.
  NOT_APPROVED = 'NOT_APPROVED',

  // The user has not accepted all the permissions required by the app.
  PERMISSIONS_NOT_ACCEPTED = 'PERMISSIONS_NOT_ACCEPTED',

  // The app is not available in the user's country.
  NOT_AVAILABLE_IN_COUNTRY = 'NOT_AVAILABLE_IN_COUNTRY',

  // There are no licenses available to assign to the user.
  NO_LICENSES_REMAINING = 'NO_LICENSES_REMAINING',

  // The enterprise is no longer enrolled with Managed Google Play or the admin has not accepted the latest Managed Google Play Terms of Service.
  NOT_ENROLLED = 'NOT_ENROLLED',

  // The user is no longer valid. The user may have been deleted or disabled.
  USER_INVALID = 'USER_INVALID',

  // A network error on the user's device has prevented the install from succeeding. This usually happens when the device's internet connectivity is degraded, unavailable or there's a network configuration issue.
  NETWORK_ERROR_UNRELIABLE_CONNECTION = 'NETWORK_ERROR_UNRELIABLE_CONNECTION',

  // The user's device does not have sufficient storage space to install the app. This can be resolved by clearing up storage space on the device. App install or update will automatically resume once the device has sufficient storage.
  INSUFFICIENT_STORAGE = 'INSUFFICIENT_STORAGE',
}

// More details for the reason a device might not be compliant with a policy setting. New values can be added to the enum in the future.
export enum SpecificNonComplianceReason {
  SPECIFIC_NON_COMPLIANCE_REASON_UNSPECIFIED = 'SPECIFIC_NON_COMPLIANCE_REASON_UNSPECIFIED',
  PASSWORD_POLICIES_USER_CREDENTIALS_CONFIRMATION_REQUIRED = 'PASSWORD_POLICIES_USER_CREDENTIALS_CONFIRMATION_REQUIRED',
  PASSWORD_POLICIES_PASSWORD_EXPIRED = 'PASSWORD_POLICIES_PASSWORD_EXPIRED',
  PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT = 'PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT',
  ONC_WIFI_INVALID_VALUE = 'ONC_WIFI_INVALID_VALUE',
  ONC_WIFI_API_LEVEL = 'ONC_WIFI_API_LEVEL',
  ONC_WIFI_INVALID_ENTERPRISE_CONFIG = 'ONC_WIFI_INVALID_ENTERPRISE_CONFIG',
  ONC_WIFI_USER_SHOULD_REMOVE_NETWORK = 'ONC_WIFI_USER_SHOULD_REMOVE_NETWORK',
  ONC_WIFI_KEY_PAIR_ALIAS_NOT_CORRESPONDING_TO_EXISTING_KEY = 'ONC_WIFI_KEY_PAIR_ALIAS_NOT_CORRESPONDING_TO_EXISTING_KEY',
  PERMISSIBLE_USAGE_RESTRICTION = 'PERMISSIBLE_USAGE_RESTRICTION',
  REQUIRED_ACCOUNT_NOT_IN_ENTERPRISE = 'REQUIRED_ACCOUNT_NOT_IN_ENTERPRISE',
  DEFAULT_APPLICATION_SETTING_UNSUPPORTED_SCOPES = 'DEFAULT_APPLICATION_SETTING_UNSUPPORTED_SCOPES',
  DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE = 'DEFAULT_APPLICATION_SETTING_FAILED_FOR_SCOPE',
  NEW_ACCOUNT_NOT_IN_EPRIVATE_DNS_HOST_NOT_SERVINGNTERPRISE = 'PRIVATE_DNS_HOST_NOT_SERVING',
  NEW_ACCOUNT_NOT_IN_ENTERPRISE = 'NEW_ACCOUNT_NOT_IN_ENTERPRISE',
}

// Additional context for SpecificNonComplianceReason.
export type SpecificNonComplianceContext = {
  // Additional context for non-compliance related to Wi-Fi configuration.
  oncWifiContext: OncWifiContext;

  // Additional context for non-compliance related to password policies.
  passwordPoliciesContext: PasswordPoliciesContext;

  // Output only. Additional context for non-compliance related to default application settings.
  defaultApplicationContext: DefaultApplicationContext;
};

// Additional context for non-compliance related to Wi-Fi configuration.
export type OncWifiContext = {
  // The GUID of non-compliant Wi-Fi configuration.
  wifiGuid: string;
};

// Additional context for non-compliance related to password policies.
export type PasswordPoliciesContext = {
  // the scope of non-compliant password.
  passwordPolicyScope: PasswordPolicyScope;
};

// Additional context for non-compliance related to default application settings.
export type DefaultApplicationContext = {
  // Output only. The scope of non-compliant default application setting.
  defaultApplicationScope: DefaultApplicationScope;
};

// Information about device software.
export type SoftwareInfo = {
  // The user-visible Android version string. For example, 6.0.1.
  androidVersion: string;

  // The Android Device Policy app version code.
  androidDevicePolicyVersionCode: number;

  // The Android Device Policy app version as displayed to the user.
  androidDevicePolicyVersionName: string;

  // Android build ID string meant for displaying to the user. For example, shamu-userdebug 6.0.1 MOB30I 2756745 dev-keys.
  androidBuildNumber: string;

  // Kernel version, for example, 2.6.32.9-g103d848.
  deviceKernelVersion: string;

  // The system bootloader version number, e.g. 0.6.7.
  bootloaderVersion: string;

  // Build time.
  androidBuildTime: string;

  // Security patch level, e.g. 2016-05-01.
  securityPatchLevel: string;

  // An IETF BCP 47 language code for the primary locale on the device.
  primaryLanguageCode: string;

  // SHA-256 hash of android.content.pm.Signature associated with the system package, which can be used to verify that the system build hasn't been modified.
  deviceBuildSignature: string;

  // Information about a potential pending system update.
  systemUpdateInfo: SystemUpdateInfo;
};

// Information about a potential pending system update.
export type SystemUpdateInfo = {
  // The status of an update: whether an update exists and what type it is.
  updateStatus: UpdateStatus;

  // The time when the update was first available. A zero value indicates that this field is not set. This field is set only if an update is available (that is, updateStatus is neither UPDATE_STATUS_UNKNOWN nor UP_TO_DATE).
  updateReceivedTime: string;
};

// The status of an update: whether an update exists and what type it is.
export enum UpdateStatus {
  // It is unknown whether there is a pending system update. This happens when, for example, the device API level is less than 26, or if the version of Android Device Policy is outdated.
  UPDATE_STATUS_UNKNOWN = 'UPDATE_STATUS_UNKNOWN',
  // There is no pending system update available on the device.
  UP_TO_DATE = 'UP_TO_DATE',

  // There is a pending system update available, but its type is not known.
  UNKNOWN_UPDATE_AVAILABLE = 'UNKNOWN_UPDATE_AVAILABLE',

  // There is a pending security update available.
  SECURITY_UPDATE_AVAILABLE = 'SECURITY_UPDATE_AVAILABLE',

  // There is a pending OS update available.
  OS_UPDATE_AVAILABLE = 'OS_UPDATE_AVAILABLE',
}

// Information about device hardware. The fields related to temperature thresholds are only available if hardwareStatusEnabled is true in the device's policy.
export type HardwareInfo = {
  // Brand of the device. For example, Google.
  brand: string;

  // Name of the hardware. For example, Angler.
  hardware: string;

  // Baseband version. For example, MDM9625_104662.22.05.34p.
  deviceBasebandVersion: string;

  // Manufacturer. For example, Motorola.
  manufacturer: string;

  // The device serial number. However, for personally-owned devices running Android 12 and above, this is the same as the enterpriseSpecificId.
  serialNumber: string;

  // The model of the device. For example, Asus Nexus 7.
  model: string;

  // Battery shutdown temperature thresholds in Celsius for each battery on the device.
  batteryShutdownTemperatures: number[];

  // Battery throttling temperature thresholds in Celsius for each battery on the device.
  batteryThrottlingTemperatures: number[];

  // CPU shutdown temperature thresholds in Celsius for each CPU on the device.
  cpuShutdownTemperatures: number[];

  // CPU throttling temperature thresholds in Celsius for each CPU on the device.
  cpuThrottlingTemperatures: number[];

  // GPU shutdown temperature thresholds in Celsius for each GPU on the device.
  gpuShutdownTemperatures: number[];

  // GPU throttling temperature thresholds in Celsius for each GPU on the device.
  gpuThrottlingTemperatures: number[];

  // Device skin shutdown temperature thresholds in Celsius.
  skinShutdownTemperatures: number[];

  // Device skin throttling temperature thresholds in Celsius.
  skinThrottlingTemperatures: number[];

  // Output only. ID that uniquely identifies a personally-owned device in a particular organization. On the same physical device when enrolled with the same organization, this ID persists across setups and even factory resets. This ID is available on personally-owned devices with a work profile on devices running Android 12 and above.
  enterpriseSpecificId: string;

  // Output only. Information related to the eUICC chip.
  euiccChipInfo: {
    //  The Embedded Identity Document (EID) that identifies the eUICC chip for each eUICC chip on the device. This is available on company owned devices running Android 13 and above.
    eid: string;
  }[];
};

// Device display information.
export type Display = {
  // Name of the display.
  name: string;

  // Unique display id.
  displayId: number;

  // Refresh rate of the display in frames per second.
  refreshRate: number;

  // State of the display.
  state: DisplayState;

  // Display width in pixels.
  width: number;

  // Display height in pixels.
  height: number;

  // Display density expressed as dots-per-inch.
  density: number;
};

// The state of a display.
export enum DisplayState {
  // This value is disallowed.
  DISPLAY_STATE_UNSPECIFIED = 'DISPLAY_STATE_UNSPECIFIED',

  // 	Display is off.
  OFF = 'OFF',

  // Display is on.
  ON = 'ON',

  // Display is dozing in a low power state
  DOZE = 'DOZE',

  // Display is dozing in a suspended low power state.
  SUSPENDED = 'SUSPENDED',
}

// Information reported about an installed app.
export type ApplicationReport = {
  // Package name of the app.
  packageName: string;

  // The app version as displayed to the user.
  versionName: string;

  // The app version code, which can be used to determine whether one version is more recent than another.
  versionCode: number;

  // The list of app events which have occurred in the last 30 hours.
  events: ApplicationEvent[];

  // The display name of the app.
  displayName: string;

  // The SHA-256 hash of the app's APK file, which can be used to verify the app hasn't been modified. Each byte of the hash value is represented as a two-digit hexadecimal number.
  packageSha256Hash: string;

  // The SHA-1 hash of each android.content.pm.Signature associated with the app package. Each byte of each hash value is represented as a two-digit hexadecimal number.
  signingKeyCertFingerprints: string[];

  // The package name of the app that installed this app.
  installerPackageName: string;

  // The source of the package.
  applicationSource: ApplicationSource;

  // Application state.
  state: ApplicationState;

  // List of keyed app states reported by the app.
  keyedAppStates: KeyedAppState[];

  // Whether the app is user facing.
  userFacingType: UserFacingType;
};

// An app-related event.
export type ApplicationEvent = {
  // App event type.
  eventType: ApplicationEventType;

  // The creation time of the event.
  createTime: string;
};

// A type of app-related event.
export enum ApplicationEventType {
  // This value is disallowed.
  APPLICATION_EVENT_TYPE_UNSPECIFIED = 'APPLICATION_EVENT_TYPE_UNSPECIFIED',

  // The app was installed.
  INSTALLED = 'INSTALLED',

  // The app was changed, for example, a component was enabled or disabled.
  CHANGED = 'CHANGED',

  // The app data was cleared.
  DATA_CLEARED = 'DATA_CLEARED',

  // The app was removed.
  REMOVED = 'REMOVED',

  // A new version of the app has been installed, replacing the old version.
  REPLACED = 'REPLACED',

  // The app was restarted.
  RESTARTED = 'RESTARTED',

  // The app was pinned to the foreground.
  PINNED = 'PINNED',

  // The app was unpinned.
  UNPINNED = 'UNPINNED',
}

// The source that provided an app.
export enum ApplicationSource {
  // The app was sideloaded from an unspecified source.
  APPLICATION_SOURCE_UNSPECIFIED = 'APPLICATION_SOURCE_UNSPECIFIED',

  // This is a system app from the device's factory image.
  SYSTEM_APP_FACTORY_VERSION = 'SYSTEM_APP_FACTORY_VERSION',

  // This is an updated system app.
  SYSTEM_APP_UPDATED_VERSION = 'SYSTEM_APP_UPDATED_VERSION',

  // The app was installed from the Google Play Store.
  INSTALLED_FROM_PLAY_STORE = 'INSTALLED_FROM_PLAY_STORE',

  // The app was installed using the AMAPI SDK command.
  CUSTOM = 'CUSTOM',
}

// The current installation status.
export enum ApplicationState {
  // App state is unspecified
  APPLICATION_STATE_UNSPECIFIED = 'APPLICATION_STATE_UNSPECIFIED',

  // App was removed from the device
  REMOVED = 'REMOVED',

  // App is installed on the device
  INSTALLED = 'INSTALLED',
}

// Keyed app state reported by the app.
export type KeyedAppState = {
  // The key for the app state. Acts as a point of reference for what the app is providing state for. For example, when providing managed configuration feedback, this key could be the managed configuration key.
  key: string;

  // The severity of the app state.
  severity: Severity;

  // Optionally, a free-form message string to explain the app state. If the state was triggered by a particular value (e.g. a managed configuration value), it should be included in the message.
  message: string;

  // Optionally, a machine-readable value to be read by the EMM. For example, setting values that the admin can choose to query against in the EMM console (e.g. “notify me if the battery_warning data < 10”).
  data: string;

  // The creation time of the app state on the device.
  createTime: string;

  // The time the app state was most recently updated.
  lastUpdateTime: string;
};

// The severity of the app state.
export enum Severity {
  // Unspecified severity level.
  SEVERITY_UNSPECIFIED = 'SEVERITY_UNSPECIFIED',

  // Information severity level.
  INFO = 'INFO',

  // Error severity level. This should only be set for genuine error conditions that a management organization needs to take action to fix.
  ERROR = 'ERROR',
}

// Whether the app is user facing.
export enum UserFacingType {
  // App user facing type is unspecified.
  USER_FACING_TYPE_UNSPECIFIED = 'USER_FACING_TYPE_UNSPECIFIED',

  // App is not user facing.
  NOT_USER_FACING = 'NOT_USER_FACING',

  // App is user facing.
  USER_FACING = 'USER_FACING',
}

export type NetworkInfo = {
  // IMEI number of the GSM device. For example, A1000031212.
  imei: string;

  // MEID number of the CDMA device. For example, A00000292788E1.
  meid: string;

  // Wi-Fi MAC address of the device. For example, 7c:11:11:11:11:11.
  wifiMacAddress: string;

  // Provides telephony information associated with each SIM card on the device. Only supported on fully managed devices starting from Android 6.
  telephonyInfos: TelephonyInfo[];
};

// Telephony information associated with a given SIM card on the device. This is supported for all SIM cards on fully managed devices on Android 6 and above. In addition, this is supported for admin-added eSIMs on all devices for Android 15 and above.
export type TelephonyInfo = {
  // The phone number associated with this SIM card.
  phoneNumber: string;

  // The carrier name associated with this SIM card.
  carrierName: string;

  // Output only. The ICCID associated with this SIM card.
  iccId: string;

  // Output only. Activation state of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always ACTIVATION_STATE_UNSPECIFIED for physical SIMs and for devices below Android 15.
  activationState: ActivationState;

  // Output only. The configuration mode of the SIM card on the device. This is applicable for eSIMs only. This is supported on all devices for Android 15 and above. This is always CONFIG_MODE_UNSPECIFIED for physical SIMs and for devices below Android 15.
  configMode: ConfigMode;
};

// Activation state of the SIM card on the device.
export enum ActivationState {
  ACTIVATION_STATE_UNSPECIFIED = 'ACTIVATION_STATE_UNSPECIFIED',
  ACTIVATED = 'ACTIVATED',
  NOT_ACTIVATED = 'NOT_ACTIVATED',
}

// The configuration mode of the SIM card on the device.
export enum ConfigMode {
  CONFIG_MODE_UNSPECIFIED = 'CONFIG_MODE_UNSPECIFIED',
  ADMIN_CONFIGURED = 'ADMIN_CONFIGURED',
  USER_CONFIGURED = 'USER_CONFIGURED',
}

// Information about device memory and storage.
export type MemoryInfo = {
  // Total RAM on device in bytes. (int64 format)
  totalRam: string;

  // Total internal storage on device in bytes. (int64 format)
  totalInternalStorage: string;
};

// An event related to memory and storage measurements.
// To distinguish between new and old events, we recommend using the createTime field.
export type MemoryEvent = {
  // Event type.
  eventType: MemoryEventType;

  // The creation time of the event.
  createTime: string;

  // The number of free bytes in the medium, or for EXTERNAL_STORAGE_DETECTED, the total capacity in bytes of the storage medium.
  byteCount: string;
};

// The type of event.
export enum MemoryEventType {
  // Unspecified. No events have this type.
  MEMORY_EVENT_TYPE_UNSPECIFIED = 'MEMORY_EVENT_TYPE_UNSPECIFIED',

  // Free space in RAM was measured.
  RAM_MEASURED = 'RAM_MEASURED',

  // Free space in internal storage was measured.
  INTERNAL_STORAGE_MEASURED = 'INTERNAL_STORAGE_MEASURED',

  // A new external storage medium was detected. The reported byte count is the total capacity of the storage medium.
  EXTERNAL_STORAGE_DETECTED = 'EXTERNAL_STORAGE_DETECTED',

  // An external storage medium was removed. The reported byte count is zero.
  EXTERNAL_STORAGE_REMOVED = 'EXTERNAL_STORAGE_REMOVED',

  // Free space in external storage was measured.
  EXTERNAL_STORAGE_MEASURED = 'EXTERNAL_STORAGE_MEASURED',
}

// A power management event.
export type PowerManagementEvent = {
  // Event type.
  eventType: PowerManagementEventType;

  // The creation time of the event.
  createTime: string;

  // For BATTERY_LEVEL_COLLECTED events, the battery level as a percentage.
  batteryLevel: number;
};

export enum PowerManagementEventType {
  // Unspecified. No events have this type.
  POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED = 'POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED',

  // Battery level was measured.
  BATTERY_LEVEL_COLLECTED = 'BATTERY_LEVEL_COLLECTED',

  // Power was connected to the device.
  POWER_CONNECTED = 'POWER_CONNECTED',

  // Power was disconnected from the device.
  POWER_DISCONNECTED = 'POWER_DISCONNECTED',

  // Battery level is low.
  BATTERY_LOW = 'BATTERY_LOW',

  // Battery level is okay.
  BATTERY_OKAY = 'BATTERY_OKAY',

  // The device has completed booting.
  BOOT_COMPLETED = 'BOOT_COMPLETED',

  // The device is shutting down.
  SHUTDOWN = 'SHUTDOWN',
}

// Hardware status. Temperatures may be compared to the temperature thresholds available in hardwareInfo to determine hardware health
export type HardwareStatus = {
  // The time the measurements were taken.
  createTime: string;

  // Current battery temperatures in Celsius for each battery on the device.
  batteryTemperatures: number[];

  // Current CPU temperatures in Celsius for each CPU on the device.
  cpuTemperatures: number[];

  // Current GPU temperatures in Celsius for each GPU on the device.
  gpuTemperatures: number[];

  // Current device skin temperatures in Celsius.
  skinTemperatures: number[];

  // Fan speeds in RPM for each fan on the device. Empty array means that there are no fans or fan speed is not supported on the system.
  fanSpeeds: number[];

  // CPU usages in percentage for each core available on the device. Usage is 0 for each unplugged core. Empty array implies that CPU usage is not supported in the system.
  cpuUsages: number[];
};

// Information about security related device settings on device.
export type DeviceSettings = {
  // Whether the device is secured with PIN/password.
  isDeviceSecure: boolean;

  // Whether installing apps from unknown sources is enabled.
  unknownSourcesEnabled: boolean;

  // Whether developer mode is enabled on the device.
  developmentSettingsEnabled: boolean;

  // Whether ADB is enabled on the device.
  adbEnabled: boolean;

  // Whether the storage encryption is enabled.
  isEncrypted: boolean;

  // Encryption status from DevicePolicyManager.
  encryptionStatus: EncryptionStatus;

  // Whether Google Play Protect verification is enforced on the device.
  verifyAppsEnabled: boolean;
};

// Encryption status of a device.
export enum EncryptionStatus {
  // Unspecified. No device should have this type.
  ENCRYPTION_STATUS_UNSPECIFIED = 'ENCRYPTION_STATUS_UNSPECIFIED',

  // Encryption is not supported by the device.
  UNSUPPORTED = 'UNSUPPORTED',

  // Encryption is supported by the device, but is not currently active.
  INACTIVE = 'INACTIVE',

  // Encryption is not currently active, but is currently being activated.
  ACTIVATING = 'ACTIVATING',

  // Encryption is active.
  ACTIVE = 'ACTIVE',

  // Encryption is active, but an encryption key is not set by the user.
  ACTIVE_DEFAULT_KEY = 'ACTIVE_DEFAULT_KEY',

  // Encryption is active, and the encryption key is tied to the user profile.
  ACTIVE_PER_USER = 'ACTIVE_PER_USER',
}

// The security posture of the device, as determined by the current device state and the policies applied.
export type SecurityPosture = {
  // Device's security posture value.
  devicePosture: DevicePosture;

  // Additional details regarding the security posture of the device.
  postureDetails: PostureDetail[];
};

// Possible security posture values of a device under management.
export enum DevicePosture {
  // Unspecified. There is no posture detail for this posture value.
  POSTURE_UNSPECIFIED = 'POSTURE_UNSPECIFIED',

  // This device is secure.
  SECURE = 'SECURE',

  // 	This device may be more vulnerable to malicious actors than is recommended for use with corporate data.
  AT_RISK = 'AT_RISK',

  // This device may be compromised and corporate data may be accessible to unauthorized actors.
  POTENTIALLY_COMPROMISED = 'POTENTIALLY_COMPROMISED',
}

// Additional details regarding the security posture of the device.
export type PostureDetail = {
  // A specific security risk that negatively affects the security posture of the device.
  securityRisk: SecurityRisk;

  // Corresponding admin-facing advice to mitigate this security risk and improve the security posture of the device.
  advice: UserFacingMessage[];
};

// The risk that makes the device not in the most secure state.
export enum SecurityRisk {
  // Unspecified.
  SECURITY_RISK_UNSPECIFIED = 'SECURITY_RISK_UNSPECIFIED',

  // Play Integrity API detects that the device is running an unknown OS (basicIntegrity check succeeds but ctsProfileMatch fails).
  UNKNOWN_OS = 'UNKNOWN_OS',

  // Play Integrity API detects that the device is running a compromised OS (basicIntegrity check fails).
  COMPROMISED_OS = 'COMPROMISED_OS',

  // Play Integrity API detects that the device's hardware-backed evaluation failed.
  HARDWARE_BACKED_EVALUATION_FAILED = 'HARDWARE_BACKED_EVALUATION_FAILED',
}

// Information about Common Criteria Mode—security standards defined in the Common Criteria for Information Technology Security Evaluation (CC).
export type CommonCriteriaModeInfo = {
  // Whether Common Criteria Mode is enabled.
  commonCriteriaModeStatus: CommonCriteriaModeStatus;

  // Output only. The status of policy signature verification.
  policySignatureVerificationStatus: PolicySignatureVerificationStatus;
};

// Whether Common Criteria Mode is enabled.
export enum CommonCriteriaModeStatus {
  // Unknown status.
  COMMON_CRITERIA_MODE_STATUS_UNKNOWN = 'COMMON_CRITERIA_MODE_STATUS_UNKNOWN',

  // Common Criteria Mode is currently disabled.
  COMMON_CRITERIA_MODE_DISABLED = 'COMMON_CRITERIA_MODE_DISABLED',

  // Common Criteria Mode is currently enabled.
  COMMON_CRITERIA_MODE_ENABLED = 'COMMON_CRITERIA_MODE_ENABLED',
}

// The status of policy signature verification.
export enum PolicySignatureVerificationStatus {
  // Unspecified. The verification status has not been reported. This is set only if statusReportingSettings.commonCriteriaModeEnabled is false.
  POLICY_SIGNATURE_VERIFICATION_STATUS_UNSPECIFIED = 'POLICY_SIGNATURE_VERIFICATION_STATUS_UNSPECIFIED',

  // Policy signature verification is disabled on the device as commonCriteriaMode is set to false.
  POLICY_SIGNATURE_VERIFICATION_DISABLED = 'POLICY_SIGNATURE_VERIFICATION_DISABLED',

  // Policy signature verification succeeded.
  POLICY_SIGNATURE_VERIFICATION_SUCCEEDED = 'POLICY_SIGNATURE_VERIFICATION_SUCCEEDED',

  // Policy signature verification is not supported, e.g. because the device has been enrolled with a CloudDPC version that does not support the policy signature verification.
  POLICY_SIGNATURE_VERIFICATION_NOT_SUPPORTED = 'POLICY_SIGNATURE_VERIFICATION_NOT_SUPPORTED',

  // The policy signature verification failed. The policy has not been applied.
  POLICY_SIGNATURE_VERIFICATION_FAILED = 'POLICY_SIGNATURE_VERIFICATION_FAILED',
}

// Information related to whether this device was migrated from being managed by another Device Policy Controller (DPC).
export type DpcMigrationInfo = {
  // Output only. If this device was migrated from another DPC, this is its package name. Not populated otherwise.
  previousDpc: string;

  // Output only. If this device was migrated from another DPC, the additionalData field of the migration token is populated here.
  additionalData: string;
};

// The default application information for a specific DefaultApplicationType.
export type DefaultApplicationInfo = {
  // Output only. The default application type.
  defaultApplicationType: DefaultApplicationType;

  // Output only. The package name of the current default application.
  packageName: string;

  // Output only. Details on the default application setting attempts, in the same order as listed in defaultApplications.
  defaultApplicationSettingAttempts: DefaultApplicationSettingAttempt[];
};

// Details on a default application setting attempt.
export type DefaultApplicationSettingAttempt = {
  // Output only. The package name of the attempted application.
  packageName: string;

  // Output only. The outcome of setting the app as the default.
  attemptOutcome: AttemptOutcome;
};

// The outcome of setting the app as the default.
export enum AttemptOutcome {
  // Attempt outcome is unspecified. This is not used.
  ATTEMPT_OUTCOME_UNSPECIFIED = 'ATTEMPT_OUTCOME_UNSPECIFIED',

  // App is successfully set as the default.
  SUCCESS = 'SUCCESS',

  // Attempt failed as the app is not installed.
  APP_NOT_INSTALLED = 'APP_NOT_INSTALLED',

  // Attempt failed as the signing key certificate fingerprint of the app from Play Store or from ApplicationPolicy.signingKeyCerts does not match the one on the device.
  APP_SIGNING_CERT_MISMATCH = 'APP_SIGNING_CERT_MISMATCH',

  // 	Attempt failed due to other reasons.
  OTHER_FAILURE = 'OTHER_FAILURE',
}

export type Command = {
  // The type of the command.
  type: CommandType;

  // The timestamp at which the command was created. The timestamp is automatically generated by the server.
  createTime: string;

  // The duration for which the command is valid. The command will expire if not executed by the device during this time. The default duration if unspecified is ten minutes. There is no maximum duration.
  // A duration in seconds with up to nine fractional digits, ending with 's'. Example: "3.5s".
  duration: string;

  // The resource name of the user that owns the device in the form enterprises/{enterpriseId}/users/{userId}. This is automatically generated by the server based on the device the command is sent to.
  userName: string;

  // If the command failed, an error code explaining the failure. This is not set when the command is cancelled by the caller. For reasoning about command errors, prefer fields in the following order (most preferred first): 1. Command-specific fields like clearAppsDataStatus, startLostModeStatus, or similar, if they exist. 2. This field, if set. 3. The generic error field in the Operation that wraps the command.
  errorCode: CommandErrorCode;

  // For commands of type RESET_PASSWORD, optionally specifies the new password. Note: The new password must be at least 6 characters long if it is numeric in case of Android 14 devices. Else the command will fail with INVALID_VALUE.
  newPassword: string;

  // For commands of type RESET_PASSWORD, optionally specifies flags.
  resetPasswordFlags: ResetPasswordFlag[];

  // Union field params can be only one of the following:
  clearAppsDataParams?: ClearAppsDataParams;
  startLostModeParams?: StartLostModeParams;
  stopLostModeParams?: StopLostModeParams;
  addEsimParams?: AddEsimParams;
  removeEsimParams?: RemoveEsimParams;
  requestDeviceInfoParams?: RequestDeviceInfoParams;
  wipeParams?: WipeParams;
  // End of list of possible types for union field params.

  // Union field status can be only one of the following:
  clearAppsDataStatus?: ClearAppsDataStatus;
  startLostModeStatus?: StartLostModeStatus;
  stopLostModeStatus?: StopLostModeStatus;
  requestDeviceInfoStatus?: RequestDeviceInfoStatus;
  // End of list of possible types for union field status.
};

export enum CommandType {
  COMMAND_TYPE_UNSPECIFIED = 'COMMAND_TYPE_UNSPECIFIED',
  LOCK = 'LOCK',
  RESET_PASSWORD = 'RESET_PASSWORD',
  REBOOT = 'REBOOT',
  RELINQUISH_OWNERSHIP = 'RELINQUISH_OWNERSHIP',
  CLEAR_APP_DATA = 'CLEAR_APP_DATA',
  START_LOST_MODE = 'START_LOST_MODE',
  STOP_LOST_MODE = 'STOP_LOST_MODE',
  ADD_ESIM = 'ADD_ESIM',
  REMOVE_ESIM = 'REMOVE_ESIM',
  REQUEST_DEVICE_INFO = 'REQUEST_DEVICE_INFO',
  WIPE = 'WIPE',
}

export enum CommandErrorCode {
  COMMAND_ERROR_CODE_UNSPECIFIED = 'COMMAND_ERROR_CODE_UNSPECIFIED',
  UNKNOWN = 'UNKNOWN',
  API_LEVEL = 'API_LEVEL',
  MANAGEMENT_MODE = 'MANAGEMENT_MODE',
  INVALID_VALUE = 'INVALID_VALUE',
  UNSUPPORTED = 'UNSUPPORTED',
}

export enum ResetPasswordFlag {
  RESET_PASSWORD_FLAG_UNSPECIFIED = 'RESET_PASSWORD_FLAG_UNSPECIFIED',
  REQUIRE_ENTRY = 'REQUIRE_ENTRY',
  DO_NOT_ASK_CREDENTIALS_ON_BOOT = 'DO_NOT_ASK_CREDENTIALS_ON_BOOT',
  LOCK_NOW = 'LOCK_NOW',
}

export type ClearAppsDataParams = {
  packageNames: string[];
};

export type StartLostModeParams = {
  lostMessage: UserFacingMessage;
  lostPhoneNumber: UserFacingMessage;
  lostEmailAddress: UserFacingMessage;
  lostStreetAddress: UserFacingMessage;
  lostOrganization: UserFacingMessage;
};

export type StopLostModeParams = {
  // no fields
};

export type AddEsimParams = {
  activationCode: string;
  activationState: ActivationState;
};

export type RemoveEsimParams = {
  iccId: string;
};

export type RequestDeviceInfoParams = {
  deviceInfo: DeviceInfo;
};

export enum DeviceInfo {
  DEVICE_INFO_UNSPECIFIED = 'DEVICE_INFO_UNSPECIFIED',
  EID = 'EID',
}

export type WipeParams = {
  wipeDataFlags: WipeDataFlag[];
  wipeReason: UserFacingMessage;
};

export type ClearAppsDataStatus = {
  results: Map<string, PerAppResult>;
};

export type PerAppResult = {
  clearingResult: ClearingResult;
};

export enum ClearingResult {
  CLEARING_RESULT_UNSPECIFIED = 'CLEARING_RESULT_UNSPECIFIED',
  SUCCESS = 'SUCCESS',
  APP_NOT_FOUND = 'APP_NOT_FOUND',
  APP_PROTECTED = 'APP_PROTECTED',
  API_LEVEL = 'API_LEVEL',
}

export type StartLostModeStatus = {
  status: StartLostStatus;
};

enum StartLostStatus {
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
  SUCCESS = 'SUCCESS',
  RESET_PASSWORD_RECENTLY = 'RESET_PASSWORD_RECENTLY',
  USER_EXIT_LOST_MODE_RECENTLY = 'USER_EXIT_LOST_MODE_RECENTLY',
  ALREADY_IN_LOST_MODE = 'ALREADY_IN_LOST_MODE',
}

export type StopLostModeStatus = {
  status: StopLostStatus;
};

enum StopLostStatus {
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
  SUCCESS = 'SUCCESS',
  NOT_IN_LOST_MODE = 'NOT_IN_LOST_MODE',
}

export type RequestDeviceInfoStatus = {
  status: RequestDeviceStatus;

  // Union field device_info can be only one of the following:
  eidInfo?: EidInfo;
};

enum RequestDeviceStatus {
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
  SUCCEEDED = 'SUCCEEDED',
  PENDING_USER_ACTION = 'PENDING_USER_ACTION',
  USER_DECLINED = 'USER_DECLINED',
  UNSUPPORTED = 'UNSUPPORTED',
}

type EidInfo = {
  eids: Eid[];
};

type Eid = {
  eid: string;
};
