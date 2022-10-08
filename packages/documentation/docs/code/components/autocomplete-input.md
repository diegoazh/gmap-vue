---
title: autocomplete-input
---

  # autocomplete-input

  
  
  
  
  
  
  
  
  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | bounds |  | union | - |  |
| componentRestrictions |  | TSTypeReference | - |  |
| fields |  | Array | - |  |
| strictBounds |  | boolean | - |  |
| types |  | Array | - |  |
| selectFirstOnEnter | Select the first result in the list when press enter keyboard<br/>`@values` true, false | boolean | - | true |
| slotRef | the unique ref set to the component passed in the slot input | HTMLInputElement | - |  |
| setFieldsTo | To avoid paying for data that you don't need,<br/>be sure to use Autocomplete.setFields() to specify<br/>only the place data that you will use.<br/>`@see` [Place information](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get-place-information)<br/>`@see` [setFields](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields)<br/>`@see` [PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult) | Array | - |  |
| options |  | Record | - |  |

  
  
  
  
## Slots

  | Name          | Description  | Bindings |
  | ------------- | ------------ | -------- |
  | default | Used to set your custom component for the input, eg: v-text-field.<br> |  |

  ---


  
  