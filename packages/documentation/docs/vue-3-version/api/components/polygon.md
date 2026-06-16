---
id: polygon
sidebar_position: 6
sidebar_label: Polygon
---

# Polygon

:::info Official source

- [Google Maps Polygon reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon)

:::

`GmvPolygon` wraps `google.maps.Polygon`. It imports the Google Maps `maps` library internally, creates the polygon on the resolved map, binds supported props and events, exposes `polygonShapePromise`, and removes the polygon from the map on unmount.

The component is exported as `Polygon` from `@gmap-vue/v3/components` and registered by the plugin as `GmvPolygon`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `clickable` | `boolean` | `true` | Whether the polygon handles mouse events. |
| `draggable` | `boolean` | `false` | Whether users can drag the polygon. |
| `editable` | `boolean` | `false` | Whether users can edit the polygon paths. |
| `fillColor` | `string` | `undefined` | Fill color. |
| `fillOpacity` | `number` | `undefined` | Fill opacity from `0` to `1`. |
| `geodesic` | `boolean` | `false` | Whether polygon edges should follow geodesic segments. |
| `paths` | `google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>> \| google.maps.MVCArray<google.maps.LatLng> \| (google.maps.LatLng \| google.maps.LatLngLiteral)[] \| (google.maps.LatLng \| google.maps.LatLngLiteral)[][]` | `undefined` | Polygon paths. |
| `strokeColor` | `string` | `undefined` | Stroke color. |
| `strokeOpacity` | `number` | `undefined` | Stroke opacity from `0` to `1`. |
| `strokePosition` | `google.maps.StrokePosition` | `google.maps.StrokePosition.CENTER` or `0` | Stroke position. |
| `strokeWeight` | `number` | `undefined` | Stroke width in pixels. |
| `visible` | `boolean` | `true` | Whether the polygon is visible. |
| `zIndex` | `number` | `undefined` | Stacking order. |
| `deepWatch` | `boolean` | `false` | Enables deep Vue watching for the `paths` prop. |
| `polygonKey` | `string` | `undefined` | Promise key used by `usePolygonPromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the polygon is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google Polygon options not represented by explicit props. Spread after explicit props, so it can override them. |

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
| `paths_changed` | Emitted from Google Maps MVC path mutations. This is not `v-model`. |

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `polygonShapePromise` | `Promise<google.maps.Polygon \| undefined>` | Resolves to the underlying Google Polygon instance. |

## Composable

Use `usePolygonPromise(key?)` from `@gmap-vue/v3/composables`. Without a key it uses the default polygon promise; with multiple polygons, pass the same value as `polygon-key`.

```ts showLineNumbers
export function usePolygonPromise(
  key: string | InjectionKey<Promise<google.maps.Polygon | undefined>> = $polygonShapePromise,
): Promise<google.maps.Polygon | undefined>;
```

## Related pages

- [Polygon guide](/docs/vue-3-version/guide/components/polygon)
- [Composables API](/docs/vue-3-version/api/composables)
