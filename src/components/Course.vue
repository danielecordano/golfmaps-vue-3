<template>
  <GMapMap
    :center="holes[0][0]"
    :zoom="17"
    map-type-id="satellite"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
      rotateControlOptions: {
        position: 6,
      },
      fullscreenControl: false,
    }"
    ref="map"
    id="map"
  >
    <Hole
      v-for="(hole, i) in holes"
      :key="i"
      :isSelected="selected === i"
      :isImperial="isImperial"
      :index="i"
      :path="holes[i]"
      @path-changed="$emit('path-changed', { path: $event, index: i })"
      @path-clicked="$emit('path-clicked', { event: $event, index: i })"
    />
  </GMapMap>
</template>

<script >
import Hole from "./Hole";
export default {
  name: "Course",
  props: { isImperial: Boolean, holes: Array, selected: Number },
  data() {
    return {};
  },
  watch: {
    selected: function () {
      const map = this.$refs.map;
      map.panTo(this.holes[this.selected][0]);
    },
  },
  emits: ["pathChanged", "pathClicked"],
  components: {
    Hole,
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
  margin: 0;
}
</style>