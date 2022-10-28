import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import * as mapPromise from '../src/composables/map-promise';
import * as vue from 'vue';

describe('map-promise.ts', () => {
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
    const keys = Object.keys(mapPromise);

    // Assert
    expect(keys.length).toBe(2);
    expect(keys.includes('useMapPromise')).toBeTruthy();
    expect(keys.includes('useMapPromiseDeferred')).toBeTruthy();
  });

  test('should return a object with resolve and reject properties when is called', () => {
    // Arrange
    // Act
    const result = mapPromise.useMapPromiseDeferred();
    const keys = Object.keys(result);

    // Assert
    expect(keys.includes('resolve')).toBeTruthy();
    expect(keys.includes('reject')).toBeTruthy();
  });

  test('should return a promise object when is called', () => {
    // Arrange
    // Act
    const result = mapPromise.useMapPromise();

    // Assert
    expect(typeof result).toBe('object');
    expect(result).toBeInstanceOf(Promise);
  });
});
