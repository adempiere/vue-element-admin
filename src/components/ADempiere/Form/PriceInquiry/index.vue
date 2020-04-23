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
  name: 'PriceInquiry',
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
          this.clearFields()
          getProductPrice({
            searchValue: mutation.payload.newValue
          })
            .then(productPrice => {
              const { product, taxRate } = productPrice
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
                  case 'PriceList':
                    field.value = productPrice.priceList
                    break
                  // // Tax Amount
                  case 'TaxAmt':
                    if (taxRate !== undefined) {
                      field.value = this.getTaxAmount(productPrice.priceList, taxRate.rate)
                    }
                    break
                  // // Total
                  case 'GrandTotal':
                    field.value = this.getGrandTotal(productPrice.priceList, taxRate.rate)
                    break
                }
              })
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: error.message
              })
            })
        }
      })
    },
    getTaxAmount(priceList, taxRate) {
      if (this.isEmptyValue(priceList) || this.isEmptyValue(taxRate)) {
        return 0
      }
      return (priceList * taxRate) / 100
    },
    getGrandTotal(priceList, taxRate) {
      if (this.isEmptyValue(priceList)) {
        return 0
      }
      return priceList + this.getTaxAmount(priceList, taxRate)
    },
    clearFields() {
      this.fieldsList.filter(field => field.columnName !== 'ProductValue').forEach(field => {
        field.value = undefined
      })
    }
  }
}
</script>

<style scoped>
  .el-input.is-disabled .el-input__inner {
    color: #606266 !important;
    font-size: 250%;
  }
  .el-input__inner {
    color: #606266 !important;
    font-size: 250%;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    color: #606266 !important;
    font-size: 250%;
  }
</style>
<style lang="scss">
  .form-grand-total {
    input {
      color: #000 !important;
      background-color: #fff !important;
      font-size: 200% !important;
    }
  }
</style>
