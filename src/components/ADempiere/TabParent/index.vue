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
  <el-tabs
    v-model="currentTab"
    type="border-card"
    :before-leave="handleBeforeLeave"
    @tab-click="handleClick"
  >
    <template v-for="(tabAttributes, key) in tabsList">
      <el-tab-pane
        :key="key"
        :label="tabAttributes.name"
        :windowuuid="windowUuid"
        :tabuuid="tabAttributes.uuid"
        :name="String(key)"
        lazy
        :disabled="isDisabledTab(key)"
        :style="tabParentStyle"
      >

        <span v-if="key === 0" slot="label">
          <el-tooltip
            v-if="key === 0"
            :content="isLock ? $t('data.lockRecord') : $t('data.unlockRecord')"
            placement="top"
          >
            <el-button type="text" @click="lockRecord()">
              <i
                :class="isLock ? 'el-icon-lock' : 'el-icon-unlock'"
                style="font-size: 15px; color: black;"
              />
            </el-button>
          </el-tooltip>
          <span :style="isLock ? 'color: red;' : 'color: #1890ff;'">
            {{ tabAttributes.name }}
          </span>
        </span>
        <span v-else slot="label">
          {{ tabAttributes.name }}
        </span>

        <panel-definition
          :parent-uuid="windowUuid"
          :container-uuid="tabAttributes.uuid"
          :group-tab="tabAttributes.tabGroup"
          :panel-type="panelType"
        />
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
// TODO: Migrate the lock features to other component
import { defineComponent, computed, ref, watch } from '@vue/composition-api'

import PanelDefinition from '@/components/ADempiere/PanelDefinition'
import { parseContext } from '@/utils/ADempiere/contextUtils'

export default defineComponent({
  name: 'TabParent',

  components: {
    PanelDefinition
  },

  props: {
    windowUuid: {
      type: String,
      default: ''
    },
    windowMetadata: {
      type: Object,
      default: () => {}
    },
    tabsList: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { root }) {
    const panelType = 'window'
    const isLock = ref(false)
    const currentTab = ref(root.$route.query.tabParent)
    const tabUuid = ref(props.tabsList[0].uuid)

    const tabParentStyle = computed(() => {
      // if tabs children is showed or closed
      if (props.windowMetadata.isShowedTabsChildren) {
        return {
          height: '100%',
          overflow: 'hidden'
        }
      }
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

    const lockRecord = () => {
      const tableName = props.windowMetadata.firstTab.tableName
      const action = isLock.value ? 'unlockRecord' : 'lockRecord'
      root.$store.dispatch(action, {
        tableName,
        recordId: this.record[tableName + '_ID'],
        recordUuid: this.record.UUID
      })
        .then(() => {
          root.$message({
            type: 'success',
            message: root.$t('data.notification.' + action),
            showClose: true
          })
        })
        .catch(() => {
          root.$message({
            type: 'error',
            message: root.$t('data.isError') + root.$t('data.' + action),
            showClose: true
          })
        })
        .finally(() => {
          root.$store.dispatch('getPrivateAccessFromServer', {
            tableName,
            recordId: this.record[tableName + '_ID'],
            recordUuid: this.record.UUID
          })
            .then(privateAccessResponse => {
              isLock.value = privateAccessResponse.isLocked
            })
        })
    }

    const setCurrentTab = () => {
      root.$store.dispatch('setCurrentTab', {
        parentUuid: props.windowUuid,
        containerUuid: tabUuid.value,
        window: props.windowMetadata
      })
    }

    const handleBeforeLeave = (activeName) => {
      const tabIndex = parseInt(activeName, 10)
      const metadataTab = props.tabsList.find(tab => tab.tabParentIndex === tabIndex)

      if (!root.isEmptyValue(metadataTab.whereClause) && metadataTab.whereClause.includes('@')) {
        metadataTab.whereClause = parseContext({
          parentUuid: metadataTab.parentUuid,
          containerUuid: metadataTab.uuid,
          value: metadataTab.whereClause,
          isBooleanToString: true
        }).value
      }
    }

    /**
     * @param {object} tabHTML DOM HTML the tab clicked
     */
    const handleClick = (tabHTML) => {
      if (tabUuid.value !== tabHTML.$attrs.tabuuid) {
        tabUuid.value = tabHTML.$attrs.tabuuid
        setCurrentTab()
      }
    }

    watch(() => root.$route.query.tabParent, (newValue) => {
      if (root.isEmptyValue(newValue) || newValue === 'create-new') {
        currentTab.value = '0'
        setTabNumber(currentTab.value)
        return
      }
      currentTab.value = newValue
      setTabNumber(newValue)
    })

    const setTabNumber = (tabNumber) => {
      root.$router.push({
        query: {
          ...root.$route.query,
          tabParent: String(tabNumber)
        },
        params: {
          ...root.$route.params
        }
      }, () => {})
    }

    return {
      panelType,
      currentTab,
      tabUuid,
      isLock,
      // computed
      isCreateNew,
      tabParentStyle,
      // meyhods
      setCurrentTab,
      lockRecord,
      handleClick,
      isDisabledTab,
      handleBeforeLeave
    }
  }
})
</script>
