import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import * as streetViewPanoramaPromise from '../src/composables/street-view-panorama-promise';
import * as vue from 'vue';

describe('street-view-panorama-promise.ts', () => {
  beforeEach(() => {
    vi.mock('vue', () => ({
      inject: vi.fn(() => Promise.resolve(undefined)),
      ref: vi.fn(() => ({ value: undefined })),
      reactive: vi.fn((args) => args),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should export two function when is called', () => {
    // Arrange
    // Act
    const keys = Object.keys(streetViewPanoramaPromise);

    // Assert
    expect(keys.length).toBe(2);
    expect(keys.includes('getStreetViewPanoramaPromise')).toBeTruthy();
    expect(keys.includes('getStreetViewPanoramaPromiseDeferred')).toBeTruthy();
  });

  test('should return a object with resolve and reject properties when is called', () => {
    // Arrange
    // Act
    const result =
      streetViewPanoramaPromise.getStreetViewPanoramaPromiseDeferred();
    const keys = Object.keys(result);

    // Assert
    expect(keys.includes('resolve')).toBeTruthy();
    expect(keys.includes('reject')).toBeTruthy();
  });

  test('should return a promise object when is called', () => {
    // Arrange
    // Act
    const result = streetViewPanoramaPromise.getStreetViewPanoramaPromise();

    // Assert
    expect(typeof result).toBe('object');
    expect(result).toBeInstanceOf(Promise);
  });
});
