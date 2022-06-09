import type { IGoogleMapProp, IPluginOptions, IVueProp } from '@/interfaces/gmap-vue.interface';
import type { LazyValueGetterFn } from '@/types/gmap-vue.types';
import type { ComponentPublicInstance } from 'vue';
/**
 * This function helps you to bind events from Google Maps API to Vue events
 *
 * @param  {Object} vueInst the Vue instance
 * @param  {Object} googleMapsInst the Google Maps instance
 * @param  {string[]} events an array of string with all events that you want to bind
 * @returns {void}
 */
export declare function bindEvents(vueInst: ComponentPublicInstance & {
    $gmapOptions: IPluginOptions;
}, googleMapsInst: Record<string, any>, events: string[]): void;
/**
 * Function that helps you to capitalize the first letter on a word
 *
 * @param  {string} text the text that you want to capitalize
 * @returns {string}
 */
export declare function capitalizeFirstLetter(text: string): string;
/**
 * Function that helps you to get all non nullable props from a component
 *
 * @param  {Object} vueInst the Vue component instance
 * @param  {Object} props the props object
 * @returns {Object}
 */
export declare function getPropsValues(vueInst: ComponentPublicInstance, props: Record<string, any>): {
    [key: string]: IVueProp;
};
/**
 * This function is a helper for return to the user the internal Google Maps promise
 * and can wait until it is ready.
 * This piece of code was orignally written by sindresorhus and can be seen here
 * @see https://github.com/sindresorhus/lazy-value/blob/master/index.js
 *
 *  @param  {Function} fn a function that actually return the promise or async value
 * @returns {Function} anonymous function that returns the value returned by the fn parameter
 */
export declare function getLazyValue(fn: Function): LazyValueGetterFn;
/**
 * Strips out the extraneous properties we have in our
 * mapped props definitions
 *
 * @param {Object} mappedProps the mapped props object
 * @returns {Object}
 */
export declare function mappedPropsToVueProps(mappedProps: Record<string, IVueProp & IGoogleMapProp>): Record<string, any>;
/**
 * This function simulates a down arrow key event when user
 * hits return (enter) on the autocomplete component selection
 * the first occurrence in the list.
 *
 * This piece of code was orignally written by amirnissim
 * and has been ported to Vanilla.js by GuillaumeLeclerc
 * @see http://stackoverflow.com/a/11703018/2694653
 *
 * @param  {Object} input the HTML input node element reference
 * @returns {void}
 */
export declare function downArrowSimulator(input: HTMLInputElement & {
    attachEvent: Function;
}): void;
/**
 * When you have two-way bindings, but the actual bound value will not equal
 * the value you initially passed in, then to avoid an infinite loop you
 * need to increment a counter every time you pass in a value, decrement the
 * same counter every time the bound value changed, but only bubble up
 * the event when the counter is zero.
 *
 * @param  {Function} fn Function to be executed to determine if the event was executed
 *
    Example:

    Let's say DrawingRecognitionCanvas is a deep-learning backed canvas
    that, when given the name of an object (e.g. 'dog'), draws a dog.
    But whenever the drawing on it changes, it also sends back its interpretation
    of the image by way of the @newObjectRecognized event.

    <input
      type="text"
      placeholder="an object, e.g. Dog, Cat, Frog"
      v-model="identifiedObject" />
    <DrawingRecognitionCanvas
      :object="identifiedObject"
      @newObjectRecognized="identifiedObject = $event"
      />

    new TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
      this.$watch('identifiedObject', () => {
        // new object passed in
        increment()
      })
      this.$deepLearningBackend.on('drawingChanged', () => {
        recognizeObject(this.$deepLearningBackend)
          .then((object) => {
            decrement()
            if (shouldUpdate()) {
              this.$emit('newObjectRecognized', object.name)
            }
          })
      })
    })
 */
export declare function twoWayBindingWrapper(fn: Function): void;
/**
 * Watch the individual properties of a PoD object, instead of the object
 * per se. This is different from a deep watch where both the reference
 * and the individual values are watched.
 *
 * In effect, it throttles the multiple $watch to execute at most once per tick.
 *
 * @param  {Object} vueInst the component instance
 * @param  {string[]} propertiesToTrack string array with all properties that you want to track
 * @param  {Function} handler function to be fired when the prop change
 * @param  {boolean} immediate=false
 * @returns {void}
 */
export declare function watchPrimitiveProperties(vueInst: ComponentPublicInstance, propertiesToTrack: string[], handler: Function, immediate?: boolean): void;
/**
 * Binds the properties defined in props to the google maps instance.
 * If the prop is an Object type, and we wish to track the properties
 * of the object (e.g. the lat and lng of a LatLng), then we do a deep
 * watch. For deep watch, we also prevent the _changed event from being
 * emitted if the data source was external.
 *
 * @param  {Object} vueInst the component instance
 * @param  {Object} googleMapsInst the Google Maps instance
 * @param  {Object} props object with the component props tha should be synched with the Google Maps instances props
 * @returns {void}
 */
export declare function bindProps(vueInst: ComponentPublicInstance & {
    $gmapOptions: IPluginOptions;
}, googleMapsInst: Record<string, any>, props: {
    [key: string]: IVueProp & IGoogleMapProp;
}): void;
declare const _default: {
    bindEvents: typeof bindEvents;
    bindProps: typeof bindProps;
    capitalizeFirstLetter: typeof capitalizeFirstLetter;
    getPropsValues: typeof getPropsValues;
    getLazyValue: typeof getLazyValue;
    mappedPropsToVueProps: typeof mappedPropsToVueProps;
    downArrowSimulator: typeof downArrowSimulator;
    twoWayBindingWrapper: typeof twoWayBindingWrapper;
    watchPrimitiveProperties: typeof watchPrimitiveProperties;
};
export default _default;
