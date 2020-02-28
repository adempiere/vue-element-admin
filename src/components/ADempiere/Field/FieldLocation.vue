<template>
  <el-popover
    ref="popover"
    placement="left"
    title="Entre nueva Localización/Dirección"
    trigger="focus"
  >
    <el-form label-position="top" :model="formLabelAlign" size="mini">
      <el-scrollbar wrap-class="location-scroll">
        <el-form-item label="Pais">
          <el-select v-model="formLabelAlign.Pais" :loading="isLoadingData" placeholder="Pais" class="custom-field-select" @visible-change="listCountries" @change="listRegions">
            <el-option
              v-for="country in countries"
              :key="country.value"
              :value="country.value"
              :label="country.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Estado">
          <el-select v-model="formLabelAlign.Estado" :loading="isLoadingData" placeholder="Estado" class="custom-field-select" @change="listCities">
            <el-option
              v-for="region in regions"
              :key="region.value"
              :value="region.value"
              :label="region.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Ciudad">
          <el-select v-model="formLabelAlign.Ciudad" :loading="isLoadingData" placeholder="Ciudad" class="custom-field-select">
            <el-option
              v-for="city in cities"
              :key="city.value"
              :value="city.value"
              :label="city.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Dirección 1">
          <el-input v-model="formLabelAlign.Dir1" />
        </el-form-item>
        <el-form-item label="Dirección 2">
          <el-input v-model="formLabelAlign.Dir2" />
        </el-form-item>
        <el-form-item label="Dirección 3">
          <el-input v-model="formLabelAlign.Dir3" />
        </el-form-item>
        <el-form-item label="Dirección 4">
          <el-input v-model="formLabelAlign.Dir4" />
        </el-form-item>
        <el-form-item label="Código Postal">
          <el-input v-model="formLabelAlign.CodigoPostal" />
        </el-form-item>
      </el-scrollbar>
    </el-form>
    <br>
    <maps />
    <el-input slot="reference" v-model="value" placeholder="Please input" />
  </el-popover>
</template>

<script>
import Maps from '@/components/ADempiere/Field/popover/maps'

export default {
  name: 'FieldLocation',
  components: {
    Maps
  },
  props: {},
  data() {
    return {
      value: null,
      isLoadingData: false,
      formLabelAlign: {
        Pais: null,
        Estado: null,
        Ciudad: null,
        Dir1: '',
        Dir2: '',
        Dir3: '',
        Dir4: '',
        CodigoPostal: ''
      },
      countries: [],
      regions: [],
      cities: []
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    listCountries(isShowed) {
      if (isShowed) {
        this.isLoadingData = true
        this.$store.dispatch('getObjectListFromCriteria', {
          tableName: 'C_Country',
          orderByClause: 'C_Country_ID',
          isShowNotification: false
        })
          .then(response => {
            const countryMap = response.map(item => {
              return {
                label: item.Name,
                value: item.C_Country_ID,
                hasRegion: item.HasRegion
              }
            })
            this.countries = countryMap
            this.isLoadingData = false
          })
      }
    },
    listRegions(valueSelected) {
      if (!this.isEmptyValue(valueSelected)) {
        this.formLabelAlign.Pais = valueSelected
        const option = this.countries.find(country => country.value === valueSelected)
        if (option.hasRegion) {
          this.isLoadingData = true
          this.$store.dispatch('getObjectListFromCriteria', {
            tableName: 'C_Region',
            whereClause: `C_Country_ID = ${valueSelected}`,
            isShowNotification: false
          })
            .then(response => {
              const countryMap = response.map(item => {
                return {
                  label: item.Name,
                  value: item.C_Region_ID,
                  country: item.C_Country_ID
                }
              })
              this.regions = countryMap
              this.isLoadingData = false
            })
        }
      }
    },
    listCities(valueSelected) {
      if (!this.isEmptyValue(valueSelected)) {
        this.formLabelAlign.Estado = valueSelected
        const option = this.regions.find(region => region.value === valueSelected)
        if (!this.isEmptyValue(option.value) || !this.isEmptyValue(option.country)) {
          this.isLoadingData = true
          this.$store.dispatch('getObjectListFromCriteria', {
            tableName: 'C_City',
            whereClause: `C_Region_ID = ${valueSelected} OR C_Country_ID = ${option.country}`,
            isShowNotification: false
          })
            .then(response => {
              const cityMap = response.map(item => {
                return {
                  label: item.Name,
                  value: item.C_City_ID,
                  country: item.C_Country_ID,
                  region: valueSelected
                }
              })
              this.cities = cityMap
              this.isLoadingData = false
            })
        }
      }
    }
  }
}
</script>

<style>
  .location-scroll {
    max-height: 200px !important;
  }
</style>
