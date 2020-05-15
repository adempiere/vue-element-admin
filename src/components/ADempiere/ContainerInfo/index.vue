<template>
  <el-tabs v-model="activeInfo" @tab-click="handleClick">
    <el-tab-pane
      :label="$t('window.containerInfo.associatedProcesses')"
      :name="$t('window.containerInfo.associatedProcesses')"
    >
      <el-scrollbar>
        <el-timeline
          v-for="(action, index) in tabProcess"
          :key="index"
        >
          <el-timeline-item>
            <el-card class="box-card">
              <el-button
                type="text"
                style="color: #000000; text-size-adjust: 12px; font-size: 100%; font-weight: 605!important; width: 90%; text-align: left;"
                @click="abrir(index, action)"
              >
                {{ action.name }}
              </el-button>
              <el-button
                type="primary"
                :circle="true"
                icon="el-icon-check"
                :disabled="currentProcess === index ? !isEmptyValue($store.getters.isNotReadyForSubmit(action.uuid)) : !isEmptyValue(action.parametersList)"
                @click="runAction(action)"
              />
              <el-container v-if="currentProcess === index" style="max-height: 38vh;">
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
              </el-container>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
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
    <el-tab-pane
      name="listWorkflowLogs"
    >
      <associated-Processes />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// tab content/components/ADempiere/ContainerInfo/mixinInfo
import ChatEntries from '@/components/ADempiere/ContainerInfo/components/chatEntries'
import RecordLogs from '@/components/ADempiere/ContainerInfo/components/recordLogs'
import WorkflowLogs from '@/components/ADempiere/ContainerInfo/components/workflowLogs'
import AssociatedProcesses from '@/components/ADempiere/ContainerInfo/components/associatedProcesses'
// Panel Process
import MainPanel from '@/components/ADempiere/Panel'
import { showNotification } from '@/utils/ADempiere/notification'
export default {
  name: 'TabInfo',
  components: {
    ChatEntries,
    RecordLogs,
    WorkflowLogs,
    AssociatedProcesses,
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
      activeInfo: 'listChatEntries',
      contenido: false,
      currentProcess: 100
    }
  },
  computed: {
    isShowProcess() {
      return this.$store.getters.getShowProcess.process
    },
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
    },
    disable() {
      var disable = this.tabProcess.map(process => {
        return {
          epale: process.name,
          disable: this.$store.getters.isNotReadyForSubmit(process.uuid)
        }
      })
      console.log(disable)
      return true
    },
    listName() {
      var list = this.tabProcess.map(process => {
        return process.name
      })
      return list
    },
    nameProcess() {
      if (!this.isEmptyValue(this.isShowProcess)) {
        const name = this.listName.find(element => element === this.isShowProcess.name)
        return name
      }
      return ''
    }
  },
  watch: {
    nameProcess(value) {
      const fastAction = this.listName.findIndex(index => index === this.nameProcess)
      if (fastAction >= 0) {
        this.currentProcess = fastAction
      }
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
    const fastAction = this.listName.findIndex(index => index === this.nameProcess)
    if (fastAction >= 0) {
      this.currentProcess = fastAction
    }
  },
  methods: {
    showNotification,
    abrir(index, action) {
      if (this.currentProcess !== index) {
        this.currentProcess = index
      } else {
        this.currentProcess = 100
      }
    },
    ejecutar() {
      console.log('ejecutar')
    },
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
        if (action.type === 'process') {
          // open panel with metadata
          this.$store.dispatch('setShowDialog', {
            type: action.type,
            action: {
              ...action,
              containerUuid: action.uuid
            }
          })
        }
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

<style scoped>
.el-button--medium {
  padding: 0px;
  font-size: 20px;
  border-radius: 4px;
}
</style>
