import { VueWrapper, mount, flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Autocomplete } from '../src/components';
import { googleMock } from './mocks/global.mock';

describe('AutocompleteInput component', () => {
  let wrapper: VueWrapper<any, any>;

  beforeEach(() => {
    vi.stubGlobal('google', googleMock);
    vi.mock('../src/composables', async (originalImport) => {
      const original = (await originalImport()) as Record<string, any>;

      return {
        ...original,
        useGoogleMapsApiPromiseLazy: vi.fn().mockResolvedValue({}),
        usePluginOptions: vi
          .fn()
          .mockReturnValue({ load: { key: 'abc', mapId: 'test' } }),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be mounted successfully', () => {
    // given
    wrapper = mount(Autocomplete);

    // then
    expect(wrapper).not.toBeNull();
  });

  it('should export an autocomplete instance', async () => {
    // given
    wrapper = mount(Autocomplete);

    // when
    await flushPromises();
    const component = wrapper.getCurrentComponent();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.get('input')).not.toBeNull();
    expect(Object.keys(component.slots).length).toEqual(0);
    expect(component.exposed?.autocompletePromise).instanceOf(Promise);
  });
});
