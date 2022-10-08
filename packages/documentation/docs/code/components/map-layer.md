---
title: map-layer
---

  # map-layer

  
  
  
  
  
  
  
  
  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | backgroundColor |  | string | - |  |
| center |  | union | - |  |
| clickableIcons |  | boolean | - | true |
| controlSize |  | number | - |  |
| disableDefaultUI |  | boolean | - | false |
| draggableCursor |  | string | - |  |
| draggingCursor |  | string | - |  |
| fullscreenControl |  | boolean | - | true |
| fullscreenControlOptions |  | TSTypeReference | - |  |
| gestureHandling |  | union | - | 'auto' |
| heading |  | number | - |  |
| isFractionalZoomEnabled |  | boolean | - |  |
| keyboardShortcuts |  | boolean | - | true |
| mapTypeControl |  | boolean | - | true |
| mapTypeControlOptions |  | TSTypeReference | - |  |
| mapTypeId |  | TSTypeReference | - | globalThis?.google?.maps?.MapTypeId?.ROADMAP \|\| 'roadmap' |
| maxZoom |  | number | - |  |
| minZoom |  | number | - |  |
| noClear |  | boolean | - |  |
| panControl |  | boolean | - | true |
| panControlOptions |  | TSTypeReference | - |  |
| restriction |  | TSTypeReference | - |  |
| rotateControl |  | boolean | - | true |
| rotateControlOptions |  | TSTypeReference | - |  |
| scaleControl |  | boolean | - | true |
| scaleControlOptions |  | TSTypeReference | - |  |
| streetView |  | TSTypeReference | - |  |
| streetViewControl |  | boolean | - | true |
| styles |  | Array | - |  |
| tilt |  | number | - |  |
| zoom |  | number | - |  |
| zoomControl |  | boolean | - | true |
| zoomControlOptions |  | TSTypeReference | - |  |
| resizeBus |  | Emitter | - |  |
| options |  | { [key: string]: any } | - |  |

  
  
  
  
## Slots

  | Name          | Description  | Bindings |
  | ------------- | ------------ | -------- |
  | default | The default slot is wrapped in a class that sets display: none; so by default any component you add to your map will be invisible. This is ok for most of the supplied components that interact directly with the Google map object, but it's not good if you want to bring up things like toolboxes, etc. |  |
| visible | This slot must be used if you want to display content within the responsive wrapper for the map. |  |

  ---


  
  