import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentInstance } from 'vue';
import { KmlLayer } from '../src/components';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $kmlLayerPromise } from '../src/keys';
import { googleMock, kmlLayerValues } from './mocks/global.mock';

describe('KmlLayer component', () => {
  let Map;
  let template;

  beforeEach(async () => {
    template = '<div class="myKmlLayer"></div>';
    ({ Map } = await googleMock.maps.importLibrary());
    vi.stubGlobal('google', googleMock);
    vi.spyOn(composables, 'usePluginOptions').mockReturnValue({
      load: { key: 'abc', mapId: 'test' },
    });
    vi.spyOn(composables, 'findParentInstanceByName').mockImplementation(
      () =>
        ({
          exposed: {
            mapPromise: Promise.resolve(new Map()),
          },
        }) as unknown as ComponentInstance<any>,
    );
    vi.spyOn(composables, 'useDestroyPromisesOnUnmounted');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted successfully', async () => {
    // given
    const wrapper = mount({ ...KmlLayer, template });

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render the correct DOM and return a kmlLayerPromise', async () => {
    // given
    const props = { kmlKey: 'myKmlKey' };
    const wrapper = mount({ ...KmlLayer, template }, { props });

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toBe(template);
    expect(JSON.stringify(kmlLayerValues.options)).toEqual(
      JSON.stringify({
        map: new Map(),
        ...props,
        clickable: true,
        preserveViewport: false,
        screenOverlays: true,
        suppressInfoWindows: false,
      }),
    );
    expect(
      wrapper.getCurrentComponent().exposed?.kmlLayerPromise,
    ).toBeInstanceOf(Promise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const wrapper = mount({ ...KmlLayer, template });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $kmlLayerPromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const props = { kmlKey: 'myKmlKey' };
    const wrapper = mount({ ...KmlLayer, template }, { props });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(props.kmlKey);
  });
});
