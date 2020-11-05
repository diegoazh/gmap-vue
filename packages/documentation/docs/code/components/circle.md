---
title: circle
---
# GmapCircle
Circle component

::: tip Tags
**see**: [source code](/guide/circle.html)<br />
:::

## Table of contents
[[toc]]

## Props

### center (`object`)
::: tip Tags
**value**: { lat: 41.878, lng: -87.629 }<br />**see**: [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The center of the circle|
### radius (`number`)
::: tip Tags
**value**: 10<br />**see**: [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The radious of the circle|
### draggable (`boolean`)
::: tip Tags
**value**: true, false<br />**see**: [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|false|Indicates if the circle is draggable|
### editable (`boolean`)
::: tip Tags
**value**: true, false<br />**see**: [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|false|Indicates if the circle is editable|
### options (`object`)
::: tip Tags
**value**: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 100,
      }<br />**see**: [Circle simple](https://developers.google.com/maps/documentation/javascript/examples/circle-simple)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The Google Maps circle options|

