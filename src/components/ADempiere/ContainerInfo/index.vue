<template>
  <el-tabs v-model="activeInfo" @tab-click="handleClick">
    <el-tab-pane
      v-if="!isEmptyValue(tabProcess)"
      :name="$t('window.containerInfo.associatedProcesses')"
    >
      <span slot="label">
        <svg-icon icon-class="component" />
        {{ $t('window.containerInfo.associatedProcesses') }}
      </span>
      <div>
        <el-collapse
          v-for="(action, index) in tabProcess"
          :key="index"
          v-model="activeName"
          accordion
          @change="handleChangeProcess(action)"
        >
          <el-collapse-item
            :title="action.name"
            :name="index"
            :disabled="isEmptyValue(record)"
          >
            <el-card>
              <el-container style="max-height: 38vh;">
                <el-main style="height: auto;">
                  <main-panel
                    v-if="!isEmptyValue(modalMetadata.fieldList)"
                    key="main-panel"
                    :parent-uuid="infoProcessUuid"
                    :container-uuid="modalMetadata.uuid"
                    :metadata="modalMetadata"
                    :panel-type="modalMetadata.panelType"
                  />
                  <p v-else> {{ modalMetadata.description }} </p>
                </el-main>
                <el-footer>
                  <el-button
                    type="primary"
                    style="float: right;"
                    @click="runAction(action)"
                  >
                    {{ $t('components.RunProcess') }} <i class="el-icon-s-tools" />
                  </el-button>
                </el-footer>
              </el-container>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-tab-pane>
    <el-tab-pane
      v-if="panelType === 'window'"
      name="listChatEntries"
    >
      <span slot="label">
        <i class="el-icon-s-comment" />
        {{ $t('window.containerInfo.notes') }}
      </span>
      <div>
        <chat-entries />
      </div>
    </el-tab-pane>
    <el-tab-pane
      v-if="panelType === 'window'"
      name="listRecordLogs"
    >
      <span slot="label">
        <svg-icon icon-class="tree-table" />
        {{ $t('window.containerInfo.changeLog') }}
      </span>
      <div
        key="change-log-loaded"
      >
        <record-logs />
      </div>
    </el-tab-pane>
    <el-tab-pane
      v-if="isWorkflow"
      name="listWorkflowLogs"
    >
      <span slot="label">
        <i class="el-icon-s-help" />
        {{ $t('window.containerInfo.workflowLog') }}
      </span>
      <div
        v-if="getIsWorkflowLog"
        key="workflow-log-loaded"
      >
        <workflow-logs />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// tab content/components/ADempiere/ContainerInfo/mixinInfo
import ChatEntries from '@/components/ADempiere/ContainerInfo/components/chatEntries'
import RecordLogs from '@/components/ADempiere/ContainerInfo/components/recordLogs'
import WorkflowLogs from '@/components/ADempiere/ContainerInfo/components/workflowLogs'
// Panel Process
import MainPanel from '@/components/ADempiere/Panel'
import { showNotification } from '@/utils/ADempiere/notification'
export default {
  name: 'TabInfo',
  components: {
    ChatEntries,
    RecordLogs,
    WorkflowLogs,
    MainPanel
  },
  props: {
    infoProcessUuid: {
      type: String,
      default: ''
    },
    containerUuid: {
      type: String,
      default: ''
    },
    tableName: {
      type: String,
      default: ''
    },
    record: {
      type: [Array, Object],
      default: undefined
    },
    panelType: {
      type: String,
      default: ''
    },
    isWorkflow: {
      type: Boolean,
      default: false
    },
    isProcessBrowser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: '',
      activeInfo: 'listChatEntries'
    }
  },
  computed: {
    getIsWorkflowLog() {
      if (this.isEmptyValue(this.$store.getters.getWorkflow)) {
        return false
      }
      return true
    },
    isWorkflowBarStatus() {
      const panel = this.$store.getters.getPanel(
        this.windowMetadata.currentTabUuid
      )
      if (!this.isEmptyValue(panel) && panel.isDocument && this.$route.meta.type === 'window' && this.$route.query.action !== 'create-new') {
        return true
      }
      return false
    },
    getterWindow() {
      return this.$store.getters.getWindow(this.infoProcessUuid)
    },
    getterContextMenu() {
      if (!this.isEmptyValue(this.getterWindow)) {
        const process = this.$store.getters.getContextMenu(this.getterWindow.currentTabUuid)
        if (!this.isEmptyValue(process)) {
          return process.actions.filter(menu => {
            if (menu.type === 'process') {
              return menu
            }
          })
        }
      }
      return []
    },
    modalMetadata() {
      return this.$store.state.processControl.metadata
    },
    listTab() {
      var tabName = []
      if (!this.isEmptyValue(this.getterContextMenu)) {
        tabName = [this.$t('window.containerInfo.associatedProcesses'), 'listChatEntries', 'listRecordLogs', 'listWorkflowLogs']
        return tabName
      }
      tabName = ['listChatEntries', 'listRecordLogs', 'listWorkflowLogs']
      return tabName
    },
    getterContextMenuBrowser() {
      const process = this.$store.getters.getContextMenu(this.infoProcessUuid)
      if (!this.isEmptyValue(process)) {
        return process.actions.filter(menu => {
          if (menu.type === 'process') {
            return menu
          }
        })
      }
      return []
    },
    tabProcess() {
      if (this.panelType === 'window') {
        return this.getterContextMenu
      }
      return this.getterContextMenuBrowser
    }
  },
  created() {
    if (!this.isEmptyValue(this.tabProcess)) {
      this.activeInfo = this.$t('window.containerInfo.associatedProcesses')
    }
    if (this.activeInfo !== this.$t('window.containerInfo.associatedProcesses')) {
      this.$store.dispatch(this.activeInfo, {
        tableName: this.tableName,
        recordId: this.record[this.tableName + '_ID']
      })
    }
  },
  methods: {
    showNotification,
    handleChangeProcess(action) {
      if (action.type === 'process') {
        // open modal dialog with metadata
        this.$store.dispatch('setShowDialog', {
          type: action.type,
          action: {
            ...action,
            containerUuid: action.uuid
          }
        })
      }
    },
    runAction(action) {
      if (action !== undefined) {
        const fieldNotReady = this.panelType === 'browser' ? this.isEmptyValue(this.record) : this.$store.getters.isNotReadyForSubmit(action.uuid)
        if (!fieldNotReady) {
          this.$store.dispatch('startProcess', {
            action: action, // process metadata
            parentUuid: this.infoProcessUuid,
            isProcessTableSelection: false,
            // containerUuid: this.$route.meta.tabUuid,
            containerUuid: this.panelType === 'browser' ? this.panelUuid : this.containerUuid,
            panelType: this.panelType, // determinate if get table name and record id (window) or selection (browser)
            reportFormat: '',
            routeToDelete: this.$route
          })
            .catch(error => {
              console.warn(error)
            })
        } else {
          this.showNotification({
            type: 'warning',
            title: this.$t('notifications.emptyValues'),
            name: '<b>' + fieldNotReady.name + '.</b> ',
            message: this.$t('notifications.fieldMandatory')
          })
        }
      }
    },
    handleClick(tab, event) {
      if (tab.name !== this.$t('window.containerInfo.associatedProcesses')) {
        this.$store.dispatch(tab.name, {
          tableName: this.tableName,
          recordId: this.record[this.tableName + '_ID']
        })
      }
    }
  }
}
</script>
