<template>
  <el-cascader
    :ref="metadata.columnName"
    v-model="value"
    :placeholder="metadata.help"
    :options="options"
    :props="props"
    :readonly="Boolean(metadata.readonly)"
    :disabled="isDisabled"
    filterable
    @visible-change="getParentList"
    @expand-change="getChildList"
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
      options: [],
      props: { checkStrictly: true }
    }
  },
  watch: {
    'metadata.value'(value) {
      if (!this.isEmptyValue(value)) {
        this.getValueFromServer(value)
      }
    }
  },
  methods: {
    preHandleChange() {
      const selected = this.value[this.value.length - 1]
      this.handleChange(selected)
    },
    getParentList(isShowed) {
      if (isShowed) {
        this.$store.dispatch('getObjectListFromCriteria', {
          tableName: 'C_Country',
          orderByClause: 'C_Country_ID',
          isShowNotification: false
        })
          .then(response => {
            const countryMap = response.map(item => {
              if (item.HasRegion) {
                item.children = []
              }
              return {
                label: item.Name,
                value: item.C_Country_ID,
                hasRegion: item.HasRegion,
                children: item.children
              }
            })
            this.options = countryMap
          })
      }
    },
    getChildList(parent) {
      if (parent.length > 1) {
        const childId = parent[1]
        const parentId = parent[0]
        const parentOption = this.options.find(country => country.value === parentId)
        const childsOptions = parentOption.children.find(region => region.value === childId)
        this.$store.dispatch('getObjectListFromCriteria', {
          tableName: 'C_City',
          whereClause: `C_Region_ID = ${childId}`,
          isShowNotification: false
        })
          .then(response => {
            if (response.length) {
              childsOptions.children = response.map(item => {
                return {
                  label: item.Name,
                  value: item.C_Region_ID,
                  country: parentOption.value
                }
              })
            } else {
              delete childsOptions.children
            }
          })
      } else {
        const parentId = parent[0]
        const parentOption = this.options.find(country => country.value === parentId)
        if (parentOption && parentOption.hasRegion) {
          this.$store.dispatch('getObjectListFromCriteria', {
            tableName: 'C_Region',
            whereClause: `C_Country_ID = ${parentId}`,
            isShowNotification: false
          })
            .then(response => {
              if (response.length) {
                parentOption.children = response.map(item => {
                  return {
                    label: item.Name,
                    value: item.C_Region_ID,
                    country: parentOption.value,
                    children: []
                  }
                })
              }
            })
        }
      }
    },
    getValueFromServer(value) {
      this.$store.dispatch('getObjectListFromCriteria', {
        tableName: 'C_Region',
        whereClause: `C_Region_ID=${value}`,
        isShowNotification: false
      })
        .then(response => {
          if (response.length) {
            const record = response[0]
            this.$store.dispatch('getObjectListFromCriteria', {
              tableName: 'C_Country',
              whereClause: `C_Country_ID=${record.C_Country_ID}`,
              isShowNotification: false
            })
              .then(responseCountry => {
                this.options.push({
                  value: record.C_Country_ID,
                  label: responseCountry[0].Name,
                  children: [{
                    value: record.C_Region_ID,
                    label: record.Name
                  }]
                })
                this.value.push(response[0].C_Country_ID)
                this.value.push(response[0].C_Region_ID)
              })
          }
        })
    }
  }
}
</script>
