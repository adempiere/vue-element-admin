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
      :data="recordsList"
      :element-loading-text="$t('notifications.loading')"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      @row-click="handleRowClick"
    >
      <!-- column with the checkbox -->
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
            <!-- formatted displayed value -->
            <cell-info
              :field-attributes="fieldAttributes"
              :data-row="scope.row"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- pagination table, set custom or use default change page method -->
    <custom-pagination
      :total="0"
      :current-page="1"
      :selection="0"
      :handle-change-page="handleChangePage"
    />
  </el-main>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

import FieldDefinition from '@/components/ADempiere/Field'
import CellInfo from './CellInfo'
import CustomPagination from '@/components/ADempiere/Pagination'
import { fieldIsDisplayed } from '@/utils/ADempiere/dictionaryUtils'

export default defineComponent({
  name: 'DefaultTable',

  components: {
    CellInfo,
    CustomPagination,
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
    containerManager: {
      type: Object,
      required: true
    },
    panelMetadata: {
      type: Object,
      required: true
    }
  },

  setup(props, { root }) {
    const keyColumn = computed(() => {
      if (props.panelMetadata) {
        return props.panelMetadata.keyColumn
      }
    })

    const fieldsList = computed(() => {
      const panel = props.panelMetadata
      if (panel && panel.fieldsList) {
        return panel.fieldsList
      }
      return []
    })

    const handleRowClick = (row, column, event) => {
      props.containerManager.seekRecord({
        row,
        tableName: props.panelMetadata.tableName
      })
    }

    const headerLabel = (field) => {
      if (field.isMandatory || field.isMandatoryFromLogic) {
        return '* ' + field.name
      }

      return field.name
    }

    /**
     * Verify is displayed column/field in table
     */
    const isDisplayed = (field) => {
      return fieldIsDisplayed(field, true)
    }

    /**
     * custom method to handle change page
     */
    const handleChangePage = () => {
      return
    }

    // namespace to vuex store module
    const vuexStore = props.containerManager.vuexStore()

    // get records list
    const recordsList = computed(() => {
      const data = root.$store.getters[vuexStore + '/getContainerData']({
        containerUuid: props.containerUuid
      })
      if (data && data.recordsList) {
        return data.recordsList
      }
      return []
    })

    return {
      // computeds
      recordsList,
      keyColumn,
      fieldsList,
      // methods
      headerLabel,
      handleChangePage,
      handleRowClick,
      isDisplayed
    }
  }
})
</script>
