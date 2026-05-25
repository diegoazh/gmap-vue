/* eslint-disable vue/one-component-per-file */
import {
  createApp,
  defineComponent,
  h,
  nextTick,
  onMounted,
  type App,
} from 'vue';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { IGmapVuePluginOptions } from '../src/interfaces';
import type { TGlobalGoogleObject } from '../src/types';

const globalRecord = globalThis as Record<string, unknown>;

describe('runtime hardening', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    delete globalRecord.GoogleMapsApi;
    delete globalRecord.GoogleMapsCallback;
    delete globalRecord.google;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    delete globalRecord.GoogleMapsApi;
    delete globalRecord.GoogleMapsCallback;
    delete globalRecord.google;
  });

  test('imports the main entry without creating or overwriting GoogleMapsApi global state', async () => {
    const existingState = { isReady: true };
    globalRecord.GoogleMapsApi = existingState;

    await import('../src/main');

    expect(globalRecord.GoogleMapsApi).toBe(existingState);
  });

  test('installs the plugin without requiring window or document', async () => {
    vi.stubGlobal('window', undefined);
    vi.stubGlobal('document', undefined);
    const { createGmapVuePlugin } = await import('../src/main');
    const app = createApp({});

    expect(() => {
      app.use(createGmapVuePlugin({ load: { key: 'abc' } }));
    }).not.toThrow();

    expect(app.config.globalProperties.$gmapOptions).toEqual({
      dynamicLoad: false,
      load: { libraries: 'places', key: 'abc' },
    });
    expect(app.config.globalProperties.$gmapApiPromiseLazy).toBeTypeOf(
      'function',
    );
  });

  test('keeps installed Vue app options and lazy references isolated', async () => {
    const { createGmapVuePlugin } = await import('../src/main');
    const firstApp = createApp({});
    const secondApp = createApp({});

    firstApp.use(createGmapVuePlugin({ load: { key: 'first' } }));
    secondApp.use(createGmapVuePlugin({ load: { key: 'second' } }));

    expect(firstApp.config.globalProperties.$gmapOptions).toEqual({
      dynamicLoad: false,
      load: { libraries: 'places', key: 'first' },
    });
    expect(secondApp.config.globalProperties.$gmapOptions).toEqual({
      dynamicLoad: false,
      load: { libraries: 'places', key: 'second' },
    });
    expect(firstApp.config.globalProperties.$gmapApiPromiseLazy).not.toBe(
      secondApp.config.globalProperties.$gmapApiPromiseLazy,
    );
  });

  test('keeps component composable reads scoped to the app that owns the component', async () => {
    const { createGmapVuePlugin } = await import('../src/main');
    const { usePluginOptions } = await import(
      '../src/composables/promise-lazy-builder'
    );
    let firstAppOptions: IGmapVuePluginOptions | undefined;
    let firstApp: App<Element> | undefined;

    const ProbeComponent = defineComponent({
      setup() {
        onMounted(() => {
          firstAppOptions = usePluginOptions();
        });

        return () => h('div');
      },
    });
    const firstRoot = document.createElement('div');

    try {
      firstApp = createApp(ProbeComponent);
      firstApp.use(
        createGmapVuePlugin({ dynamicLoad: true, load: { key: 'first' } }),
      );
      createApp({}).use(
        createGmapVuePlugin({ dynamicLoad: true, load: { key: 'second' } }),
      );

      firstApp.mount(firstRoot);
      await nextTick();

      expect(firstAppOptions).toEqual({
        dynamicLoad: true,
        load: { libraries: 'places', key: 'first' },
      });
    } finally {
      firstApp?.unmount();
    }
  });

  test('keeps deprecated module-level plugin options compatible with the latest install', async () => {
    const { createGmapVuePlugin } = await import('../src/main');
    const { usePluginOptions } = await import(
      '../src/composables/promise-lazy-builder'
    );
    const firstApp = createApp({});
    const secondApp = createApp({});

    firstApp.use(createGmapVuePlugin({ load: { key: 'first' } }));
    secondApp.use(createGmapVuePlugin({ load: { key: 'second' } }));

    expect(usePluginOptions()).toEqual({
      dynamicLoad: false,
      load: { libraries: 'places', key: 'second' },
    });
  });

  test('settles the lazy Google Maps API promise safely when window is unavailable', async () => {
    vi.stubGlobal('window', undefined);
    const { usePromiseLazyBuilderFn } = await import(
      '../src/composables/promise-lazy-builder'
    );
    const mapsState = { isReady: false };
    const initializer = vi.fn();
    const lazy = usePromiseLazyBuilderFn(
      initializer,
      mapsState,
    )({ load: { key: 'abc' } });

    await expect(lazy()).resolves.toBeUndefined();
    expect(mapsState.isReady).toBe(false);
    expect(initializer).not.toHaveBeenCalled();
  });

  test('google maps initializer returns without throwing when document is unavailable', async () => {
    vi.stubGlobal('document', undefined);
    const { googleMapsApiInitializer } = await import(
      '../src/composables/google-maps-api-initializer'
    );

    expect(() => {
      googleMapsApiInitializer({ key: 'abc' });
    }).not.toThrow();
  });

  test('clears loader polling timers after the callback resolves the API', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('google', { maps: {} } satisfies TGlobalGoogleObject);
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const { usePromiseLazyBuilderFn } = await import(
      '../src/composables/promise-lazy-builder'
    );
    const lazy = usePromiseLazyBuilderFn(vi.fn(), { isReady: false })({
      dynamicLoad: true,
    });

    const result = lazy();
    await vi.advanceTimersByTimeAsync(1_500);

    await expect(result).resolves.toEqual({ maps: {} });
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  test('settles concurrent lazy builders and cleans each polling interval', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('google', { maps: {} } satisfies TGlobalGoogleObject);
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const { usePromiseLazyBuilderFn } = await import(
      '../src/composables/promise-lazy-builder'
    );
    const firstState = { isReady: false };
    const secondState = { isReady: false };
    const firstLazy = usePromiseLazyBuilderFn(
      vi.fn(),
      firstState,
    )({
      dynamicLoad: true,
    });
    const secondLazy = usePromiseLazyBuilderFn(
      vi.fn(),
      secondState,
    )({
      dynamicLoad: true,
    });

    const firstResult = firstLazy();
    const secondResult = secondLazy();
    await vi.advanceTimersByTimeAsync(1_500);

    await expect(Promise.all([firstResult, secondResult])).resolves.toEqual([
      { maps: {} },
      { maps: {} },
    ]);
    expect(firstState.isReady).toBe(true);
    expect(secondState.isReady).toBe(true);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2);
  });

  test('utilities.getGoogleMapsAPI returns google after any installed app state becomes ready', async () => {
    vi.useFakeTimers();
    const googleApi = { maps: {} } satisfies TGlobalGoogleObject;
    vi.stubGlobal('google', googleApi);
    const { createGmapVuePlugin, utilities } = await import('../src/main');
    const firstApp = createApp({});
    const secondApp = createApp({});

    firstApp.use(createGmapVuePlugin({ dynamicLoad: true }));
    secondApp.use(createGmapVuePlugin({ dynamicLoad: true }));
    const firstLazy = firstApp.config.globalProperties.$gmapApiPromiseLazy;

    const firstResult = firstLazy();
    await vi.advanceTimersByTimeAsync(1_500);
    await expect(firstResult).resolves.toBe(googleApi);

    expect(utilities.getGoogleMapsAPI()).toBe(googleApi);
  });
});
