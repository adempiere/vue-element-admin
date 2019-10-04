import { runProcess, requestProcessActivity } from '@/api/ADempiere'
import { showNotification } from '@/utils/ADempiere/notification'
import language from '@/lang'
import router from '@/router'

const processControl = {
  state: {
    inExecution: [], // process not response from server
    isVisibleDialog: false,
    reportObject: {},
    reportList: [],
    metadata: {},
    process: [], // process to run finish
    sessionProcess: [],
    notificationProcess: [],
    inRequestMetadata: []
  },
  mutations: {
    // Add process in execution
    addInExecution(state, payload) {
      state.inExecution.push(payload)
    },
    // Add process in notifation
    addNotificationProcess(state, payload) {
      state.notificationProcess.push(payload)
    },
    // Delete process in execution afther some response from server
    deleteInExecution(state, payload) {
      state.inExecution = state.inExecution.filter(item => item.containerUuid !== payload.containerUuid)
    },
    // Add process in request metadata from server
    addInRequestMetadata(state, payload) {
      state.inRequestMetadata.push(payload)
    },
    // Delete process in request metadata
    deleteInRequestMetadata(state, payload) {
      state.inRequestMetadata = state.inRequestMetadata.filter(item => item !== payload)
    },
    addStartedProcess(state, payload) {
      state.process.push(payload)
    },
    dataResetCacheProcess(state, payload) {
      state.process = payload
    },
    /**
     *
     * @param {object} state
     * @param {boolean} payload, true or false value to change displayed dialog
     */
    setShowDialog(state, payload) {
      state.isVisibleDialog = payload
    },
    setMetadata(state, payload) {
      state.metadata = payload
    },
    setReportValues(state, payload) {
      state.reportObject = payload
      state.reportList.push(payload)
    },
    setSessionProcess(state, payload) {
      state.sessionProcess = payload.processList
    },
    changeFormatReport(state, payload) {
      state.reportFormat = payload
    },
    clearProcessControl(state) {
      state.inExecution = [] // process not response from server
      state.reportObject = {}
      state.reportList = []
      state.metadata = {}
      state.process = [] // process to run finish
      state.sessionProcess = []
      state.notificationProcess = []
      state.inRequestMetadata = []
    }
  },
  actions: {
    // Supported Actions for it
    startProcess({ commit, dispatch, getters, rootGetters }, params) {
      return new Promise((resolve, reject) => {
        // TODO: Add support to evaluate params to send
        const samePocessInExecution = getters.getInExecution(params.containerUuid)
        // exists some call to executed process with container uuid
        if (samePocessInExecution) {
          return reject({
            error: 0,
            message: `In this process (${samePocessInExecution.name}) there is already an execution in progress.`
          })
        }

        // additional attributes to send server, selection to browser, or table name and record id to window
        var selection = []
        var tab, tableName, recordId
        if (params.panelType) {
          if (params.panelType === 'browser') {
            selection = rootGetters.getSelectionToServer(params.containerUuid)
            if (selection.length < 1) {
              showNotification({
                title: language.t('data.selectionRequired'),
                type: 'warning'
              })
              return reject({
                error: 0,
                message: `Required selection data record to run this process (${samePocessInExecution.name})`
              })
            }
          }
          if (params.panelType === 'window') {
            tab = rootGetters.getTab(params.parentUuid, params.containerUuid)
            tableName = tab.tableName
            const field = rootGetters.getFieldFromColumnName(params.containerUuid, tableName + '_ID')
            recordId = field.value
          }
        }

        // get info metadata process
        const processDefinition = rootGetters.getProcess(params.action.uuid)

        var reportType = params.action.reportExportType
        if (reportType === undefined) {
          reportType = params.reportFormat
        } else {
          reportType = params.action.reportExportType
        }
        const finalParameters = rootGetters.getParametersToServer(params.action.uuid)

        showNotification({
          title: language.t('notifications.processing'),
          message: processDefinition.name,
          summary: processDefinition.description,
          type: 'info'
        })
        const timeInitialized = (new Date()).getTime()
        // Run process on server and wait for it for notify
        var processResult = {
          // panel attributes from where it was executed
          parentUuid: params.parentUuid,
          containerUuid: params.containerUuid,
          panelType: params.panelType,
          menuParentUuid: params.menuParentUuid,
          // process attributes
          timeInitialized: timeInitialized,
          action: processDefinition.name,
          name: processDefinition.name,
          description: processDefinition.description,
          instanceUuid: '',
          processUuid: processDefinition.uuid,
          processId: processDefinition.id,
          processName: processDefinition.processName,
          parameters: finalParameters,
          isError: false,
          isProcessing: true,
          isReport: processDefinition.isReport,
          summary: '',
          resultTableId: '',
          logs: [],
          output: {
            uuid: '',
            name: '',
            description: '',
            fileName: '',
            output: '',
            outputStream: '',
            reportType: ''
          }
        }
        commit('addInExecution', processResult)

        runProcess({
          uuid: processDefinition.uuid,
          id: processDefinition.id,
          reportType: reportType,
          parameters: finalParameters,
          selection: selection,
          tableName: tableName,
          recordId: recordId
        })
          .then(response => {
            var output = {
              uuid: '',
              name: '',
              description: '',
              fileName: '',
              mimeType: '',
              output: '',
              outputStream: '',
              reportType: ''
            }
            if (response.getOutput().getReporttype()) {
              const responseOutput = response.getOutput()
              output = {
                uuid: responseOutput.getUuid(),
                name: responseOutput.getName(),
                description: responseOutput.getDescription(),
                fileName: responseOutput.getFilename(),
                mimeType: responseOutput.getMimetype(),
                output: responseOutput.getOutput(),
                outputStream: responseOutput.getOutputstream(),
                reportType: responseOutput.getReporttype()
              }
            }
            var logList = []
            if (response.getLogsList()) {
              logList = response.getLogsList().map(itemLog => {
                return {
                  log: itemLog.getLog(),
                  recordId: itemLog.getRecordid()
                }
              })
            }

            var link = {
              href: undefined,
              download: undefined
            }
            if (processDefinition.isReport) {
              const blob = new Blob([output.outputStream], { type: output.mimeType })
              link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = output.fileName
              if (reportType !== 'pdf' && reportType !== 'html') {
                link.click()
              }
            }

            // assign new attributes
            Object.assign(processResult, {
              instanceUuid: response.getInstanceuuid(),
              url: link.href,
              download: link.download,
              isError: response.getIserror(),
              isProcessing: response.getIsprocessing(),
              summary: response.getSummary(),
              resultTableId: response.getResulttableid(),
              logs: logList,
              output: output
            })
            resolve(processResult)
          })
          .catch(error => {
            Object.assign(processResult, {
              isError: true,
              isProcessing: false
            })
            console.log('Error running the process', error)
            reject(error)
          })
          .finally(() => {
            // TODO: Add conditional to indicate when update record
            if (params.panelType === 'window' && !processResult.isError) {
              dispatch('updateRecordAfterRunProcess', {
                parentUuid: params.parentUuid,
                containerUuid: params.containerUuid,
                tab: tab
              })
            }

            commit('addNotificationProcess', processResult)
            dispatch('finishProcess', processResult)

            commit('deleteInExecution', {
              containerUuid: params.containerUuid
            })
            dispatch('deleteRecordContainer', processDefinition.uuid)
          })
      })
    },
    /**
     * TODO: Add date time in which the process/report was executed
     */
    getSessionProcessFromServer({ commit, dispatch, getters, rootGetters }) {
      return new Promise((resolve, reject) => {
        // Example of process Activity
        requestProcessActivity()
          .then(response => {
            var responseList = response.getResponsesList().map(responseItem => {
              var uuid = responseItem.getUuid()
              var responseOutput = responseItem.getOutput()
              var output
              if (responseOutput !== undefined) {
                output = {
                  uuid: uuid,
                  name: responseOutput.getName(),
                  description: responseOutput.getDescription(),
                  fileName: responseOutput.getFilename(),
                  mimeType: responseOutput.getMimetype(),
                  output: responseOutput.getOutput(),
                  outputStream: responseOutput.getOutputstream(),
                  outputStream_asB64: responseOutput.getOutputstream_asB64(),
                  outputStream_asU8: responseOutput.getOutputstream_asU8(),
                  reportType: responseOutput.getReporttype()
                }
              }
              var logList = responseItem.getLogsList().map(log => {
                return {
                  recordId: log.getRecordid(),
                  log: log.getLog()
                }
              })

              var processMetadata = rootGetters.getProcess(uuid)
              // if no exists metadata process in store and no request progess
              if (processMetadata === undefined && getters.getInRequestMetadata(uuid) === undefined) {
                commit('addInRequestMetadata', uuid)
                dispatch('getProcessFromServer', uuid)
                  .finally(() => {
                    commit('deleteInRequestMetadata', uuid)
                  })
              }

              var process = {
                processUuid: responseItem.getUuid(),
                instanceUuid: responseItem.getInstanceuuid(),
                isError: responseItem.getIserror(),
                isProcessing: responseItem.getIsprocessing(),
                logs: logList,
                output: output,
                parametersMap: responseItem.getParametersMap(),
                resultTableId: responseItem.getResulttableid(),
                summary: responseItem.getSummary()
              }
              return process
            })

            var processResponseList = {
              recordCount: response.getRecordcount(),
              processList: responseList,
              nextPageToken: response.getNextPageToken()
            }
            commit('setSessionProcess', processResponseList)
            resolve(processResponseList)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /**
     *
     * @param {object} params
     */
    setShowDialog({ commit }, params) {
      if (params.type === 'process' || params.type === 'report' || params.type === 'window') {
        if (params.action) {
          commit('setMetadata', params.action)
          commit('setShowDialog', true)
        } else {
          commit('setShowDialog', false)
        }
      }
    },
    finishProcess({ commit, dispatch }, processOutput) {
      var processMessage = {
        name: processOutput.processName,
        title: language.t('notifications.succesful'),
        message: language.t('notifications.processExecuted'),
        type: 'success',
        logs: processOutput.logs,
        summary: processOutput.summary
      }
      // TODO: Add isReport to type always 'success'
      if (processOutput.isError) {
        processMessage.title = language.t('notifications.error')
        processMessage.message = language.t('notifications.processError')
        processMessage.type = 'error'
      }

      const oldRoute = router.app._route
      if (processOutput.isReport) {
        // open report viewer with report response
        router.push({
          name: 'Report Viewer',
          params: {
            processId: processOutput.processId,
            instanceUuid: processOutput.instanceUuid,
            fileName: processOutput.output.fileName,
            menuParentUuid: processOutput.menuParentUuid
          }
        })
      }

      // close view if is process, report or browser.
      if (processOutput.panelType !== 'window') {
        dispatch('tagsView/delView', oldRoute, true)
      }

      showNotification(processMessage)
      commit('addStartedProcess', processOutput)
      commit('setReportValues', processOutput)
    },
    changeFormatReport({ commit }, reportFormat) {
      if (reportFormat !== undefined) {
        commit('changeFormatReport', reportFormat)
      }
    },
    clearProcessControl({ commit }) {
      commit('clearProcessControl')
    }
  },
  getters: {
    /**
     * Running processes that have not received a response from the server
     * @param {string} containerUuid
     */
    getInExecution: (state) => (containerUuid) => {
      return state.inExecution.find(item => item.containerUuid === containerUuid)
    },
    /**
     * Process for send to server, or send without response
     */
    getAllInExecution: (state) => {
      return state.inExecution
    },
    /**
     * Process send to server, with response from server
     */
    getAllFinishProcess: (state) => {
      return state.process
    },
    getNotificationProcess: (state) => {
      return state.notificationProcess
    },
    /**
     * Process receibed from server associated whith this session
     */
    getAllSessionProcess: (state) => {
      return state.sessionProcess
    },
    /**
     * Process request metadata from server filter form uuid process
     */
    getInRequestMetadata: (state) => (containerUuid) => {
      return state.inRequestMetadata.find(item => item === containerUuid)
    },
    getProcessResult: (state) => {
      return state.reportObject
    },
    getCachedReport: (state) => (instanceUuid) => {
      return state.reportList.find(
        item => item.instanceUuid === instanceUuid
      )
    }
  }
}

export default processControl
