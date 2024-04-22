import { VueWrapper, flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import { Autocomplete } from '../src/components';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $autocompletePromise } from '../src/keys';
import {
  autocompleteValues,
  googleMock,
  valueMocks,
} from './mocks/global.mock';

describe('AutocompleteInput component', () => {
  let wrapper: VueWrapper<any, any>;

  beforeEach(() => {
    vi.stubGlobal('google', googleMock);
    vi.spyOn(composables, 'useGoogleMapsApiPromiseLazy').mockResolvedValue({});
    vi.spyOn(composables, 'usePluginOptions').mockReturnValue({
      load: { key: 'abc', mapId: 'test' },
    });
    vi.spyOn(composables, 'useDestroyPromisesOnUnmounted');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted successfully', async () => {
    // given
    wrapper = mount(Autocomplete);

    // when
    await flushPromises();

    // then
    expect(wrapper).not.toBeNull();
  });

  it('should render a correct DOM and export an autocompletePromise', async () => {
    // given
    wrapper = mount(Autocomplete, { attrs: { class: 'my-class' } });

    // when
    await flushPromises();
    const component = wrapper.getCurrentComponent();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.get('input')).toBeDefined();
    expect(wrapper.get('.my-class')).toBeDefined();
    expect(Object.keys(component.slots).length).toEqual(0);
    expect(autocompleteValues.options).toEqual({
      selectFirstOnEnter: true,
      strictBounds: false,
    });
    expect(component.exposed?.autocompletePromise).instanceOf(Promise);
  });

  it('should has the right content in the slot', async () => {
    // given
    const input = h('input');
    wrapper = mount(Autocomplete, {
      attrs: { class: 'my-class' },
      props: { slotRef: input },
      slots: { default: input },
    });

    // when
    await flushPromises();
    const component = wrapper.getCurrentComponent();

    // then
    expect(Object.keys(component.slots).length).toEqual(1);
  });

  it('should emit the correct events', async () => {
    // given
    wrapper = mount(Autocomplete);

    // when
    await flushPromises();
    autocompleteValues.placeChanged?.();
    const emitted = wrapper.emitted('place_changed');

    // then
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0]).toEqual([valueMocks.place]);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const wrapper = mount(Autocomplete);

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $autocompletePromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const props = { autocompleteKey: 'myAutocomplete' };
    const wrapper = mount(Autocomplete, { props });

    // when
    await flushPromises();
    wrapper.unmount();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.autocompleteKey,
    );
  });
});
