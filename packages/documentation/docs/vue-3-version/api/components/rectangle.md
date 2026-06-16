---
id: rectangle
sidebar_position: 8
sidebar_label: Rectangle
---

# Rectangle

:::info Official source

- [Google Maps Rectangle reference](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle)

:::

`GmvRectangle` wraps `google.maps.Rectangle`. It imports the Google Maps `maps` library internally, creates the rectangle on the resolved map, binds supported props and events, exposes `rectangleShapePromise`, and removes the rectangle from the map on unmount.

The component is exported as `Rectangle` from `@gmap-vue/v3/components` and registered by the plugin as `GmvRectangle`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bounds` | `google.maps.LatLngBounds \| google.maps.LatLngBoundsLiteral` | `undefined` | Rectangle bounds. |
| `clickable` | `boolean` | `true` | Whether the rectangle handles mouse events. |
| `draggable` | `boolean` | `false` | Whether users can drag the rectangle. |
| `editable` | `boolean` | `false` | Whether users can edit the rectangle bounds. |
| `fillColor` | `string` | `undefined` | Fill color. |
| `fillOpacity` | `number` | `undefined` | Fill opacity from `0` to `1`. |
| `strokeColor` | `string` | `undefined` | Stroke color. |
| `strokeOpacity` | `number` | `undefined` | Stroke opacity from `0` to `1`. |
| `strokePosition` | `google.maps.StrokePosition` | `google.maps.StrokePosition.CENTER` or `0` | Stroke position. |
| `strokeWeight` | `number` | `undefined` | Stroke width in pixels. |
| `visible` | `boolean` | `true` | Whether the rectangle is visible. |
| `zIndex` | `number` | `undefined` | Stacking order. |
| `rectangleKey` | `string` | `undefined` | Promise key used by `useRectanglePromise(key)`. |
| `mapKey` | `string` | `undefined` | Map promise key used when the rectangle is not a direct descendant of `GmvMap`. |
| `options` | `Record<string, unknown>` | `undefined` | Fallback for Google Rectangle options not represented by explicit props. Spread after explicit props, so it can override them. |

## Events

| Event |
| --- |
| `bounds_changed` |
| `click` |
| `contextmenu` |
| `dblclick` |
| `drag` |
| `dragend` |
| `dragstart` |
| `mousedown` |
| `mousemove` |
| `mouseout` |
| `mouseover` |
| `mouseup` |

## Exposed properties

| Property | Type | Description |
| --- | --- | --- |
| `rectangleShapePromise` | `Promise<google.maps.Rectangle \| undefined>` | Resolves to the underlying Google Rectangle instance. |

## Composable

Use `useRectanglePromise(key?)` from `@gmap-vue/v3/composables`. Without a key it uses the default rectangle promise; with multiple rectangles, pass the same value as `rectangle-key`.

```ts showLineNumbers
export function useRectanglePromise(
  key: string | InjectionKey<Promise<google.maps.Rectangle | undefined>> = $rectangleShapePromise,
): Promise<google.maps.Rectangle | undefined>;
```

## Related pages

- [Rectangle guide](/docs/vue-3-version/guide/components/rectangle)
- [Composables API](/docs/vue-3-version/api/composables)
