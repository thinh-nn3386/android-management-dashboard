/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
  DefaultApplicationScope,
  DefaultApplicationType,
  PasswordRequirements,
  UserFacingMessage,
  WipeDataFlag,
} from 'android-management/types';
import type { DeviceSettings } from './devices';

// A policy resource represents a group of settings that govern the behavior of a managed device and the apps installed on it.
export type Policy = {
  // The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
  name: string;

  // The version of the policy. This is a read-only field. The version is incremented each time the policy is updated.
  version: string;

  // Policy applied to apps. This can have at most 3,000 elements.
  applications: ApplicationPolicy[];

  // Maximum time in milliseconds for user activity until the device locks. A value of 0 means there is no restriction.
  maximumTimeToLock: string;

  // Whether screen capture is disabled.
  screenCaptureDisabled: boolean;

  // Disabled keyguard customizations, such as widgets.
  keyguardDisabledFeatures: KeyguardDisabledFeature[];

  // The default permission policy for runtime permission requests.
  defaultPermissionPolicy: PermissionPolicy;

  // Default intent handler activities.
  persistentPreferredActivities: PersistentPreferredActivity[];

  // Network configuration for the device. See configure networks for more information.
  openNetworkConfiguration: any;

  // The system update policy, which controls how OS updates are applied. If the update type is WINDOWED, the update window will automatically apply to Play app updates as well.
  systemUpdate: SystemUpdate;

  // Account types that can't be managed by the user.
  accountTypesWithManagementDisabled: string[];

  // Whether adding new users and profiles is disabled. For devices where managementMode is DEVICE_OWNER this field is ignored and the user is never allowed to add or remove users.
  addUserDisabled: boolean;

  // Whether adjusting the master volume is disabled. Also mutes the device. The setting has effect only on fully managed devices.
  adjustVolumeDisabled: boolean;

  // Whether factory resetting from settings is disabled.
  factoryResetDisabled: boolean;

  // Whether user installation of apps is disabled.
  installAppsDisabled: boolean;

  // Whether the user mounting physical external media is disabled.
  mountPhysicalMediaDisabled: boolean;

  // Whether adding or removing accounts is disabled.
  modifyAccountsDisabled: boolean;

  // Whether user uninstallation of applications is disabled. This prevents apps from being uninstalled, even those removed using applications
  uninstallAppsDisabled: boolean;

  // If true, this disables the Lock Screen for primary and/or secondary displays. This policy is supported only in dedicated device management mode.
  keyguardDisabled: boolean;

  // The minimum allowed Android API level.
  minimumApiLevel: number;

  // Status reporting settings
  statusReportingSettings: StatusReportingSettings;

  // Whether bluetooth contact sharing is disabled.
  bluetoothContactSharingDisabled: boolean;

  // A message displayed to the user in the settings screen wherever functionality has been disabled by the admin. If the message is longer than 200 characters it may be truncated.
  shortSupportMessage: UserFacingMessage;

  // A message displayed to the user in the device administators settings screen.
  longSupportMessage: UserFacingMessage;

  // Whether configuring bluetooth is disabled.
  bluetoothConfigDisabled: boolean;

  // Whether configuring cell broadcast is disabled.
  cellBroadcastsConfigDisabled: boolean;

  // Whether configuring user credentials is disabled.
  credentialsConfigDisabled: boolean;

  // Whether configuring mobile networks is disabled.
  mobileNetworksConfigDisabled: boolean;

  // Whether configuring VPN is disabled.
  vpnConfigDisabled: boolean;

  // Whether creating windows besides app windows is disabled.
  createWindowsDisabled: boolean;

  // Whether resetting network settings is disabled.
  networkResetDisabled: boolean;

  // Whether using NFC to beam data from apps is disabled.
  outgoingBeamDisabled: boolean;

  // Whether outgoing calls are disabled.
  outgoingCallsDisabled: boolean;

  // Whether removing other users is disabled.
  removeUserDisabled: boolean;

  // Whether location sharing is disabled.
  shareLocationDisabled: boolean;

  // Whether sending and receiving SMS messages is disabled.
  smsDisabled: boolean;

  // If present, only the input methods provided by packages in this list are permitted. If this field is present, but the list is empty, then only system input methods are permitted.
  permittedInputMethods: PackageNameList;

  // The battery plugged in modes for which the device stays on. When using this setting, it is recommended to clear maximumTimeToLock so that the device doesn't lock itself while it stays on.
  stayOnPluggedModes: BatteryPluggedMode[];

  // The network-independent global HTTP proxy. Typically proxies should be configured per-network in openNetworkConfiguration. However for unusual configurations like general internal filtering a global HTTP proxy may be useful. If the proxy is not accessible, network access may break. The global proxy is only a recommendation and some apps may ignore it.
  recommendedGlobalProxy: ProxyInfo;

  // Whether changing the user icon is disabled. This applies only on devices running Android 7 and above.
  setUserIconDisabled: boolean;

  // Whether changing the wallpaper is disabled.
  setWallpaperDisabled: boolean;

  // Rules for determining apps' access to private keys. See ChoosePrivateKeyRule for details. This must be empty if any application has CERT_SELECTION delegation scope.
  choosePrivateKeyRules: ChoosePrivateKeyRule[];

  // Configuration for an always-on VPN connection. Use with vpnConfigDisabled to prevent modification of this setting.
  alwaysOnVpnPackage: AlwaysOnVpnPackage;

  // Email addresses of device administrators for factory reset protection. When the device is factory reset, it will require one of these admins to log in with the Google account email and password to unlock the device. If no admins are specified, the device won't provide factory reset protection.
  frpAdminEmails: string[];

  // The device owner information to be shown on the lock screen.
  deviceOwnerLockScreenInfo: UserFacingMessage;

  // Whether roaming data services are disabled.
  dataRoamingDisabled: boolean;

  // The degree of location detection enabled.
  locationMode: LocationMode;

  // Whether the network escape hatch is enabled. If a network connection can't be made at boot time, the escape hatch prompts the user to temporarily connect to a network in order to refresh the device policy. After applying policy, the temporary network will be forgotten and the device will continue booting. This prevents being unable to connect to a network if there is no suitable network in the last policy and the device boots into an app in lock task mode, or the user is otherwise unable to reach device settings.
  networkEscapeHatchEnabled: boolean;

  // Whether bluetooth is disabled. Prefer this setting over bluetoothConfigDisabled because bluetoothConfigDisabled can be bypassed by the user.
  bluetoothDisabled: boolean;

  // Whether the user is allowed to have fun. Controls whether the Easter egg game in Settings is disabled.
  funDisabled: boolean;

  // Specifies permitted accessibility services. If the field is not set, any accessibility service can be used. If the field is set, only the accessibility services in this list and the system's built-in accessibility service can be used. In particular, if the field is set to empty, only the system's built-in accessibility servicess can be used. This can be set on fully managed devices and on work profiles. When applied to a work profile, this affects both the personal profile and the work profile.
  permittedAccessibilityServices: PackageNameList;

  // Recommended alternative: autoUpdateMode which is set per app, provides greater flexibility around update frequency.
  appAutoUpdatePolicy: AppAutoUpdatePolicy;

  // Whether the kiosk custom launcher is enabled. This replaces the home screen with a launcher that locks down the device to the apps installed via the applications setting. Apps appear on a single page in alphabetical order. Use kioskCustomization to further configure the kiosk device behavior.
  kioskCustomLauncherEnabled: boolean;

  // Flag to skip hints on the first use. Enterprise admin can enable the system recommendation for apps to skip their user tutorial and other introductory hints on first start-up.
  skipFirstUseHintsEnabled: boolean;

  // Allows showing UI on a device for a user to choose a private key alias if there are no matching rules in ChoosePrivateKeyRules. For devices below Android P, setting this may leave enterprise keys vulnerable. This value will have no effect if any application has CERT_SELECTION delegation scope.
  privateKeySelectionEnabled: boolean;

  // Whether encryption is enabled
  encryptionPolicy: EncryptionPolicy;

  // Explicit permission or group grants or denials for all apps. These values override the defaultPermissionPolicy.
  permissionGrants: PermissionGrant[];

  // This mode controls which apps are available to the user in the Play Store and the behavior on the device when apps are removed from the policy.
  playStoreMode: PlayStoreMode;

  // Action to take during the setup process. At most one action may be specified.
  setupActions: SetupAction[];

  // Password requirement policies. Different policies can be set for work profile or fully managed devices by setting the passwordScope field in the policy.
  passwordPolicies: PasswordRequirements[];

  // Rules that define the behavior when a particular policy can not be applied on device
  policyEnforcementRules: PolicyEnforcementRule[];

  // Settings controlling the behavior of a device in kiosk mode. To enable kiosk mode, set kioskCustomLauncherEnabled to true or specify an app in the policy with installType KIOSK.
  kioskCustomization: KioskCustomization;

  // Advanced security settings. In most cases, setting these is not needed.
  advancedSecurityOverrides: AdvancedSecurityOverrides;

  // Policies managing personal usage on a company-owned device.
  personalUsagePolicies: PersonalUsagePolicies;

  // Whether auto date, time, and time zone are enabled on a company-owned device. If this is set, then autoTimeRequired is ignored.
  autoDateAndTimeZone: AutoDateAndTimeZone;

  // This feature is not generally available.
  oncCertificateProviders: OncCertificateProvider[];

  // Cross-profile policies applied on the device.
  crossProfilePolicies: CrossProfilePolicies;

  // Controls whether preferential network service is enabled on the work profile or on fully managed devices. For example, an organization may have an agreement with a carrier that all of the work data from its employees' devices will be sent via a network service dedicated for enterprise use. An example of a supported preferential network service is the enterprise slice on 5G networks.
  preferentialNetworkService: PreferentialNetworkService;

  // Configuration of device activity logging.
  usageLog: UsageLog;

  // Controls the use of the camera and whether the user has access to the camera access toggle.
  cameraAccess: CameraAccess;

  // Controls the use of the microphone and whether the user has access to the microphone access toggle. This applies only on fully managed devices.
  microphoneAccess: MicrophoneAccess;

  // Covers controls for device connectivity such as Wi-Fi, USB data access, keyboard/mouse connections, and more.
  deviceConnectivityManagement: DeviceConnectivityManagement;

  // Covers controls for radio state such as Wi-Fi, bluetooth, and more.
  deviceRadioState: DeviceRadioState;

  // Controls which apps are allowed to act as credential providers on Android 14 and above. These apps store credentials, see this and this for details. See also credentialProviderPolicy.
  credentialProviderPolicyDefault: CredentialProviderPolicyDefault;

  // Optional. Controls whether printing is allowed. This is supported on devices running Android 9 and above. .
  printingPolicy: PrintingPolicy;

  // Optional. Controls for the display settings.
  displaySettings: DisplaySettings;

  // Optional. Controls whether AssistContent is allowed to be sent to a privileged app such as an assistant app. AssistContent includes screenshots and information about an app, such as package name. This is supported on Android 15 and above.
  assistContentPolicy: AssistContentPolicy;

  // Optional. Controls the work account setup configuration, such as details of whether a Google authenticated account is required.
  workAccountSetupConfig: WorkAccountSetupConfig;

  // Optional. Wipe flags to indicate what data is wiped when a device or profile wipe is triggered due to any reason (for example, non-compliance). This does not apply to the enterprises.devices.delete method. . This list must not have duplicates.
  wipeDataFlags: WipeDataFlag[];

  // Optional. Controls whether the enterpriseDisplayName is visible on the device (e.g. lock screen message on company-owned devices).
  enterpriseDisplayNameVisibility: EnterpriseDisplayNameVisibility;

  // Optional. Controls whether apps on the device for fully managed devices or in the work profile for devices with work profiles are allowed to expose app functions.
  appFunctions: AppFunctions;

  // Optional. The default application setting for supported types. If the default application is successfully set for at least one app type on a profile, users are prevented from changing any default applications on that profile.
  defaultApplicationSettings: DefaultApplicationSetting[];
};

