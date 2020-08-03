## Live example

<eg-base libraries="places,drawing">
  <eg-drawing-manager-with-slot />
</eg-base>

## Source code

```html
<body>
  <div id="root">
    <h1>Drawing Manager Example</h1>
    <div style="width: 100%;">
      <span style="width: auto;" />
      {{ mapMode }}
      <span style="width: auto;" />
      <button @click="mapMode='edit'">Edit</button>
    </div>
    <br />
    <gmap-map
      ref="mapRef"
      :center="mapCenter"
      :zoom="17"
      map-type-id="roadmap"
      style="width: 100%; height: 100%;"
      :options="{
	      zoomControl: true,
	      mapTypeControl: true,
	      scaleControl: false,
	      streetViewControl: false,
	      rotateControl: false,
	      fullscreenControl: false,
	      disableDefaultUi: false,
	      draggable: mapDraggable,
	      draggableCursor: mapCursor
	    }"
    >
      <template #visible>
        <gmap-drawing-manager
          v-if="mapMode==='edit'"
          :rectangle-options="rectangleOptions"
          :circle-options="circleOptions"
          :shapes="shapes"
        >
          <div>
            <button @click="setDrawingMode('rectangle')">Rectangle</button>
            <button @click="setDrawingMode('circle')">Circle</button>
            <button @click="deleteSelection()">Delete</button>
            <button @click="mapMode='ready'">Save</button>
          </div>
        </gmap-drawing-manager>
      </template>
    </gmap-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gmap-vue@1.2.1/dist/gmap-vue.min.js"></script>

  <script>
    Vue.use(GmapVue, {
      load: {
        key: "AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc",
        libraries: "places,drawing",
      },
    });

    document.addEventListener("DOMContentLoaded", function () {
      new Vue({
        el: "#root",
        data: {
          mapCenter: { lat: 0, lng: 0 },
          mapMode: null,
          mapDraggable: true,
          mapCursor: null,
          shapes: [],
          rectangleOptions: {
            fillColor: "#777",
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: "#999",
            draggable: false,
            editable: false,
            clickable: true,
          },
          circleOptions: {
            fillColor: "#777",
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: "#999",
            draggable: false,
            editable: false,
            clickable: true,
          },
        },
        watch: {
          mapMode(newMode, oldMode) {
            if (newMode === "ready") {
              if (oldMode === "edit") {
                this.mapDraggable = true;
                this.mapCursor = null;
                return;
              }
            }

            if (newMode === "edit") {
              this.mapDraggable = false;
              this.mapCursor = "default";
            }
          },
        },
        mounted() {
          this.mapMode = "ready";
        },
        methods: {},
      });
    });
  </script>
</body>
```
