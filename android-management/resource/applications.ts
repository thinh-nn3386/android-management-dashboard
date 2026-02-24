/* eslint-disable @typescript-eslint/no-explicit-any */

// Information about an app.
export type Application = {
  // The name of the app in the form enterprises/{enterprise}/applications/{packageName}.
  name: string;

  // The title of the app. Localized.
  title: string;

  // The permissions required by the app.
  permissions: ApplicationPermission[];

  // The set of managed properties available to be pre-configured for the app.
  managedProperties: ManagedProperty[];

  // A link to an image that can be used as an icon for the app. This image is suitable for use up to a pixel size of 512 x 512.
  iconUrl: string;

  // A link to a smaller image that can be used as an icon for the app. This image is suitable for use up to a pixel size of 128 x 128.
  smallIconUrl: string;

  // Application tracks visible to the enterprise.
  appTracks: AppTrackInfo[];

  // The name of the author of the apps (for example, the app developer).
  author: string;

  // A link to the (consumer) Google Play details page for the app.
  playStoreUrl: string;

  // How and to whom the package is made available.
  distributionChannel: DistributionChannel;

  // Whether this app is free, free with in-app purchases, or paid. If the pricing is unspecified, this means the app is not generally available anymore (even though it might still be available to people who own it).
  appPricing: AppPricing;

  // The localized promotional description, if available.
  description: string;

  // A list of screenshot links representing the app.
  screenshotUrls: string[];

  // The app category (e.g. RACING, SOCIAL, etc.)
  category: string;

  // A localised description of the recent changes made to the app.
  recentChanges: string;

  // The minimum Android SDK necessary to run the app.
  minAndroidSdkVersion: number;

  // The content rating for this app.
  contentRating: ContentRating;

  // Output only. The approximate time (within 7 days) the app was last published.
  updateTime: string;

  // The countries which this app is available in as per ISO 3166-1 alpha-2.
  availableCountries: string[];

  // Noteworthy features (if any) of this app.
  features: AppFeature[];

  // Versions currently available for this app.
  appVersions: AppVersion[];

  // Full app description, if available.
  fullDescription: string;
};

// A permission required by the app.
export type ApplicationPermission = {
  // An opaque string uniquely identifying the permission. Not localized.
  permissionId: string;

  // The name of the permission. Localized.
  name: string;

  // A longer description of the permission, providing more detail on what it affects. Localized.
  description: string;
};

// Managed property.
export type ManagedProperty = {
  // The unique key that the app uses to identify the property, e.g. "com.google.android.gm.fieldname".
  key: string;

  // The type of the property.
  type: ManagedPropertyType;

  // The name of the property. Localized.
  title: string;

  // A longer description of the property, providing more detail of what it affects. Localized.
  description: string;

  // For CHOICE or MULTISELECT properties, the list of possible entries.
  entries: ManagedPropertyEntry[];

  // The default value of the property. BUNDLE_ARRAY properties don't have a default value.
  defaultValue: any;

  // For BUNDLE_ARRAY properties, the list of nested properties. A BUNDLE_ARRAY property is at most two levels deep.
  nestedProperties: ManagedProperty[];
};

// The type of the managed property.
export enum ManagedPropertyType {
  // Not used.
  MANAGED_PROPERTY_TYPE_UNSPECIFIED = 'MANAGED_PROPERTY_TYPE_UNSPECIFIED',

  // A property of boolean type.
  BOOL = 'BOOL',

  // 	A property of string type.
  STRING = 'STRING',

  // A property of integer type.
  INTEGER = 'INTEGER',

  // A choice of one item from a set.
  CHOICE = 'CHOICE',

  // A choice of multiple items from a set.
  MULTISELECT = 'MULTISELECT',

  // 	A hidden restriction of string type (the default value can be used to pass along information that can't be modified, such as a version code).
  HIDDEN = 'HIDDEN',

  // A bundle of properties
  BUNDLE_ARRAY = 'BUNDLE_ARRAY',

  // An array of property bundles.
  BUNDLE = 'BUNDLE',
}

// An entry of a managed property.
export type ManagedPropertyEntry = {
  // The machine-readable value of the entry, which should be used in the configuration. Not localized.
  value: string;

  // The human-readable name of the value. Localized.
  name: string;
};

// Id to name association of a app track.
export type AppTrackInfo = {
  // The unmodifiable unique track identifier, taken from the releaseTrackId in the URL of the Play Console page that displays the app’s track information.
  trackId: string;

  // The track name associated with the trackId, set in the Play Console. The name is modifiable from Play Console.
  trackAlias: string;
};

// Possible distribution channels.
export enum DistributionChannel {
  // Unspecified.
  DISTRIBUTION_CHANNEL_UNSPECIFIED = 'DISTRIBUTION_CHANNEL_UNSPECIFIED',

  // Package is available through the Play store and not restricted to a specific enterprise.
  PUBLIC_GOOGLE_HOSTED = 'PUBLIC_GOOGLE_HOSTED',

  // Package is a private app (restricted to an enterprise) but hosted by Google.
  PRIVATE_GOOGLE_HOSTED = 'PRIVATE_GOOGLE_HOSTED',

  // Private app (restricted to an enterprise) and is privately hosted.
  PRIVATE_SELF_HOSTED = 'PRIVATE_SELF_HOSTED',
}

// Possible app pricings.
export enum AppPricing {
  // Unknown pricing, used to denote an approved app that is not generally available.
  APP_PRICING_UNSPECIFIED = 'APP_PRICING_UNSPECIFIED',

  // The app is free.
  FREE = 'FREE',

  // The app is paid.
  PAID = 'PAID',

  // The app is free, but offers in-app purchases.
  FREE_WITH_IN_APP_PURCHASE = 'FREE_WITH_IN_APP_PURCHASE',
}

// Content rating following generic IARC standard.
export enum ContentRating {
  // Unspecified content rating.
  CONTENT_RATING_UNSPECIFIED = 'CONTENT_RATING_UNSPECIFIED',

  // Suitable for ages 3 and above.
  THREE_YEARS = 'THREE_YEARS',

  // Suitable for ages 7 and above.
  SEVEN_YEARS = 'SEVEN_YEARS',

  // Suitable for ages 12 and above.
  TWELVE_YEARS = 'TWELVE_YEARS',

  // Suitable for ages 15 and above.
  FIFTEEN_YEARS = 'FIFTEEN_YEARS',

  // Suitable for ages 18 and above.
  EIGHTEEN_YEARS = 'EIGHTEEN_YEARS',
}

// Possible app features.
export enum AppFeature {
  // Unspecified.
  APP_FEATURE_UNSPECIFIED = 'APP_FEATURE_UNSPECIFIED',

  // VPN application.
  VPN_APP = 'VPN_APP',
}

// This represents a single version of the app.
export type AppVersion = {
  // The string used in the Play store by the app developer to identify the version. The string is not necessarily unique or localized (for example, the string could be "1.4").
  versionString: string;

  // Unique increasing identifier for the app version.
  versionCode: number;

  // Track identifiers that the app version is published in. This does not include the production track (see production instead).
  trackIds: string[];

  // If the value is True, it indicates that this version is a production track.
  production: boolean;
};
