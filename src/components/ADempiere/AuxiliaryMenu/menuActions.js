
import { computed, defineComponent, ref } from '@vue/composition-api'

import { showNotification } from '@/utils/ADempiere/notification.js'

export default defineComponent({
  name: 'MenuActions',

  setup(props, { root, parent }) {
    const {
      containerUuid, parentUuid, panelType,
      tableName, isInsertRecord, menuParentUuid
    } = parent._props

    const actionsList = ref([])

    const setShareLink = () => {

    }

    const getterFieldsList = computed(() => {
      return root.$store.getters.getFieldsListFromPanel(containerUuid)
    })

    const recordUuid = computed(() => {
      const { action } = root.$route.query
      return action
    })

    const isWindow = computed(() => {
      return panelType === 'window'
    })

    const isWithRecord = computed(() => {
      return !root.isEmptyValue(recordUuid.value) && recordUuid.value !== 'create-new'
    })

    const isReferecesContent = computed(() => {
      if (isWindow.value && isWithRecord.value) {
        return true
      }
      return false
    })

    const getterContextMenu = computed(() => {
      return root.$store.getters.getContextMenu(containerUuid)
    })

    const isUndoAction = computed(() => {
      if (isWindow.value) {
        if (!isWithRecord.value) {
          return true
        }
      }
      return false
    })

    const defaultActionName = computed(() => {
      if (isWindow.value) {
        if (isWithRecord.value) {
          return root.$t('window.newRecord')
        }
        return root.$t('data.undo')
      }
      return root.$t('components.RunProcess')
    })

    const defaultActionToRun = computed(() => {
      if (isUndoAction.value) {
        return actionsList.value[2]
      }
      return actionsList.value[0]
    })

    const clickRunAction = (action) => {
      if (action === 'refreshData') {
        refreshData()
      } else if (action === 'shareLink') {
        setShareLink()
      } else if (action.action === 'recordAccess') {
        root.$store.commit('changeShowRigthPanel', true)
        root.$store.commit('setRecordAccess', true)
        root.$store.commit('attributeEmbedded', action)
        root.$router.push({
          name: root.$route.name,
          query: {
            ...root.$route.query,
            typeAction: root.$store.getters.getAttributeEmbedded.action
          }
        }, () => {})
        runAction(action)
      } else {
        runAction(action)
      }
    }

    const refreshData = () => {
      if (isWindow.value) {
        root.$store.dispatch('getDataListTab', {
          parentUuid: parentUuid,
          containerUuid: containerUuid,
          isRefreshPanel: true,
          recordUuid: recordUuid.value
        })
          .catch(error => {
            console.warn(`Error getting data list tab. Message: ${error.message}, code ${error.code}.`)
          })
      } else if (panelType === 'browser') {
        const fieldsEmpty = root.$store.getters.getFieldsListEmptyMandatory({
          containerUuid: containerUuid,
          fieldsList: getterFieldsList.value
        })
        if (fieldsEmpty.length) {
          root.$message({
            message: root.$t('notifications.mandatoryFieldMissing') + fieldsEmpty,
            type: 'info',
            showClose: true
          })
        } else {
          root.$store.dispatch('getBrowserSearch', {
            containerUuid: containerUuid,
            isClearSelection: true
          })
        }
      }
    } // end refreshData

    const showModal = (action) => {
      // TODO: Refactor and remove redundant dispatchs
      if (['process'].includes(action.type)) {
        // Add context from view open in process to opening
        if (action.parentUuidAssociated || action.containerUuidAssociated) {
          const attributes = root.$store.getters.getValuesView({
            parentUuid: action.parentUuidAssociated,
            containerUuid: action.containerUuidAssociated
          })

          if (!root.isEmptyValue(attributes)) {
            root.$store.dispatch('updateValuesOfContainer', {
              containerUuid: action.uuid,
              attributes
            })
          }
        }

        // open modal dialog with metadata
        root.$store.dispatch('setShowDialog', {
          type: action.type,
          action: {
            ...action,
            containerUuid: action.uuid
          }
        })
      }
    }

    const runAction = (action) => {
      if (action.type === 'action') {
        executeAction(action)
      } else if (action.type === 'process') {
        // run process associate with view (window or browser)
        showModal(action)
      } else if (action.type === 'dataAction') {
        if (action.action === 'undoModifyData' && Boolean(!getDataLog.value) && getOldRouteOfWindow.value) {
          root.$router.push({
            path: getOldRouteOfWindow.value.path,
            query: {
              ...getOldRouteOfWindow.value.query
            }
          }, () => {})
        } else if (action.action === 'recordAccess') {
          root.$store.dispatch('setShowDialog', {
            type: panelType,
            action: action
          })
        } else if (action.action !== 'undoModifyData') {
          if (action.action === 'setDefaultValues' && root.$route.query.action === 'create-new') {
            return
          }

          root.$store.dispatch(action.action, {
            parentUuid: parentUuid,
            containerUuid: containerUuid,
            recordUuid: recordUuid.value,
            panelType: panelType,
            isNewRecord: action.action === 'setDefaultValues',
            tableName: tableName,
            recordId: getCurrentRecord.value[tableName + '_ID']
          })
            .then(response => {
              root.$message({
                type: 'success',
                message: root.$t('data.lockRecord'),
                showClose: true
              })
              if (response && response.isPrivateAccess) {
                validatePrivateAccess(response)
              }
            })
            .catch(error => {
              root.$message({
                type: 'error',
                message: root.$t('notifications.error') + error.message,
                showClose: true
              })
            })
        }
      } else if (action.type === 'updateReport') {
        updateReport(action)
      }
    } // end runAction

    const executeAction = (action) => {
      let containerParams = root.$route.meta.uuid
      if (this.lastParameter !== undefined) {
        containerParams = this.lastParameter
      }
      const fieldsNotReady = root.$store.getters.getFieldsListEmptyMandatory({
        containerUuid: containerParams
      })

      // run process or report
      if (root.isEmptyValue(fieldsNotReady)) {
        let menuUuid = menuParentUuid
        if (root.isEmptyValue(menuUuid) && root.$route.params) {
          if (!root.isEmptyValue(root.$route.params.menuParentUuid)) {
            menuUuid = root.$route.params.menuParentUuid
          }
        }

        if (panelType === 'process') {
          root.$store.dispatch('setTempShareLink', {
            processId: root.$route.params.processId,
            href: window.location.href
          })
        }

        let reportFormat = action.reportExportType
        if (root.isEmptyValue(reportFormat)) {
          reportFormat = root.$route.query.reportType
          if (root.isEmptyValue(reportFormat)) {
            reportFormat = root.$route.meta.reportFormat
            if (root.isEmptyValue(reportFormat)) {
              reportFormat = 'html'
            }
          }
        }

        root.$store.dispatch(action.action, {
          action,
          parentUuid: containerUuid,
          containerUuid: containerParams, // EVALUATE IF IS action.uuid
          panelType, // determinate if get table name and record id (window) or selection (browser)
          reportFormat, // root.$route.query.reportType ? root.$route.query.reportType : action.reportExportType,
          menuParentUuid: menuUuid, // to load relationsList in context menu (report view)
          routeToDelete: root.$route
        })
          .catch(error => {
            console.warn(error)
          })
      } else {
        showNotification({
          type: 'warning',
          title: root.$t('notifications.emptyValues'),
          name: '<b>' + fieldsNotReady + '.</b> ',
          message: root.$t('notifications.fieldMandatory'),
          isRedirect: false
        })
      }
    } // end executeAction

    const updateReport = (action) => {
      let instanceUuid = action.instanceUuid
      if (root.isEmptyValue(instanceUuid)) {
        instanceUuid = root.$route.params.instanceUuid
      }
      let processId = action.processId
      if (root.isEmptyValue(processId)) {
        processId = root.$route.params.processId
      }
      root.$store.dispatch('getReportOutputFromServer', {
        instanceUuid,
        processUuid: action.processUuid,
        tableName: action.tableName,
        processId,
        printFormatUuid: action.printFormatUuid,
        reportViewUuid: action.reportViewUuid,
        isSummary: false,
        reportName: root.$store.getters.getProcessResult.name,
        reportType: root.$store.getters.getReportType,
        option: action.option
      })
        .then(reportOutputResponse => {
          if (!reportOutputResponse.isError) {
            let link = {
              href: undefined,
              download: undefined
            }

            const blob = new Blob(
              [reportOutputResponse.outputStream],
              { type: reportOutputResponse.mimeType }
            )
            link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = reportOutputResponse.fileName
            if (reportOutputResponse.reportType !== 'pdf' && reportOutputResponse.reportType !== 'html') {
              link.click()
            }
            reportOutputResponse.url = link.href
          }
          root.$store.dispatch('finishProcess', {
            processOutput: reportOutputResponse,
            routeToDelete: root.$route
          })
        })
    }

    const recordAccess = computed(() => {
      return {
        action: 'recordAccess',
        disabled: false,
        hidden: false,
        isSortTab: true,
        name: root.$t('data.recordAccess.actions'),
        type: 'dataAction',
        tableName: tableName
      }
    })

    const validatePrivateAccess = ({ isLocked, tableName, recordId }) => {
      if (!isPersonalLock.value) {
        let isHiddenLock = false
        if (isLocked) {
          isHiddenLock = true
        }
        actionsList.value = actionsList.value.map(actionItem => {
          if (actionItem.action === 'lockRecord') {
            return {
              ...actionItem,
              hidden: isHiddenLock,
              tableName,
              recordId
            }
          } else if (actionItem.action === 'unlockRecord') {
            return {
              ...actionItem,
              hidden: !isHiddenLock
            }
          }
          return actionItem
        })
      }
    }

    const getAllDataRecords = computed(() => {
      return root.$store.getters.getDataRecordAndSelection(containerUuid)
    })

    const getCurrentRecord = computed(() => {
      const record = getAllDataRecords.value.record.find(fieldItem => {
        if (recordUuid.value === fieldItem.UUID) {
          return fieldItem
        }
      })
      if (!root.isEmptyValue(record)) {
        return record
      }
      return {}
    })

    const getDataLog = computed(() => {
      if (isWindow.value) {
        return root.$store.getters.getDataLog(containerUuid, recordUuid.value)
      }
      return undefined
    })

    const getOldRouteOfWindow = computed(() => {
      if (isWindow.value) {
        const oldRoute = root.$store.state['windowControl/index'].windowOldRoute
        if (!root.isEmptyValue(oldRoute.query.action) && oldRoute.query.action !== 'create-new' && root.$route.query.action === 'create-new') {
          return oldRoute
        }
      }
      return false
    })

    const isPersonalLock = computed(() => {
      return root.$store.getters['user/getIsPersonalLock']
    })

    const isLockRecord = computed(() => {
      return root.$store.getters['user/getRole'].isPersonalLock
    })

    const generateContextMenu = () => {
      const metadataMenu = getterContextMenu.value

      // the function is broken avoiding that an error is generated when closing
      // session being in a window, since the store of vuex is cleaned, being
      // metadataMenu with value undefined
      if (root.isEmptyValue(metadataMenu)) {
        return
      }
      actionsList.value = metadataMenu.actions

      // TODO: Add store attribute to avoid making repeated requests
      let isChangePrivateAccess = true
      if (isReferecesContent.value) {
        if ((!root.isEmptyValue(getCurrentRecord.value) && !root.isEmptyValue(tableName))) {
          root.$store.dispatch('getPrivateAccessFromServer', {
            tableName: tableName,
            recordId: getCurrentRecord.value[tableName + '_ID'],
            recordUuid: recordUuid.value
          })
            .then(privateAccessResponse => {
              isChangePrivateAccess = false
              validatePrivateAccess(privateAccessResponse)
            })
        }

        const processAction = actionsList.value.find(item => {
          // TODO: Compare with 'action' attribute and not with 'name' (this change with language)
          if (item.name === 'Procesar Orden' || (item.name === 'Process Order')) {
            return item
          }
        })
        if (processAction) {
          root.$store.dispatch('setOrder', processAction)
        }
      }
      if (isWindow.value && root.isEmptyValue(actionsList.value.find(element => element.action === 'recordAccess'))) {
        actionsList.value.push(recordAccess.value)
      }

      if (!root.isEmptyValue(actionsList.value)) {
        actionsList.value.forEach(itemAction => {
          const { action } = itemAction
          if (root.$route.meta.type === 'report' && action === 'startProcess') {
            itemAction.reportExportType = 'html'
          }

          // if no exists set prop with value
          itemAction.disabled = false
          if ((root.$route.name !== 'Report Viewer' && action === 'changeParameters') ||
             (root.$route.meta.type === 'process' && itemAction.type === 'summary')) {
            itemAction.disabled = true
          }

          if (root.$route.meta.type === 'window') {
            if (isLockRecord.value) {
              if (action === 'lockRecord') {
                itemAction.hidden = isChangePrivateAccess
              } else if (action === 'unlockRecord') {
                itemAction.hidden = !isChangePrivateAccess
              }
            }

            // rollback
            if (itemAction.action === 'undoModifyData') {
              itemAction.disabled = Boolean(!getDataLog.value && !getOldRouteOfWindow.value)
            } else if (!isWithRecord.value || !isInsertRecord) {
              itemAction.disabled = true
            }
          }
        })
      }
    }

    const iconAction = (action) => {
      let icon
      if (action.type === 'dataAction') {
        switch (action.action) {
          case 'setDefaultValues':
            icon = 'el-icon-news'
            break
          case 'deleteEntity':
            icon = 'el-icon-delete'
            break
          case 'undoModifyData':
            icon = 'el-icon-refresh-left'
            break
          case 'lockRecord':
            icon = 'el-icon-lock'
            break
          case 'unlockRecord':
            icon = 'el-icon-unlock'
            break
          case 'recordAccess':
            icon = 'el-icon-c-scale-to-original'
            break
        }
      } else {
        icon = 'el-icon-setting'
      }
      return icon
    }

    generateContextMenu()

    return {
      actionsList,
      // computeds
      defaultActionName,
      defaultActionToRun,
      // methods
      runAction,
      clickRunAction,
      iconAction
    }
  }
})
