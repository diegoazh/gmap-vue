import type {
  IGoogleMapProp,
  ILoadPluginOptions,
  IPluginOptions,
  IVueProp,
} from '@/interfaces/gmap-vue.interface';

export type GlobalGoogleObject = { [key: string]: any };
export type GoogleMapsAPIInitializerFn = (
  options: ILoadPluginOptions,
  loadCn?: boolean
) => void;
export type LazyValueGetterFn = () => Promise<any>;
export type PromiseLazyCreatorFn = (
  options: IPluginOptions
) => LazyValueGetterFn;
export type AutocompleteHtmlInput = HTMLInputElement & {
  attachEvent: Function;
};
export type GmapVuePluginProps = { [key: string]: IVueProp & IGoogleMapProp };
