---
id: street-view-panorama
sidebar_position: 10
sidebar_label: Street View Panorama
---

# Street View Panorama

:::info Official sources

- [Street View guide](https://developers.google.com/maps/documentation/javascript/streetview)
- [StreetViewPanorama reference](https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanorama)
- [StreetViewPanoramaOptions reference](https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanoramaOptions)

:::

`GmvStreetViewPanorama` wraps `google.maps.StreetViewPanorama`. It creates a standalone panorama element and imports the Google `streetView` library internally.

The component is exported as `StreetViewPanorama` from `@gmap-vue/v3/components` and registered by the plugin as `GmvStreetViewPanorama`.

## Props

```ts title="StreetViewPanorama props interface" showLineNumbers
export interface StreetViewPanoramaProps {
  addressControl?: boolean;
  addressControlOptions?: google.maps.StreetViewAddressControlOptions;
  clickToGo?: boolean;
  controlSize?: number;
  disableDefaultUI?: boolean;
  disableDoubleClickZoom?: boolean;
  enableCloseButton?: boolean;
  fullscreenControl?: boolean;
  fullscreenControlOptions?: google.maps.FullscreenControlOptions;
  imageDateControl?: boolean;
  linksControl?: boolean;
  motionTracking?: boolean;
  motionTrackingControl?: boolean;
  motionTrackingControlOptions?: google.maps.MotionTrackingControlOptions;
  panControl?: boolean;
  panControlOptions?: google.maps.PanControlOptions;
  pano?: string;
  position?: google.maps.LatLng | google.maps.LatLngLiteral;
  pov?: google.maps.StreetViewPov;
  scrollwheel?: boolean;
  showRoadLabels?: boolean;
  visible?: boolean;
  zoom?: number;
  zoomControl?: boolean;
  zoomControlOptions?: google.maps.ZoomControlOptions;
  streetViewKey?: string;
  options?: Record<string, unknown>;
}
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `addressControl` | `boolean` | `undefined` | Shows or hides the address control. |
| `addressControlOptions` | `google.maps.StreetViewAddressControlOptions` | `undefined` | Address control options. |
| `clickToGo` | `boolean` | `true` | Enables click-to-go navigation. |
| `controlSize` | `number` | `undefined` | Control size in pixels. |
| `disableDefaultUI` | `boolean` | `undefined` | Disables the default Street View UI. |
| `disableDoubleClickZoom` | `boolean` | `true` | Disables zoom on double click. |
| `enableCloseButton` | `boolean` | `false` | Shows the close button. |
| `fullscreenControl` | `boolean` | `undefined` | Shows or hides the fullscreen control. |
| `fullscreenControlOptions` | `google.maps.FullscreenControlOptions` | `undefined` | Fullscreen control options. |
| `imageDateControl` | `boolean` | `undefined` | Shows or hides the image date control. |
| `linksControl` | `boolean` | `undefined` | Shows or hides navigation links. |
| `motionTracking` | `boolean` | `undefined` | Enables motion tracking where supported. |
| `motionTrackingControl` | `boolean` | `undefined` | Shows or hides the motion tracking control. |
| `motionTrackingControlOptions` | `google.maps.MotionTrackingControlOptions` | `undefined` | Motion tracking control options. |
| `panControl` | `boolean` | `undefined` | Shows or hides the pan control. |
| `panControlOptions` | `google.maps.PanControlOptions` | `undefined` | Pan control options. |
| `pano` | `string` | `undefined` | Street View panorama ID. |
| `position` | `google.maps.LatLng \| google.maps.LatLngLiteral` | `undefined` | Street View position. |
| `pov` | `google.maps.StreetViewPov` | `undefined` | Camera heading and pitch. |
| `scrollwheel` | `boolean` | `true` | Enables scrollwheel zoom. |
| `showRoadLabels` | `boolean` | `true` | Shows road labels in the panorama. |
| `visible` | `boolean` | `true` | Shows or hides the panorama. |
| `zoom` | `number` | `undefined` | Street View zoom level. |
| `zoomControl` | `boolean` | `undefined` | Shows or hides the zoom control. |
| `zoomControlOptions` | `google.maps.ZoomControlOptions` | `undefined` | Zoom control options. |
| `streetViewKey` | `string` | `undefined` | Promise key used by `useStreetViewPanoramaPromise(key)`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google StreetViewPanorama options not represented by explicit props. Spread after explicit props, so it can override them. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `closeclick` | Google event payload | Fired when the close button is clicked. |
| `pano_changed` | current pano value | Fired when the panorama ID changes. |
| `position_changed` | `google.maps.LatLng \| null` | Fired when the panorama position changes. |
| `pov_changed` | current POV value | Fired when the point of view changes. |
| `resize` | Google event payload | Fired when the Google panorama resize event is triggered. |
| `visible_changed` | current visible value | Fired when visibility changes. |

These events are not `v-model` updates. Use them to update your own state only when needed.

## Exposed properties and methods

| Exposed member | Type | Description |
| --- | --- | --- |
| `streetViewPanoramaPromise` | `Promise<google.maps.StreetViewPanorama \| undefined>` | Resolves to the underlying Google StreetViewPanorama instance. |
| `resize()` | `() => Promise<void>` | Triggers the Google `resize` event on the panorama instance. |
| `resizePreserveCenter()` | `() => Promise<void>` | Triggers resize and restores the previous Street View position when available. |
| `currentResizeBus` | `() => void` | Resize bus callback. |
| `_resizeCallback` | `() => void` | Internal resize callback exposed by the component. |
| `_delayedResizeCallback` | `() => Promise<void>` | Delayed resize callback exposed by the component. |
| `gmvStreetViewPanorama` | `Readonly<ShallowRef<HTMLDivElement \| null>>` | Template ref for the panorama container element. |

```vue showLineNumbers
<script setup lang="ts">
import { StreetViewPanorama } from "@gmap-vue/v3/components";
import { ref } from "vue";

const panoramaRef = ref<InstanceType<typeof StreetViewPanorama> | null>(null);

async function resizePanorama() {
  await panoramaRef.value?.resizePreserveCenter();
}
</script>

<template>
  <GmvStreetViewPanorama
    ref="panoramaRef"
    style="position: relative; width: 100%; height: 500px"
    :position="{ lat: 40.758, lng: -73.9855 }"
  />

  <button @click="resizePanorama">Resize</button>
</template>
```

## Composable access

Use `useStreetViewPanoramaPromise(key?)` when direct component refs are inconvenient.

```ts showLineNumbers
import { useStreetViewPanoramaPromise } from "@gmap-vue/v3/composables";

const streetViewPanoramaPromise = useStreetViewPanoramaPromise("main-street-view");
```

For a single panorama, the key is optional and defaults to the shared `$streetViewPanoramaPromise` key. Use a unique `streetViewKey` for every simultaneously mounted panorama so instances do not share the same global promise key.

## Layout requirements

The component renders an absolutely positioned panorama element inside its own root element. Give `GmvStreetViewPanorama` itself an explicit height and positioning context, for example with a class or inline style on the component.

## Related APIs

- [Street View Panorama guide](/docs/vue-3-version/guide/components/street-view-panorama)
- [`useStreetViewPanoramaPromise`](/docs/vue-3-version/api/composables#usestreetviewpanoramapromise)
