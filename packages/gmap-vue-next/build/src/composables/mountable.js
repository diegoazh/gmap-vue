/* eslint-disable no-underscore-dangle -- old style, should be analyzed */
import { nextTick, onUnmounted, ref, watch } from 'vue';
import { useDefaultResizeBus } from './default-resize-bus';
import { useMapObjectOrMapPromiseDeferred } from './map-promise';
export function useResizeBus(props) {
    const { $mapObject } = useMapObjectOrMapPromiseDeferred();
    const { defaultResizeBus } = useDefaultResizeBus();
    // TODO: enable this when move to composition API
    // const props = defineProps<Props>();
    const _actualResizeBus = ref();
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
    function resize() {
        if ($mapObject) {
            google.maps.event.trigger($mapObject, 'resize');
        }
    }
    function _resizeCallback() {
        resize();
    }
    function _delayedResizeCallback() {
        nextTick(() => _resizeCallback());
    }
    watch(() => props.resizeBus, (newVal) => {
        _actualResizeBus.value = newVal;
    });
    watch(() => _actualResizeBus, (newVal, oldVal) => {
        if (oldVal.value) {
            oldVal.value.off('resize', _delayedResizeCallback);
        }
        if (newVal.value) {
            newVal.value.on('resize', _delayedResizeCallback);
        }
    });
    onUnmounted(() => {
        if (_actualResizeBus.value) {
            _actualResizeBus.value.off('resize', _delayedResizeCallback);
        }
    });
    return { _actualResizeBus, resize, _resizeCallback, _delayedResizeCallback };
}
