import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import { Marker } from '../src/components';
import { googleMock, markerValues } from './mocks/global.mock';

describe('MarkerIcon component', () => {
  let Map;
  let AdvancedMarkerElement;

  beforeEach(async () => {
    ({ Map, AdvancedMarkerElement } = await googleMock.maps.importLibrary());
    vi.stubGlobal('google', googleMock);
    vi.mock('../src/composables', async (originalImport) => {
      const original = (await originalImport()) as Record<string, any>;

      return {
        ...original,
        useGoogleMapsApiPromiseLazy: vi.fn().mockResolvedValue({}),
        usePluginOptions: vi
          .fn()
          .mockReturnValue({ load: { key: 'abc', mapId: 'test' } }),
        findParentInstanceByName: vi.fn().mockReturnValue({
          exposed: {
            mapPromise: Promise.resolve(Map),
          },
        }),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should mount successfully', async () => {
    // given
    const wrapper = mount({ ...Marker, template: '<div></div>' }); // we added a template to avoid warnings in the console

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render a correct DOM and export a markerPromise', async () => {
    // given
    const props = { content: h('p', 'Test'), title: 'this is the title' };
    const wrapper = mount(
      {
        ...Marker,
        template: '<div></div>',
      },
      { props },
    ); // we added a template to avoid warnings in the console

    // when
    await flushPromises();
    const instance = wrapper.getCurrentComponent();
    const marker = await instance.exposed?.markerPromise;
    console.log(marker);

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toBe('<div></div>');
    expect(JSON.stringify(markerValues.options)).toEqual(
      JSON.stringify({
        ...props,
        gmpClickable: true,
        gmpDraggable: false,
        map: Map,
      }),
    );
  });

  it('should emit events successfully', async () => {
    // given
    const props = {
      content: h('div', 'Test'),
      title: 'title',
      gmpDraggable: true,
    };
    const wrapper = mount(
      {
        ...Marker,
        template: '<div></div>',
      },
      { props },
    ); // we added a template to avoid warnings in the console

    // when
    await flushPromises();
    markerValues.updatePosition?.();

    // then
    expect(wrapper.emitted()).toHaveProperty('update:position');
    expect(wrapper.emitted('update:position')).toEqual([
      [{ lat: undefined, lng: undefined }],
    ]);
  });
});
