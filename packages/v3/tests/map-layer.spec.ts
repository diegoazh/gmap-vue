import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import { MapLayer } from '../src/components';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $mapPromise } from '../src/keys';
import { googleMock, mapValues, valueMocks } from './mocks/global.mock';

describe('MapLayer component', () => {
  beforeAll(() => {
    vi.stubGlobal('google', googleMock);
    vi.mock('../src/composables', async (originalImport) => {
      const original = (await originalImport()) as Record<string, any>;

      return {
        ...original,
        useGoogleMapsApiPromiseLazy: vi.fn().mockResolvedValue({}),
        usePluginOptions: vi
          .fn()
          .mockReturnValue({ load: { key: 'abc', mapId: 'test' } }),
        useDestroyPromisesOnUnmounted: vi.fn(),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted successfully', async () => {
    // given
    const wrapper = mount(MapLayer, { props: { center: { lat: 1, lng: 1 } } });

    // when
    await flushPromises();

    // then
    expect(wrapper).not.toBeNull();
  });

  it('should render a correct DOM and export a mapPromise', async () => {
    // given
    const props = { center: { lat: 1, lng: 1 } };
    vi.stubGlobal('window', { __gmc__: undefined });
    const wrapper = mount(MapLayer, {
      props,
      slots: { visible: h('div') },
    });

    // when
    await flushPromises();
    const component = wrapper.getCurrentComponent();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.find('gmv-map-container')).toBeDefined();
    expect(wrapper.find('gmv-map')).toBeDefined();
    expect(wrapper.find('gmv-map-hidden')).toBeDefined();
    expect(Object.keys(component.slots).length).toEqual(1);
    expect(mapValues.options).toEqual({
      ...props,
      clickableIcons: true,
      disableDefaultUI: false,
      disableDoubleClickZoom: false,
      fullscreenControl: true,
      gestureHandling: 'auto',
      isFractionalZoomEnabled: false,
      keyboardShortcuts: true,
      mapTypeControl: true,
      mapTypeId: 'roadmap',
      noClear: false,
      rotateControl: true,
      scaleControl: true,
      scrollwheel: false,
      streetViewControl: true,
      zoomControl: true,
    });
    expect(component.exposed?.mapPromise).instanceOf(Promise);
  });

  it('should emit the correct events', async () => {
    // given
    vi.stubGlobal('window', { __gmc__: undefined });
    const wrapper = mount(MapLayer, {
      props: { center: { lat: 1, lng: 1 } },
      slots: { visible: h('div') },
    });

    // when
    await flushPromises();
    mapValues.centerChanged?.();
    mapValues.centerChanged?.();
    mapValues.zoomChanged?.();
    mapValues.boundsChanged?.();
    const centerChangedEmitted = wrapper.emitted('center_changed');
    const zoomChangedEmitted = wrapper.emitted('zoom_changed');
    const boundsChangedEmitted = wrapper.emitted('bounds_changed');

    // then
    expect(centerChangedEmitted).toHaveLength(2);
    expect(centerChangedEmitted?.[0]).toEqual([valueMocks.center]);
    expect(centerChangedEmitted?.[1]).toEqual([valueMocks.center]);
    expect(zoomChangedEmitted).toHaveLength(1);
    expect(zoomChangedEmitted?.[0]).toEqual([valueMocks.zoom]);
    expect(boundsChangedEmitted).toHaveLength(1);
    expect(boundsChangedEmitted?.[0]).toEqual([valueMocks.bounds]);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const props = { center: { lat: 1, lng: 1 } };
    vi.stubGlobal('window', { __gmc__: undefined });
    const wrapper = mount(MapLayer, {
      props,
      slots: { visible: h('div') },
    });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith($mapPromise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const props = { center: { lat: 1, lng: 1 }, mapKey: 'myMap' };
    vi.stubGlobal('window', { __gmc__: undefined });
    const wrapper = mount(MapLayer, {
      props,
      slots: { visible: h('div') },
    });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(props.mapKey);
  });
});
