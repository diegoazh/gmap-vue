import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import * as googleMapsPromise from '../src/composables/google-maps-promise';
import * as vue from 'vue';

describe('google-maps-promise.ts', () => {
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
    const keys = Object.keys(googleMapsPromise);

    // Assert
    expect(keys.length).toBe(4);
    expect(keys.includes('getMap')).toBeTruthy();
    expect(keys.includes('getMapPromise')).toBeTruthy();
    expect(keys.includes('getMapPromiseDeferred')).toBeTruthy();
    expect(keys.includes('injectMapPromise')).toBeTruthy();
  });

  test('should return a vue map ref when call getMap function', () => {
    // Arrange
    // Act
    const result = googleMapsPromise.getMap();

    // Assert
    expect(result.value).toBeUndefined();
  });

  test('should return a object with resolve and reject properties when is called', () => {
    // Arrange
    // Act
    const result = googleMapsPromise.getMapPromiseDeferred();
    const keys = Object.keys(result);

    // Assert
    expect(keys.includes('resolve')).toBeTruthy();
    expect(keys.includes('reject')).toBeTruthy();
  });

  test('should return a promise object when is called', () => {
    // Arrange
    // Act
    const result = googleMapsPromise.getMapPromise();

    // Assert
    expect(typeof result).toBe('object');
    expect(result).toBeInstanceOf(Promise);
  });

  test('should call inject and return its result when is called', async () => {
    // Arrange
    const mockResult = { test: 'value' };
    vi.spyOn(vue, 'inject').mockResolvedValueOnce(mockResult);

    // Act
    const injectResult = await googleMapsPromise.injectMapPromise();

    // Act
    expect(vue.inject).toHaveBeenCalledTimes(1);
    expect(injectResult).toBe(mockResult);
  });
});
