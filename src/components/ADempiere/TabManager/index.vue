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
  <split-pane :default-percent="50" split="vertical">

    <record-navigation
      slot="paneL"
      :parent-uuid="parentUuid"
      :container-uuid="tabUuid"
      :container-manager="containerManager"
      :current-tab="tabsList[currentTab]"
    />

    <template slot="paneR">
      <el-tabs
        v-model="currentTab"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(tabAttributes, key) in tabsList"
          :key="key"
          :label="tabAttributes.name"
          :name="String(key)"
          :tabuuid="tabAttributes.uuid"
          :tabindex="String(key)"
          lazy
          :disabled="isDisabledTab(key)"
          :style="tabStyle"
        >
          <lock-record
            slot="label"
            :tab-position="key"
            :tab-uuid="tabAttributes.uuid"
            :table-name="tabAttributes.tableName"
            :tab-name="tabAttributes.name"
          />

          <panel-definition
            :parent-uuid="parentUuid"
            :container-uuid="tabAttributes.uuid"
            :container-manager="containerManager"
            :panel-metadata="tabAttributes"
            :group-tab="tabAttributes.tabGroup"
          />

        </el-tab-pane>
      </el-tabs>
    </template>

  </split-pane>
</template>

<script>
import { defineComponent, computed, ref } from '@vue/composition-api'

import LockRecord from '@/components/ADempiere/ContainerOptions/LockRecord'
import PanelDefinition from '@/components/ADempiere/PanelDefinition'
import RecordNavigation from '@/components/ADempiere/RecordNavigation'
import SplitPane from 'vue-splitpane'

export default defineComponent({
  name: 'TabManager',

  components: {
    LockRecord,
    PanelDefinition,
    RecordNavigation,
    SplitPane
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
    const tabNo = root.$route.query.tab || '0'
    const currentTab = ref(tabNo)

    const tabUuid = ref(props.tabsList[0].uuid)

    const tabStyle = computed(() => {
      // height in card
      return {
        height: '75vh',
        overflow: 'auto'
      }
    })

    const isCreateNew = computed(() => {
      return Boolean(root.$route.query.action === 'create-new')
    })

    const isDisabledTab = (key) => {
      return key > 0 && isCreateNew.value
    }

    const setCurrentTab = () => {
      // TODO: Add store current tab
    }

    /**
     * @param {object} tabHTML DOM HTML the tab clicked
     */
    const handleClick = (tabHTML) => {
      const { tabuuid, tabindex } = tabHTML.$attrs
      if (tabUuid.value !== tabuuid) {
        tabUuid.value = tabuuid
        setCurrentTab()
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
          tab: currentTab.value
        },
        params: {
          ...root.$route.params
        }
      }, () => {})
      const containerManager = props.containerManager
      if (containerManager !== undefined) {
        console.log(containerManager)
        // containerManager.seekTab({
        //   tabNumber,
        //   currentTab
        // }).then(() => {})
      }
      return tabNumber
    }

    const getData = () => {
      // TODO: Add store get data from tab
      root.$store.dispatch('getListEntities', {
        parentUuid: props.parentUuid,
        containerUuid: tabUuid.value,
        ...props.tabsList[currentTab.value]
      })
    }

    getData()

    setTabNumber(currentTab.value)

    return {
      tabUuid,
      currentTab,
      // computed
      tabStyle,
      // meyhods
      handleClick,
      isDisabledTab
    }
  }

})
</script>
