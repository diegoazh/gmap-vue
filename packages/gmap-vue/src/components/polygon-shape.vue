<script>
import MapElementMixin from '../mixins/map-element';
import { getPropsValues, bindEvents, bindProps } from '../utils/helpers';
import { polygonMappedProps } from '../utils/mapped-props-by-map-element';

/**
 * Polygon component
 * @displayName GmapPolygon
 * @see [source code](/guide/polygon.html#source-code)
 * @see [official docs](https://developers.google.com/maps/documentation/javascript/examples/polygon-arrays?hl=es)
 */
export default {
  name: 'PolygonShape',
  mixins: [MapElementMixin],
  render() {
    return '';
  },
  provide() {
    const events = [
      'click',
      'dblclick',
      'drag',
      'dragend',
      'dragstart',
      'mousedown',
      'mousemove',
      'mouseout',
      'mouseover',
      'mouseup',
      'rightclick',
    ];

    const $polygonPromise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, polygonMappedProps),
        };
        const {
          options: extraOptions,
          path: optionPath,
          paths: optionPaths,
          ...finalOptions
        } = initialOptions;

        this.$polygonObject = new google.maps.Polygon(finalOptions);

        bindProps(this, this.$polygonObject, polygonMappedProps);
        bindEvents(this, this.$polygonObject, events);

        let clearEvents = () => {};

        // Watch paths, on our own, because we do not want to set either when it is
        // empty
        this.$watch(
          'paths',
          (paths) => {
            if (paths) {
              clearEvents();

              this.$polygonObject.setPaths(paths);

              const updatePaths = () => {
                /**
                 * An event to detect when a paths changes
                 * @property {array} paths `this.$polygonObject.getPaths()` |
                 */
                this.$emit('paths_changed', this.$polygonObject.getPaths());
              };
              const eventListeners = [];

              const mvcArray = this.$polygonObject.getPaths();

              for (let i = 0; i < mvcArray.getLength(); i += 1) {
                const mvcPath = mvcArray.getAt(i);
                eventListeners.push([
                  mvcPath,
                  mvcPath.addListener('insert_at', updatePaths),
                ]);
                eventListeners.push([
                  mvcPath,
                  mvcPath.addListener('remove_at', updatePaths),
                ]);
                eventListeners.push([
                  mvcPath,
                  mvcPath.addListener('set_at', updatePaths),
                ]);
              }

              eventListeners.push([
                mvcArray,
                mvcArray.addListener('insert_at', updatePaths),
              ]);
              eventListeners.push([
                mvcArray,
                mvcArray.addListener('remove_at', updatePaths),
              ]);
              eventListeners.push([
                mvcArray,
                mvcArray.addListener('set_at', updatePaths),
              ]);

              // TODO: analyze, we change map to forEach because clearEvents is a void function and the returned array is not used
              clearEvents = () => {
                eventListeners.forEach(([, listenerHandle]) => {
                  google.maps.event.removeListener(listenerHandle);
                });
              };
            }
          },
          {
            deep: this.deepWatch,
            immediate: true,
          }
        );

        this.$watch(
          'path',
          (path) => {
            if (path) {
              clearEvents();

              this.$polygonObject.setPaths(path);

              const mvcPath = this.$polygonObject.getPath();
              const eventListeners = [];

              const updatePaths = () => {
                /**
                 * ### path_changed (undefined)
                 *
                 * An event to detect when a path change
                 * @property {array} path `this.$polygonObject.getPath()`
                 */
                this.$emit('path_changed', this.$polygonObject.getPath());
              };

              eventListeners.push([
                mvcPath,
                mvcPath.addListener('insert_at', updatePaths),
              ]);
              eventListeners.push([
                mvcPath,
                mvcPath.addListener('remove_at', updatePaths),
              ]);
              eventListeners.push([
                mvcPath,
                mvcPath.addListener('set_at', updatePaths),
              ]);

              // TODO: analyze, we change map to forEach because clearEvents is a void function and the returned array is not used
              clearEvents = () => {
                eventListeners.forEach(([, listenerHandle]) => {
                  google.maps.event.removeListener(listenerHandle);
                });
              };
            }
          },
          {
            deep: this.deepWatch,
            immediate: true,
          }
        );

        return this.$polygonObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$polygonPromise = $polygonPromise;
    return { $polygonPromise };
  },
  props: {
    /**
     * If set true the object will be deep watched
     * @value boolean
     */
    deepWatch: {
      type: Boolean,
      default: false,
    },
    /**
     * Indicates if the polygon is draggable
     * @value true, false
     * @see [Polygon dragable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.draggable)
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * Indicates if the polygon is editable
     * @value true, false
     * @see [Polygon editable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.editable)
     */
    editable: {
      type: Boolean,
      default: false,
    },
    /**
     * More options that you can pass to the component
     * @value boolean
     */
    options: {
      type: Object,
      default: undefined,
    },
    /**
     * Indicates if the polygon is editable
     * @value Array
     * @see [Polygon path](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.path)
     */
    path: {
      type: Array,
      noBind: true,
      default: undefined,
    },
    /**
     * Indicates if the polygon is editable
     * @value Array
     * @see [Polygon paths](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.paths)
     */
    paths: {
      type: Array,
      noBind: true,
      default: undefined,
    },
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$polygonObject && this.$polygonObject.setMap) {
      this.$polygonObject.setMap(null);
    }
  },
};
</script>
