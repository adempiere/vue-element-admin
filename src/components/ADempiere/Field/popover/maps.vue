<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 300px; height: 300px"
      @click="setLocation"
    >
      <GmapMarker
        v-for="marker in markers"
        :key="marker.id"
        :position="marker.position"
        :clickable="true"
        :draggable="true"
        @click="center=marker.position"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  data() {
    return {
      center: {
        lat: 9.5650274,
        lng: -69.2627698
      },
      markers: [
        {
          id: 0,
          position: { lat: 9.5788197, lng: -69.2194223 },
          title: 'Centro Comercial Buenaventura - Araure - Portuguesa - Venezuela'
        }
      ]
    }
  },
  methods: {
    setLocation(value) {
      this.center.lat = value.latLng.lat()
      this.center.lng = value.latLng.lng()
    }
  }
}
</script>
