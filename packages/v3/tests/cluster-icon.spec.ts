import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentInstance } from 'vue';
import { Cluster } from '../src/components';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $clusterPromise } from '../src/keys';
import { clusterValues, googleMock } from './mocks/global.mock';

describe('ClusterIcon component', () => {
  let Map;

  beforeEach(async () => {
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
    vi.mock('@googlemaps/markerclusterer', async (originalImport) => {
      const original = (await originalImport()) as Record<string, any>;

      return {
        ...original,
        MarkerClusterer: function (options) {
          clusterValues.options = options;
          this.clearMarkers = vi.fn();
          this.setMap = vi.fn();
          this.addListener = () => {};
        },
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted successfully', async () => {
    // given
    const wrapper = mount(Cluster);

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render the correct DOM and expose a clusterPromise', async () => {
    // given
    const template = `<div>\n  <!-- @slot Used to set your cluster -->\n</div>`;
    const props = { clusterKey: 'myCluster', onClusterClick: () => {} };
    const wrapper = mount(Cluster, { props });
    const { clusterKey, ...propsInOptions } = props;

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toBe(template);
    expect(wrapper.props()).toEqual({
      ...props,
      mapKey: undefined,
      options: undefined,
      algorithm: undefined,
      markers: undefined,
      renderer: undefined,
    });
    expect(JSON.stringify(clusterValues.options)).toEqual(
      JSON.stringify({
        map: new Map(),
        ...propsInOptions,
        algorithm: undefined,
        markers: undefined,
        renderer: undefined,
      }),
    );
    expect(
      wrapper.getCurrentComponent().exposed?.clusterPromise,
    ).toBeInstanceOf(Promise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const wrapper = mount(Cluster);

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith($clusterPromise);
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const props = { clusterKey: 'myCluster' };
    const wrapper = mount(Cluster, { props });

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.clusterKey,
    );
  });
});
