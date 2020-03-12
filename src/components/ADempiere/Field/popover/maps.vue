<template>
  <div>
    <div class="custom-autocomplete el-input el-input--mini">
      <label class="el-form-item__label">{{ $t('components.places') }}</label>
      <gmap-autocomplete class="el-input__inner" :placeholder="$t('components.places')" />
    </div>
    <gmap-map
      :center="center"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 300px; height: 300px"
      @click="setLocation"
    >
      <gmap-marker
        v-for="marker in markers"
        :key="marker.id"
        :position="marker.position"
        :clickable="true"
        :draggable="true"
        @click="center=marker.position"
      />
    </gmap-map>
  </div>
</template>
<script>
export default {
  data() {
    return {
      geoLocation: '',
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
<style>
  .custom-autocomplete {
    padding-bottom: 10px;
  }
</style>
