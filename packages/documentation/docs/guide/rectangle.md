## Description

This component helps you to create a rectangle on Google Maps API.

For more information read the Google Maps documentation for [rectangle](https://developers.google.com/maps/documentation/javascript/examples/rectangle-simple).

It is exported with the name `GmapRectangle`.

## Variables

This component save the original polygon object provided by Google Maps in a property called `$rectangleObject`, as the example below.

```javascript
this.$rectangleObject = new google.maps.Rectangle(...);
```

## Source code

:::details Click to se the source code of <code>rectangle.vue</code> component

```vue
<script>
import MapElementMixin from '../mixins/map-element';
import { bindProps, bindEvents, getPropsValues } from '../utils/helpers';
import { rectangleMappedProps } from '../utils/mapped-props-by-map-element';

export default {
  mixins: [MapElementMixin],
  props: {
    bounds: {
      type: Object,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
    },
  },
  provide() {
    const events = [
      'click',
      'dblclick',
      'drag',
      'dragend',
      'dragstart',
      'mousedown',
      'mousemove',
      'mouseout',
      'mouseover',
      'mouseup',
      'rightclick',
    ];

    const promise = this.$mapPromise
      .then((map) => {
        this.$map = map;

        const initialOptions = {
          ...this.options,
          map,
          ...getPropsValues(this, rectangleMappedProps),
        };
        const { options: extraOptions, ...finalOptions } = initialOptions;

        this.$rectangleObject = new google.maps.Rectangle(finalOptions);

        bindProps(this, this.$circleObject, rectangleMappedProps);
        bindEvents(this, this.$circleObject, events);

        return this.$rectangleObject;
      })
      .catch((error) => {
        throw error;
      });

    this.$rectanglePromise = promise;
    return { $rectanglePromise: promise };
  },
};
</script>
```

:::

If you need to know what are `mappedProps` please read the general concepts of this application [here](/code/utils/mapped-props-by-map-element.html#autocompletemappedprops).

::: details Mapped Props of <code>GmapRectangle</code> component

```javascript
export const rectangleMappedProps = {
  bounds: {
    type: Object,
    twoWay: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    twoWay: false,
  },
};
```

:::

:::details Events bound with to way on <code>GmapRectangle</code>

```javascript
const events = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'rightclick',
];
```

:::

## How to use it

```vue
<template>
  <gmap-map
    :center="center"
    :zoom="12"
    style="width: 100%; height: 500px"
    ref="map">
    <gmap-rectangle
      :bounds="{
        north: 33.685,
        south: 33.671,
        east: -116.234,
        west: -116.251,
      }"
      :draggable="true"
      :editable="true"
      ref="rectangle">
    </gmap-rectangle>
  </gmap-map>
</template>
```

If you need to know the API of this component please read it [here](/code/components/rectangle.html).

## HTML examples

:::details Simple rectangle example

```html
<body>
  <div id="root">
    <gmap-map :center="center" :zoom="12" style="width: 100%; height: 500px" ref="map">
      <gmap-rectangle
        :editable="editable"
        :draggable="draggable"
        :bounds="bounds"
        ref="rectangle">
      </gmap-rectangle>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.2/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
        libraries: 'places',
      },
    });

    document.addEventListener('DOMContentLoaded', function() {
      window.rectangleExample = new Vue({
        el: '#root',
        data: {
          center: {lat: 1.38, lng: 103.8},
          editable: true,
          draggable: true,
          bounds: {
            north: 33.685,
            south: 33.671,
            east: -116.234,
            west: -116.251,
          },
        },
      });
    });
  </script>
</body>
```

:::

## Test the component

<eg-base>
  <eg-rectangle />
</eg-base>