enum EnterpriseDisplayNameVisibility {
  ENTERPRISE_DISPLAY_NAME_VISIBILITY_UNSPECIFIED = 'ENTERPRISE_DISPLAY_NAME_VISIBILITY_UNSPECIFIED',
  ENTERPRISE_DISPLAY_NAME_VISIBLE = 'ENTERPRISE_DISPLAY_NAME_VISIBLE',
  ENTERPRISE_DISPLAY_NAME_HIDDEN = 'ENTERPRISE_DISPLAY_NAME_HIDDEN',
}

enum PreferentialNetworkService {
  PREFERENTIAL_NETWORK_SERVICE_UNSPECIFIED = 'PREFERENTIAL_NETWORK_SERVICE_UNSPECIFIED',
  PREFERENTIAL_NETWORK_SERVICE_DISABLED = 'PREFERENTIAL_NETWORK_SERVICE_DISABLED',
  PREFERENTIAL_NETWORK_SERVICE_ENABLED = 'PREFERENTIAL_NETWORK_SERVICE_ENABLED',
}

// Controls whether apps on the device for fully managed devices or in the work profile for devices with work profiles are allowed to expose app functions.
enum AppFunctions {
  APP_FUNCTIONS_UNSPECIFIED = 'APP_FUNCTIONS_UNSPECIFIED',
  APP_FUNCTIONS_DISALLOWED = 'APP_FUNCTIONS_DISALLOWED',
  APP_FUNCTIONS_ALLOWED = 'APP_FUNCTIONS_ALLOWED',
}

// The default application setting for a DefaultApplicationType.
type DefaultApplicationSetting = {
  defaultApplicationType: DefaultApplicationType;
  defaultApplications: DefaultApplication[];
  defaultApplicationScopes: DefaultApplicationScope[];
};

// Information about the application to be set as the default.
type DefaultApplication = {
  packageName: string;
};

