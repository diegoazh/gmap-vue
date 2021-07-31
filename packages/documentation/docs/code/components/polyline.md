---
title: polyline
---
# GmapPolyline
PolyLine component

::: tip Tags
**see**: [source code](/guide/polyline.html#source-code)<br />**see**: [official docs](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polyline)<br />
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
**value**: true, false<br />**see**: [Polyline draggable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.draggable)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Indicates if the polyline is draggable|
### editable (`boolean`)
::: tip Tags
**value**: true, false<br />**see**: [Polyline editable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.editable)<br />
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
**value**: Array<br />**see**: [Polyline path](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.path)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`array`|-|Indicates if the polygon is editable|


## Events

### path_changed (undefined)

An event to detect when a path change
#### Properties
| name | type | description
|:-|:-|:-|
|path|`array`|`this.$polygonObject.getPath()`

