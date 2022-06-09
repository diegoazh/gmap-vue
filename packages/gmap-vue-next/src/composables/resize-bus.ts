/* eslint-disable no-underscore-dangle -- old style, should be analyzed */

import type { Emitter, EventType } from 'mitt';
import mitt from 'mitt';
import { nextTick, onUnmounted, ref, watch, type Ref } from 'vue';
import { useMapObjectOrMapPromiseDeferred } from './map-promise';

type Events = {};

export interface Props {
  resizeBus?: Emitter<Record<EventType, unknown>>;
}

export const defaultResizeBus = mitt();
export function useDefaultResizeBus() {
  return { defaultResizeBus };
}
export function useResizeBus(props: { [key: string]: any }) {
  const { $mapObject } = useMapObjectOrMapPromiseDeferred();
  const { defaultResizeBus } = useDefaultResizeBus();

  // TODO: enable this when move to composition API
  // const props = defineProps<Props>();
  const _actualResizeBus: Ref<Emitter<Record<EventType, unknown>> | undefined> =
    ref();

  if (!props.resizeBus) {
    _actualResizeBus.value = defaultResizeBus;
  }

  if (props.resizeBus) {
    _actualResizeBus.value = props.resizeBus;
  }

  /**
   * This method trigger the resize event of Google Maps
   * @method resize
   * @param {undefined}
   * @returns {void}
   * @public
   */
  function resize(): void {
    if ($mapObject) {
      google.maps.event.trigger($mapObject, 'resize');
    }
  }

  function _resizeCallback(): void {
    resize();
  }

  function _delayedResizeCallback(): void {
    nextTick(() => _resizeCallback());
  }

  watch(
    () => props.resizeBus,
    (newVal) => {
      _actualResizeBus.value = newVal;
    }
  );

  watch(
    () => _actualResizeBus,
    (newVal, oldVal) => {
      if (oldVal.value) {
        oldVal.value.off('resize', _delayedResizeCallback);
      }

      if (newVal.value) {
        newVal.value.on('resize', _delayedResizeCallback);
      }
    }
  );

  onUnmounted(() => {
    if (_actualResizeBus.value) {
      _actualResizeBus.value.off('resize', _delayedResizeCallback);
    }
  });

  return { _actualResizeBus, resize, _resizeCallback, _delayedResizeCallback };
}

export default {
  defaultResizeBus,
  useDefaultResizeBus,
  useResizeBus,
}
