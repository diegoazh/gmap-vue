---
title: promise-lazy
---

# promise-lazy

<a name="getPromiseLazyCreatorFn"></a>

## getPromiseLazyCreatorFn(googleMapsApiInitializer, GoogleMapsApi) ⇒ <code>function</code>
This function is a factory of the promise lazy creator
it helps you creating the function that will call the
Google Maps API in an async way

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| googleMapsApiInitializer | <code>function</code> | function that initialize the Google Maps API |
| GoogleMapsApi | <code>Object</code> | Vue instance that will help to know if the google API object is ready |


* [getPromiseLazyCreatorFn(googleMapsApiInitializer, GoogleMapsApi)](#getPromiseLazyCreatorFn) ⇒ <code>function</code>
    * [~promiseLazyCreator(options)](#getPromiseLazyCreatorFn..promiseLazyCreator)
        * [~onMapsReady()](#getPromiseLazyCreatorFn..promiseLazyCreator..onMapsReady) ⇒ <code>Object</code>

<a name="getPromiseLazyCreatorFn..promiseLazyCreator"></a>

### getPromiseLazyCreatorFn~promiseLazyCreator(options)
The creator of the lazy promise

**Kind**: inner method of [<code>getPromiseLazyCreatorFn</code>](#getPromiseLazyCreatorFn)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> \| <code>undefined</code> |  | configuration object to initialize the GmapVue plugin |
| options.installComponents | <code>boolean</code> | <code>true</code> | install all components |
| options.autoBindAllEvents | <code>boolean</code> | <code>false</code> | auto bind all Google Maps API events |
| options.load | <code>Object</code> \| <code>undefined</code> |  | options to configure the Google Maps API |
| options.load.key | <code>string</code> |  | your Google Maps API key |
| options.load.libraries | <code>string</code> | <code>&quot;places&quot;</code> | the Google Maps libraries that you will use eg: 'places,drawing,visualization' |
| options.load.v | <code>string</code> \| <code>undefined</code> |  | the Google Maps API version, default latest |
| options.load.callback | <code>string</code> \| <code>undefined</code> | <code>&quot;GoogleMapsCallback&quot;</code> | This must be ignored if have another callback that you need to run when Google Maps API is ready please use the `customCallback` option. |
| options.load.customCallback | <code>string</code> \| <code>undefined</code> |  | If you already have an script tag that loads Google Maps API and you want to use it set you callback here and our callback `GoogleMapsCallback` will execute your custom callback at the end; it must attached to the `window` object, is the only requirement. |

<a name="getPromiseLazyCreatorFn..promiseLazyCreator..onMapsReady"></a>

#### promiseLazyCreator~onMapsReady() ⇒ <code>Object</code>
Things to do once the API is loaded

**Kind**: inner method of [<code>promiseLazyCreator</code>](#getPromiseLazyCreatorFn..promiseLazyCreator)  
**Returns**: <code>Object</code> - the Google Maps API object  
