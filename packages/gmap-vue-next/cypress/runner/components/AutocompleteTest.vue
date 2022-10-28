<template>
  <div>
    <h1>Autocomplete Example (#164)</h1>
    <label>
      AutoComplete
      <gmv-autocomplete
        placeholder="This is a placeholder text"
        @place_changed="setPlace"
      >
      </gmv-autocomplete>
      <button @click="usePlace">Add</button>
    </label>
    <br />

    <gmv-map
      :center="{ lat: 0, lng: 0 }"
      :zoom="1"
      style="width: 600px; height: 300px"
    >
      <gmv-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      ></gmv-marker>
      <gmv-marker
        v-if="this.place"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
        label="&#x2605;"
      ></gmv-marker>
    </gmv-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [],
      place: null,
    };
  },
  methods: {
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place;
    },
    usePlace() {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          },
        });
        this.place = null;
      }
    },
  },
};
</script>
