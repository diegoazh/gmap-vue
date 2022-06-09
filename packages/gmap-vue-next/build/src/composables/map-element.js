var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $map, $mapPromise } from '@/keys/gmap-vue.keys';
import { inject, provide } from 'vue';
let map;
export function useMapElement() {
    return __awaiter(this, void 0, void 0, function* () {
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
            map = yield mapPromise;
        }
        // TODO: the original mixin doesn't provide anything but we don't have access to $map here
        provide($map, map);
        return { map };
    });
}
export default {
    useMapElement,
};
