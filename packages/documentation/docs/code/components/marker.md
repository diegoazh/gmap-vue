---
title: marker
---

  # Marker

  
  > Marker component
  
  
  
  
  
  [See]([source code](/guide/marker.html#source-code))
,[See]([Official documentation](https://developers.google.com/maps/documentation/javascript/markers))
,[See]([Official reference](https://developers.google.com/maps/documentation/javascript/reference/marker))

  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | animation | Which animation to play when marker is added to a map.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | number | - |  |
| attribution | This property was not found on the Googole Maps documentation, but it was defined in the previous version of this component.<br>Any suggestion is welcome here. | object | - |  |
| clickable | If true, the marker receives mouse and touch events. Default value is true.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | boolean | - | true |
| cursor | Mouse cursor type to show on hover.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | string | - |  |
| draggable | If true, the marker can be dragged. Default value is false.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | boolean | - | false |
| icon | Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url.<br>Its type can be string\|Icon\|Symbol optional<br/>`@see` [Icon type](https://developers.google.com/maps/documentation/javascript/reference/marker#Icon)<br/>`@see` [Symbol type](https://developers.google.com/maps/documentation/javascript/reference/marker#Symbol)<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | string\|object | - |  |
| label | Adds a label to the marker. A marker label is a letter or number that appears inside a marker. The label can either be a string, or a MarkerLabel object. If provided and MarkerOptions.title is not provided, an accessibility text (e.g. for use with screen readers) will be added to the marker with the provided label's text. Please note that the label is currently only used for accessibility text for non-optimized markers.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | string\|object | - |  |
| opacity | A number between 0.0, transparent, and 1.0, opaque.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | number | - | 1 |
| options | Extra options passed to this component. | object | - |  |
| place | This property was not found on the Googole Maps documentation, but it was defined in the previous version of this component.<br>Any suggestion is welcome here. | object | - |  |
| position | Marker position. The position is required to display the marker and can be provided with Marker.setPosition if not provided at marker construction.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | object | - |  |
| shape | Image map region definition used for drag/click.<br/>`@see` [MarkerShape type](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerShape)<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | object | - |  |
| title | Rollover text. If provided, an accessibility text (e.g. for use with screen readers) will be added to the marker with the provided value. Please note that the title is currently only used for accessibility text for non-optimized markers.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | string | - |  |
| visible | If true, the marker is visible.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | boolean | - | true |
| zIndex | All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen.<br/>`@see` https://developers.google.com/maps/documentation/javascript/reference/marker | number | - |  |

  
  
  
  
## Slots

  | Name          | Description  | Bindings |
  | ------------- | ------------ | -------- |
  | default | Default slot of the component. |  |

  ---


  
  