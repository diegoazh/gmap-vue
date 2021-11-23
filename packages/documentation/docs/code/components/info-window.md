---
title: info-window
---

  # Info-Window

  
  > InfoWindow component
  
  
  
  
  
  [See]([source code](/guide/info-window.html#source-code))
,[See]([Official documentation](https://developers.google.com/maps/documentation/javascript/infowindows))

  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | opened | Determines if the info-window is open or not | boolean | - | true |
| options | Extra options that you want to pass to the component | object | - | undefined |
| position | Contains the LatLng at which this info window is anchored.<br/>Note: An InfoWindow may be attached either to a Marker object<br/>(in which case its position is based on the marker's location)<br/>or on the map itself at a specified LatLng. | object | - | undefined |
| zIndex | The z-index property of the window | number | - | 0 |

  
  
  
  
## Slots

  | Name          | Description  | Bindings |
  | ------------- | ------------ | -------- |
  | default | Used to set your info window. |  |

  ---


  
  