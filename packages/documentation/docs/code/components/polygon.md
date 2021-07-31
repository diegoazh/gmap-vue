---
title: polygon
---
# GmapPolygon
Polygon component

::: tip Tags
**see**: [source code](/guide/polygon.html#source-code)<br />**see**: [official docs](https://developers.google.com/maps/documentation/javascript/examples/polygon-arrays?hl=es)<br />
:::

## Table of contents
[[toc]]

## Props

### deepWatch (`boolean`)
::: tip Tags
**value**: boolean<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|false|If set true the object will be deep watched|
### draggable (`boolean`)
::: tip Tags
**value**: true, false<br />**see**: [Polygon dragable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.draggable)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Indicates if the polygon is draggable|
### editable (`boolean`)
::: tip Tags
**value**: true, false<br />**see**: [Polygon editable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.editable)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Indicates if the polygon is editable|
### options (`object`)
::: tip Tags
**value**: boolean<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|More options that you can pass to the component|
### path (`array`)
::: tip Tags
**value**: Array<br />**see**: [Polygon path](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.path)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`array`|-|Indicates if the polygon is editable|
### paths (`array`)
::: tip Tags
**value**: Array<br />**see**: [Polygon paths](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.paths)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`array`|-|Indicates if the polygon is editable|


## Events

### paths_changed (undefined)

An event to detect when a paths changes
#### Properties
| name | type | description
|:-|:-|:-|
|paths|`array`|`this.$polygonObject.getPaths()` |### path_changed (undefined)

### path_changed (undefined)

An event to detect when a path change
#### Properties
| name | type | description
|:-|:-|:-|
|path|`array`|`this.$polygonObject.getPath()`

