import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import autocomplete from '../src/components/autocomplete-input.vue';

describe('Autocomplete component', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(autocomplete);
  });

  test('expect autocomplete to be defined', () => {
    expect(wrapper).toBeDefined();
  });
});
