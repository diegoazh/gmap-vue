import { $map, $mapPromise } from '@/keys/gmap-vue.keys';
import { inject, provide } from 'vue';

let map: google.maps.Map | undefined;

export async function useMapElement(): Promise<{
  map: google.maps.Map | undefined;
}> {
  const mapPromise = inject($mapPromise);

  if (mapPromise) {
    /**
     * **Note**: although this mixin is not "providing" anything,
     * components' expect the `$map` property to be present on the component.
     * In order for that to happen, this mixin must intercept the `$mapPromise
     * .then(() => {})` first before its component does so.
     *
     * Since a `provide()` on a mixin is executed before a `provide()` on the
     * component, putting this code in `provide()` ensures that the `$map` is
     * already set by the time the component's `provide()` is called.
     */
    map = await mapPromise;
  }

  // TODO: the original mixin doesn't provide anything but we don't have access to $map here
  provide($map, map);

  return { map };
}

export default {
  useMapElement,
};
