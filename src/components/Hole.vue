<template>
  <GMapPolyline
    :path="path"
    :editable="isSelected"
    :click="true"
    @click="handleClick"
    :deepWatch="isSelected"
    :path_changed="isSelected"
    @path_changed="isSelected && handlePathChanged($event)"
  />
  <GMapMarker
    :key="index"
    v-for="(vertex, index) in path"
    :position="vertex"
    :icon="{
      url:
        'https://upload.wikimedia.org/wikipedia/commons/8/8c/Transparent.png',
      scaledSize: { width: 0, height: 0 },
    }"
  >
    <GMapInfoWindow>
      <div>
        {{
          index > 0
            ? fastHaversineString(path[index], path[index - 1])
            : "Tee " + number
        }}
      </div>
    </GMapInfoWindow>
  </GMapMarker>
</template>

<script>
export default {
  name: "Hole",
  props: { isSelected: Boolean, number: Number, isImperial: Boolean },
  data() {
    return {
      path: [
        {
          lat: 33.5024016302217,
          lng: -82.0199260932541,
        },
        {
          lat: 33.5035496886311,
          lng: -82.0223664123725,
        },
        {
          lat: 33.5044826517831,
          lng: -82.0235192711639,
        },
      ],
    };
  },
  methods: {
    handleClick: function (e) {
      if (e.vertex) {
        const oldPath = this.path;
        if (oldPath.length > 2) {
          const newPath = oldPath.filter((v, i) => i !== e.vertex);
          this.path = newPath;
          console.log(this.path);
        }
      }
    },
    handlePathChanged: function (p) {
      this.path = p.getArray().map((v) => v.toJSON());
      console.log(this.path);
    },
    rad: function (x) {
      return (x * Math.PI) / 180;
    },
    fastHaversine: function (p1, p2) {
      const lat = this.rad(p1.lat);
      const cLat = Math.cos(lat);
      const dLat = this.rad(p2.lat - p1.lat);
      const dLong = this.rad(p2.lng - p1.lng);
      const sdLat = dLat / 2;
      const sdLong = dLong / 2;
      const a = sdLat * sdLat + cLat * cLat * sdLong * sdLong;
      const c = (2 + a) * Math.sqrt(a);
      const radius = this.isImperial ? 6975220 : 6378137;
      const r = radius * c;
      return r;
    },
    fastHaversineString: function (p1, p2) {
      const r = this.fastHaversine(p1, p2);
      console.log(r);
      const rString = r.toFixed(0) + (this.isImperial ? " yd" : " mt");
      return rString;
    },
  },
};
</script>

