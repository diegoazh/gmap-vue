import { describe, expect, test, vi } from 'vitest';
import {
  bindEvents,
  capitalizeFirstLetter,
  getPropsValuesWithoutOptionsProp,
} from '../src/composables/helpers';
import { ComponentPublicInstance } from 'vue';
import { IPluginOptions } from '../src/interfaces/gmap-vue.interface';

describe('helpers.ts', () => {
  test('should bind all events when it is called', () => {
    // Arrange
    const events = ['click', 'dblclick'];
    const gmi = { addListener: vi.fn((...args: any[]) => undefined) };
    const vueInstance = {
      $emit: vi.fn((...args: any[]) => undefined),
    } as unknown as ComponentPublicInstance & { $gmapOptions: IPluginOptions };

    // Act
    bindEvents(events, gmi, vueInstance);
    gmi.addListener.mock.calls.forEach((call) => {
      call[1]();
    });

    // Assert
    expect(gmi.addListener).toHaveBeenCalledTimes(2);
    expect(gmi.addListener.mock.calls[0][0]).toEqual(events[0]);
    expect(typeof gmi.addListener.mock.calls[0][1]).toBe('function');
    expect(gmi.addListener.mock.calls[1][0]).toEqual(events[1]);
    expect(typeof gmi.addListener.mock.calls[1][1]).toBe('function');
    expect(vueInstance.$emit).toHaveBeenCalledTimes(2);
    expect((vueInstance.$emit as any).mock.calls[0][0]).toBe(events[0]);
    expect((vueInstance.$emit as any).mock.calls[0][1]).toBe(undefined);
    expect((vueInstance.$emit as any).mock.calls[1][0]).toBe(events[1]);
    expect((vueInstance.$emit as any).mock.calls[1][1]).toBe(undefined);
  });

  test('should capitalize the first letter of a word when it is called', () => {
    // Arrange
    const test = 'test';

    // Act
    const result = capitalizeFirstLetter(test);

    // Assert
    expect(result).toBe('Test');
  });

  test('should return all props without the options one when is called', () => {
    // Arrange
    const props = { test: 'hi', options: {} };

    // Act
    const result = getPropsValuesWithoutOptionsProp(props);

    // Assert
    expect(Object.keys(result).length).toBe(1);
    expect(Object.keys(result)).toEqual(['test']);
    expect(Object.keys(result).includes('options')).toBeFalsy();
  });
});
