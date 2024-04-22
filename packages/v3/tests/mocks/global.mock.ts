import { vi } from 'vitest';

export const valueMocks = {
  place: { lat: 1, lng: 1 },
  center: { lat: 2, lng: 2 },
  zoom: 4,
  bounds: { lat: 3, lng: 3 },
};

export const autocompleteValues: {
  input?: any;
  options?: Record<string, any>;
  placeChanged?: () => void;
} = {
  input: undefined,
  options: undefined,
  placeChanged: undefined,
};

export const mapValues: {
  input?: any;
  options?: Record<string, any>;
  centerChanged?: () => void;
  zoomChanged?: () => void;
  boundsChanged?: () => void;
} = {
  input: undefined,
  options: undefined,
  centerChanged: undefined,
  zoomChanged: undefined,
  boundsChanged: undefined,
};

export const markerValues: {
  input?: any;
  options?: Record<string, any>;
  updatePosition?: () => void;
} = {
  input: undefined,
  options: undefined,
  updatePosition: undefined,
};

export const circleValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const clusterValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const drawingValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const heatmapValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const infoWindowValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const kmlLayerValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const polygonValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const polylineValues: {
  options?: Record<string, any>;
} = {
  options: undefined,
};

export const googleMock = {
  maps: {
    importLibrary: async () => ({
      Autocomplete: function (html, options) {
        autocompleteValues.input = html;
        autocompleteValues.options = options;
        this.getPlace = vi.fn().mockReturnValue(valueMocks.place);
        this.addListener = (name: string, cbk: () => void) => {
          if (name === 'place_changed') {
            autocompleteValues.placeChanged = cbk;
          }
        };
      },
      Map: function (html, options) {
        mapValues.input = html;
        mapValues.options = options;
        this.getCenter = vi.fn().mockReturnValue(valueMocks.center);
        this.getZoom = vi.fn().mockReturnValue(valueMocks.zoom);
        this.getBounds = vi.fn().mockReturnValue(valueMocks.bounds);
        this.getDiv = vi.fn();
        this.addListener = (name: string, cbk: () => void) => {
          if (name === 'center_changed') {
            mapValues.centerChanged = cbk;
          }
          if (name === 'zoom_changed') {
            mapValues.zoomChanged = cbk;
          }
          if (name === 'bounds_changed') {
            mapValues.boundsChanged = cbk;
          }
        };
      },
      AdvancedMarkerElement: function (options) {
        markerValues.options = options;
        this.addListener = (name: string, cbk: () => void) => {
          if (name === 'dragend') {
            markerValues.updatePosition = cbk;
          }
        };
      },
      Circle: function (options) {
        circleValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
      },
      DrawingManager: function (options) {
        drawingValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
      },
      HeatmapLayer: function (options) {
        heatmapValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
      },
      InfoWindow: function (options) {
        infoWindowValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
        this.close = vi.fn();
      },
      KmlLayer: function (options) {
        kmlLayerValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
      },
      Polygon: function (options) {
        polygonValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
      },
      Polyline: function (options) {
        polylineValues.options = options;
        this.addListener = () => {};
        this.setMap = vi.fn();
      },
    }),
    drawing: {
      OverlayType: {
        MARKER: 'MARKER',
        CIRCLE: 'CIRCLE',
        POLYGON: 'POLYGON',
      },
    },
    ControlPosition: { TOP_CENTER: 'TOP_CENTER' },
  },
};