// Policy for an individual app. Note: Application availability on a given device cannot be changed using this policy if installAppsDisabled is enabled. The maximum number of applications that you can specify per policy is 3,000.
type ApplicationPolicy = {
  // The package name of the app. For example, com.google.android.youtube for the YouTube app.
  packageName: string;

  // The type of installation to perform.
  installType: InstallType;

  // The default policy for all permissions requested by the app. If specified, this overrides the policy-level defaultPermissionPolicy which applies to all apps. It does not override the permissionGrants which applies to all apps.
  defaultPermissionPolicy: PermissionPolicy;

  // Explicit permission grants or denials for the app. These values override the defaultPermissionPolicy and permissionGrants which apply to all apps.
  permissionGrants: PermissionGrant[];

  /**
   * Managed configuration applied to the app. The format for the configuration is dictated by the ManagedProperty values supported by the app. Each field name in the managed configuration must match the key field of the ManagedProperty. The field value must be compatible with the type of the ManagedProperty:
      type	JSON value
      BOOL	true or false
      STRING	string
      INTEGER	number
      CHOICE	string
      MULTISELECT	array of strings
      HIDDEN	string
      BUNDLE_ARRAY	array of objects
   */
  managedConfiguration: any;

  // Whether the app is disabled. When disabled, the app data is still preserved.
  disabled: boolean;

  // The minimum version of the app that runs on the device. If set, the device attempts to update the app to at least this version code. If the app is not up-to-date, the device will contain a NonComplianceDetail with nonComplianceReason set to APP_NOT_UPDATED. The app must already be published to Google Play with a version code greater than or equal to this value. At most 20 apps may specify a minimum version code per policy.
  minimumVersionCode: number;

  // The scopes delegated to the app from Android Device Policy. These provide additional privileges for the applications they are applied to.
  delegatedScopes: DelegatedScope[];

  // The managed configurations template for the app, saved from the managed configurations iframe. This field is ignored if managedConfiguration is set.
  managedConfigurationTemplate: ManagedConfigurationTemplate;

  // List of the app’s track IDs that a device belonging to the enterprise can access. If the list contains multiple track IDs, devices receive the latest version among all accessible tracks. If the list contains no track IDs, devices only have access to the app’s production track. More details about each track are available in AppTrackInfo.
  accessibleTrackIds: string[];

  // Controls whether the app can communicate with itself across a device’s work and personal profiles, subject to user consent.
  connectedWorkAndPersonalApp: ConnectedWorkAndPersonalApp;

  // Controls the auto-update mode for the app.
  autoUpdateMode: AutoUpdateMode;

  // Specifies whether the app is allowed networking when the VPN is not connected and alwaysOnVpnPackage.lockdownEnabled is enabled.
  alwaysOnVpnLockdownExemption: AlwaysOnVpnLockdownExemption;

  // Specifies whether the app installed in the work profile is allowed to add widgets to the home screen.
  workProfileWidgets: WorkProfileWidgets;

  // Optional. Whether the app is allowed to act as a credential provider on Android 14 and above.
  credentialProviderPolicy: CredentialProviderPolicy;

  // Optional. Configuration for this custom app.
  customAppConfig: CustomAppConfig;

  // Optional. The constraints for installing the app. You can specify a maximum of one InstallConstraint. Multiple constraints are rejected.
  installConstraint: InstallConstraint[];

  installPriority: number;

  // Optional. Specifies whether user control is permitted for the app. User control includes user actions like force-stopping and clearing app data. Certain types of apps have special treatment, see USER_CONTROL_SETTINGS_UNSPECIFIED and USER_CONTROL_ALLOWED for more details.
  userControlSettings: UserControlSettings;

  // Optional. ID of the preferential network the application uses. There must be a configuration for the specified network ID in preferentialNetworkServiceConfigs. If set to PREFERENTIAL_NETWORK_ID_UNSPECIFIED, the application will use the default network ID specified in defaultPreferentialNetworkId. See the documentation of defaultPreferentialNetworkId for the list of apps excluded from this defaulting. This applies on both work profiles and fully managed devices on Android 13 and above.
  preferentialNetworkId: PreferentialNetworkId;

  //  Signing key certificates of the app.
  signingKeyCerts: ApplicationSigningKeyCert[];

  // Optional. Roles the app has.
  // Apps having certain roles can be exempted from power and background execution restrictions, suspension and hibernation on Android 14 and above. The user control can also be disallowed for apps with certain roles on Android 11 and above. Refer to the documentation of each RoleType for more details.
  roles: Role[];
};

// The type of installation to perform for an app. If setupAction references an app, they must have installType set as REQUIRED_FOR_SETUP or the setup will fail.
export enum InstallType {
  // Unspecified. Defaults to AVAILABLE.
  INSTALL_TYPE_UNSPECIFIED = 'INSTALL_TYPE_UNSPECIFIED',

  // The app is automatically installed and can be removed by the user.
  PREINSTALLED = 'PREINSTALLED',

  // The app is automatically installed regardless of a set maintenance window and can't be removed by the user.
  FORCE_INSTALLED = 'FORCE_INSTALLED',

  // The app is blocked and can't be installed. If the app was installed under a previous policy, it will be uninstalled. This also blocks its instant app functionality.
  BLOCKED = 'BLOCKED',

  // The app is available to install.
  AVAILABLE = 'AVAILABLE',

  // The app is automatically installed and can't be removed by the user and will prevent setup from completion until installation is complete.
  REQUIRED_FOR_SETUP = 'REQUIRED_FOR_SETUP',

  // The app can only be installed and updated via AMAPI SDK command.
  CUSTOM = 'CUSTOM',
}

// The policy for granting permission requests to apps.
export enum PermissionPolicy {
  // Policy not specified. If no policy is specified for a permission at any level, then the PROMPT behavior is used by default.
  PERMISSION_POLICY_UNSPECIFIED = 'PERMISSION_POLICY_UNSPECIFIED',

  // Prompt the user to grant a permission.
  PROMPT = 'PROMPT',

  // Automatically grant a permission.
  GRANT = 'GRANT',

  // Automatically deny a permission.
  DENY = 'DENY',
}

// Configuration for an Android permission and its grant state.
type PermissionGrant = {
  // The Android permission or group, e.g. android.permission.READ_CALENDAR or android.permission_group.CALENDAR.
  permission: string;

  // The policy for granting the permission.
  policy: PermissionPolicy;
};

// Delegation Scopes that another package can acquire from Android Device Policy. These provide additional privileges for the applications they are applied to.
export enum DelegatedScope {
  // No delegation scope specified.
  DELEGATED_SCOPE_UNSPECIFIED = 'DELEGATED_SCOPE_UNSPECIFIED',

  // Grants access to certificate installation and management. This scope can be delegated to multiple applications.
  CERT_INSTALL = 'CERT_INSTALL',

  // Grants access to managed configurations management. This scope can be delegated to multiple applications.
  MANAGED_CONFIGURATIONS = 'MANAGED_CONFIGURATIONS',

  // Grants access to blocking uninstallation. This scope can be delegated to multiple applications.
  BLOCK_UNINSTALL = 'BLOCK_UNINSTALL',

  // Grants access to permission policy and permission grant state. This scope can be delegated to multiple applications.
  PERMISSION_GRANT = 'PERMISSION_GRANT',

  // Grants access to package access state. This scope can be delegated to multiple applications.
  PACKAGE_ACCESS = 'PACKAGE_ACCESS',

  // Grants access for enabling system apps. This scope can be delegated to multiple applications.
  ENABLE_SYSTEM_APP = 'ENABLE_SYSTEM_APP',

  NETWORK_ACTIVITY_LOGS = 'NETWORK_ACTIVITY_LOGS',
  SECURITY_LOGS = 'SECURITY_LOGS',
  CERT_SELECTION = 'CERT_SELECTION',
}

// The managed configurations template for the app, saved from the managed configurations iframe.
type ManagedConfigurationTemplate = {
  // The ID of the managed configurations template.
  templateId: string;

  // Optional, a map containing <key, value> configuration variables defined for the configuration.
  configurationVariables: Map<string, string>;
};

// Controls whether the app can communicate with itself cross-profile, subject to user consent.
enum ConnectedWorkAndPersonalApp {
  // Unspecified. Defaults to CONNECTED_WORK_AND_PERSONAL_APPS_DISALLOWED.
  CONNECTED_WORK_AND_PERSONAL_APP_UNSPECIFIED = 'CONNECTED_WORK_AND_PERSONAL_APP_UNSPECIFIED',

  // Default. Prevents the app from communicating cross-profile.
  CONNECTED_WORK_AND_PERSONAL_APP_DISALLOWED = 'CONNECTED_WORK_AND_PERSONAL_APP_DISALLOWED',

  // Allows the app to communicate across profiles after receiving user consent.
  CONNECTED_WORK_AND_PERSONAL_APP_ALLOWED = 'CONNECTED_WORK_AND_PERSONAL_APP_ALLOWED',
}

