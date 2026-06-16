---
id: info-window
sidebar_position: 4
sidebar_label: InfoWindow
---

# InfoWindow

:::info Official sources

- [InfoWindow guide](https://developers.google.com/maps/documentation/javascript/infowindows)
- [InfoWindow reference](https://developers.google.com/maps/documentation/javascript/reference/info-window)

:::

`GmvInfoWindow` wraps `google.maps.InfoWindow`. It uses `google.maps.importLibrary("maps")`, creates a Google InfoWindow, and opens it on a map, on a marker, or at a position.

The component is exported as `InfoWindow` from `@gmap-vue/v3/components` and registered by the plugin as `GmvInfoWindow`.

## Props

```ts title="InfoWindow props interface" showLineNumbers
export interface InfoWindowProps {
  ariaLabel?: string;
  content?: string | Element | Text;
  disableAutoPan?: boolean;
  maxWidth?: number;
  minWidth?: number;
  pixelOffset?: google.maps.Size;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  zIndex?: number;
  opened?: boolean;
  marker?: google.maps.marker.AdvancedMarkerElement;
  infoWindowKey?: string;
  markerKey?: string;
  mapKey?: string;
  options?: Record<string | number | symbol, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | `undefined` | Accessibility label for the info window. |
| `content` | `string \| Element \| Text` | `undefined` | Content applied through the component watcher when this prop changes. For initial rendered content, prefer the default slot. |
| `disableAutoPan` | `boolean` | `false` | Prevents the map from panning to show the info window. |
| `maxWidth` | `number` | `undefined` | Maximum width in pixels. |
| `minWidth` | `number` | `undefined` | Minimum width in pixels. |
| `pixelOffset` | `google.maps.Size` | `undefined` | Pixel offset from the anchor. |
| `position` | `google.maps.LatLng \| google.maps.LatLngLiteral` | `undefined` | Position for map-only info windows. |
| `zIndex` | `number` | `undefined` | Stacking order. |
| `opened` | `boolean` | `undefined` | Controls whether the info window is open. |
| `marker` | `google.maps.marker.AdvancedMarkerElement` | `undefined` | Explicit marker anchor. Used when no marker is resolved from `markerKey`. |
| `infoWindowKey` | `string` | `undefined` | Promise key used by `useInfoWindowPromise(key)`. |
| `markerKey` | `string` | `undefined` | Marker promise key used to anchor the info window. |
| `mapKey` | `string` | `undefined` | Map promise key used when the info window is not a direct descendant of `GmvMap`. |
| `options` | `Record<string \| number \| symbol, unknown>` | `undefined` | Fallback for Google InfoWindow options not yet represented by explicit props. |

## Open behavior

When `opened` is truthy, `GmvInfoWindow` opens with this precedence:

1. marker resolved from `markerKey`,
2. explicit `marker` prop,
3. map-only open.

When `opened` is falsey, it calls `infoWindow.close()`.

Changing `position` while open calls `setPosition(value)` and reopens the info window. Changing `marker` while open reopens it anchored to the new marker.

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `close` | none | Fired when the info window closes. |
| `closeclick` | none | Fired when the close button is clicked. |
| `content_changed` | none | Fired when Google reports content changed. |
| `domready` | none | Fired when the content DOM is attached. |
| `position_changed` | none | Fired when Google reports position changed. |
| `visible` | none | Fired when the info window becomes visible. |
| `zindex_changed` | none | Fired when Google reports z-index changed. |

## Slots

The default slot is used as info window content.

```vue showLineNumbers
<template>
  <GmvMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="13"
    style="width: 100%; height: 500px"
  >
    <GmvInfoWindow :position="{ lat: -34.6037, lng: -58.3816 }" :opened="true">
      <strong>Details</strong>
    </GmvInfoWindow>
  </GmvMap>
</template>
```

:::warning
Slot content is moved into Google Maps' DOM on mount so the Google InfoWindow can own the rendered content. Avoid relying on the original parent DOM structure around slotted content.
:::

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `infoWindowPromise` | `Promise<google.maps.InfoWindow \| undefined>` | Resolves to the underlying Google InfoWindow instance. |

```vue showLineNumbers
<script setup lang="ts">
import { InfoWindow } from "@gmap-vue/v3/components";
import { ref } from "vue";

const infoWindowRef = ref<InstanceType<typeof InfoWindow> | null>(null);

async function readInfoWindow() {
  const infoWindow = await infoWindowRef.value?.infoWindowPromise;
  console.log(infoWindow?.getPosition());
}
</script>

<template>
  <GmvMap
    :center="{ lat: -34.6037, lng: -58.3816 }"
    :zoom="13"
    style="width: 100%; height: 500px"
  >
    <GmvInfoWindow
      ref="infoWindowRef"
      :position="{ lat: -34.6037, lng: -58.3816 }"
      :opened="true"
    >
      Details
    </GmvInfoWindow>
  </GmvMap>

  <button @click="readInfoWindow">Read info window</button>
</template>
```

## Related APIs

- [`useInfoWindowPromise`](/docs/vue-3-version/api/composables#useinfowindowpromise)
- [InfoWindow guide](/docs/vue-3-version/guide/components/info-window)
- [Marker guide](/docs/vue-3-version/guide/components/marker)
