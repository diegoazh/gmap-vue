import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ComponentInstance } from 'vue';
import { h } from 'vue';
import { Marker } from '../src/components';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $markerPromise } from '../src/keys';
import {
  googleMock,
  markerValues,
  type MockComponentConstructorWithHTML,
} from './mocks/global.mock';

describe('MarkerIcon component', () => {
  let Map: MockComponentConstructorWithHTML;

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
            mapPromise: Promise.resolve(new Map()),
          },
        }) as unknown as ComponentInstance<unknown>,
    );
    vi.spyOn(composables, 'useDestroyPromisesOnUnmounted');
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
    const template = `<div></div>`;
    const props = {
      content: h('p', 'Test'),
      title: 'this is the title',
      markerKey: 'myMarker',
    };
    const wrapper = mount(
      {
        ...Marker,
        template,
      },
      { props },
    ); // we added a template to avoid warnings in the console
    const { markerKey, ...propsInOptions } = props;

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toBe(template);
    expect(JSON.stringify(markerValues.options)).toEqual(
      JSON.stringify({
        map: new Map() as MockComponentConstructorWithHTML,
        ...propsInOptions,
        gmpClickable: true,
        gmpDraggable: false,
      }),
    );
    expect(wrapper.getCurrentComponent().exposed.markerPromise).toBeInstanceOf(
      Promise,
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
    markerValues.updatePosition();

    // then
    expect(wrapper.emitted()).toHaveProperty('update:position');
    expect(wrapper.emitted('update:position')).toEqual([
      [{ lat: undefined, lng: undefined }],
    ]);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
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
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith($markerPromise);
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const props = {
      content: h('div', 'Test'),
      title: 'title',
      gmpDraggable: true,
      markerKey: 'myMarker',
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
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(props.markerKey);
  });
});
