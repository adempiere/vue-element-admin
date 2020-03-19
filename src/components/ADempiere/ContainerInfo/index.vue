<template>
  <el-tabs v-model="activeInfo" @tab-click="handleClick">
    <el-tab-pane
      v-if="!isEmptyValue(getterContextMenu)"
      :name="$t('window.containerInfo.associatedProcesses')"
    >
      <span slot="label">
        <svg-icon icon-class="component" />
        {{ $t('window.containerInfo.associatedProcesses') }}
      </span>
      <div>
        <el-collapse
          v-for="(action, index) in getterContextMenu"
          :key="index"
          v-model="activeName"
          accordion
          @change="handleChangeProcess(action)"
        >
          <el-collapse-item
            :title="action.name"
            :name="index"
          >
            <el-card>
              <el-container style="max-height: 38vh;">
                <el-main style="height: auto;">
                  <main-panel
                    v-if="!isEmptyValue(modalMetadata.fieldList)"
                    key="main-panel"
                    :parent-uuid="windowUuid"
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
    windowUuid: {
      type: String,
      default: ''
    },
    tableName: {
      type: String,
      default: ''
    },
    record: {
      type: Object,
      default: () => ({})
    },
    isWorkflow: {
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
      return this.$store.getters.getWindow(this.windowUuid)
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
      var epale = []
      if (!this.isEmptyValue(this.getterContextMenu)) {
        epale = [this.$t('window.containerInfo.associatedProcesses'), 'listChatEntries', 'listRecordLogs', 'listWorkflowLogs']
        return epale
      }
      epale = ['listChatEntries', 'listRecordLogs', 'listWorkflowLogs']
      return epale
    }
  },
  created() {
    if (!this.isEmptyValue(this.getterContextMenu)) {
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
        const fieldNotReady = this.$store.getters.isNotReadyForSubmit(action.uuid)
        if (!fieldNotReady) {
          this.$store.dispatch('startProcess', {
            action: action, // process metadata
            parentUuid: this.windowUuid,
            isProcessTableSelection: false,
            containerUuid: this.$route.meta.tabUuid,
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
