<template>
  <div>
    <!-- @slot Used to set your cluster -->
    <slot></slot>
  </div>
</template>

<script>
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import MapElementMixin from '../mixins/map-element';
import { bindEvents, getPropsValues, bindProps } from '../utils/helpers';

/**
 * Cluster component
 * @displayName GmapCluster
 * @see [source code](/guide/cluster.html#source-code)
 * @see [Official documentation](https://googlemaps.github.io/js-markerclusterer/modules.html)
 * @see [Marker clusterer](https://developers.google.com/maps/documentation/javascript/marker-clustering#maps_marker_clustering-javascript)
 */
export default {
  name: 'ClusterIcon',
  mixins: [MapElementMixin],
  provide() {
    // events to bind with toWay
    const events = [
      'click',
      'rightclick',
      'dblclick',
      'drag',
      'dragstart',
      'dragend',
      'mouseup',
      'mousedown',
      'mouseover',
      'mouseout',
    ];

    // Infowindow needs this to be immediately available
    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        // Initialize the maps with the given options
        const initialOptions = {
          // TODO: analyze the below line because I think it can be removed
          ...this.options,
          map,
          ...getPropsValues(this, {}),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;

        if (typeof MarkerClusterer === 'undefined') {
          throw new Error(
            'MarkerClusterer is not installed! require() it or include it from https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js'
          );
        }

        const { map: mapInstance, markers } = finalOptions;

        this.$clusterObject = new MarkerClusterer({
          map: mapInstance,
          markers,
        });

        bindProps(this, this.$clusterObject, {});
        bindEvents(this, this.$clusterObject, events);

        Object.keys({}).forEach((prop) => {
          if ({}[prop].twoWay) {
            this.$on(`${prop.toLowerCase()}_changed`, this.reinsertMarkers);
          }
        });

        return this.$clusterObject;
      })
      .catch((error) => {
        throw error;
      });

    // TODO: analyze the efects of only returns the instance and remove completely the promise
    this.$clusterPromise = promise;
    return { $clusterPromise: promise };
  },
  props: {
    algorithm: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  beforeDestroy() {
    /* Performance optimization when destroying a large number of markers */
    this.$children.forEach((marker) => {
      if (marker.$clusterObject === this.$clusterObject) {
        marker.$clusterObject = null;
      }
    });

    if (this.$clusterObject) {
      this.$clusterObject.clearMarkers();
    }
  },
  destroyed() {
    // Note: not all Google Maps components support maps
    if (this.$clusterObject && this.$clusterObject.setMap) {
      this.$clusterObject.setMap(null);
    }
  },
  updated() {
    if (this.$clusterObject) {
      this.$clusterObject.repaint();
    }
  },
  methods: {
    reinsertMarkers() {
      const oldMarkers = this.$clusterObject.getMarkers();
      this.$clusterObject.clearMarkers();
      this.$clusterObject.addMarkers(oldMarkers);
    },
  },
};
</script>
