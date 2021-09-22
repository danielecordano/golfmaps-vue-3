<template>
  <GMapMap
    :center="center"
    :zoom="17"
    map-type-id="satellite"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false,
    }"
    style="width: 100vw; height: 100vh; margin: 0"
    ref="map"
  >
    <Hole isSelected isImperial number="1" />
  </GMapMap>
</template>

<script >
import Hole from "./components/Hole";
export default {
  name: "App",
  data() {
    return {
      center: {
        lat: 33.5044826517831,
        lng: -82.0235192711639,
      },
    };
  },
  components: {
    Hole,
  },
};
</script>
<style>
html,
body,
#root,
#map {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>