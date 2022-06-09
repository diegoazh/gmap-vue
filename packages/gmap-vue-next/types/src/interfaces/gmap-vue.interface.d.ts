/// <reference types="google.maps" />
export interface IGoogleMapsApiObject {
    isReady: boolean;
}
export interface ILoadPluginOptions {
    key: string;
    libraries: string;
    v?: string;
    callback?: string;
    customCallback?: string;
}
export interface IPluginOptions {
    dynamicLoad: boolean;
    installComponents: boolean;
    autoBindAllEvents: boolean;
    load?: ILoadPluginOptions;
    loadCn?: boolean;
}
export interface IVueProp {
    type?: String | Number | Boolean | Object | Array<any>;
    default?: string | number | boolean | Function;
    required?: boolean;
    validator?: Function;
}
export interface IGoogleMapProp {
    twoWay?: boolean;
    noBind?: boolean;
    trackProperties?: string[];
}
export interface IGmapVueElementOptions {
    mappedProps: {
        [key: string]: IVueProp & IGoogleMapProp;
    };
    props: {
        [key: string]: IVueProp;
    };
    events: string[];
    name: string;
    ctr: () => any;
    ctrArgs: (options: {
        [key: string]: any;
    }, props: {
        [key: string]: IVueProp;
    }) => any[];
    beforeCreate: (options: {
        [key: string]: any;
    }) => any;
    afterCreate: (mapElementInstance: {
        [key: string]: any;
    }) => any;
}
export interface IMapPromiseFactory {
    $mapPromise: Promise<google.maps.Map | null>;
    $mapPromiseDeferred: {
        resolve: Function;
        reject: Function;
    } | undefined;
}
