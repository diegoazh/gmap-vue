---
title: place-input
---
# PlaceInput
PlaceInput component

::: tip Tags
**deprecated**: true<br />**see**: [source code](/guide/place-input.html#source-code)<br />**see**: [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)<br />
:::

## Table of contents
[[toc]]

## Props

### bounds (`object`)
::: tip Tags
**value**: new google.maps.LatLngBounds(...)<br />**see**: [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Map bounds this is an LatLngBounds
object builded with|
### defaultPlace (`string`)
::: tip Tags
**value**: string<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|''|A default value for the html input|
### componentRestrictions (`object`)
::: tip Tags
**value**: `{[key: string]: string}`<br />**see**: [componentRestrictions](https://developers.google.com/maps/documentation/javascript/places-autocomplete#restrict-the-search-to-a-specific-country)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|null|Restrict the search to a specific country|
### types (`array`)
::: tip Tags
**value**: string[]<br />**see**: [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`array`|[]|Map types this is an array of strings|
### placeholder (`string`)
::: tip Tags
**value**: string<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|A placeholder for the html input|
### className (`string`)
::: tip Tags
**value**: string<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|A html class name for the html input|
### label (`string`)
::: tip Tags
**value**: string<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|null|A label for the html input|
### selectFirstOnEnter (`boolean`)
::: tip Tags
**value**: boolean<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|false|If true the first element on the list will be selected
when you press enter in the html input.|


## Events

### place_changed (undefined)

Place change event
#### Properties
| name | type | description
|:-|:-|:-|
|place|`object`|`this.$autocomplete.getPlace()`

