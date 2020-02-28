<template>
  <el-popover
    ref="popover"
    placement="left"
    :title="$t('components.locationTitle')"
    trigger="focus"
  >
    <el-form label-position="top" :model="formLabelAlign" size="mini">
      <el-scrollbar wrap-class="location-scroll">
        <el-form-item :label="$t('components.country')">
          <el-select
            v-model="formLabelAlign.country"
            :loading="isLoadingData"
            :placeholder="$t('components.country')"
            class="custom-field-select"
            @visible-change="listCountries"
            @change="listRegions"
          >
            <el-option
              v-for="country in countries"
              :key="country.value"
              :value="country.value"
              :label="country.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('components.region')">
          <el-select
            v-model="formLabelAlign.region"
            :loading="isLoadingData"
            :placeholder="$t('components.region')"
            class="custom-field-select"
            @change="listCities"
          >
            <el-option
              v-for="region in regions"
              :key="region.value"
              :value="region.value"
              :label="region.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('components.city')">
          <el-select
            v-model="formLabelAlign.city"
            :loading="isLoadingData"
            :placeholder="$t('components.city')"
            class="custom-field-select"
          >
            <el-option
              v-for="city in cities"
              :key="city.value"
              :value="city.value"
              :label="city.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('components.address') + '1'">
          <el-input v-model="formLabelAlign.address1" />
        </el-form-item>
        <el-form-item :label="$t('components.address') + '2'">
          <el-input v-model="formLabelAlign.address2" />
        </el-form-item>
        <el-form-item :label="$t('components.address') + '3'">
          <el-input v-model="formLabelAlign.address3" />
        </el-form-item>
        <el-form-item :label="$t('components.address') + '4'">
          <el-input v-model="formLabelAlign.address4" />
        </el-form-item>
        <el-form-item :label="$t('components.zipCode')">
          <el-input v-model="formLabelAlign.zipCode" />
        </el-form-item>
      </el-scrollbar>
    </el-form>
    <br>
    <maps />
    <el-input slot="reference" v-model="value" />
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
        country: null,
        region: null,
        city: null,
        address1: '',
        address2: '',
        address3: '',
        address4: '',
        zipCode: ''
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
