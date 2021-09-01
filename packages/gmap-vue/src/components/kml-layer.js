import mapElementFactory from '../factories/map-element';

const props = {
  url: {
    twoWay: false,
    type: String,
  },
  map: {
    twoWay: true,
    type: Object,
  },
  suppressInfoWindows: {
    twoWay: false,
    type: Boolean,
    noBind: true
  },
  preserveViewport: {
    twoWay: false,
    type: Boolean,
    noBind: true
  },
};

const events = [
  'click',
  'rightclick',
  'dblclick',
  'mouseup',
  'mousedown',
  'mouseover',
  'mouseout',
];

/**
 * @class KML Layer
 *
 * KML Layer class (experimental)
 */
export default mapElementFactory({
  mappedProps: props,
  events,
  name: 'kmlLayer',
  ctr: () => google.maps.KmlLayer,
});
