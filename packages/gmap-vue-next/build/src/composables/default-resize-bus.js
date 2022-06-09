import mitt from 'mitt';
export const defaultResizeBus = mitt();
export function useDefaultResizeBus() {
    return { defaultResizeBus };
}
