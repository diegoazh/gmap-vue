import type { ILoadPluginOptions, IPluginOptions } from '@/interfaces/gmap-vue.interface';
export declare type GlobalGoogleObject = {
    [key: string]: any;
};
export declare type GoogleMapsAPIInitializerFn = (options: ILoadPluginOptions, loadCn?: boolean) => void;
export declare type PromiseLazyCreatorFn = (options: IPluginOptions) => () => any;
export declare type LazyValueGetterFn = () => any;
