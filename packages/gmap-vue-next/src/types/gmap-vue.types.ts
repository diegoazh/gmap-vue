import type {
  ILoadPluginOptions,
  IPluginOptions,
} from '@/interfaces/gmap-vue.interface';

export type GlobalGoogleObject = { [key: string]: any };
export type GoogleMapsAPIInitializerFn = (
  options: ILoadPluginOptions,
  loadCn?: boolean
) => void;
export type PromiseLazyCreatorFn = (options: IPluginOptions) => () => any;
export type LazyValueGetterFn = () => any;
