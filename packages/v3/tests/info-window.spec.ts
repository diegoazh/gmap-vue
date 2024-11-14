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
        map: new Map() as MockComponentConstructorWithHTML,
        ...propsInOptions,
        opened: false,
        content: {
          oncancel: null,
          onerror: null,
          onscroll: null,
          onselect: null,
          onwheel: null,
          oncopy: null,
          oncut: null,
          onpaste: null,
          oncompositionend: null,
          oncompositionstart: null,
          oncompositionupdate: null,
          onblur: null,
          onfocus: null,
          onfocusin: null,
          onfocusout: null,
          onfullscreenchange: null,
          onfullscreenerror: null,
          onkeydown: null,
          onkeyup: null,
          onauxclick: null,
          onclick: null,
          oncontextmenu: null,
          ondblclick: null,
          onmousedown: null,
          onmouseenter: null,
          onmouseleave: null,
          onmousemove: null,
          onmouseout: null,
          onmouseover: null,
          onmouseup: null,
          ontouchcancel: null,
          ontouchend: null,
          ontouchmove: null,
          ontouchstart: null,
          oninvalid: null,
          onanimationcancel: null,
          onanimationend: null,
          onanimationiteration: null,
          onanimationstart: null,
          onbeforeinput: null,
          oninput: null,
          onchange: null,
          ongotpointercapture: null,
          onlostpointercapture: null,
          onpointercancel: null,
          onpointerdown: null,
          onpointerenter: null,
          onpointerleave: null,
          onpointermove: null,
          onpointerout: null,
          onpointerover: null,
          onpointerup: null,
          ontransitioncancel: null,
          ontransitionend: null,
          ontransitionrun: null,
          ontransitionstart: null,
        },
      }),
    );
    expect(
      wrapper.getCurrentComponent().exposed.infoWindowPromise,
    ).toBeInstanceOf(Promise);
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
});