enum AutoUpdateMode {
  // Unspecified. Defaults to AUTO_UPDATE_DEFAULT.
  AUTO_UPDATE_MODE_UNSPECIFIED = 'AUTO_UPDATE_MODE_UNSPECIFIED',

  // The default update mode.
  // The app is automatically updated with low priority to minimize the impact on the user.
  AUTO_UPDATE_DEFAULT = 'AUTO_UPDATE_DEFAULT',

  // The app is not automatically updated for a maximum of 90 days after the app becomes out of date.
  AUTO_UPDATE_POSTPONED = 'AUTO_UPDATE_POSTPONED',

  // The app is updated as soon as possible. No constraints are applied.
  AUTO_UPDATE_HIGH_PRIORITY = 'AUTO_UPDATE_HIGH_PRIORITY',
}

// Controls whether an app is exempt from the alwaysOnVpnPackage.lockdownEnabled setting.
enum AlwaysOnVpnLockdownExemption {
  // Unspecified. Defaults to VPN_LOCKDOWN_ENFORCED.
  ALWAYS_ON_VPN_LOCKDOWN_EXEMPTION_UNSPECIFIED = 'ALWAYS_ON_VPN_LOCKDOWN_EXEMPTION_UNSPECIFIED',

  // The app respects the always-on VPN lockdown setting.
  VPN_LOCKDOWN_ENFORCED = 'VPN_LOCKDOWN_ENFORCED',

  // The app is exempt from the always-on VPN lockdown setting.
  VPN_LOCKDOWN_EXEMPTION = 'VPN_LOCKDOWN_EXEMPTION',
}

// Controls if a work profile application is allowed to add widgets to the home screen.
enum WorkProfileWidgets {
  // Unspecified. Defaults to workProfileWidgetsDefault
  WORK_PROFILE_WIDGETS_UNSPECIFIED = 'WORK_PROFILE_WIDGETS_UNSPECIFIED',

  // Work profile widgets are allowed. This means the application will be able to add widgets to the home screen.
  WORK_PROFILE_WIDGETS_ALLOWED = 'WORK_PROFILE_WIDGETS_ALLOWED',

  // Work profile widgets are disallowed. This means the application will not be able to add widgets to the home screen.
  WORK_PROFILE_WIDGETS_DISALLOWED = 'WORK_PROFILE_WIDGETS_DISALLOWED',
}

// Whether the app is allowed to act as a credential provider on Android 14 and above.
enum CredentialProviderPolicy {
  // Unspecified. The behaviour is governed by credentialProviderPolicyDefault.
  CREDENTIAL_PROVIDER_POLICY_UNSPECIFIED = 'CREDENTIAL_PROVIDER_POLICY_UNSPECIFIED',

  // App is allowed to act as a credential provider.
  CREDENTIAL_PROVIDER_ALLOWED = 'CREDENTIAL_PROVIDER_ALLOWED',
}

// Configuration for a custom app.
type CustomAppConfig = {
  // Optional. User uninstall settings of the custom app.
  userUninstallSettings: UserUninstallSettings;
};

// Specifies if a user is allowed to uninstall the custom app.
enum UserUninstallSettings {
  // Unspecified. Defaults to DISALLOW_UNINSTALL_BY_USER.
  USER_UNINSTALL_SETTINGS_UNSPECIFIED = 'USER_UNINSTALL_SETTINGS_UNSPECIFIED',

  // User is not allowed to uninstall the custom app.
  DISALLOW_UNINSTALL_BY_USER = 'DISALLOW_UNINSTALL_BY_USER',

  // User is allowed to uninstall the custom app.
  ALLOW_UNINSTALL_BY_USER = 'ALLOW_UNINSTALL_BY_USER',
}

type InstallConstraint = {
  networkTypeConstraint: NetworkTypeConstraint;
  chargingConstraint: ChargingConstraint;
  deviceIdleConstraint: DeviceIdleConstraint;
};

enum NetworkTypeConstraint {
  NETWORK_TYPE_CONSTRAINT_UNSPECIFIED = 'NETWORK_TYPE_CONSTRAINT_UNSPECIFIED',
  INSTALL_ON_ANY_NETWORK = 'INSTALL_ON_ANY_NETWORK',
  INSTALL_ONLY_ON_UNMETERED_NETWORK = 'INSTALL_ONLY_ON_UNMETERED_NETWORK',
}

enum DeviceIdleConstraint {
  DEVICE_IDLE_CONSTRAINT_UNSPECIFIED = 'DEVICE_IDLE_CONSTRAINT_UNSPECIFIED',
  DEVICE_IDLE_NOT_REQUIRED = 'DEVICE_IDLE_NOT_REQUIRED',
  INSTALL_ONLY_WHEN_DEVICE_IDLE = 'INSTALL_ONLY_WHEN_DEVICE_IDLE',
}

enum ChargingConstraint {
  CHARGING_CONSTRAINT_UNSPECIFIED = 'CHARGING_CONSTRAINT_UNSPECIFIED',
  CHARGING_NOT_REQUIRED = 'CHARGING_NOT_REQUIRED',
  INSTALL_ONLY_WHEN_CHARGING = 'INSTALL_ONLY_WHEN_CHARGING',
}

// Specifies whether user control is permitted for a given app. User control includes user actions like force-stopping and clearing app data.
enum UserControlSettings {
  USER_CONTROL_SETTINGS_UNSPECIFIED = 'USER_CONTROL_SETTINGS_UNSPECIFIED',
  USER_CONTROL_ALLOWED = 'USER_CONTROL_ALLOWED',
  USER_CONTROL_DISALLOWED = 'USER_CONTROL_DISALLOWED',
}

// Preferential network identifier.
enum PreferentialNetworkId {
  PREFERENTIAL_NETWORK_ID_UNSPECIFIED = 'PREFERENTIAL_NETWORK_ID_UNSPECIFIED',
  NO_PREFERENTIAL_NETWORK = 'NO_PREFERENTIAL_NETWORK',
  PREFERENTIAL_NETWORK_ID_ONE = 'PREFERENTIAL_NETWORK_ID_ONE',
  PREFERENTIAL_NETWORK_ID_TWO = 'PREFERENTIAL_NETWORK_ID_TWO',
  PREFERENTIAL_NETWORK_ID_THREE = 'PREFERENTIAL_NETWORK_ID_THREE',
  PREFERENTIAL_NETWORK_ID_FOUR = 'PREFERENTIAL_NETWORK_ID_FOUR',
  PREFERENTIAL_NETWORK_ID_FIVE = 'PREFERENTIAL_NETWORK_ID_FIVE',
}

// The application signing key certificate.
type ApplicationSigningKeyCert = {
  // Required. The SHA-256 hash value of the signing key certificate of the app. This must be a valid SHA-256 hash value, i.e. 32 bytes.
  // A base64-encoded string.
  signingKeyCertFingerprintSha256: string;
};

// Role an app can have.
type Role = {
  // Required. The type of the role an app can have.
  roleType: RoleType;
};

// The type of the role an app can hold.
enum RoleType {
  ROLE_TYPE_UNSPECIFIED = 'ROLE_TYPE_UNSPECIFIED',
  COMPANION_APP = 'COMPANION_APP',
  KIOSK = 'KIOSK',
  MOBILE_THREAT_DEFENSE_ENDPOINT_DETECTION_RESPONSE = 'MOBILE_THREAT_DEFENSE_ENDPOINT_DETECTION_RESPONSE',
  SYSTEM_HEALTH_MONITORING = 'SYSTEM_HEALTH_MONITORING',
}

