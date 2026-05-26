import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { IGmapVuePluginOptions } from '../src/interfaces';
import * as main from '../src/main';

const globalRecord = globalThis as Record<string, unknown>;

describe('main.ts module', () => {
  beforeEach(() => {
    delete globalRecord.GoogleMapsApi;
  });

  afterEach(() => {
    delete globalRecord.GoogleMapsApi;
  });

  it('should export one function and one object with three functions', () => {
    // arrange
    const options: IGmapVuePluginOptions = {
      load: { key: 'abc', mapIds: ['test'] },
    };

    // act
    const installFn = main.createGmapVuePlugin(options);

    // assert
    expect(main.createGmapVuePlugin).toBeTypeOf('function');
    expect(main.utilities).toBeTypeOf('object');
    expect(Object.keys(main.utilities)).toHaveLength(3);
    expect(Object.keys(main.utilities)).toEqual([
      'googleMapsApiInitializer',
      'pluginComponentBuilder',
      'getGoogleMapsAPI',
    ]);
    expect(main.utilities.googleMapsApiInitializer).toBeTypeOf('function');
    expect(main.utilities.pluginComponentBuilder).toBeTypeOf('function');
    expect(main.utilities.getGoogleMapsAPI).toBeTypeOf('function');
    expect(installFn).toBeTypeOf('function');
    expect(globalRecord.GoogleMapsApi).toBeUndefined();
  });
});
