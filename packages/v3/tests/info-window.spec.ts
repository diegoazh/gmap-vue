import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ComponentInstance } from 'vue';
import { InfoWindow } from '../src/components';
import * as composables from '../src/composables';
import { $infoWindowPromise } from '../src/keys';
import {
  googleMock,
  infoWindowValues,
  type MockComponentConstructorWithHTML,
} from './mocks/global.mock';

describe('InfoWindow component', () => {
  let Map: MockComponentConstructorWithHTML;

  const createMapMock = () =>
    new (Map as unknown as new () => MockComponentConstructorWithHTML)();

  beforeEach(() => {
    ({ Map } = googleMock.maps.importLibrary());
    vi.stubGlobal('google', googleMock);
    vi.spyOn(composables, 'usePluginOptions').mockReturnValue({
      load: { key: 'abc', mapId: 'test' },
    });
    vi.spyOn(composables, 'findParentInstanceByName').mockImplementation(
      () =>
        ({
          exposed: {
            mapPromise: Promise.resolve(createMapMock()),
          },
        }) as unknown as ComponentInstance<unknown>,
    );
    vi.spyOn(composables, 'useDestroyPromisesOnUnmounted');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted successfully', async () => {
    // give
    const wrapper = mount(InfoWindow);

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render the correct DOM and return a infoWindowPromise', async () => {
    // give
    const props = { infoWindowKey: 'myInfoWindowKey', disableAutoPan: true };
    const wrapper = mount(InfoWindow, { props });
    const { infoWindowKey, ...propsInOptions } = props;

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toBe('<div class="info-window-container"></div>');
    expect(JSON.stringify(infoWindowValues.options)).toEqual(
      JSON.stringify({
        map: createMapMock(),
        ...propsInOptions,
        disableAutoPan: true,
        content: {},
      }),
    );
    expect(
      wrapper.getCurrentComponent().exposed?.infoWindowPromise,
    ).toBeInstanceOf(Promise);
    wrapper.unmount();
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // give
    const wrapper = mount(InfoWindow);

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(composables.useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(composables.useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $infoWindowPromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // give
    const props = { infoWindowKey: 'myInfoWindowKey' };
    const wrapper = mount(InfoWindow, { props });

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(composables.useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(composables.useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.infoWindowKey,
    );
  });

  it('should move an already open info window when the position prop changes', async () => {
    // give
    const initialPosition = { lat: 47.376332, lng: 8.547511 };
    const nextPosition = { lat: 47.374592, lng: 8.548867 };
    const wrapper = mount(InfoWindow, {
      props: {
        opened: true,
        position: initialPosition,
      },
    });
    await flushPromises();
    infoWindowValues.open?.mockClear();
    infoWindowValues.setPosition?.mockClear();

    // when
    await wrapper.setProps({ position: nextPosition });
    await flushPromises();

    // then
    expect(infoWindowValues.setPosition).toHaveBeenCalledWith(nextPosition);
    expect(infoWindowValues.open).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should reopen an already open info window when the marker prop changes', async () => {
    // give
    const marker = {
      position: { lat: 47.376332, lng: 8.547511 },
    } as google.maps.marker.AdvancedMarkerElement;
    const nextMarker = {
      position: { lat: 47.374592, lng: 8.548867 },
    } as google.maps.marker.AdvancedMarkerElement;
    const wrapper = mount(InfoWindow, {
      props: {
        marker,
        opened: true,
      },
    });
    await flushPromises();
    infoWindowValues.open?.mockClear();

    // when
    await wrapper.setProps({ marker: nextMarker });
    await flushPromises();

    // then
    const openCalls = infoWindowValues.open?.mock.calls as
      | [[{ map?: unknown; anchor?: unknown }], ...unknown[][]]
      | undefined;
    expect(openCalls?.at(-1)?.[0]).toMatchObject({
      map: expect.anything() as unknown,
      anchor: nextMarker,
    });
    wrapper.unmount();
  });
});