// Keyguard (lock screen) features that can be disabled..
enum KeyguardDisabledFeature {
  // This value is ignored.
  KEYGUARD_DISABLED_FEATURE_UNSPECIFIED = 'KEYGUARD_DISABLED_FEATURE_UNSPECIFIED',

  // 	Disable the camera on secure keyguard screens (e.g. PIN).
  CAMERA = 'CAMERA',

  // Disable showing all notifications on secure keyguard screens.
  NOTIFICATIONS = 'NOTIFICATIONS',

  // Disable unredacted notifications on secure keyguard screens.
  UNREDACTED_NOTIFICATIONS = 'UNREDACTED_NOTIFICATIONS',

  // Ignore trust agent state on secure keyguard screens.
  TRUST_AGENTS = 'TRUST_AGENTS',

  // Disable fingerprint sensor on secure keyguard screens.
  DISABLE_FINGERPRINT = 'DISABLE_FINGERPRINT',

  // On devices running Android 6 and below, disables text entry into notifications on secure keyguard screens. Has no effect on Android 7 and above.
  DISABLE_REMOTE_INPUT = 'DISABLE_REMOTE_INPUT',

  // Disable face authentication on secure keyguard screens.
  FACE = 'FACE',

  // Disable iris authentication on secure keyguard screens.
  IRIS = 'IRIS',

  // Disable all biometric authentication on secure keyguard screens.
  BIOMETRICS = 'BIOMETRICS',

  // Disable shortcuts on secure keyguard screens.
  SHORTCUTS = 'SHORTCUTS',

  // Disable all features on secure keyguard screens.
  ALL_FEATURES = 'ALL_FEATURES',
}

// A default activity for handling intents that match a particular intent filter. Note: To set up a kiosk, use InstallType to KIOSK rather than use persistent preferred activities.
type PersistentPreferredActivity = {
  receiverActivity: string;
  actions: string[];
  categories: string[];
};

// Configuration for managing system updates
type SystemUpdate = {
  type: SystemUpdateType;
  startMinutes: number;
  endMinutes: number;
  allowedDaysWithoutUpdate: number;
  freezePeriods: FreezePeriod[];
};

// The type of system update configuration.
enum SystemUpdateType {
  SYSTEM_UPDATE_TYPE_UNSPECIFIED = 'SYSTEM_UPDATE_TYPE_UNSPECIFIED',
  AUTOMATIC = 'AUTOMATIC',
  WINDOWED = 'WINDOWED',
  POSTPONE = 'POSTPONE',
}

// A system freeze period. When a device’s clock is within the freeze period, all incoming system updates (including security patches) are blocked and won’t be installed.
type FreezePeriod = {
  startDate: Date;
  endDate: Date;
};

type Date = {
  year: number;
  month: number;
  day: number;
};

type StatusReportingSettings = {
  applicationReportsEnabled: boolean;
  deviceSettingsEnabled: boolean;
  softwareInfoEnabled: boolean;
  memoryInfoEnabled: boolean;
  networkInfoEnabled: boolean;
  displayInfoEnabled: boolean;
  powerManagementEventsEnabled: boolean;
  hardwareStatusEnabled: boolean;
  systemPropertiesEnabled: boolean;
  applicationReportingSettings: ApplicationReportingSettings;
  commonCriteriaModeEnabled: boolean;
  defaultApplicationInfoReportingEnabled: boolean;
};

type ApplicationReportingSettings = {
  includeRemovedApps: boolean;
};

type PackageNameList = {
  packageNames: string[];
};

enum BatteryPluggedMode {
  BATTERY_PLUGGED_MODE_UNSPECIFIED = 'BATTERY_PLUGGED_MODE_UNSPECIFIED',
  AC = 'AC',
  USB = 'USB',
  WIRELESS = 'WIRELESS',
}

type ProxyInfo = {
  host: string;
  port: number;
  excludedHosts: string[];
  pacUri: string;
};

type ChoosePrivateKeyRule = {
  urlPattern: string;
  packageNames: string[];
  privateKeyAlias: string;
};

type AlwaysOnVpnPackage = {
  packageName: string;
  lockdownEnabled: boolean;
};

enum LocationMode {
  LOCATION_MODE_UNSPECIFIED = 'LOCATION_MODE_UNSPECIFIED',
  HIGH_ACCURACY = 'HIGH_ACCURACY',
  SENSORS_ONLY = 'SENSORS_ONLY',
  BATTERY_SAVING = 'BATTERY_SAVING',
  OFF = 'OFF',
  LOCATION_USER_CHOICE = 'LOCATION_USER_CHOICE',
  LOCATION_ENFORCED = 'LOCATION_ENFORCED',
  LOCATION_DISABLED = 'LOCATION_DISABLED',
}

enum AppAutoUpdatePolicy {
  APP_AUTO_UPDATE_POLICY_UNSPECIFIED = 'APP_AUTO_UPDATE_POLICY_UNSPECIFIED',
  CHOICE_TO_THE_USER = 'CHOICE_TO_THE_USER',
  NEVER = 'NEVER',
  WIFI_ONLY = 'WIFI_ONLY',
  ALWAYS = 'ALWAYS',
}

enum EncryptionPolicy {
  ENCRYPTION_POLICY_UNSPECIFIED = 'ENCRYPTION_POLICY_UNSPECIFIED',
  ENABLED_WITHOUT_PASSWORD = 'ENABLED_WITHOUT_PASSWORD',
  ENABLED_WITH_PASSWORD = 'ENABLED_WITH_PASSWORD',
}

enum PlayStoreMode {
  PLAY_STORE_MODE_UNSPECIFIED = 'PLAY_STORE_MODE_UNSPECIFIED',
  WHITELIST = 'WHITELIST',
  BLACKLIST = 'BLACKLIST',
  ALLOWLIST = 'ALLOWLIST',
}

type SetupAction = {
  title: UserFacingMessage;
  description: UserFacingMessage;

  // Union field action can be only one of the following:
  launchApp: LaunchAppAction;
  // End of list of possible types for union field action.
};

type LaunchAppAction = {
  packageName: string;
};

type PolicyEnforcementRule = {
  blockAction: BlockAction;
  wipeAction: WipeAction;
  // Union field trigger can be only one of the following:
  settingName: string;
};

type BlockAction = {
  blockAfterDays: number;
  blockScope: BlockScope;
};

enum BlockScope {
  BLOCK_SCOPE_UNSPECIFIED = 'BLOCK_SCOPE_UNSPECIFIED',
  BLOCK_SCOPE_WORK_PROFILE = 'BLOCK_SCOPE_WORK_PROFILE',
  BLOCK_SCOPE_DEVICE = 'BLOCK_SCOPE_DEVICE',
}

type WipeAction = {
  wipeAfterDays: number;
  preserveFrp: boolean;
};

type KioskCustomization = {
  powerButtonActions: PowerButtonActions;
  systemErrorWarnings: SystemErrorWarnings;
  systemNavigation: SystemNavigation;
  statusBar: StatusBar;
  deviceSettings: DeviceSettings;
};

enum PowerButtonActions {
  POWER_BUTTON_ACTIONS_UNSPECIFIED = 'POWER_BUTTON_ACTIONS_UNSPECIFIED',
  POWER_BUTTON_AVAILABLE = 'POWER_BUTTON_AVAILABLE',
  POWER_BUTTON_BLOCKED = 'POWER_BUTTON_BLOCKED',
}

enum SystemErrorWarnings {
  SYSTEM_ERROR_WARNINGS_UNSPECIFIED = 'SYSTEM_ERROR_WARNINGS_UNSPECIFIED',
  ERROR_AND_WARNINGS_ENABLED = 'ERROR_AND_WARNINGS_ENABLED',
  ERROR_AND_WARNINGS_MUTED = 'ERROR_AND_WARNINGS_MUTED',
}

