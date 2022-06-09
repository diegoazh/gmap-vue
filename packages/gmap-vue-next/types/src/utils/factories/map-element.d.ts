import type { IGmapVueElementOptions } from '@/interfaces/gmap-vue.interface';
import type { ComponentOptions } from 'vue';
/**
 * A helper to build your own component for the plugin
 *
 * @param {Object} providedOptions
 * @param {Object} providedOptions.mappedProps - Definitions of props
 * @param {Object} providedOptions.mappedProps.PROP.type - Value type
 * @param {Boolean} providedOptions.mappedProps.PROP.twoWay
 *  - Whether the prop has a corresponding PROP_changed
 *   event
 * @param {Boolean} providedOptions.mappedProps.PROP.noBind
 *  - If true, do not apply the default bindProps / bindEvents.
 * However it will still be added to the list of component props
 * @param {Object} providedOptions.props - Regular Vue-style props.
 *  Note: must be in the Object form because it will be
 *  merged with the `mappedProps`
 *
 * @param {Object} providedOptions.events - Google Maps API events
 *  that are not bound to a corresponding prop
 * @param {String} providedOptions.name - e.g. `polyline`
 * @param {Function} providedOptions.ctr - constructor, e.g.
 *  `google.maps.Polyline`. However, since this is not
 *  generally available during library load, this becomes
 *  a function instead, e.g. () => google.maps.Polyline
 *  which will be called only after the API has been loaded
 *
 *  default: () => String
 *
 * @param {Function} providedOptions.ctrArgs -
 *   If the constructor in `ctr` needs to be called with
 *   arguments other than a single `options` object, e.g. for
 *   GroundOverlay, we call `new GroundOverlay(url, bounds, options)`
 *   then pass in a function that returns the argument list as an array
 *
 *   default: (MappedProps, OtherVueProps) => Array
 *
 * Otherwise, the constructor will be called with an `options` object,
 *   with property and values merged from:
 *
 *   1. the `options` property, if any
 *   2. a `map` property with the Google Maps
 *   3. all the properties passed to the component in `mappedProps`
 * @param {Function} providedOptions.beforeCreate -
 *  Hook to modify the options passed to the initializer
 *
 *  default: (Object) => Any
 *
 * @param {Function} providedOptions.afterCreate -
 *  Hook called when
 *
 *  default: (options.ctr, Object) => Any
 *
 * @returns {Object} A component object that should be exported by default from a Vue component
 */
declare function mapElement(providedOptions: IGmapVueElementOptions): ComponentOptions;
export default mapElement;
