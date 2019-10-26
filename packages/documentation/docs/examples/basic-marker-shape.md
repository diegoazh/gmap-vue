## Live example

<eg-base>
  <eg-basic-marker-shape />
</eg-base>

## Source code

```html
<body>
  <div id="root">
    <p>Only the dark dots in the middle of the marker are clickable</p>

    <google-map :center="center" :zoom="7" style="width: 100%; height: 500px">
      <google-marker v-for="m in markers" :position="m.position" :clickable="true"
      :draggable="true" @click="center=m.position" :shape="shape"></google-marker>
    </google-map>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.0/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue2-google-maps@latest/dist/vue-google-maps.js"></script>

  <script>
    Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc'
      },
      // Demonstrating how we can customize the name of the components
      installComponents: false,
    });

    document.addEventListener('DOMContentLoaded', function() {
      Vue.component('google-map', VueGoogleMaps.Map);
      Vue.component('google-marker', VueGoogleMaps.Marker);

      new Vue({
        el: '#root',
        data: {
          center: {
            lat: 10.0,
            lng: 10.0
          },
          markers: [{
            position: {
              lat: 10.0,
              lng: 10.0
            }
          }, {
            position: {
              lat: 11.0,
              lng: 11.0
            }
          }],
          shape: {
            coords: [10, 10, 10, 15, 15, 15, 15, 10],
            type: 'poly'
          },
        },
      });
    });
  </script>
</body>
```