enum SystemNavigation {
  SYSTEM_NAVIGATION_UNSPECIFIED = 'SYSTEM_NAVIGATION_UNSPECIFIED',
  NAVIGATION_ENABLED = 'NAVIGATION_ENABLED',
  NAVIGATION_DISABLED = 'NAVIGATION_DISABLED',
  HOME_BUTTON_ONLY = 'HOME_BUTTON_ONLY',
}

enum StatusBar {
  STATUS_BAR_UNSPECIFIED = 'STATUS_BAR_UNSPECIFIED',
  NOTIFICATIONS_AND_SYSTEM_INFO_ENABLED = 'NOTIFICATIONS_AND_SYSTEM_INFO_ENABLED',
  NOTIFICATIONS_AND_SYSTEM_INFO_DISABLED = 'NOTIFICATIONS_AND_SYSTEM_INFO_DISABLED',
  SYSTEM_INFO_ONLY = 'SYSTEM_INFO_ONLY',
}

type AdvancedSecurityOverrides = {
  untrustedAppsPolicy: UntrustedAppsPolicy;
  googlePlayProtectVerifyApps: GooglePlayProtectVerifyApps;
  developerSettings: DeveloperSettings;
  commonCriteriaMode: CommonCriteriaMode;
  personalAppsThatCanReadWorkNotifications: string[];
  mtePolicy: MtePolicy;
  contentProtectionPolicy: ContentProtectionPolicy;
};

enum UntrustedAppsPolicy {
  UNTRUSTED_APPS_POLICY_UNSPECIFIED = 'UNTRUSTED_APPS_POLICY_UNSPECIFIED',
  DISALLOW_INSTALL = 'DISALLOW_INSTALL',
  ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY = 'ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY',
  ALLOW_INSTALL_DEVICE_WIDE = 'ALLOW_INSTALL_DEVICE_WIDE',
}

enum GooglePlayProtectVerifyApps {
  GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED = 'GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED',
  VERIFY_APPS_ENFORCED = 'VERIFY_APPS_ENFORCED',
  VERIFY_APPS_USER_CHOICE = 'VERIFY_APPS_USER_CHOICE',
}

enum DeveloperSettings {
  DEVELOPER_SETTINGS_UNSPECIFIED = 'DEVELOPER_SETTINGS_UNSPECIFIED',
  DEVELOPER_SETTINGS_DISABLED = 'DEVELOPER_SETTINGS_DISABLED',
  DEVELOPER_SETTINGS_ALLOWED = 'DEVELOPER_SETTINGS_ALLOWED',
}

enum CommonCriteriaMode {
  COMMON_CRITERIA_MODE_UNSPECIFIED = 'COMMON_CRITERIA_MODE_UNSPECIFIED',
  COMMON_CRITERIA_MODE_DISABLED = 'COMMON_CRITERIA_MODE_DISABLED',
  COMMON_CRITERIA_MODE_ENABLED = 'COMMON_CRITERIA_MODE_ENABLED',
}

enum MtePolicy {
  MTE_POLICY_UNSPECIFIED = 'MTE_POLICY_UNSPECIFIED',
  MTE_USER_CHOICE = 'MTE_USER_CHOICE',
  MTE_ENFORCED = 'MTE_ENFORCED',
  MTE_DISABLED = 'MTE_DISABLED',
}

enum ContentProtectionPolicy {
  CONTENT_PROTECTION_POLICY_UNSPECIFIED = 'CONTENT_PROTECTION_POLICY_UNSPECIFIED',
  CONTENT_PROTECTION_DISABLED = 'CONTENT_PROTECTION_DISABLED',
  CONTENT_PROTECTION_ENFORCED = 'CONTENT_PROTECTION_ENFORCED',
  CONTENT_PROTECTION_USER_CHOICE = 'CONTENT_PROTECTION_USER_CHOICE',
}

type PersonalUsagePolicies = {
  cameraDisabled: boolean;
  screenCaptureDisabled: boolean;
  accountTypesWithManagementDisabled: [string];
  maxDaysWithWorkOff: number;
  personalPlayStoreMode: PlayStoreMode;
  personalApplications: PersonalApplicationPolicy[];
  privateSpacePolicy: PrivateSpacePolicy;
  bluetoothSharing: BluetoothSharing;
};

type PersonalApplicationPolicy = {
  packageName: string;
  installType: InstallType;
};

enum PrivateSpacePolicy {
  PRIVATE_SPACE_POLICY_UNSPECIFIED = 'PRIVATE_SPACE_POLICY_UNSPECIFIED',
  PRIVATE_SPACE_ALLOWED = 'PRIVATE_SPACE_ALLOWED',
  PRIVATE_SPACE_DISALLOWED = 'PRIVATE_SPACE_DISALLOWED',
}

enum AutoDateAndTimeZone {
  AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED = 'AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED',
  AUTO_DATE_AND_TIME_ZONE_USER_CHOICE = 'AUTO_DATE_AND_TIME_ZONE_USER_CHOICE',
  AUTO_DATE_AND_TIME_ZONE_ENFORCED = 'AUTO_DATE_AND_TIME_ZONE_ENFORCED',
}

type OncCertificateProvider = {
  certificateReferences: string[];

  // Union field endpoint can be only one of the following:
};

type CrossProfilePolicies = {
  // "showWorkContactsInPersonalProfile": enum (ShowWorkContactsInPersonalProfile),
  // "crossProfileCopyPaste": enum (CrossProfileCopyPaste),
  // "crossProfileDataSharing": enum (CrossProfileDataSharing),
  // "workProfileWidgetsDefault": enum (WorkProfileWidgetsDefault),
  // "crossProfileAppFunctions": enum (CrossProfileAppFunctions),
  // "exemptionsToShowWorkContactsInPersonalProfile": {
  //   object (PackageNameList)
  // }
};

type UsageLog = {
  enabledLogTypes: LogType[];
  uploadOnCellularAllowed: LogType[];
};

enum LogType {
  LOG_TYPE_UNSPECIFIED = 'LOG_TYPE_UNSPECIFIED',
  SECURITY_LOGS = 'SECURITY_LOGS',
  NETWORK_ACTIVITY_LOGS = 'NETWORK_ACTIVITY_LOGS',
}

enum CameraAccess {
  CAMERA_ACCESS_UNSPECIFIED = 'CAMERA_ACCESS_UNSPECIFIED',
  CAMERA_ACCESS_USER_CHOICE = 'CAMERA_ACCESS_USER_CHOICE',
  CAMERA_ACCESS_DISABLED = 'CAMERA_ACCESS_DISABLED',
  CAMERA_ACCESS_ENFORCED = 'CAMERA_ACCESS_ENFORCED',
}

enum MicrophoneAccess {
  MICROPHONE_ACCESS_UNSPECIFIED = 'MICROPHONE_ACCESS_UNSPECIFIED',
  MICROPHONE_ACCESS_USER_CHOICE = 'MICROPHONE_ACCESS_USER_CHOICE',
  MICROPHONE_ACCESS_DISABLED = 'MICROPHONE_ACCESS_DISABLED',
  MICROPHONE_ACCESS_ENFORCED = 'MICROPHONE_ACCESS_ENFORCED',
}

type DeviceConnectivityManagement = {
  usbDataAccess: UsbDataAccess;
  configureWifi: ConfigureWifi;
  wifiDirectSettings: WifiDirectSettings;
  tetheringSettings: TetheringSettings;
  wifiSsidPolicy: WifiSsidPolicy;
  wifiRoamingPolicy: WifiRoamingPolicy;
  bluetoothSharing: BluetoothSharing;
  preferentialNetworkServiceSettings: PreferentialNetworkServiceSettings;
  apnPolicy: ApnPolicy;
};

