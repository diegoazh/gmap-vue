---
title: cluster
---

  # GmapCluster

  
  > Cluster component
  
  
  
  
  
  [See]([source code](/guide/cluster.html#source-code))
,[See]([Official documentation](https://googlemaps.github.io/js-markerclustererplus/index.html))
,[See]([Marker clusterer](https://github.com/googlemaps/v3-utility-library/blob/master/markerclustererplus/src/markerclusterer.js))

  

  
## Props

  | Prop name     | Description | Type      | Values      | Default     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  | maxZoom | The max zoom of the Google Maps<br/>`@see` [MapOptions interface](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) | number | - |  |
| batchSizeIE | The batchSize for IE<br/>`@see` [issue 136](https://github.com/googlemaps/v3-utility-library/issues/136)<br/>`@see` [docs explanation](https://github.com/googlemaps/v3-utility-library/blob/0a707d5ce74738a9ad4fcb6c02257fb9d9e433ae/packages/markerclustererplus/src/markerclusterer.ts#L27) | number | - |  |
| calculator | Function to calculate markers in a cluster<br/>`@see` [calculator docs](https://googlemaps.github.io/js-markerclustererplus/globals.html#calculator) | func | - |  |
| enableRetinaIcons | Enable the retina icons on the cluster | boolean | - |  |
| gridSize | Set the grid size of the cluster | number | - |  |
| averageCenter | Enable de average center | boolean | - |  |
| ignoreHidden | Enable to ignore hidden markers | boolean | - |  |
| imageExtension | Set the image extension type | string | - |  |
| imagePath | Set the image path | string | - |  |
| imageSizes | Set the image size | array | - |  |
| minimumClusterSize | Set the minimum cluster size | number | - |  |
| clusterClass | Set a css class for the cluster | string | - |  |
| styles | Set the styles for the cluster | array | - |  |
| zoomOnClick | Enable zoom on click | boolean | - |  |

  
  
  
  
## Slots

  | Name          | Description  | Bindings |
  | ------------- | ------------ | -------- |
  | default | Used to set your cluster |  |

  ---


  
  