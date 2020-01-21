import { requestListRecordsLogs, requestListWorkflowsLogs } from '@/api/ADempiere/data'

const containerInfo = {
  state: {
    listworkflowLog: [],
    listRecordLogs: [],
    listChatEntries: []
  },
  mutations: {
    addListWorkflow(state, payload) {
      state.listworkflowLog.push(payload)
    },
    addListRecordLogs(state, payload) {
      state.listRecordLogs.push(payload)
    },
    addListChatEntries(state, payload) {
      state.listChatEntries.push(payload)
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
          commit('addListRecordLogs', response)
        })
        .catch(error => {
          console.warn(`Error getting List Record Logs: ${error.message}. Code: ${error.code}.`)
        })
    }
    // listChatEntries({ commit, state }, params) {
    //   const tableName = params.tableName
    //   const recordId = params.recordId
    //   const page_size = 0
    //   const page_token = 0
    // return ListRecordChatsRequest({ tableName, recordId, page_size, page_token })
    //   .then(response => {
    //     commit('addListChatEntries', response)
    //   })
    //   .catch(error => {
    //     console.warn(`Error getting List Chat: ${error.message}. Code: ${error.code}.`)
    //   })
    // }
  },
  getters: {
    getWorkflow: (state) => {
      return state.lisworkflowLog
    },
    getRecordLogs: (state) => {
      return state.listRecordLogs
    },
    getChatEntries: (state) => {
      return state.listChatEntries
    }
  }
}

export default containerInfo
