import { vi } from 'vitest';

export const valueMocks = {
  place: { lat: 1, lng: 1 },
  center: { lat: 2, lng: 2 },
  zoom: 4,
  bounds: { lat: 3, lng: 3 },
};

export const autocompleteCbk: { placeChanged?: () => void } = {
  placeChanged: undefined,
};

export const mapCbk: {
  centerChanged?: () => void;
  zoomChanged?: () => void;
  boundsChanged?: () => void;
} = {
  centerChanged: undefined,
  zoomChanged: undefined,
  boundsChanged: undefined,
};

export const googleMock = {
  maps: {
    importLibrary: () =>
      Promise.resolve({
        Autocomplete: function (a, b) {
          this.a = a;
          this.b = b;
          this.__cbk;
          this.getPlace = vi.fn().mockReturnValue(valueMocks.place);
          this.addListener = (name: string, cbk: () => void) => {
            if (name === 'place_changed') {
              autocompleteCbk.placeChanged = cbk;
            }
          };
        },
        Map: function (a, b) {
          this.a = a;
          this.b = b;
          this.__cbk;
          this.getCenter = vi.fn().mockReturnValue(valueMocks.center);
          this.getZoom = vi.fn().mockReturnValue(valueMocks.zoom);
          this.getBounds = vi.fn().mockReturnValue(valueMocks.bounds);
          this.addListener = (name: string, cbk: () => void) => {
            if (name === 'center_changed') {
              mapCbk.centerChanged = cbk;
            }
            if (name === 'zoom_changed') {
              mapCbk.zoomChanged = cbk;
            }
            if (name === 'bounds_changed') {
              mapCbk.boundsChanged = cbk;
            }
          };
        },
      }),
  },
};
