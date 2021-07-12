<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Elsio Sanchez elsiosanchez@erpya.com www.erpya.com
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https:www.gnu.org/licenses/>.
-->
<template>
  <div>
    <table-from
      :label="labelTableSummary"
      :records-data="allPaymentsAndInvoce"
      :selection="allPaymentsAndInvoce"
      :is-selection="false"
    />
    <el-form label-position="top" class="from-main">
      <el-form-item>
        <el-row>
          <el-col v-for="(field, index) in fieldsList" :key="index" :span="6">
            <field
              v-if="field.sequence > 5"
              :key="field.columnName"
              :metadata-field="field"
              :v-model="field.value"
            />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Field from '@/components/ADempiere/Field'
import tableFrom from '../tableFrom'
import labelTableSummary from './labelTableSummary.js'

export default {
  name: 'Summary',
  components: {
    tableFrom,
    Field
  },
  props: {
    fieldsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      labelTableSummary
    }
  },
  computed: {
    summaryList() {
      return this.$store.getters.getSummaryList
    },
    allPaymentsAndInvoce() {
      const payments = this.$store.getters.getSelectedPayments
      const invoces = this.$store.getters.getSelectedInvoce
      const allList = payments.concat(invoces).map(list => {
        if (!this.isEmptyValue(list.IsReceipt)) {
          return {
            ...list,
            Payment: list.applied
          }
        } if (!this.isEmptyValue(list.IsAccountPayable)) {
          return {
            ...list,
            invoce: list.applied
          }
        }
      })
      return allList
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-form {
    height: 100% !important;
    overflow: auto;
  }
</style>
<style>
.el-table .warning-row {
    background:#ff4949a6;
  }

  .el-table .success-row {
    background: #8ff6bd80;
  }
</style>
