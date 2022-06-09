var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { bindEvents, bindProps, getPropsValues, mappedPropsToVueProps, } from '../../composables/helpers';
import { useMapElement } from '../../composables/map-element';
/**
 * Custom assert for local validation
 *
 * @param  {boolean} v The expression that should return a boolean value, if false the assertion fails
 * @param  {string} message Error message to be displayed
 */
// eslint-disable-next-line no-underscore-dangle -- old style should be analyzed
function _assert(v, message) {
    if (!v)
        throw new Error(message);
}
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
function mapElement(providedOptions) {
    const { mappedProps, name, ctr, ctrArgs, events, beforeCreate, afterCreate, props } = providedOptions, rest = __rest(providedOptions, ["mappedProps", "name", "ctr", "ctrArgs", "events", "beforeCreate", "afterCreate", "props"]);
    const promiseName = `$${name}Promise`;
    const instanceName = `$${name}Object`;
    _assert(!(props instanceof Array), '`props` should be an object, not Array');
    return Object.assign({ props: Object.assign(Object.assign({}, props), mappedPropsToVueProps(mappedProps)), setup() {
            return __awaiter(this, void 0, void 0, function* () {
                const $map = yield useMapElement();
            });
        },
        render() {
            return '';
        },
        provide() {
            const promise = this.$mapPromise
                .then((map) => {
                // Infowindow needs this to be immediately available
                this.$map = map;
                // Initialize the maps with the given options
                const initialOptions = Object.assign(Object.assign(Object.assign({}, this.options), { map }), getPropsValues(this, mappedProps));
                // don't use delete keyword in order to create a more predictable code for the engine
                const { options: extraOptions } = initialOptions, finalOptions = __rest(initialOptions, ["options"]); // delete the extra options
                const options = finalOptions;
                if (beforeCreate) {
                    const result = beforeCreate.bind(this)(options);
                    if (result instanceof Promise) {
                        return result.then(() => ({ options }));
                    }
                }
                return { options };
            })
                .then(({ options }) => {
                const ConstructorObject = ctr();
                // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
                this[instanceName] = ctrArgs
                    ? new (Function.prototype.bind.call(ConstructorObject, null, ...ctrArgs(options, getPropsValues(this, props || {}))))()
                    : new ConstructorObject(options);
                bindProps(this, this[instanceName], mappedProps);
                bindEvents(this, this[instanceName], events);
                if (afterCreate) {
                    afterCreate.bind(this)(this[instanceName]);
                }
                return this[instanceName];
            });
            this[promiseName] = promise;
            return { [promiseName]: promise };
        },
        destroyed() {
            // Note: not all Google Maps components support maps
            if (this[instanceName] && this[instanceName].setMap) {
                this[instanceName].setMap(null);
            }
        } }, rest);
}
export default mapElement;
