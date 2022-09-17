/* eslint-disable no-underscore-dangle -- old style, should be analyzed */

import type { Emitter, EventType } from 'mitt';
import mitt from 'mitt';
import { nextTick, ref, type Ref, watch } from 'vue';

// not used
type Events = {};

interface Props {
  resizeBus?: Emitter<Record<EventType, unknown>>;
}

// end not used

const defaultResizeBus = mitt();
const currentResizeBus: Ref<Emitter<Record<EventType, unknown>> | undefined> =
  ref();
let _resizeCallback: () => void;
let _delayedResizeCallback: () => Promise<void>;

export function onMountedResizeBusHook(
  map: google.maps.Map,
  props: { [key: string]: any },
  resize: () => void
) {
  if (!props.resizeBus) {
    currentResizeBus.value = defaultResizeBus;
  }

  if (props.resizeBus) {
    currentResizeBus.value = props.resizeBus;
  }

  _resizeCallback = (preserveCenter = false): void => {
    resize();
  };

  _delayedResizeCallback = (): Promise<void> => {
    return nextTick(() => _resizeCallback());
  };

  watch(
    () => props.resizeBus,
    (newVal) => {
      currentResizeBus.value = newVal.value;
    }
  );

  watch(
    () => currentResizeBus,
    (newVal, oldVal) => {
      if (oldVal.value) {
        oldVal.value.off('resize', _delayedResizeCallback);
      }

      if (newVal.value) {
        newVal.value.on('resize', _delayedResizeCallback);
      }
    }
  );
}

export function onUnmountedResizeBusHook() {
  if (currentResizeBus.value) {
    currentResizeBus.value.off('resize', _delayedResizeCallback);
  }
}

export function getDefaultResizeBus() {
  return defaultResizeBus;
}

export function useResizeBus() {
  return {
    currentResizeBus,
    _resizeCallback,
    _delayedResizeCallback,
  };
}
