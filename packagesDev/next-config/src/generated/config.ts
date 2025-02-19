/* eslint-disable */
import { z } from 'zod'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CompareVariant =
  | 'CHECKBOX'
  | 'ICON';

/**
 * # GraphCommerce configuration system
 *
 * Global GraphCommerce configuration can be configured in your `graphcommerce.config.js` file
 * in the root of your project and are automatically validated on startup.
 *
 * ## Configuring with the configuration file.
 *
 * The configuration file is a javascript file that exports a `GraphCommerceConfig` object. See graphcommerce.config.js.example for an example.
 *
 * ## Using configuration
 *
 * Configuration can be accessed in your project with the `import.meta.graphCommerce` object.
 *
 * ```tsx
 * import { storefrontAll, storefrontConfig, storefrontConfigDefault, useStorefrontConfig } from '@graphcommerce/next-ui'
 *
 * // Accessing a global value
 * const globalConf = import.meta.graphCommerce.cartDisplayPricesInclTax
 *
 * function MyComponent() {
 *   // Configuration configured per storefront locale.
 *   const scopedConfig = useStorefrontConfig().cartDisplayPricesInclTax
 *
 *   // Creating a fallback system
 *   const scopedConfigWithFallback = scopedConfig ?? globalConf
 *
 *   // Or as single line
 *   const scopedConfigWithFallback2 =
 *     useStorefrontConfig().cartDisplayPricesInclTax ?? import.meta.graphCommerce.cartDisplayPricesInclTax
 *
 *   return <div>{googleRecaptchaKey}</div>
 * }
 * ```
 *
 * You can also use the configuration in your `.meshrc.yml` by accessing
 * `{graphCommerce.myField}`
 *
 * ```yml
 * endpoint: '{graphCommerce.magentoEndpoint}'
 * ```
 *
 * ## Environment variables to override configuration
 *
 * Configuration values can be overwriten by environment variables, with the following rules:
 * - Convert from camelCase to `SCREAMING_SNAKE_CASE`
 * - Prefix with `GC_`
 * - Arrays can be indexed with `_0`, `_1`, `_2`, etc.
 * - Objects can be accessed with `_<key>`.
 *
 * Examples:
 * - `limitSsg` -> `GC_LIMIT_SSG="1"`
 * - `storefront[0].locale` -> `GC_STOREFRONT_0_LOCALE="en"`
 * - `debug.pluginStatus` -> `GC_DEBUG_PLUGIN_STATUS="1"`
 *
 *
 * ## Exporting current configuration to environment variables
 *
 * You can export configuration by running `yarn graphcommerce export-config`
 *
 * ## Extending the configuration in your  project
 *
 * Create a graphql/Config.graphqls file in your project and extend the GraphCommerceConfig, GraphCommerceStorefrontConfig inputs to add configuration.
 *
 * ```graphql
 * extend input GraphCommerceConfig {
 *   myConfig: String # or Boolean, or Int, or Float, make required with `!`
 * }
 * extend input GraphCommerceStorefrontConfig {
 *   myField: Boolean
 * }
 * ```
 *
 * ## All configuration values
 *
 * Below is a list of all possible configurations that can be set by GraphCommerce.
 */
