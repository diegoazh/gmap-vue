---
title: street-view-panorama
---
# GmapStreetViewPanorama
Street View Panorama component

::: tip Tags
**see**: [source code](/guide/street-view-panorama.html#source-code)<br />**see**: [official docs](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanorama)<br />
:::

## Table of contents
[[toc]]

## Props

### zoom (`number`)
::: tip Tags
**value**: number<br />**see**: [StreetViewPanorama zoom](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.zoom)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The zoom of the panorama, specified as a number. A zoom of 0 gives a 180 degrees Field of View.|
### pov (`object`)
::: tip Tags
**value**: object<br />**type**: StreetViewPov<br />**see**: [StreetViewPanorama pov](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.pov)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The camera orientation, specified as heading and pitch, for the panorama.|
### position (`object`)
::: tip Tags
**value**: object<br />**type**: LatLng|LatLngLiteral<br />**see**: [StreetViewPanorama position](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.position)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|-|The LatLng position of the Street View panorama.|
### pano (`string`)
::: tip Tags
**value**: string<br />**see**: [StreetViewPanorama pano](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.pano)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|The panorama ID, which should be set when specifying a custom panorama.|
### motionTracking (`boolean`)
::: tip Tags
**value**: boolean<br />**see**: [StreetViewPanorama motionTracking](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.motionTracking)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Whether motion tracking is on or off. Enabled by default when the motion tracking control is present, so that the POV (point of view) follows the orientation of the device. This is primarily applicable to mobile devices. If motionTracking is set to false while motionTrackingControl is enabled, the motion tracking control appears but tracking is off. The user can tap the motion tracking control to toggle this option.|
### visible (`boolean`)
::: tip Tags
**value**: boolean<br />**see**: [StreetViewPanorama visible](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=es#StreetViewPanoramaOptions.visible)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|true|If true, the Street View panorama is visible on load.|
### options (`object`)
::: tip Tags
**value**: boolean<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`object`|{}|More options that you can pass to the component|


## Slots

### default
A default slot to render the street view panorama


## Events

### position_changed (undefined)

undefined


