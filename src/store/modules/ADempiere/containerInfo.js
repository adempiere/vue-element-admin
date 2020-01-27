import { requestListRecordsLogs, requestListWorkflowsLogs, requestListRecordChats, requestListChatEntries } from '@/api/ADempiere/data'

const containerInfo = {
  state: {
    listworkflowLog: [],
    listRecordLogs: [],
    listRecordChats: [],
    listChatEntries: []
  },
  mutations: {
    addListWorkflow(state, payload) {
      state.listworkflowLog = payload
    },
    addListRecordLogs(state, payload) {
      state.listRecordLogs = payload
    },
    addListRecordChats(state, payload) {
      state.listRecordChats = payload
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
          var workflowLog = {
            recordCount: response.recordCount,
            workflowLogsList: response.workflowLogsList,
            nextPageToken: response.nextPageToken
          }
          commit('addListWorkflow', workflowLog)
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
    listChatEntries({ commit, state, dispatch }, params) {
      const tableName = params.tableName
      const recordId = params.recordId
      const page_size = 0
      const page_token = 0
      return requestListRecordChats({ tableName, recordId, page_size, page_token })
        .then(response => {
          var listRecordChats = {
            recordChatsList: response.recordChatsList,
            recordCount: response.recordCount,
            nextPageToken: response.nextPageToken
          }
          dispatch('listRecordChat', {
            chatUuid: response.recordChatsList[0].chatUuid
          })
          commit('addListRecordChats', listRecordChats)
        })
        .catch(error => {
          console.warn(`Error getting List Chat: ${error.message}. Code: ${error.code}.`)
        })
    },
    listRecordChat({ commit, state }, params) {
      const uuid = params.chatUuid
      const page_size = 0
      const page_token = 0
      return requestListChatEntries({ uuid, page_size, page_token })
        .then(response => {
          var lisChat = {
            chatEntriesList: response.chatEntriesList,
            recordCount: response.recordCount,
            nextPageToken: response.nextPageToken
          }
          commit('addListChatEntries', lisChat)
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
      return state.listRecordLogs
    },
    getListRecordChats: (state) => {
      return state.listRecordChats
    },
    getChatEntries: (state) => {
      return state.listChatEntries
    }
  }
}

export default containerInfo
