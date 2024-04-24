import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentInstance } from 'vue';
import { Circle } from '../src/components';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $circleShapePromise } from '../src/keys';
import { circleValues, googleMock } from './mocks/global.mock';

describe('CircleShape component', () => {
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
    const props = { center: { lat: 3, lng: 3 }, circleKey: 'myCircle' };
    const wrapper = mount({ ...Circle, template }, { props });
    const { circleKey, ...propsInOptions } = props;

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(JSON.stringify(circleValues.options)).toEqual(
      JSON.stringify({
        map: new Map(),
        ...propsInOptions,
        clickable: true,
        draggable: false,
        editable: false,
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
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $circleShapePromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const template = `<div></div>`;
    const props = { center: { lat: 3, lng: 3 }, circleKey: 'myCircle' };
    const wrapper = mount({ ...Circle, template }, { props });

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(props.circleKey);
  });
});
