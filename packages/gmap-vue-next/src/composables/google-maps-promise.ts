import { $mapPromise } from '@/keys/gmap-vue.keys';
import { inject, ref, type Ref } from 'vue';

const map: Ref<google.maps.Map | undefined> = ref();

/**
 * Internal use
 *
 * @returns Ref
 */
export function getMap(): Ref<google.maps.Map | undefined> {
  return map;
}

/**
 * Add description
 *
 * @returns Promise
 */
export async function useMapPromise(): Promise<void> {
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
  const mapPromise = inject($mapPromise);
  map.value = await mapPromise;
}
