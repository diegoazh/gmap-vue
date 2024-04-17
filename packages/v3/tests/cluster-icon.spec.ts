import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Cluster } from '../src/components';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $clusterPromise } from '../src/keys';
import { clusterValues, googleMock } from './mocks/global.mock';

describe('ClusterIcon component', () => {
  let Map;

  beforeEach(async () => {
    ({ Map } = await googleMock.maps.importLibrary());
    vi.stubGlobal('google', googleMock);
    vi.mock('@googlemaps/markerclusterer', async (originalImport) => {
      const original = (await originalImport()) as Record<string, any>;

      return {
        ...original,
        MarkerClusterer: function (options) {
          clusterValues.options = options;
          this.clearMarkers = vi.fn();
          this.setMap = vi.fn();
          this.addListener = (name: string, cbk: () => void) => {};
        },
      };
    });
    vi.mock('../src/composables', async (originalImport) => {
      const original = (await originalImport()) as Record<string, any>;

      return {
        ...original,
        usePluginOptions: vi
          .fn()
          .mockReturnValue({ load: { key: 'abc', mapId: 'test' } }),
        findParentInstanceByName: vi.fn().mockReturnValue({
          exposed: {
            mapPromise: Promise.resolve(Map),
          },
        }),
        useDestroyPromisesOnUnmounted: vi.fn(),
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
    const props = { clusterKey: 'myCluster' };
    const wrapper = mount(Cluster, { props });

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
      onClusterClick: undefined,
      renderer: undefined,
    });
    expect(JSON.stringify(clusterValues.options)).toEqual(
      JSON.stringify({
        map: Map,
        algorithm: undefined,
        markers: undefined,
        onClusterClick: undefined,
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

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith($clusterPromise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const props = { clusterKey: 'myCluster' };
    const wrapper = mount(Cluster, { props });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.clusterKey,
    );
  });
});
