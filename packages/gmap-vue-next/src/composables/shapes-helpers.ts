function clearEvents(
  eventListeners: [
    (
      | google.maps.MVCArray<google.maps.LatLng>
      | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    ),
    google.maps.MapsEventListener
  ][]
) {
  eventListeners.forEach(([, listenerHandle]) => {
    google.maps.event.removeListener(listenerHandle);
  });
}

function updatePathOrPaths<
  T extends 'paths_changed' | 'path_changed',
  U extends
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.MVCArray<google.maps.LatLng> = T extends 'paths_changed'
    ? google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    : google.maps.MVCArray<google.maps.LatLng>
>(eventName: T, fn: () => U, emits: (eventName: T, cb: U) => void): () => void {
  /**
   * An event to detect when a paths change
   * @property {array} paths `this.$polygonObject.getPaths()` |
   */
  return () => emits(eventName, fn());
}

export function useShapesHelpers() {
  return { clearEvents, updatePathOrPaths };
}
