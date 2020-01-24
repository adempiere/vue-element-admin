import { requestListRecordsLogs, requestListWorkflowsLogs, requestListRecordChats } from '@/api/ADempiere/data'

const containerInfo = {
  state: {
    listworkflowLog: [],
    listRecordLogs: [],
    listChatEntries: []
  },
  mutations: {
    addListWorkflow(state, payload) {
      state.listworkflowLog = payload
    },
    addListRecordLogs(state, payload) {
      state.listRecordLogs = payload
    },
    addListChatEntries(state, payload) {
      state.listChatEntries = payload
    }
  },
  actions: {
    listWorkflowLogs({ commit, state }, params) {
      const tableName = params.tableName
      const recordId = params.recordId
      const page_size = 0
      const page_token = 0
      return requestListWorkflowsLogs({ tableName, recordId, page_size, page_token })
        .then(response => {
          commit('addListWorkflow', response)
        })
        .catch(error => {
          console.warn(`Error getting List workflow: ${error.message}. Code: ${error.code}.`)
        })
    },
    listRecordLogs({ commit, state }, params) {
      const tableName = params.tableName
      const recordId = params.recordId
      const page_size = 0
      const page_token = 0
      return requestListRecordsLogs({ tableName, recordId, page_size, page_token })
        .then(response => {
          var listRecord = {
            recordCount: response.recordCount,
            recorLogs: response.recordLogsList
          }
          commit('addListRecordLogs', listRecord)
        })
        .catch(error => {
          console.warn(`Error getting List Record Logs: ${error.message}. Code: ${error.code}.`)
        })
    },
    listChatEntries({ commit, state }, params) {
      const tableName = params.tableName
      const recordId = params.recordId
      const page_size = 0
      const page_token = 0
      return requestListRecordChats({ tableName, recordId, page_size, page_token })
        .then(response => {
          console.log('response =>', response)
          commit('addListChatEntries', response)
        })
        .catch(error => {
          console.warn(`Error getting List Chat: ${error.message}. Code: ${error.code}.`)
        })
    }
  },
  getters: {
    getWorkflow: (state) => {
      return state.listworkflowLog.workflowLogsList
    },
    getRecordLogs: (state) => {
      if (state.listRecordLogs) {
        return state.listRecordLogs
      } else {
        var listRecord = [{
          columnName: 0,
          description: '',
          displayColumnName: '',
          eventType: 0,
          eventTypeName: 0,
          logDate: 0,
          logUuid: 0,
          newDisplayValue: '',
          newValue: 0,
          oldDisplayValue: '',
          oldValue: 0,
          recordId: 0,
          sessionUuid: '',
          tableName: '',
          transactionName: '',
          userName: '',
          userUuid: 0
        }]
        return listRecord
      }
    },
    getChatEntries: (state) => {
      return state.listChatEntries
    }
  }
}

export default containerInfo
