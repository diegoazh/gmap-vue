---
id: circle
sidebar_position: 5
sidebar_label: Circle
---

# Circle

:::info Official source

- [Google Maps Circle reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle)

:::

`GmvCircle` wraps `google.maps.Circle`. It imports the Google Maps `maps` library internally, creates the circle on the resolved map, binds supported props and events, exposes `circleShapePromise`, and removes the circle from the map on unmount.

The component is exported as `Circle` from `@gmap-vue/v3/components` and registered by the plugin as `GmvCircle`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `center` | `google.maps.LatLng \| google.maps.LatLngLiteral` | `undefined` | Circle center. |
| `clickable` | `boolean` | `true` | Whether the circle handles mouse events. |
| `draggable` | `boolean` | `false` | Whether users can drag the circle. |
| `editable` | `boolean` | `false` | Whether users can edit the circle. |
| `fillColor` | `string` | `undefined` | Fill color. |
| `fillOpacity` | `number` | `undefined` | Fill opacity from `0` to `1`. |
| `radius` | `number` | `undefined` | Circle radius in meters. |
| `strokeColor` | `string` | `undefined` | Stroke color. |
| `strokeOpacity` | `number` | `undefined` | Stroke opacity from `0` to `1`. |
| `strokePosition` | `google.maps.StrokePosition` | `google.maps.StrokePosition.CENTER` or `0` | Stroke position. |
| `strokeWeight` | `number` | `undefined` | Stroke width in pixels. |
| `visible` | `boolean` | `true` | Whether the circle is visible. |
| `zIndex` | `number` | `undefined` | Stacking order. |
| `circleKey` | `string` | `undefined` | Promise key used by `useCirclePromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the circle is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google Circle options not represented by explicit props. Spread after explicit props, so it can override them. |

## Events

| Event |
| --- |
| `center_changed` |
| `click` |
| `dblclick` |
| `drag` |
| `dragend` |
| `dragstart` |
| `mousedown` |
| `mousemove` |
| `mouseout` |
| `mouseover` |
| `mouseup` |
| `radius_changed` |
| `rightclick` |

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `circleShapePromise` | `Promise<google.maps.Circle \| undefined>` | Resolves to the underlying Google Circle instance. |

## Composable

Use `useCirclePromise(key?)` from `@gmap-vue/v3/composables`. Without a key it uses the default circle promise; with multiple circles, pass the same value as `circle-key`.

```ts showLineNumbers
export function useCirclePromise(
  key: string | InjectionKey<Promise<google.maps.Circle | undefined>> = $circleShapePromise,
): Promise<google.maps.Circle | undefined>;
```

## Related pages

- [Circle guide](/docs/vue-3-version/guide/components/circle)
- [Composables API](/docs/vue-3-version/api/composables)
