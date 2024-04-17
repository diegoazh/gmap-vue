import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Circle } from '../src/components';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $circleShapePromise } from '../src/keys';
import { circleValues, googleMock } from './mocks/global.mock';

describe('CircleShape component', () => {
  let Map;

  beforeEach(async () => {
    ({ Map } = await googleMock.maps.importLibrary());
    vi.stubGlobal('google', googleMock);
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

  it('shoul be mounted successfully', async () => {
    // given
    const wrapper = mount({ ...Circle, template: `<div></div>` });

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render the correct DOM and export a circleShapePromise', async () => {
    // given
    const template = `<div></div>`;
    const props = { center: { lat: 3, lng: 3 } };
    const wrapper = mount({ ...Circle, template }, { props });

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(JSON.stringify(circleValues.options)).toEqual(
      JSON.stringify({
        ...props,
        clickable: true,
        draggable: false,
        editable: false,
        map: Map,
        strokePosition: 0,
        visible: true,
      }),
    );
    expect(wrapper.html()).toBe(template);
    expect(
      wrapper.getCurrentComponent().exposed?.circleShapePromise,
    ).toBeInstanceOf(Promise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const template = `<div></div>`;
    const props = { center: { lat: 3, lng: 3 } };
    const wrapper = mount({ ...Circle, template }, { props });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $circleShapePromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const template = `<div></div>`;
    const props = { center: { lat: 3, lng: 3 }, circleKey: 'myCircle' };
    const wrapper = mount({ ...Circle, template }, { props });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(props.circleKey);
  });
});
