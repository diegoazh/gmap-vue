---
title: cluster
---
# GmapCluster
Cluster component

::: tip Tags
**see**: [source code](/guide/cluster.html#source-code)<br />**see**: [Official documentation](https://googlemaps.github.io/js-markerclustererplus/index.html)<br />**see**: [Marker clusterer](https://github.com/googlemaps/v3-utility-library/blob/master/markerclustererplus/src/markerclusterer.js)<br />
:::

## Table of contents
[[toc]]

## Props

### maxZoom (`number`)
::: tip Tags
**see**: [MapOptions interface](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The max zoom of the Google Maps|
### batchSizeIE (`number`)
::: tip Tags
**see**: [issue 136](https://github.com/googlemaps/v3-utility-library/issues/136)<br />**see**: [docs explanation](https://github.com/googlemaps/v3-utility-library/blob/0a707d5ce74738a9ad4fcb6c02257fb9d9e433ae/packages/markerclustererplus/src/markerclusterer.ts#L27)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|The batchSize for IE|
### calculator (`func`)
::: tip Tags
**see**: [calculator docs](https://googlemaps.github.io/js-markerclustererplus/globals.html#calculator)<br />
:::


|type|default|description|
|:-|:-|:-|:-|
|`func`|-|Function to calculate markers in a cluster|
### enableRetinaIcons (`boolean`)


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Enable the retina icons on the cluster|
### gridSize (`number`)


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|Set the grid size of the cluster|
### averageCenter (`boolean`)


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Enable de average center|
### ignoreHidden (`boolean`)


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Enable to ignore hidden markers|
### imageExtension (`string`)


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|Set the image extension type|
### imagePath (`string`)


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|Set the image path|
### imageSizes (`array`)


|type|default|description|
|:-|:-|:-|:-|
|`array`|-|Set the image size|
### minimumClusterSize (`number`)


|type|default|description|
|:-|:-|:-|:-|
|`number`|-|Set the minimum cluster size|
### clusterClass (`string`)


|type|default|description|
|:-|:-|:-|:-|
|`string`|-|Set a css class for the cluster|
### styles (`array`)


|type|default|description|
|:-|:-|:-|:-|
|`array`|-|Set the styles for the cluster|
### zoomOnClick (`boolean`)


|type|default|description|
|:-|:-|:-|:-|
|`boolean`|-|Enable zoom on click|


## Slots

### default
Used to set your cluster

