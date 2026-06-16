---
id: polyline
sidebar_position: 7
sidebar_label: Polyline
---

# Polyline

:::info Official source

- [Google Maps Polyline reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline)

:::

`GmvPolyline` wraps `google.maps.Polyline`. It imports the Google Maps `maps` library internally, creates the polyline on the resolved map, binds supported props and events, exposes `polylineShapePromise`, and removes the polyline from the map on unmount.

The component is exported as `Polyline` from `@gmap-vue/v3/components` and registered by the plugin as `GmvPolyline`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `clickable` | `boolean` | `true` | Whether the polyline handles mouse events. |
| `draggable` | `boolean` | `false` | Whether users can drag the polyline. |
| `editable` | `boolean` | `false` | Whether users can edit the polyline path. |
| `geodesic` | `boolean` | `false` | Whether line segments should follow geodesic segments. |
| `icons` | `google.maps.IconSequence[]` | `undefined` | Line symbols rendered along the polyline. |
| `path` | `google.maps.MVCArray<google.maps.LatLng> \| (google.maps.LatLng \| google.maps.LatLngLiteral)[]` | `undefined` | Polyline path. |
| `strokeColor` | `string` | `undefined` | Stroke color. |
| `strokeOpacity` | `number` | `undefined` | Stroke opacity from `0` to `1`. |
| `strokeWeight` | `number` | `undefined` | Stroke width in pixels. |
| `visible` | `boolean` | `true` | Whether the polyline is visible. |
| `zIndex` | `number` | `undefined` | Stacking order. |
| `deepWatch` | `boolean` | `false` | Enables deep Vue watching for the `path` prop. |
| `polylineKey` | `string` | `undefined` | Promise key used by `usePolylinePromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the polyline is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google Polyline options not represented by explicit props. Spread after explicit props, so it can override them. |

## Events

| Event | Notes |
| --- | --- |
| `click` | Google Maps event. |
| `contextmenu` | Google Maps event. |
| `dblclick` | Google Maps event. |
| `drag` | Google Maps event. |
| `dragend` | Google Maps event. |
| `dragstart` | Google Maps event. |
| `mousedown` | Google Maps event. |
| `mousemove` | Google Maps event. |
| `mouseout` | Google Maps event. |
| `mouseover` | Google Maps event. |
| `mouseup` | Google Maps event. |
| `path_changed` | Emitted from Google Maps MVC path mutations. This is not `v-model`. |

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `polylineShapePromise` | `Promise<google.maps.Polyline \| undefined>` | Resolves to the underlying Google Polyline instance. |

## Composable

Use `usePolylinePromise(key?)` from `@gmap-vue/v3/composables`. Without a key it uses the default polyline promise; with multiple polylines, pass the same value as `polyline-key`.

```ts showLineNumbers
export function usePolylinePromise(
  key: string | InjectionKey<Promise<google.maps.Polyline | undefined>> = $polylineShapePromise,
): Promise<google.maps.Polyline | undefined>;
```

## Related pages

- [Polyline guide](/docs/vue-3-version/guide/components/polyline)
- [Composables API](/docs/vue-3-version/api/composables)
