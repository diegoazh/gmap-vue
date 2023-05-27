import {
  afterEach,
  beforeEach,
  describe,
  expect,
  SpyInstance,
  test,
  vi,
} from 'vitest';
import { IPluginOptions } from '../src/interfaces/gmap-vue.interface';
import { GoogleMapsAPIInitializerFn } from '../src/types/gmap-vue.types';

describe('google-maps-api-initializer.ts', () => {
  let initializer: { googleMapsApiInitializer: GoogleMapsAPIInitializerFn };
  let spy: SpyInstance<[node: Node], Node>;
  let options: Partial<IPluginOptions>;
  let googleMapScript: HTMLElement;

  beforeEach(async () => {
    initializer = await import(
      '../src/composables/google-maps-api-initializer'
    );
    vi.resetModules();

    spy = vi.spyOn(globalThis.document.head, 'appendChild');
    options = {
      load: {
        key: 'test-key',
        libraries: 'roadmap',
      },
    };
    googleMapScript = document.createElement('SCRIPT');
    googleMapScript.setAttribute('async', '');
    googleMapScript.setAttribute('defer', '');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should export a single function when is imported', () => {
    // Act
    const keys = Object.keys(initializer);

    // Assert
    expect(keys.length).toBe(1);
  });

  test('should throw an error when the initializer is called without options', () => {
    // Arrange
    let error;

    // Act
    try {
      initializer.googleMapsApiInitializer(undefined);
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error.message).toBe('options should  be an object');
  });

  test('should throw an error when the initializer is called without an options object', () => {
    // Arrange
    let error;

    // Act
    try {
      initializer.googleMapsApiInitializer(['test']);
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error.message).toBe('options should  be an object');
  });

  test('should initialize the google maps api when is called with load options', () => {
    // Arrange
    googleMapScript.setAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=test-key&libraries=roadmap&callback=GoogleMapsCallback'
    );

    // Act
    initializer.googleMapsApiInitializer(options.load);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('src')).toBe(
      googleMapScript.getAttribute('src')
    );
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('async')).toBe(
      googleMapScript.getAttribute('async')
    );
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('defer')).toBe(
      googleMapScript.getAttribute('defer')
    );
  });

  test('should build a different url when use loadCn option', () => {
    // Arrange
    googleMapScript.setAttribute(
      'src',
      'https://maps.google.cn/maps/api/js?key=test-key&libraries=roadmap&callback=GoogleMapsCallback'
    );

    // Act
    initializer.googleMapsApiInitializer(options.load, true);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('src')).toBe(
      googleMapScript.getAttribute('src')
    );
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('async')).toBe(
      googleMapScript.getAttribute('async')
    );
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('defer')).toBe(
      googleMapScript.getAttribute('defer')
    );
  });

  test('should initialize once the google api when is called', async () => {
    // Arrange
    googleMapScript.setAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=test-key&libraries=roadmap&callback=GoogleMapsCallback'
    );

    // Act
    initializer.googleMapsApiInitializer(options.load);
    initializer.googleMapsApiInitializer(options.load, true);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('src')).toBe(
      googleMapScript.getAttribute('src')
    );
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('async')).toBe(
      googleMapScript.getAttribute('async')
    );
    expect((spy.mock.calls[0][0] as HTMLElement).getAttribute('defer')).toBe(
      googleMapScript.getAttribute('defer')
    );
  });
});