export type GraphCommerceConfig = {
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl: Scalars['String']['input'];
  /**
   * Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax.
   *
   * When Magento's StoreConfig adds this value, this can be replaced.
   */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']['input']>;
  /** Use compare functionality */
  compare?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * By default the compare feature is denoted with a 'compare ICON' (2 arrows facing one another).
   * This may be fine for experienced users, but for more clarity it's also possible to present the compare feature as a CHECKBOX accompanied by the 'Compare' label
   */
  compareVariant?: InputMaybe<CompareVariant>;
  /**
   * If a simple product is part of a Configurable product page, should the simple product be
   * rendered as a configured option of the configurable product page?
   *
   * How does this work:
   *
   * When the `products(filters: { url_key: { eq: 'simple-product' } }) { ... }` query is ran,
   * Magento also returns the Simple product and the Configurable product the simple belongs to.
   *
   * If that is the case we render the configurable product page instead of the simple product page but
   * the options to select the simple product are pre-selected.
   */
  configurableVariantForSimple?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Due to a limitation in the GraphQL API of Magento 2, we need to know if the
   * customer requires email confirmation.
   *
   * This value should match Magento 2's configuration value for
   * `customer/create_account/confirm` and should be removed once we can query
   */
  customerRequireEmailConfirmation?: InputMaybe<Scalars['Boolean']['input']>;
  /** Debug configuration for GraphCommerce */
  debug?: InputMaybe<GraphCommerceDebugConfig>;
  /**
   * Enables some demo specific code that is probably not useful for a project:
   *
   * - Adds the "BY GC" to the product list items.
   * - Adds "dominant_color" attribute swatches to the product list items.
   * - Creates a big list items in the product list.
   */
  demoMode?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * See https://support.google.com/analytics/answer/9539598?hl=en
   *
   * Provide a value to enable Google Analytics for your store.
   *
   * To override the value for a specific locale, configure in i18n config.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  /**
   * Google reCAPTCHA site key.
   * When using reCAPTCHA, this value is required, even if you are configuring different values for each locale.
   *
   * Get a site key and a secret key from https://developers.google.com/recaptcha/docs/v3
   *
   * The secret key should be added in the Magento admin panel (Stores > Configuration > Security > Google ReCAPTCHA Storefront > reCAPTCHA v3 Invisible)
   * ReCAPTCHA can then be enabled/disabled for the different forms, separately (Stores > Configuration > Security > Google ReCAPTCHA Storefront > Storefront)
   */
  googleRecaptchaKey?: InputMaybe<Scalars['String']['input']>;
  /**
   * The Google Tagmanager ID to be used on the site.
   *
   * This value is required even if you are configuring different values for each locale.
   */
  googleTagmanagerId?: InputMaybe<Scalars['String']['input']>;
  /**
   * The HyGraph endpoint.
   *
   * > Read-only endpoint that allows low latency and high read-throughput content delivery.
   *
   * Project settings -> API Access -> High Performance Read-only Content API
   */
  hygraphEndpoint: Scalars['String']['input'];
  /**
   * Content API. **Only used for migrations.**
   *
   * > Regular read & write endpoint that allows querying and mutating data in your project.
   *
   * Project settings -> API Access -> Content API
   */
  hygraphWriteAccessEndpoint?: InputMaybe<Scalars['String']['input']>;
  /**
   * Hygraph Management SDK Authorization Token. **Only used for migrations.**
   *
   * Project settings -> API Access -> Permanent Auth Tokens
   *
   * 1. Click  'Add token' and give it a name, something like 'GraphCommerce Write Access Token' and keep stage on 'Published'.
   * 2. Under 'Management API', click 'Yes, Initialize defaults'
   * 3. Click 'Edit Permissions' and enable: 'Update' and 'Delete' permissions for 'models', 'enumerations', 'fields', 'components' and 'sources'
   *   - Update existing models
   *   - Delete existing models
   *   - Update existing fields
   *   - Delete existing fields
   *   - Update existing enumerations
   *   - Delete existing enumerations
   *   - Update existing components
   *   - Delete existing components
   *   - Update remote sources
   *   - Delete remote sources
   *
   * ```
   * GC_HYGRAPH_WRITE_ACCESS_ENDPOINT="https://...hygraph.com/v2/..."
   * GC_HYGRAPH_WRITE_ACCESS_TOKEN="AccessTokenFromHygraph"
   * yarn graphcommerce hygraph-migrate
   * ```
   */
  hygraphWriteAccessToken?: InputMaybe<Scalars['String']['input']>;
  /**
   * On older versions of GraphCommerce products would use a product type specific route.
   *
   * This should only be set to true if you use the /product/[url] AND /product/configurable/[url] routes.
   *
   * @deprecated Will be removed in a future version. [migration](../upgrading/graphcommerce-5-to-6.md#product-routing-changes)
   */
  legacyProductRoute?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit the static generation of SSG when building */
  limitSsg?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * GraphQL Magento endpoint.
   *
   * Examples:
   * - https://magento2.test/graphql
   */
  magentoEndpoint: Scalars['String']['input'];
  /** To enable next.js' preview mode, configure the secret you'd like to use. */
  previewSecret?: InputMaybe<Scalars['String']['input']>;
  /**
   * Layout how the filters are rendered.
   * DEFAULT: Will be rendered as horzontal chips on desktop and mobile
   * SIDEBAR: Will be rendered as a sidebar on desktop and horizontal chips on mobile
   */
  productFiltersLayout?: InputMaybe<ProductFiltersLayout>;
  /**
   * Product filters with better UI for mobile and desktop.
   *
   * @experimental This is an experimental feature and may change in the future.
   */
  productFiltersPro?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * By default we route products to /p/[url] but you can change this to /product/[url] if you wish.
   *
   * Default: '/p/'
   * Example: '/product/'
   */
  productRoute?: InputMaybe<Scalars['String']['input']>;
  /**
   * Allow the site to be indexed by search engines.
   * If false, the robots.txt file will be set to disallow all.
   */
  robotsAllow?: InputMaybe<Scalars['Boolean']['input']>;
  /** All storefront configuration for the project */
  storefront: Array<GraphCommerceStorefrontConfig>;
  /** Hide the wishlist functionality for guests. */
  wishlistHideForGuests?: InputMaybe<Scalars['Boolean']['input']>;
  /** Ignores whether a product is already in the wishlist, makes the toggle an add only. */
  wishlistIgnoreProductWishlistStatus?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show a message when the product is added to the wishlist. */
  wishlistShowFeedbackMessage?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Debug configuration for GraphCommerce */
export type GraphCommerceDebugConfig = {
  /** Reports which plugins are enabled or disabled. */
  pluginStatus?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Cyclic dependencies can cause memory issues and other strange bugs.
   * This plugin will warn you when it detects a cyclic dependency.
   *
   * When running into memory issues, it can be useful to enable this plugin.
   */
  webpackCircularDependencyPlugin?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * When updating packages it can happen that the same package is included with different versions in the same project.
   *
   * Issues that this can cause are:
   * - The same package is included multiple times in the bundle, increasing the bundle size.
   * - The Typescript types of the package are not compatible with each other, causing Typescript errors.
   */
  webpackDuplicatesPlugin?: InputMaybe<Scalars['Boolean']['input']>;
};

/** All storefront configuration for the project */
export type GraphCommerceStorefrontConfig = {
  /**
   * The canonical base URL is used for SEO purposes.
   *
   * Examples:
   * - https://example.com
   * - https://example.com/en
   * - https://example.com/en-US
   */
  canonicalBaseUrl?: InputMaybe<Scalars['String']['input']>;
  /** Due to a limitation of the GraphQL API it is not possible to determine if a cart should be displayed including or excluding tax. */
  cartDisplayPricesInclTax?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * There can only be one entry with defaultLocale set to true.
   * - If there are more, the first one is used.
   * - If there is none, the first entry is used.
   */
  defaultLocale?: InputMaybe<Scalars['Boolean']['input']>;
  /** Domain configuration, must be a domain https://tools.ietf.org/html/rfc3986 */
  domain?: InputMaybe<Scalars['String']['input']>;
  /**
   * Configure different Google Analytics IDs for different locales.
   *
   * To disable for a specific locale, set the value to null.
   */
  googleAnalyticsId?: InputMaybe<Scalars['String']['input']>;
  /** Locale specific google reCAPTCHA key. */
  googleRecaptchaKey?: InputMaybe<Scalars['String']['input']>;
  /** The Google Tagmanager ID to be used per locale. */
  googleTagmanagerId?: InputMaybe<Scalars['String']['input']>;
  /** Add a gcms-locales header to make sure queries return in a certain language, can be an array to define fallbacks. */
  hygraphLocales?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Specify a custom locale for to load translations. */
  linguiLocale?: InputMaybe<Scalars['String']['input']>;
  /** Must be a locale string https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers */
  locale: Scalars['String']['input'];
  /**
   * Magento store code.
   *
   * Stores => All Stores => [Store View] => Store View Code
   *
   * Examples:
   * - default
   * - en-us
   * - b2b-us
   */
  magentoStoreCode: Scalars['String']['input'];
};

export type ProductFiltersLayout =
  | 'DEFAULT'
  | 'SIDEBAR';


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const CompareVariantSchema = z.enum(['CHECKBOX', 'ICON']);

export const ProductFiltersLayoutSchema = z.enum(['DEFAULT', 'SIDEBAR']);

export function GraphCommerceConfigSchema(): z.ZodObject<Properties<GraphCommerceConfig>> {
  return z.object({
    canonicalBaseUrl: z.string().min(1),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    compare: z.boolean().nullish(),
    compareVariant: CompareVariantSchema.nullish(),
    configurableVariantForSimple: z.boolean().nullish(),
    customerRequireEmailConfirmation: z.boolean().nullish(),
    debug: GraphCommerceDebugConfigSchema().nullish(),
    demoMode: z.boolean().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphEndpoint: z.string().min(1),
    hygraphWriteAccessEndpoint: z.string().nullish(),
    hygraphWriteAccessToken: z.string().nullish(),
    legacyProductRoute: z.boolean().nullish(),
    limitSsg: z.boolean().nullish(),
    magentoEndpoint: z.string().min(1),
    previewSecret: z.string().nullish(),
    productFiltersLayout: ProductFiltersLayoutSchema.nullish(),
    productFiltersPro: z.boolean().nullish(),
    productRoute: z.string().nullish(),
    robotsAllow: z.boolean().nullish(),
    storefront: z.array(GraphCommerceStorefrontConfigSchema()),
    wishlistHideForGuests: z.boolean().nullish(),
    wishlistIgnoreProductWishlistStatus: z.boolean().nullish(),
    wishlistShowFeedbackMessage: z.boolean().nullish()
  })
}

export function GraphCommerceDebugConfigSchema(): z.ZodObject<Properties<GraphCommerceDebugConfig>> {
  return z.object({
    pluginStatus: z.boolean().nullish(),
    webpackCircularDependencyPlugin: z.boolean().nullish(),
    webpackDuplicatesPlugin: z.boolean().nullish()
  })
}

export function GraphCommerceStorefrontConfigSchema(): z.ZodObject<Properties<GraphCommerceStorefrontConfig>> {
  return z.object({
    canonicalBaseUrl: z.string().nullish(),
    cartDisplayPricesInclTax: z.boolean().nullish(),
    defaultLocale: z.boolean().nullish(),
    domain: z.string().nullish(),
    googleAnalyticsId: z.string().nullish(),
    googleRecaptchaKey: z.string().nullish(),
    googleTagmanagerId: z.string().nullish(),
    hygraphLocales: z.array(z.string().min(1)).nullish(),
    linguiLocale: z.string().nullish(),
    locale: z.string().min(1),
    magentoStoreCode: z.string().min(1)
  })
}
