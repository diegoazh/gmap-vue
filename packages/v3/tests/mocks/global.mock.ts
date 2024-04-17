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

export const googleMock = {
  maps: {
    importLibrary: async () => ({
      Autocomplete: function (a, b) {
        autocompleteValues.input = a;
        autocompleteValues.options = b;
        this.getPlace = vi.fn().mockReturnValue(valueMocks.place);
        this.addListener = (name: string, cbk: () => void) => {
          if (name === 'place_changed') {
            autocompleteValues.placeChanged = cbk;
          }
        };
      },
      Map: function (a, b) {
        mapValues.input = a;
        mapValues.options = b;
        this.getCenter = vi.fn().mockReturnValue(valueMocks.center);
        this.getZoom = vi.fn().mockReturnValue(valueMocks.zoom);
        this.getBounds = vi.fn().mockReturnValue(valueMocks.bounds);
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
      AdvancedMarkerElement: function (a) {
        markerValues.input = a;
        markerValues.options = a;
        this.addListener = (name: string, cbk: () => void) => {
          if (name === 'dragend') {
            markerValues.updatePosition = cbk;
          }
        };
      },
    }),
  },
};
