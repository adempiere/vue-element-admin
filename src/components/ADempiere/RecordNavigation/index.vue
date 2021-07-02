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
  <el-container class="record-navigation">

    <!-- advanced search -->
    <!--
    <el-header>
      <el-collapse
        v-model="activeName"
        v-shortkey="shorcutKey"
        @shortkey.native="actionAdvancedQuery()"
      >
        <el-collapse-item :title="$t('table.dataTable.advancedQuery')" name="PanelAdvancedQuery">
          <template v-if="!isEmptyValue(activeName) && activeName[0] === 'PanelAdvancedQuery'">
            <panel-definition
              v-show="!isEmptyValue(activeName) && activeName[0] === 'PanelAdvancedQuery'"
              :container-uuid="'table_' + containerUuid"
              :parent-uuid="'table_' + parentUuid"
              panel-type="table"
              is-advanced-query
              class="collapse_item_wrap"
            />
          </template>
        </el-collapse-item>
      </el-collapse>
    </el-header>
    -->

    <!-- records in table -->
    <default-table
      :parent-uuid="parentUuid"
      :container-uuid="containerUuid"
      :container-manager="containerManager"
      :panel-metadata="panelMetadata"
    />

  </el-container>
</template>

<script>
import { defineComponent, computed, ref } from '@vue/composition-api'

import { generatePanelAndFields } from '@/components/ADempiere/PanelDefinition/panelUtils'
import DefaultTable from '@/components/ADempiere/DefaultTable'
import PanelDefinition from '@/components/ADempiere/PanelDefinition'

export default defineComponent({
  name: 'RecordNavigation',

  components: {
    DefaultTable,
    PanelDefinition
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
    currentTab: {
      type: Object,
      required: true
    }
  },

  setup(props, { root }) {
    const activeName = ref([])
    // TODO: Manage attribute with vuex store in window module
    if (root.$route.query.action && root.$route.query.action === 'advancedQuery') {
      activeName.value.push('PanelAdvancedQuery')
    }

    const shorcutKey = computed(() => {
      return {
        f6: ['f6'],
        ctrlf: ['ctrl', 'f']
      }
    })

    const isLoadedPanel = computed(() => {
      const panelMetadata = root.$store.getters.getPanel('table_' + props.containerUuid)
      if (!root.isEmptyValue(panelMetadata)) {
        return true
      }
      return false
    })

    const panelMetadata = computed(() => {
      return generatePanelAndFields({
        parentUuid: props.parentUuid,
        containerUuid: props.containerUuid,
        panelMetadata: props.currentTab
      })
    })

    const actionAdvancedQuery = () => {
      const activeNames = []
      if (!activeName.value.length) {
        activeNames.push('PanelAdvancedQuery')
      }
      activeName.value = activeNames
    }

    return {
      activeName,
      // computeds
      isLoadedPanel,
      panelMetadata,
      shorcutKey,
      // methods
      actionAdvancedQuery
    }
  }
})
</script>

<style>
.record-navigation {
  background-color: #fff;
  height: 100%;
}
</style>
