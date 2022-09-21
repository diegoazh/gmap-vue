import type { InjectionKey } from 'vue';

// export const $map = Symbol() as InjectionKey<google.maps.Map | undefined>;
export const $mapPromise = Symbol('mapPromise') as InjectionKey<
  Promise<google.maps.Map | undefined>
>;
// export const $googleMapsAPIPromise = Symbol() as InjectionKey<Promise<void>>;
