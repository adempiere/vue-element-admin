<template>
  <el-cascader
    :ref="metadata.columnName"
    v-model="value"
    :placeholder="metadata.help"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    :readonly="Boolean(metadata.readonly)"
    :disabled="isDisabled"
    filterable
    @change="preHandleChange"
  />
</template>

<script>
import { fieldMixin } from '@/components/ADempiere/Field/FieldMixin'

export default {
  name: 'FieldLocation',
  mixins: [fieldMixin],
  data() {
    return {
      value: [],
      options: []
    }
  },
  mounted() {
    this.$store.dispatch('getObjectListFromCriteria', {
      tableName: 'C_Country',
      orderByClause: 'C_Country_ID'
    })
      .then(response => {
        var countryMap = response.map(item => {
          return {
            label: item.Name,
            value: item.C_Country_ID,
            hasRegion: item.HasRegion,
            children: []
          }
        })
        countryMap.forEach(country => {
          if (country.hasRegion) {
            this.$store.dispatch('getObjectListFromCriteria', {
              tableName: 'C_Region',
              whereClause: `C_Country_ID = ${country.value}`
            })
              .then(response => {
                country.children = response.map(item => {
                  return {
                    label: item.Name,
                    value: item.C_Region_ID,
                    country: country.value
                  }
                })
              })
          } else {
            delete country.children
          }
        })
        this.options = this.options.concat(countryMap)
      })
  }
}
</script>
