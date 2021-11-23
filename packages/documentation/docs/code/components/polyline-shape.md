---
title: polyline-shape
---

  # GmapPolyline

  
  > PolyLine component
  
  
  
  
  
  [See]([source code](/guide/polyline.html#source-code))
,[See]([official docs](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#Polyline))

  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | deepWatch | If set true the object will be deep watched<br/>`@value` boolean | boolean | - | false |
| draggable | Indicates if the polyline is draggable<br/>`@value` true, false<br/>`@see` [Polyline draggable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.draggable) | boolean | - |  |
| editable | Indicates if the polygon is editable<br/>`@value` true, false<br/>`@see` [Polyline editable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.editable) | boolean | - |  |
| options | More options that you can pass to the component<br/>`@value` boolean | object | - | undefined |
| path | Indicates if the polygon is editable<br/>`@value` Array<br/>`@see` [Polyline path](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.path) | array | - | undefined |

  
  
  
## Events

  | Event name     | Properties     | Description  |
  | -------------- |--------------- | -------------|
  | path_changed | **path** `array` - `this.$polygonObject.getPath()` | An event to detect when a path change

  
  
  ---


  
  