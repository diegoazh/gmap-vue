---
title: drawing-manager
---
# GmapDrawingManager
DrawingManager component

::: tip Tags
**see**: [source code](/guide/drawing-manager.html#source-code)<br />**see**: [Official documentation](https://developers.google.com/maps/documentation/javascript/drawinglayer)<br />
:::

## Table of contents
[[toc]]

## Props

### circleOptions (`object`)
::: tip Tags
**see**: [circleOptions interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The circle options|
### markerOptions (`object`)
::: tip Tags
**see**: [markerOptions interface](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The marker options|
### polygonOptions (`object`)
::: tip Tags
**see**: [polygonOptions interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The polygon options|
### polylineOptions (`object`)
::: tip Tags
**see**: [polylineOptions interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The polyline options|
### rectangleOptions (`object`)
::: tip Tags
**see**: [rectangleOptions interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The rectangle options|
### position (`string`)


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|The position of the toolbar
**Possible values**: `'TOP_CENTER', 'TOP_LEFT', 'TOP_RIGHT', 'LEFT_TOP', 'RIGHT_TOP', 'LEFT_CENTER',
'RIGHT_CENTER', 'LEFT_BOTTOM', 'RIGHT_BOTTOM', 'BOTTOM_CENTER', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'`|
### shapes (`array`)


|type|default|description|
|:-|:-|:-|:-|
|`array`|-|An array of shapes that you can set to render in the map and saves on it the new shapes that you add.|


## Methods

### setDrawingMode (mode: `string`) -> `void`
 The setDrawingMode method is binded into the default component slot

::: tip Tags
**method**: setDrawingMode<br />**param**: mode - Possible values 'marker', 'circle', 'polygon', 'polyline', 'rectangle', null<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|mode|`string`|mode - Possible values 'marker', 'circle', 'polygon', 'polyline', 'rectangle', null

#### returns (void)
 undefined
### deleteSelection (undefined: `mixed`) -> `void`
 The deleteSelection method is binded into the default component slot

::: tip Tags
**method**: deleteSelection<br />**param**: It doesn't requires any parameter<br />**returns**: undefined<br />**access**: public<br />
:::

#### Params
| name | type | description
|:-|:-|:-|
|undefined|`mixed`|It doesn't requires any parameter

#### returns (void)
 undefined
## Slots

### default
Used to set your drawing manager
