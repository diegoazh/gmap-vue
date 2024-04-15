import { vi } from 'vitest';

export const googleMock = {
  maps: {
    importLibrary: vi.fn(() => ({
      Autocomplete: function (a, b) {
        this.a = a;
        this.b = b;
        this.addListener = vi.fn();
      },
    })),
  },
};
