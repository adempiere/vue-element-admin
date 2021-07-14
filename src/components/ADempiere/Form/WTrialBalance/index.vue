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
  <el-container style="height: 100% !important;">
    <el-header>
      <el-steps :active="active" finish-status="success" process-status="finish">
        <el-step
          v-for="(item, index) in step"
          :key="index"
          :title="item.name"
        />
      </el-steps>
    </el-header>
    <carousel
      :step-reference="metadata.fileName"
      :steps="step"
      :indicator="active"
      style="display: contents;height: -webkit-fill-available;"
    >
      <search-criteria
        v-if="active === 0"
        :metadata="fieldsList"
      />
      <balance v-if="active === 1" />
    </carousel>
    <div :class="styleFooter">
      <el-button type="primary" icon="el-icon-check" style="float: right;" @click="next" />
      <el-button v-show="active > 0" type="danger" icon="el-icon-close" style="float: right;margin-right: 10px;" @click="prev" />
    </div>
  </el-container>
</template>

<script>
import Carousel from '@/components/ADempiere/Carousel'
import formMixin from '@/components/ADempiere/Form/formMixin.js'
import fieldsList from './components/SearchCriteria/fieldsList.js'
import SearchCriteria from './components/SearchCriteria/index'
import Balance from './components/Balance/index'
import { exportFileFromJson } from '@/utils/ADempiere/exportUtil.js'
import { clientDateTime } from '@/utils/ADempiere/valueUtils.js'
import labelTable from './components/Balance/labelTable.js'

export default {
  name: 'WTrialBalance',
  components: {
    Carousel,
    SearchCriteria,
    Balance
  },
  mixins: [
    formMixin
  ],
  props: {
    metadata: {
      type: Object,
      default: () => {
        return {
          uuid: 'WTrialBalance',
          containerUuid: 'WTrialBalance',
          fieldsList
        }
      }
    }
  },
  data() {
    return {
      fieldsList,
      labelTable,
      active: 0
    }
  },
  computed: {
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
          description: this.$t('form.wTrialBalance.description.searchCriteria')
        },
        {
          name: this.$t('form.wTrialBalance.title.navigableTestBalance'),
          icon: 'el-icon-tickets'
        }
      ]
    },
    orgUuid() {
      return this.$store.getters.getValueOfField({
        containerUuid: this.$route.meta.uuid,
        columnName: 'AD_Org_ID_UUID'
      })
    },
    periodUuid() {
      return this.$store.getters.getValueOfField({
        containerUuid: this.$route.meta.uuid,
        columnName: 'C_Period_ID_UUID'
      })
    },
    reportCubeUuid() {
      return this.$store.getters.getValueOfField({
        containerUuid: this.$route.meta.uuid,
        columnName: 'PA_ReportCube_ID_UUID'
      })
    },
    tableHeader() {
      return this.labelTable.map(header => {
        return header.label
      })
    },
    filterVal() {
      return this.labelTable.map(header => {
        return header.columnName
      })
    },
    selectTrialBalance() {
      return this.$store.getters.getTrialBalance.selectedRecord
    }
  },
  watch: {
    active(value) {
      const formUuid = this.$route.meta.uuid
      if (this.step[value].name === this.$t('form.wTrialBalance.title.navigableTestBalance')) {
        this.$store.dispatch('serverTrialBalance', {
          orgUuid: this.orgUuid,
          periodUuid: this.periodUuid,
          reportCubeUuid: this.reportCubeUuid,
          formUuid
        })
      }
    }
  },
  methods: {
    next() {
      if (this.active < this.step.length - 1) {
        this.active++
      } else {
        this.exporRecordTable()
      }
    },
    prev() {
      this.active--
    },
    /**
    * @param {string} formatToExport
    */
    exporRecordTable(formatToExport = 'xlsx') {
      let title = this.panelMetadata.name
      title = this.$route.meta.title
      const data = this.formatJson(this.filterVal, this.selectTrialBalance)
      exportFileFromJson({
        header: this.tableHeader,
        data,
        fileName: `${title} ${clientDateTime()}`,
        exportType: formatToExport
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(row => {
        return filterVal.map(column => {
          return row[column]
        })
      })
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
