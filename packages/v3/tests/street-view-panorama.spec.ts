import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentInstance } from 'vue';
import { StreetViewPanorama } from '../src/components';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $streetViewPanoramaPromise } from '../src/keys';
import { googleMock, streetViewValues } from './mocks/global.mock';

describe('PolygonShape component', () => {
  let Map;

  beforeEach(async () => {
    ({ Map } = await googleMock.maps.importLibrary());
    vi.stubGlobal('google', googleMock);
    vi.spyOn(composables, 'useGoogleMapsApiPromiseLazy').mockResolvedValue({});
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
    const wrapper = mount(StreetViewPanorama);

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render the correct DOM and return a streetViewPanoramaPromise', async () => {
    // given
    const template = `<div class="gmv-street-view-panorama-container">\n  <div class="gmv-street-view-panorama"></div><!-- @slot A default slot to render the street view panorama -->\n</div>`;
    const props = { streetViewKey: 'myStreetViewKey' };
    const wrapper = mount(StreetViewPanorama, { props });

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toBe(template);
    expect(JSON.stringify(streetViewValues.options)).toEqual(
      JSON.stringify({
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
      }),
    );
    expect(
      wrapper.getCurrentComponent().exposed?.streetViewPanoramaPromise,
    ).toBeInstanceOf(Promise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const wrapper = mount(StreetViewPanorama);

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $streetViewPanoramaPromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const props = { streetViewKey: 'myStreetViewKey' };
    const wrapper = mount(StreetViewPanorama, { props });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.streetViewKey,
    );
  });
});
