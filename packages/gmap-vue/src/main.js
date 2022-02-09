import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Autocomplete from './components/autocomplete-input.vue';
import Circle from './components/circle-shape.vue';
import DrawingManager from './components/drawing-manager.vue';
import HeatmapLayer from './components/heatmap-layer.vue';
import InfoWindow from './components/info-window.vue';
import KmlLayer from './components/kml-layer.vue';
import MapLayer from './components/map-layer.vue';
import Marker from './components/marker-icon.vue';
import PlaceInput from './components/place-input.vue';
import Polygon from './components/polygon-shape.vue';
import Polyline from './components/polyline-shape.vue';
import Rectangle from './components/rectangle-shape.vue';
import StreetViewPanorama from './components/street-view-panorama.vue';
import MapElementFactory from './utils/factories/map-element';
import promiseLazyFactory from './utils/factories/promise-lazy';
import loadGmapApi from './utils/manager/initializer';
import MapElementMixin from './mixins/map-element';
import MountableMixin from './mixins/mountable';

/**
 * HACK: Cluster should be loaded conditionally
 * However in the web version, it's not possible to write
 * `import 'gmap-vue/src/components/cluster'`, so we need to
 * import it anyway (but we don't have to register it)
 * Therefore we use babel-plugin-transform-inline-environment-variables to
 * set BUILD_DEV to truthy / falsy
 */
const Cluster = ((s) => s.default || s)(
  require('./components/cluster-icon.vue')
);

// TODO: This should be checked if it must be GmapVue, Gmap.api or something else
let GmapApi = null;

// TODO: should be called googleMapsApi for next versions
export function gmapApi() {
  return GmapApi.gmapApi && window.google;
}

/**
 * Export all components and mixins
 */
export const components = {
  HeatmapLayer,
  KmlLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Cluster,
  Rectangle,
  DrawingManager,
  InfoWindow,
  MapLayer,
  PlaceInput,
  Autocomplete,
  MountableMixin,
  StreetViewPanorama,
};

/**
 * Export all helpers
 */

export const helpers = {
  loadGmapApi,
  MapElementMixin,
  MapElementFactory,
};

export default {
  install: function gmapVuePluginInstallFn(Vue, options) {
    // Set defaults
    const finalOptions = {
      installComponents: true,
      autobindAllEvents: false,
      ...options,
    };

    /**
     * Update the global `GmapApi`. This will allow
     * components to use the `google` global reactively
     * via:
     *   import { gmapApi } from 'gmap-vue'
     *   export default {  computed: { google: gmapApi }  }
     */
    GmapApi = new Vue({ data: { gmapApi: null } });

    const defaultResizeBus = new Vue();

    /**
     * Use a lazy to only load the API when
     * a VGM component is loaded
     */
    const promiseLazyCreator = promiseLazyFactory(loadGmapApi, GmapApi);
    const gmapApiPromiseLazy = promiseLazyCreator(finalOptions);

    // Instance properties
    Vue.mixin({
      created() {
        this.$gmapDefaultResizeBus = defaultResizeBus;
        this.$gmapOptions = finalOptions;
        this.$gmapApiPromiseLazy = gmapApiPromiseLazy;
      },
    });

    // Static properties
    Vue.$gmapDefaultResizeBus = defaultResizeBus;
    Vue.$gmapApiPromiseLazy = gmapApiPromiseLazy;

    if (finalOptions.installComponents) {
      Vue.component('GmapMap', MapLayer);
      Vue.component('GmapMarker', Marker);
      Vue.component('GmapInfoWindow', InfoWindow);
      Vue.component('GmapHeatmapLayer', HeatmapLayer);
      Vue.component('GmapKmlLayer', KmlLayer);
      Vue.component('GmapPolyline', Polyline);
      Vue.component('GmapPolygon', Polygon);
      Vue.component('GmapCircle', Circle);
      Vue.component('GmapRectangle', Rectangle);
      Vue.component('GmapDrawingManager', DrawingManager);
      Vue.component('GmapAutocomplete', Autocomplete);
      Vue.component('GmapPlaceInput', PlaceInput);
      Vue.component('GmapStreetViewPanorama', StreetViewPanorama);
    }
  },
};
