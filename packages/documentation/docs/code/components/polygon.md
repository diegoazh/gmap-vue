---
title: polygon
---

  # GmapPolygon

  
  > Polygon component
  
  
  
  
  
  [See]([source code](/guide/polygon.html#source-code))
,[See]([official docs](https://developers.google.com/maps/documentation/javascript/examples/polygon-arrays?hl=es))

  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | deepWatch | If set true the object will be deep watched<br/>`@value` boolean | boolean | - | false |
| draggable | Indicates if the polygon is draggable<br/>`@value` true, false<br/>`@see` [Polygon dragable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.draggable) | boolean | - |  |
| editable | Indicates if the polygon is editable<br/>`@value` true, false<br/>`@see` [Polygon editable](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.editable) | boolean | - |  |
| options | More options that you can pass to the component<br/>`@value` boolean | object | - |  |
| path | Indicates if the polygon is editable<br/>`@value` Array<br/>`@see` [Polygon path](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolylineOptions.path) | array | - |  |
| paths | Indicates if the polygon is editable<br/>`@value` Array<br/>`@see` [Polygon paths](https://developers.google.com/maps/documentation/javascript/reference/polygon?hl=es#PolygonOptions.paths) | array | - |  |

  
  
  
## Events

  | Event name     | Properties     | Description  |
  | -------------- |--------------- | -------------|
  | paths_changed | **paths** `array` - `this.$polygonObject.getPaths()` \| | An event to detect when a paths changes
| path_changed | **path** `array` - `this.$polygonObject.getPath()` | ### path_changed (undefined)<br><br>An event to detect when a path change

  
  
  ---


  
  