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
  <div style="height: 100% !important;">
    <el-tabs
      v-model="currentTab"
      type="border-card"
      style="height: 100% !important;"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(tabAttributes, key) in tabsListChild"
        :key="key"
        :label="tabAttributes.name"
        :name="String(key)"
        :tabuuid="tabAttributes.uuid"
        :tabindex="String(key)"
        lazy
      >
        <!-- records in table -->
        <default-table
          :parent-uuid="parentUuid"
          :container-uuid="tabAttributes.uuid"
          :container-manager="containerManagerTab"
          :panel-metadata="tabAttributes"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from '@vue/composition-api'

import { generatePanelAndFields } from '@/components/ADempiere/PanelDefinition/panelUtils'
import DefaultTable from '@/components/ADempiere/DefaultTable'

export default defineComponent({
  name: 'TabChild',

  components: {
    DefaultTable
  },

  props: {
    parentUuid: {
      type: String,
      required: true
    },
    containerManager: {
      type: Object,
      required: true
    },
    tabsList: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { root }) {
    // if tabParent is present in path set this
    const tabNo = root.$route.query.tabChild || '0'
    const currentTab = ref(tabNo)

    const tabUuid = ref(props.tabsList[tabNo].uuid)

    const tabsListChild = computed(() => {
      return props.tabsList.map(tab => {
        return generatePanelAndFields({
          parentUuid: props.parentUuid,
          containerUuid: tab.uuid,
          panelMetadata: tab
        })
      })
    })

    /**
     * @param {object} tabHTML DOM HTML the tab clicked
     */
    const handleClick = (tabHTML) => {
      const { tabuuid, tabindex } = tabHTML.$attrs
      if (tabUuid.value !== tabuuid) {
        tabUuid.value = tabuuid
      }
      setTabNumber(tabindex)
    }

    const setTabNumber = (tabNumber = '0') => {
      if (root.isEmptyValue(tabNumber)) {
        tabNumber = '0'
      }
      if (tabNumber !== currentTab.value) {
        currentTab.value = tabNumber
      }

      root.$router.push({
        query: {
          ...root.$route.query,
          tabChild: currentTab.value
        },
        params: {
          ...root.$route.params
        }
      }, () => {})

      return tabNumber
    }

    const containerManagerTab = computed(() => {
      return {
        ...props.containerManager,

        vuexStore: () => 'dataManager'
      }
    })

    return {
      currentTab,
      // computeds
      containerManagerTab,
      tabsListChild,
      // methods
      handleClick
    }
  }

})
</script>
