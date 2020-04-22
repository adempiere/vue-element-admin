<template>
  <div class="wrapper">
    <el-form
      v-if="isLoaded"
      key="form-loaded"
      label-position="top"
      label-width="200px"
    >
      <el-row>
        <field
          v-for="(field) in fieldsList"
          :key="field.columnName"
          :metadata-field="field"
          :v-model="field.value"
        />
      </el-row>
    </el-form>
    <div
      v-else
      key="form-loading"
      v-loading="!isLoaded"
      :element-loading-text="$t('notifications.loading')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      class="loading-panel"
    />
  </div>
</template>

<script>
import formMixin from '@/components/ADempiere/Form/formMixin'
import fieldsList from './fieldsList.js'
import { getProductPrice } from '@/api/ADempiere/pos'

export default {
  name: 'TestView',
  mixins: [formMixin],
  data() {
    return {
      fieldsList
    }
  },
  mounted() {
    this.subscribeChanges()
  },
  methods: {
    subscribeChanges() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'changeFieldValue' && mutation.payload.field.columnName === 'ProductValue') {
          getProductPrice({
            searchValue: mutation.payload.newValue,
            priceListUuid: '9e45c1ea-cdb1-11e9-9aa9-0242ac110002'
          })
            .then(productPrice => {
              const { product } = productPrice

              this.fieldsList.forEach(field => {
                switch (field.columnName) {
                  // Name
                  case 'ProductName':
                    field.value = product.name
                    break
                  // Description
                  case 'ProductDescription':
                    field.value = product.description
                    break
                  // Price List
                  // case 'PriceList':
                  //   break
                  // // Tax Amount
                  // case 'TaxAmt':
                  //   break
                  // // Total
                  // case 'GrandTotal':
                  //   break
                }
              })
            })
            .catch(error => {
              console.log(error)
              this.$message({
                type: 'error',
                message: error.message
              })
            })
        }
      })
    }
  }
}
</script>
