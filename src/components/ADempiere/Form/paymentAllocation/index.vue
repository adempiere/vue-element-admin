<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Elsio Sanchez esanchez@erpya.com www.erpya.com
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
  <div style="height: 100%;">
    <div class="header">
      <el-steps :active="active" finish-status="success" process-status="finish">
        <el-step
          v-for="(item, index) in step"
          :key="index"
          :title="item.name"
        />
      </el-steps>
    </div>
    <div class="main">
      <el-card class="box-card">
        <carousel
          :step-reference="metadata.fileName"
          :steps="step"
          :indicator="active"
          style="display: contents;height: -webkit-fill-available;"
        >
          <el-form v-if="active === 0" label-position="top" class="from-main">
            <el-form-item>
              <el-row>
                <el-col v-for="(field, index) in fieldsList" :key="index" :span="8">
                  <field
                    v-if="field.sequence <= 5"
                    :key="field.columnName"
                    :metadata-field="field.componentPath === 'FieldAutocomplete' ? {
                      ...field,
                      loadAll: recordsBusinessPartners
                    } : field"
                    :v-model="field.value"
                  />
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <payments
            v-if="active === 1"
            :steps="active"
            :business-partner-uuid="businessPartnerUuid"
          />
          <invoices
            v-if="active === 2"
            :business-partner-uuid="businessPartnerUuid"
          />
          <Summary
            v-if="active === 3"
            :business-partner-uuid="businessPartnerUuid"
            :fields-list="fieldsList"
          />
        </carousel>
      </el-card>
    </div>
    <div :class="styleFooter">
      <el-button type="primary" :icon="active === 3 ? 'el-icon-check' : 'el-icon-right'" style="float: right;" @click="next" />
      <el-button v-show="active > 0" type="danger" icon="el-icon-back" style="float: right;margin-right: 10px;" @click="prev" />
    </div>
  </div>
</template>

<script>

import Payments from './Payments'
import Invoices from './Invoices'
import Summary from './Summary'
import Carousel from '@/components/ADempiere/Carousel'
import formMixin from '@/components/ADempiere/Form/formMixin.js'
import fieldsList from './fieldList.js'
export default {
  name: 'PaymentAllocation',
  components: {
    Payments,
    Invoices,
    Summary,
    Carousel
  },
  mixins: [
    formMixin
  ],
  props: {
    metadata: {
      type: Object,
      required: true,
      default: () => {
        return {
          uuid: 'Bar-code-Reader',
          containerUuid: 'Bar-code-Reader',
          fieldsList
        }
      }
    }
  },
  data() {
    return {
      active: 0,
      input: '',
      value: '',
      fieldsList
    }
  },
  computed: {
    recordsBusinessPartners() {
      return this.$store.getters.getBusinessPartnersList
    },
    styleFooter() {
      const showTitle = this.$store.getters.getIsShowTitleForm
      if (showTitle) {
        return 'show-title-footer'
      }
      return 'from-footer'
    },
    step() {
      return [
        {
          name: this.$t('views.searchCriteria'),
          icon: 'el-i.con-search',
          description: this.$t('form.allocationPayments.step.descriptionSearchCriteria')
        },
        {
          name: this.$t('form.allocationPayments.table.payments'),
          icon: 'el-icon-money',
          description: this.$t('form.allocationPayments.step.descriptionPayments')
        },
        {
          name: this.$t('form.allocationPayments.table.invoices'),
          icon: 'el-icon-tickets',
          description: this.$t('form.allocationPayments.step.descriptionInvoices')
        },
        {
          name: this.$t('views.summary'),
          icon: 'el-icon-document',
          description: ''
        }
      ]
    },
    businessPartnerUuid() {
      return this.$store.getters.getValueOfField({
        containerUuid: this.$route.meta.uuid,
        columnName: 'C_BPartner_ID_UUID'
      })
    }
  },
  methods: {
    next() {
      if (this.active < 3) {
        this.active++
      }
      switch (this.step[this.active].name) {
        case this.$t('form.allocationPayments.table.payments'):
          this.$store.dispatch('serverPaymentList', this.businessPartnerUuid)
          break
        case this.$t('form.allocationPayments.table.invoices'):
          this.$store.dispatch('serverBillingList', this.businessPartnerUuid)
          break
        case this.$t('views.summary'):
          this.$store.dispatch('searchServerPaymentAllocationSummaryList', this.businessPartnerUuid)
          break
      }
    },
    prev() {
      this.active--
    }
  }
}
</script>

<style lang="scss" scoped>
 .from-main {
    padding-right: 1% !important;
    padding-bottom: 0px !important;
    padding-top: 0px !important;
    padding-left: 1% !important;
    height: 90%;
  }
  .card-form {
    height: 100% !important;
    overflow: auto;
  }
  .header {
    padding-bottom: 0px;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 4% !important;
    padding-left: 1%;
    padding-right: 1%;
  }
  .from-footer {
    height: 5% !important;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  .show-title-footer {
    height: 15% !important;
    box-sizing: border-box;
    flex-shrink: 0
  }
  .main {
    height: 90%;
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 0px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
}
</style>
<style lang="scss">
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 5px;
    margin-left: 0px;
  }
  .el-card {
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #FFFFFF;
    overflow: hidden;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    height: 100%;
    width: 100%;
  }
  .el-carousel__container {
    position: relative;
    height: 100%;
  }
</style>
