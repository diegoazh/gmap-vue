import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentInstance } from 'vue';
import DrawingManager from '../src/components/drawing-manager.vue';
import * as composables from '../src/composables';
import { useDestroyPromisesOnUnmounted } from '../src/composables';
import { $drawingManagerPromise } from '../src/keys';
import { drawingValues, googleMock } from './mocks/global.mock';

describe('DrawingManager component', () => {
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
    const props = { drawingKey: 'myDrawingKey' };
    const template = `<div>\n  <!-- @slot Used to set your drawing manager -->\n</div>`;
    const wrapper = mount(DrawingManager, { props });

    // when
    await flushPromises();

    // then
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.html()).toEqual(template);
    expect(wrapper.props()).toEqual({
      ...props,
      circleOptions: undefined,
      drawingControl: true,
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
        map: new Map(),
        ...props,
        drawingControl: true,
        drawingControlOptions: {
          drawingModes: ['MARKER', 'CIRCLE', 'POLYGON', undefined, undefined],
          position: 'TOP_CENTER',
        },
        drawingKey: 'myDrawingKey',
      }),
    );
    expect(
      wrapper.getCurrentComponent().exposed?.drawingManagerPromise,
    ).toBeInstanceOf(Promise);
  });

  it('should call useDestroyPromisesOnUnmounted with the default key when the component is unmounted', async () => {
    // given
    const wrapper = mount(DrawingManager);

    // when
    await flushPromises();
    wrapper.unmount();

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

    // then
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledOnce();
    expect(useDestroyPromisesOnUnmounted).toHaveBeenCalledWith(
      props.drawingKey,
    );
  });
});
