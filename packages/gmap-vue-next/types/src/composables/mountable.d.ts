import type { Emitter, EventType } from 'mitt';
import { type Ref } from 'vue';
export interface Props {
    resizeBus?: Emitter<Record<EventType, unknown>>;
}
export declare function useResizeBus(props: {
    [key: string]: any;
}): {
    _actualResizeBus: Ref<Emitter<Record<EventType, unknown>> | undefined>;
    resize: () => void;
    _resizeCallback: () => void;
    _delayedResizeCallback: () => void;
};