enum UsbDataAccess {
  USB_DATA_ACCESS_UNSPECIFIED = 'USB_DATA_ACCESS_UNSPECIFIED',
  ALLOW_USB_DATA_TRANSFER = 'ALLOW_USB_DATA_TRANSFER',
  DISALLOW_USB_FILE_TRANSFER = 'DISALLOW_USB_FILE_TRANSFER',
  DISALLOW_USB_DATA_TRANSFER = 'DISALLOW_USB_DATA_TRANSFER',
}
enum ConfigureWifi {
  CONFIGURE_WIFI_UNSPECIFIED = 'CONFIGURE_WIFI_UNSPECIFIED',
  ALLOW_CONFIGURING_WIFI = 'ALLOW_CONFIGURING_WIFI',
  DISALLOW_ADD_WIFI_CONFIG = 'DISALLOW_ADD_WIFI_CONFIG',
  DISALLOW_CONFIGURING_WIFI = 'DISALLOW_CONFIGURING_WIFI',
}
enum WifiDirectSettings {
  WIFI_DIRECT_SETTINGS_UNSPECIFIED = 'WIFI_DIRECT_SETTINGS_UNSPECIFIED',
  ALLOW_WIFI_DIRECT = 'ALLOW_WIFI_DIRECT',
  DISALLOW_WIFI_DIRECT = 'DISALLOW_WIFI_DIRECT',
}
enum TetheringSettings {
  TETHERING_SETTINGS_UNSPECIFIED = 'TETHERING_SETTINGS_UNSPECIFIED',
  ALLOW_ALL_TETHERING = 'ALLOW_ALL_TETHERING',
  DISALLOW_WIFI_TETHERING = 'DISALLOW_WIFI_TETHERING',
  DISALLOW_ALL_TETHERING = 'DISALLOW_ALL_TETHERING',
}

type WifiSsidPolicy = {
  wifiSsidPolicyType: WifiSsidPolicyType;
  wifiSsids: WifiSsid[];
};

enum WifiSsidPolicyType {
  WIFI_SSID_POLICY_TYPE_UNSPECIFIED = 'WIFI_SSID_POLICY_TYPE_UNSPECIFIED',
  WIFI_SSID_DENYLIST = 'WIFI_SSID_DENYLIST',
  WIFI_SSID_ALLOWLIST = 'WIFI_SSID_ALLOWLIST',
}

type WifiSsid = {
  wifiSsid: string;
};

type WifiRoamingPolicy = {
  wifiRoamingSettings: WifiRoamingSetting[];
};
type WifiRoamingSetting = {
  wifiSsid: string;
  wifiRoamingMode: WifiRoamingMode;
};

enum WifiRoamingMode {
  WIFI_ROAMING_MODE_UNSPECIFIED = 'WIFI_ROAMING_MODE_UNSPECIFIED',
  WIFI_ROAMING_DISABLED = 'WIFI_ROAMING_DISABLED',
  WIFI_ROAMING_DEFAULT = 'WIFI_ROAMING_DEFAULT',
  WIFI_ROAMING_AGGRESSIVE = 'WIFI_ROAMING_AGGRESSIVE',
}

enum BluetoothSharing {
  BLUETOOTH_SHARING_UNSPECIFIED = 'BLUETOOTH_SHARING_UNSPECIFIED',
  BLUETOOTH_SHARING_ALLOWED = 'BLUETOOTH_SHARING_ALLOWED',
  BLUETOOTH_SHARING_DISALLOWED = 'BLUETOOTH_SHARING_DISALLOWED',
}

type PreferentialNetworkServiceSettings = {
  preferentialNetworkServiceConfigs: PreferentialNetworkServiceConfig[];
  defaultPreferentialNetworkId: PreferentialNetworkId;
};

type PreferentialNetworkServiceConfig = {
  preferentialNetworkId: PreferentialNetworkId;
  fallbackToDefaultConnection: FallbackToDefaultConnection;
  nonMatchingNetworks: NonMatchingNetworks;
};

enum FallbackToDefaultConnection {
  FALLBACK_TO_DEFAULT_CONNECTION_UNSPECIFIED = 'FALLBACK_TO_DEFAULT_CONNECTION_UNSPECIFIED',
  FALLBACK_TO_DEFAULT_CONNECTION_ALLOWED = 'FALLBACK_TO_DEFAULT_CONNECTION_ALLOWED',
  FALLBACK_TO_DEFAULT_CONNECTION_DISALLOWED = 'FALLBACK_TO_DEFAULT_CONNECTION_DISALLOWED',
}

enum NonMatchingNetworks {
  NON_MATCHING_NETWORKS_UNSPECIFIED = 'NON_MATCHING_NETWORKS_UNSPECIFIED',
  NON_MATCHING_NETWORKS_ALLOWED = 'NON_MATCHING_NETWORKS_ALLOWED',
  NON_MATCHING_NETWORKS_DISALLOWED = 'NON_MATCHING_NETWORKS_DISALLOWED',
}

type ApnPolicy = {
  overrideApns: OverrideApns;
  apnSettings: ApnSetting[];
};

type ApnSetting = {
  apnTypes: ApnType[];
  apn: string;
  displayName: string;
  alwaysOnSetting: AlwaysOnSetting;
  authType: AuthType;
  carrierId: number;
  mmsProxyAddress: string;
  mmsProxyPort: number;
  mmsc: string;
  mtuV4: number;
  mtuV6: number;
  mvnoType: MvnoType;
  networkTypes: NetworkType[];
  username: string;
  password: string;
  numericOperatorId: string;
  protocol: Protocol;
  roamingProtocol: Protocol;
  proxyAddress: string;
  proxyPort: number;
};

enum AlwaysOnSetting {
  ALWAYS_ON_SETTING_UNSPECIFIED = 'ALWAYS_ON_SETTING_UNSPECIFIED',
  NOT_ALWAYS_ON = 'NOT_ALWAYS_ON',
  ALWAYS_ON = 'ALWAYS_ON',
}

enum AuthType {
  AUTH_TYPE_UNSPECIFIED = 'AUTH_TYPE_UNSPECIFIED',
  NONE = 'NONE',
  PAP = 'PAP',
  CHAP = 'CHAP',
  PAP_OR_CHAP = 'PAP_OR_CHAP',
}

enum MvnoType {
  MVNO_TYPE_UNSPECIFIED = 'MVNO_TYPE_UNSPECIFIED',
  GID = 'GID',
  ICCID = 'ICCID',
  IMSI = 'IMSI',
  SPN = 'SPN',
}

enum ApnType {
  APN_TYPE_UNSPECIFIED = 'APN_TYPE_UNSPECIFIED',
  ENTERPRISE = 'ENTERPRISE',
  BIP = 'BIP',
  CBS = 'CBS',
  DEFAULT = 'DEFAULT',
  DUN = 'DUN',
  EMERGENCY = 'EMERGENCY',
  FOTA = 'FOTA',
  HIPRI = 'HIPRI',
  IA = 'IA',
  IMS = 'IMS',
  MCX = 'MCX',
  MMS = 'MMS',
  RCS = 'RCS',
  SUPL = 'SUPL',
  VSIM = 'VSIM',
  XCAP = 'XCAP',
}

