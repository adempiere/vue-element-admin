<template>
  <GmapMap
    :center="{lat:9.5650274, lng:-69.2627698}"
    :zoom="7"
    map-type-id="roadmap"
    style="width: 300px; height: 300px"
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
</template>
<script>
export default {
  data() {
    return {
      markers: [
        {
          id: 0,
          position: { lat: 9.5788197, lng: -69.2194223 },
          title: 'Centro Comercial Buenaventura - Araure - Portuguesa - Venezuela'
        }
      ]
    }
  }
}
</script>
