<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com www.erpya.com
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
  <el-main style="padding: 0px !important; overflow: hidden;">
    <el-table
      ref="multipleTable"
      style="width: 100%"
      border
      :row-key="keyColumn"
      reserve-selection
      highlight-current-row
      :data="[]"
      :element-loading-text="$t('notifications.loading')"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      cell-class-name="datatable-max-cell-height"
      @row-click="handleRowClick"
    >
      <el-table-column
        type="selection"
        :prop="keyColumn"
        fixed
        min-width="50"
      />
      <template v-for="(fieldAttributes, key) in fieldsList">
        <el-table-column
          v-if="isDisplayed(fieldAttributes)"
          :key="key"
          :label="headerLabel(fieldAttributes)"
          :column-key="fieldAttributes.columnName"
          :prop="fieldAttributes.columnName"
          sortable
          min-width="200"
          :fixed="fieldAttributes.isFixedTableColumn"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="COLUMNS_NAME_DOCUMENT_STATUS.includes(fieldAttributes.columnName)"
              :type="tagStatus(scope.row[fieldAttributes.columnName])"
              disable-transitions
            >
              {{ displayedValue(scope.row, fieldAttributes) }}
            </el-tag>
            <span v-else>
              {{ displayedValue(scope.row, fieldAttributes) }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- <custom-pagination
      :total="totalRecords"
      :current-page="pageNumber"
      :selection="getDataSelection.length"
      :handle-change-page="handleChangePage"
    /> -->
  </el-main>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

import FieldDefinition from '@/components/ADempiere/Field'
import { COLUMNS_NAME_DOCUMENT_STATUS, FIELDS_DECIMALS } from '@/utils/ADempiere/references'
import { typeValue } from '@/utils/ADempiere/valueUtils.js'
import { formatField } from '@/utils/ADempiere/valueFormat.js'

export default defineComponent({
  name: 'DefaultTable',

  components: {
    FieldDefinition
  },

  props: {
    parentUuid: {
      type: String,
      default: undefined
    },
    containerUuid: {
      type: String,
      required: true
    },
    panelType: {
      type: String,
      default: 'window'
    }
  },

  setup(props, { root }) {
    const panelMetadata = computed(() => {
      return root.$store.getters.getPanel(props.containerUuid)
    })

    const keyColumn = computed(() => {
      if (panelMetadata.value) {
        return panelMetadata.value.keyColumn
      }
    })

    const fieldsList = computed(() => {
      const panel = panelMetadata.value
      if (panel && panel.fieldsList) {
        // if (props.panelType === 'window') {
        //   let orderBy = 'seqNoGrid'

        //   return this.sortFields({
        //     fieldsList: panel.fieldsList,
        //     orderBy
        //   })
        // }
        return panel.fieldsList
      }
      return []
    })

    const handleRowClick = (row, column, event) => {
      // this.currentTable = this.recordsData.findIndex(item => item.UUID === row.UUID)
      // if (this.uuidCurrentRecordSelected !== row.UUID) {
      //   this.uuidCurrentRecordSelected = row.UUID
      //   // disabled rollback when change route
      //   // root.$store.dispatch('setDataLog', {})
      // }
      const tableName = panelMetadata.value.tableName
      root.$router.push({
        name: root.$route.name,
        query: {
          ...root.$route.query,
          action: row.UUID
        },
        params: {
          ...root.$router.params,
          tableName,
          recordId: row[`${tableName}_ID`]
        }
      }, () => {})
      // root.$store.commit('setCurrentRecord', row)
    }

    const headerLabel = (field) => {
      if (field.isMandatory || field.isMandatoryFromLogic && field.isDisplayedGrid) {
        return '* ' + field.name
      }
      if (field.isDisplayedGrid) {
        return field.name
      }
    }

    /**
     * Verify is displayed field in column table
     */
    const isDisplayed = (field) => {
      const isDisplayed = field.isDisplayed &&
        field.isDisplayedFromLogic &&
        field.isShowedTableFromUser &&
        !field.isKey
      //  Verify for displayed and is active
      return field.isActive && isDisplayed
    }

    /**
     * @param {object} row, row data
     * @param {object} field, field with attributes
     */
    const displayedValue = (row, field) => {
      const { columnName, componentPath, displayColumnName, displayType } = field

      let valueToShow
      switch (componentPath) {
        case 'FieldDate':
        case 'FieldTime': {
          let cell = row[columnName]
          if (typeValue(cell) === 'DATE') {
            cell = cell.getTime()
          }
          // replace number timestamp value for date
          valueToShow = formatField(cell, displayType)
          break
        }

        case 'FieldNumber':
          if (root.isEmptyValue(row[columnName])) {
            valueToShow = undefined
            break
          }
          valueToShow = formatNumber({
            displayType,
            number: row[columnName]
          })
          break

        case 'FieldSelect':
          valueToShow = row[displayColumnName]
          if (root.isEmptyValue(valueToShow) && row[columnName] === 0) {
            valueToShow = field.defaultValue
            break
          }
          break

        case 'FieldYesNo':
          // replace boolean true-false value for 'Yes' or 'Not' ('Si' or 'No' for spanish)
          valueToShow = row[columnName]
            ? root.$t('components.switchActiveText')
            : root.$t('components.switchInactiveText')
          break

        default:
          valueToShow = row[columnName]
          break
      }

      return valueToShow
    }

    const formatNumber = ({ displayType, number }) => {
      let fixed = 0
      // Amount, Costs+Prices, Number
      if (FIELDS_DECIMALS.includes(displayType)) {
        fixed = 2
      }
      return new Intl.NumberFormat().format(number.toFixed(fixed))
    }

    return {
      keyColumn,
      panelMetadata,
      fieldsList,
      COLUMNS_NAME_DOCUMENT_STATUS,
      headerLabel,
      isDisplayed,
      displayedValue,
      handleRowClick
    }
  }
})
</script>