enum NetworkType {
  NETWORK_TYPE_UNSPECIFIED = 'NETWORK_TYPE_UNSPECIFIED',
  EDGE = 'EDGE',
  GPRS = 'GPRS',
  GSM = 'GSM',
  HSDPA = 'HSDPA',
  HSPA = 'HSPA',
  HSPAP = 'HSPAP',
  HSUPA = 'HSUPA',
  IWLAN = 'IWLAN',
  LTE = 'LTE',
  NR = 'NR',
  TD_SCDMA = 'TD_SCDMA',
  UMTS = 'UMTS',
}

enum Protocol {
  PROTOCOL_UNSPECIFIED = 'PROTOCOL_UNSPECIFIED',
  IP = 'IP',
  IPV4V6 = 'IPV4V6',
  IPV6 = 'IPV6',
  NON_IP = 'NON_IP',
  PPP = 'PPP',
  UNSTRUCTURED = 'UNSTRUCTURED',
}

type DeviceRadioState = {
  wifiState: WifiState;
  airplaneModeState: AirplaneModeState;
  ultraWidebandState: UltraWidebandState;
  cellularTwoGState: CellularTwoGState;
  minimumWifiSecurityLevel: MinimumWifiSecurityLevel;
  userInitiatedAddEsimSettings: UserInitiatedAddEsimSettings;
};
enum AirplaneModeState {
  AIRPLANE_MODE_STATE_UNSPECIFIED = 'AIRPLANE_MODE_STATE_UNSPECIFIED',
  AIRPLANE_MODE_USER_CHOICE = 'AIRPLANE_MODE_USER_CHOICE',
  AIRPLANE_MODE_DISABLED = 'AIRPLANE_MODE_DISABLED',
}

enum UltraWidebandState {
  ULTRA_WIDEBAND_STATE_UNSPECIFIED = 'ULTRA_WIDEBAND_STATE_UNSPECIFIED',
  ULTRA_WIDEBAND_USER_CHOICE = 'ULTRA_WIDEBAND_USER_CHOICE',
  ULTRA_WIDEBAND_DISABLED = 'ULTRA_WIDEBAND_DISABLED',
}

enum CellularTwoGState {
  CELLULAR_TWO_G_STATE_UNSPECIFIED = 'CELLULAR_TWO_G_STATE_UNSPECIFIED',
  CELLULAR_TWO_G_USER_CHOICE = 'CELLULAR_TWO_G_USER_CHOICE',
  CELLULAR_TWO_G_DISABLED = 'CELLULAR_TWO_G_DISABLED',
}

enum MinimumWifiSecurityLevel {
  MINIMUM_WIFI_SECURITY_LEVEL_UNSPECIFIED = 'MINIMUM_WIFI_SECURITY_LEVEL_UNSPECIFIED',
  OPEN_NETWORK_SECURITY = 'OPEN_NETWORK_SECURITY',
  PERSONAL_NETWORK_SECURITY = 'PERSONAL_NETWORK_SECURITY',
  ENTERPRISE_NETWORK_SECURITY = 'ENTERPRISE_NETWORK_SECURITY',
  ENTERPRISE_BIT192_NETWORK_SECURITY = 'ENTERPRISE_BIT192_NETWORK_SECURITY',
}

enum UserInitiatedAddEsimSettings {
  USER_INITIATED_ADD_ESIM_SETTINGS_UNSPECIFIED = 'USER_INITIATED_ADD_ESIM_SETTINGS_UNSPECIFIED',
  USER_INITIATED_ADD_ESIM_ALLOWED = 'USER_INITIATED_ADD_ESIM_ALLOWED',
  USER_INITIATED_ADD_ESIM_DISALLOWED = 'USER_INITIATED_ADD_ESIM_DISALLOWED',
}

enum WifiState {
  IPV6 = 'IPV6',
  NON_IP = 'NON_IP',
  PPP = 'PPP',
  UNSTRUCTURED = 'UNSTRUCTURED',
}

enum OverrideApns {
  OVERRIDE_APNS_UNSPECIFIED = 'OVERRIDE_APNS_UNSPECIFIED',
  OVERRIDE_APNS_DISABLED = 'OVERRIDE_APNS_DISABLED',
  OVERRIDE_APNS_ENABLED = 'OVERRIDE_APNS_ENABLED',
}

enum CredentialProviderPolicyDefault {
  CREDENTIAL_PROVIDER_POLICY_DEFAULT_UNSPECIFIED = 'CREDENTIAL_PROVIDER_POLICY_DEFAULT_UNSPECIFIED',
  CREDENTIAL_PROVIDER_DEFAULT_DISALLOWED = 'CREDENTIAL_PROVIDER_DEFAULT_DISALLOWED',
  CREDENTIAL_PROVIDER_DEFAULT_DISALLOWED_EXCEPT_SYSTEM = 'CREDENTIAL_PROVIDER_DEFAULT_DISALLOWED_EXCEPT_SYSTEM',
}

enum PrintingPolicy {
  PRINTING_POLICY_UNSPECIFIED = 'PRINTING_POLICY_UNSPECIFIED',
  PRINTING_DISALLOWED = 'PRINTING_DISALLOWED',
  PRINTING_ALLOWED = 'PRINTING_ALLOWED',
}

type DisplaySettings = {
  screenBrightnessSettings: ScreenBrightnessSettings;
  screenTimeoutSettings: ScreenTimeoutSettings;
};

type ScreenBrightnessSettings = {
  screenBrightnessMode: ScreenBrightnessMode;
  screenBrightness: number;
};

enum ScreenBrightnessMode {
  SCREEN_BRIGHTNESS_MODE_UNSPECIFIED = 'SCREEN_BRIGHTNESS_MODE_UNSPECIFIED',
  BRIGHTNESS_USER_CHOICE = 'BRIGHTNESS_USER_CHOICE',
  BRIGHTNESS_AUTOMATIC = 'BRIGHTNESS_AUTOMATIC',
  BRIGHTNESS_FIXED = 'BRIGHTNESS_FIXED',
}

type ScreenTimeoutSettings = {
  screenTimeoutMode: ScreenTimeoutMode;
  screenTimeout: string;
};

enum ScreenTimeoutMode {
  SCREEN_TIMEOUT_MODE_UNSPECIFIED = 'SCREEN_TIMEOUT_MODE_UNSPECIFIED',
  SCREEN_TIMEOUT_USER_CHOICE = 'SCREEN_TIMEOUT_USER_CHOICE',
  SCREEN_TIMEOUT_ENFORCED = 'SCREEN_TIMEOUT_ENFORCED',
}

enum AssistContentPolicy {
  ASSIST_CONTENT_POLICY_UNSPECIFIED = 'ASSIST_CONTENT_POLICY_UNSPECIFIED',
  ASSIST_CONTENT_DISALLOWED = 'ASSIST_CONTENT_DISALLOWED',
  ASSIST_CONTENT_ALLOWED = 'ASSIST_CONTENT_ALLOWED',
}

type WorkAccountSetupConfig = {
  authenticationType: AuthenticationType;
  requiredAccountEmail: string;
};

enum AuthenticationType {
  AUTHENTICATION_TYPE_UNSPECIFIED = 'AUTHENTICATION_TYPE_UNSPECIFIED',
  AUTHENTICATION_TYPE_NOT_ENFORCED = 'AUTHENTICATION_TYPE_NOT_ENFORCED',
  GOOGLE_AUTHENTICATED = 'GOOGLE_AUTHENTICATED',
}

export type ApplicationPolicyChange = {
  // If ApplicationPolicy.packageName matches an existing ApplicationPolicy object within the Policy being modified, then that object will be updated. Otherwise, it will be added to the end of the Policy.applications.
  application: ApplicationPolicy;

  // The field mask indicating the fields to update. If omitted, all modifiable fields are updated.
  updateMask: string;
};
