import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ComponentInstance } from 'vue';
// @ts-expect-error Vue SFC imports are handled by Vite/Vitest.
import DrawingManager from '../src/components/drawing-manager.vue';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $drawingManagerPromise } from '../src/keys';
import {
  drawingValues,
  googleMock,
  type MockComponentConstructorWithHTML,
} from './mocks/global.mock';

describe('DrawingManager component', () => {
  let Map: MockComponentConstructorWithHTML;

  const createMapMock = () =>
    new (Map as unknown as new () => MockComponentConstructorWithHTML)();

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
            mapPromise: Promise.resolve(createMapMock()),
          },
        }) as unknown as ComponentInstance<unknown>,
    );
    vi.spyOn(composables, 'useDestroyPromisesOnUnmounted');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should be mounted successfully', async () => {
    // given
    const wrapper = mount(DrawingManager);

    // when
    await flushPromises();

    // then
    expect(wrapper).toBeDefined();
  });

  it('should render the correct DOM and expose a drawingManagerPromise', async () => {
    // given
    const props = { drawingKey: 'myDrawingKey', drawingControl: false };
    const template = `<div>\n  <!-- @slot Used to set your drawing manager -->\n</div>`;
    const wrapper = mount(DrawingManager, { props });
    const { drawingKey, ...propsInOptions } = props;

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toEqual(template);
    expect(wrapper.props()).toEqual({
      ...props,
      circleOptions: undefined,
      drawingControlOptions: undefined,
      drawingMode: null,
      drawingModes: undefined,
      mapKey: undefined,
      markerOptions: undefined,
      options: undefined,
      polygonOptions: undefined,
      polylineOptions: undefined,
      position: undefined,
      rectangleOptions: undefined,
      shapes: undefined,
    });
    expect(JSON.stringify(drawingValues.options)).toEqual(
      JSON.stringify({
        map: createMapMock(),
        ...propsInOptions,
        drawingControlOptions: {
          drawingModes: ['MARKER', 'CIRCLE', 'POLYGON', undefined, undefined],
          position: 'TOP_CENTER',
        },
      }),
    );
    const exposed = wrapper.getCurrentComponent().exposed;
    expect(exposed).not.toBeNull();
    expect(exposed?.drawingManagerPromise).toBeInstanceOf(Promise);
    wrapper.unmount();
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const wrapper = mount(DrawingManager);

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      $drawingManagerPromise,
    );
  });

  it('should call useDestroyPromisesOnUnmounted with the custom key when the component is unmounted', async () => {
    // given
    const props = { drawingKey: 'myDrawingKey' };
    const wrapper = mount(DrawingManager, { props });

    // when
    await flushPromises();
    wrapper.unmount();
    await flushPromises();

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.drawingKey,
    );
  });

  it('should reject the drawing manager promise with an actionable error when the drawing library is unavailable', async () => {
    // given
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {
      return undefined;
    });
    const googleWithoutDrawingLibrary = {
      ...googleMock,
      maps: {
        ...googleMock.maps,
        importLibrary: vi.fn((library?: string) => {
          if (library === 'drawing') {
            return {};
          }

          return googleMock.maps.importLibrary();
        }),
        drawing: undefined,
      },
    };
    vi.stubGlobal('google', googleWithoutDrawingLibrary);
    const wrapper = mount(DrawingManager);
    const exposed = wrapper.getCurrentComponent().exposed;
    expect(exposed).not.toBeNull();
    const rejectionExpectation = expect(
      exposed?.drawingManagerPromise,
    ).rejects.toThrow('DrawingManager in Maps JavaScript API v3.65+');

    // when
    await flushPromises();

    // then
    await rejectionExpectation;
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('Drawing Library is unavailable'),
    );
  });
});
