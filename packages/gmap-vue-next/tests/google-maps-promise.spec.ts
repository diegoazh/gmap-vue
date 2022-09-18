import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import * as googleMapsPromise from '../src/composables/google-maps-promise';
import * as vue from 'vue';

describe('google-maps-promise.ts', () => {
  beforeEach(() => {
    vi.mock('vue', () => {
      const vue = {
        inject: vi.fn(() => Promise.resolve(undefined)),
        ref: vi.fn(() => ({ value: undefined })),
      };

      return vue;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should export two function when is called', () => {
    // Arrange
    // Act
    const keys = Object.keys(googleMapsPromise);

    // Assert
    expect(keys.length).toBe(2);
    expect(keys.includes('getMap')).toBeTruthy();
    expect(keys.includes('useMapPromise')).toBeTruthy();
  });

  test('should return a vue map ref when call getMap function', () => {
    // Arrange
    // Act
    const result = googleMapsPromise.getMap();

    // Assert
    expect(result.value).toBeUndefined();
  });

  test('should wait until map promise is resolve when is called', async () => {
    // Arrange
    const mockResult = { test: 'value' };
    vi.spyOn(vue, 'inject').mockResolvedValueOnce(mockResult);

    // Act
    await googleMapsPromise.useMapPromise();
    const result = googleMapsPromise.getMap();

    // Act
    expect(vue.inject).toHaveBeenCalledTimes(1);
    expect(result.value).toBe(mockResult);
  });
});
