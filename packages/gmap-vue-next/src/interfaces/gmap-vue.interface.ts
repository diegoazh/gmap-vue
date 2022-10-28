import type { SinglePluginComponentConfig } from '@/types/gmap-vue.types';

export interface IGoogleMapsApiObject {
  isReady: boolean;
}

/**
 * The object which contain all event names to and params that should be used to add listener to the Google Maps instance
 * @typedef {Object} LoadPluginOptions
 * @property {string} key - The Google Maps key
 * @property {string} libraries - The Google Maps libraries that should be loaded
 * @property {string?} v - The Google Maps version that should be loaded
 * @property {string?} callback - The callback name that should be called when Google Maps is ready
 * @property {string?} customCallback - The custom callback name that should be called when Google Maps is ready this overrides the callback property
 */
export interface ILoadPluginOptions {
  key: string;
  libraries: string;
  v?: string;
  callback?: string;
  customCallback?: string;
}

/**
 * @typedef {() => string[]} ExcludeEvents
 *
 *
 * The object which contain all event names to and params that should be used to add listener to the Google Maps instance
 * @typedef {object} PluginOptions - The options requred to configure the plugin
 * @property {boolean} [dynamicLoad=false] - The plugin should be loaded dynamically
 * @property {boolean} [installComponents=true] - The plugin should install all components
 * @property {LoadPluginOptions} [load] - All load plugin options
 * @property {boolean} [loadCn=false] - The plugin should be loaded using the cn url
 * @property {ExcludeEvents} [excludeEventsOnAllComponents] - A function that should return an array of events that should not be fired
 */
export interface IPluginOptions {
  dynamicLoad?: boolean;
  installComponents?: boolean;
  load?: ILoadPluginOptions;
  loadCn?: boolean;
  excludeEventsOnAllComponents?: () => string[];
}

export interface IVueProp {
  type?:
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | ArrayConstructor
    | ObjectConstructor
    | DateConstructor
    | FunctionConstructor
    | SymbolConstructor;
  required?: boolean;
  default?: () => undefined;
  validator?: () => boolean;
}

export interface IGoogleMapProp {
  twoWay?: boolean;
  noBind?: boolean;
  trackProperties?: string[];
}

export interface IGmapVueElementOptions {
  mappedProps: Omit<SinglePluginComponentConfig, 'events'>;
  props: { [key: string]: IVueProp };
  events: string[];
  name: string;
  ctr: () => any;
  ctrArgs: (
    options: { [key: string]: any },
    props: { [key: string]: IVueProp }
  ) => any[];
  beforeCreate: (options: { [key: string]: any }) => any;
  afterCreate: (mapElementInstance: { [key: string]: any }) => any;
}

export interface IMapPromiseFactory {
  $mapPromise: Promise<google.maps.Map | null>;
  $mapPromiseDeferred:
    | {
        resolve: Function;
        reject: Function;
      }
    | undefined;
}

export interface PromiseDeferred<T> {
  resolve: ((value: T | undefined) => void) | undefined;
  reject: ((reason?: any) => void) | undefined;
}
