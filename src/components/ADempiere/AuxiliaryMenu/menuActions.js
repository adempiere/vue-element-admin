
import { defineComponent } from '@vue/composition-api'

import { showNotification } from '@/utils/ADempiere/notification.js'

export default defineComponent({
  name: 'MenuActions',

  setup(props, { root }) {
    const setShareLink = () => {

    }

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
      if (this.isWindow) {
        this.$store.dispatch('getDataListTab', {
          parentUuid: this.parentUuid,
          containerUuid: this.containerUuid,
          isRefreshPanel: true,
          recordUuid: this.recordUuid
        })
          .catch(error => {
            console.warn(`Error getting data list tab. Message: ${error.message}, code ${error.code}.`)
          })
      } else if (this.panelType === 'browser') {
        const fieldsEmpty = this.$store.getters.getFieldsListEmptyMandatory({
          containerUuid: this.containerUuid,
          fieldsList: this.getterFieldsList
        })
        if (fieldsEmpty.length) {
          this.$message({
            message: this.$t('notifications.mandatoryFieldMissing') + fieldsEmpty,
            type: 'info',
            showClose: true
          })
        } else {
          this.$store.dispatch('getBrowserSearch', {
            containerUuid: this.containerUuid,
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
        if (action.action === 'undoModifyData' && Boolean(!this.getDataLog) && this.getOldRouteOfWindow) {
          root.$router.push({
            path: this.getOldRouteOfWindow.path,
            query: {
              ...this.getOldRouteOfWindow.query
            }
          }, () => {})
        } else if (action.action === 'recordAccess') {
          root.$store.dispatch('setShowDialog', {
            type: this.panelType,
            action: action
          })
        } else if (action.action !== 'undoModifyData') {
          if (action.action === 'setDefaultValues' && root.$route.query.action === 'create-new') {
            return
          }

          root.$store.dispatch(action.action, {
            parentUuid: this.parentUuid,
            containerUuid: this.containerUuid,
            recordUuid: this.recordUuid,
            panelType: this.panelType,
            isNewRecord: action.action === 'setDefaultValues',
            tableName: this.tableName,
            recordId: this.getCurrentRecord[this.tableNameCurrentTab + '_ID']
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
              this.$message({
                type: 'error',
                message: this.$t('notifications.error') + error.message,
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
        let menuParentUuid = this.menuParentUuid
        if (root.isEmptyValue(menuParentUuid) && this.$route.params) {
          if (!this.isEmptyValue(this.$route.params.menuParentUuid)) {
            menuParentUuid = this.$route.params.menuParentUuid
          }
        }

        if (this.panelType === 'process') {
          this.$store.dispatch('setTempShareLink', {
            processId: this.$route.params.processId,
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
          parentUuid: this.containerUuid,
          containerUuid: containerParams, // EVALUATE IF IS action.uuid
          panelType: this.panelType, // determinate if get table name and record id (window) or selection (browser)
          reportFormat, // this.$route.query.reportType ? this.$route.query.reportType : action.reportExportType,
          menuParentUuid, // to load relationsList in context menu (report view)
          routeToDelete: this.$route
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

    const validatePrivateAccess = ({ isLocked, tableName, recordId }) => {
      if (!this.isPersonalLock) {
        let isHiddenLock = false
        if (isLocked) {
          isHiddenLock = true
        }
        this.actions = this.actions.map(actionItem => {
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

    return {
      // methods
      clickRunAction
    }
  }
})
