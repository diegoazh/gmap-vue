---
title: autocomplete
---
# GmapAutocomplete
Autocomplete component

::: tip Tags
**see**: [source code](/guide/autocomplete.html#source-code)<br />
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
### componentRestrictions (`object`)
::: tip Tags
**value**: `{[key: string]: string}`<br />**see**: [componentRestrictions](https://developers.google.com/maps/documentation/javascript/places-autocomplete#restrict-the-search-to-a-specific-country)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Restrict the search to a specific country|
### types (`array`)
::: tip Tags
**value**: string[]<br />**see**: [Map Bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#set-the-bounds-on-creation-of-the-autocomplete-object)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`array`|[]|Map types this is an array of strings|
### selectFirstOnEnter (`boolean`)
::: tip Tags

:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|false|Select the first result in the list when press enter keyboard|
### slotRefName (`string`)


|type|default|description|
|:-|:-|:-|:-|
|`string`|'input'|the unique ref set to the component passed in the slot input|
### childRefName (`string`)


|type|default|description|
|:-|:-|:-|:-|
|`string`|'input'|The name of the ref to obtain the html input element
if its a child  of component in the slot input
very useful whe we use a component like v-text-field of vuetify
that has a 'input' ref pointing to the final html input element|
### options (`object`)
::: tip Tags
**see**: [Options](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add-autocomplete)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|Other options that you can pass to the Google Mapas
Autocomplete API|
### fields (`array`)
::: tip Tags
**see**: [Place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)<br />**see**: [setFields](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields)<br />**see**: [PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`array`|null|To avoid paying for data that you don't need,
be sure to use Autocomplete.setFields() to specify
only the place data that you will use.|


## Slots

### default
Used to set your custom component for the input, eg: v-text-field.<br>
        It has two binding properties:<br>
        - `attrs`, it's type is `object`, it's all attributes passed to the component ([vm.$attrs](https://vuejs.org/v2/api/?#vm-attrs))<br>
        - `listeners`, it's type is `object`, it's all events passed to the component ([vm.$listeners](https://vuejs.org/v2/api/?#vm-listeners))


## Events

### place_changed (undefined)

Place change event
#### Properties
| name | type | description
|:-|:-|:-|
|place|`object`|`this.$autocomplete.getPlace()`

