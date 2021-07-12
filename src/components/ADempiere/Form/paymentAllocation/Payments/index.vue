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
      :label="labelTablePayments"
      :records-data="paymentList"
      :selection="selectedPaymentsList"
      :add-selection="selectPayments"
      style="height: 100%;"
    />
    <el-card v-if="!isEmptyValue(selectedInvoice)" class="box-card">
      <div slot="header" class="clearfix">
        <p class="label">
          <b>
            {{ $t('form.allocationPayments.step.selectedInvoce') }}
          </b>
        </p>
      </div>
      <div class="text item">
        <table-from
          :label="labelTablePayments"
          :records-data="selectedInvoice"
          :selection="selectedInvoice"
          :is-selection="false"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import tableFrom from '../tableFrom'
import labelTablePayments from './labelTablePayments.js'
import labelTableInvoce from '../Invoices/labelTableInvoce.js'

export default {
  name: 'Payments',
  components: {
    tableFrom
  },
  props: {
    steps: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      labelTablePayments,
      labelTableInvoce,
      selectPayments: 'selectedPaymentsAndColletion'
    }
  },
  computed: {
    paymentList() {
      return this.$store.getters.getPaymentList
    },
    selectedPaymentsList() {
      return this.$store.getters.getSelectedPayments
    },
    selectedInvoice() {
      return this.$store.getters.getSelectedInvoce
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-form {
    height: 100% !important;
    overflow: auto;
  }
  .label {
    text-align: center;
    margin: 0px;
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
