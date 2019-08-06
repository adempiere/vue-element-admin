import { getObject, getObjectListFromCriteria, getRecentItems } from '@/api/ADempiere'
import { convertValuesMapToObject } from '@/utils/ADempiere'

const data = {
  state: {
    recordSelection: [], // record data and selection
    recordDetail: [],
    recentItems: [],
    recordView: []
  },
  mutations: {
    recordSelection(state, payload) {
      if (payload.index > -1 && payload.index !== undefined) {
        state.recordSelection.splice(payload.index, 1, payload)
      } else {
        state.recordSelection.push(payload)
      }
    },
    deleteRecordContainer(state, payload) {
      state.recordSelection = payload
    },
    notifyCellTableChange: (state, payload) => {
      payload.row[payload.columnName] = payload.value
      if (payload.displayColumn !== undefined) {
        var key = 'DisplayColumn_' + payload.columnName
        payload.row[key] = payload.displayColumn
      }
    },
    notifyCellSelectionChange: (state, payload) => {
      if (payload.row !== undefined) {
        payload.row[payload.columnName] = payload.value
        if (payload.displayColumn !== undefined) {
          var key = 'DisplayColumn_' + payload.columnName
          payload.row[key] = payload.displayColumn
        }
      }
    },
    setRecentItems(state, payload) {
      state.recentItems = payload
    },
    setPageNumber(state, payload) {
      payload.data.pageNumber = payload.pageNumber
    },
    setRecordDetail(state, payload) {
      var dataDetail = state.recordDetail.filter(itemData => {
        if (itemData.uuid !== payload.uuid) {
          return true
        }
      })
      dataDetail.push(payload)
      state.recordDetail = dataDetail
    }
  },
  actions: {
    setPageNumber({ commit, state }, parameters) {
      var data = state.recordSelection.find(recordItem => {
        return recordItem.containerUuid === parameters.containerUuid
      })
      commit('setPageNumber', {
        data: data,
        pageNumber: parameters.pageNumber
      })
    },
    recordSelection({ commit, state }, parameters) {
      var index = state.recordSelection.findIndex(recordItem => {
        return recordItem.containerUuid === parameters.containerUuid
      })
      commit('recordSelection', {
        ...parameters,
        index: index
      })
    },
    deleteRecordContainer({ commit, state }, containerUuid) {
      var record = state.recordSelection.filter(itemRecord => {
        return itemRecord.containerUuid !== containerUuid
      })
      commit('deleteRecordContainer', record)
    },
    getEntity: ({ commit, dispatch }, parameters) => {
      return new Promise((resolve, reject) => {
        getObject(parameters.table, parameters.recordUuid)
          .then(response => {
            var map = response.getValuesMap()
            var newValues = convertValuesMapToObject(map)

            commit('setRecordDetail', {
              data: newValues,
              id: response.getId(),
              uuid: response.getUuid(),
              tableName: response.getTablename()
            })
            resolve(newValues)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /**
     * Request list to view in table
     * @param {string} params.tableName, table name to search record data
     * @param {string} params.criteria, criteria to search record data
     */
    getObjectListFromCriteria: ({ dispatch, rootGetters }, objectParams) => {
      return new Promise((resolve, reject) => {
        getObjectListFromCriteria(objectParams)
          .then(response => {
            const recordList = response.getRecordsList()
            var record = recordList.map(itemRecord => {
              const map = itemRecord.getValuesMap()
              var values = convertValuesMapToObject(map)
              return values
            })
            var selection = rootGetters.getDataRecordSelection(objectParams.containerUuid)
            dispatch('recordSelection', {
              containerUuid: objectParams.containerUuid,
              record: record,
              selection: selection,
              nextPage: response.getNextPageToken()
            })
            resolve(record)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getRecentItemsFromServer: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getRecentItems()
          .then(response => {
            var recentItemsList = response.getRecentitemsList()
            var recentItems = recentItemsList.map(item => {
              var tabUuid = item.getTabuuid()
              return {
                displayName: item.getDisplayname(),
                menuUuid: item.getMenuuuid(),
                menuName: item.getMenuname(),
                windowUuid: item.getWindowuuid(),
                tableId: item.getTableid(),
                recordId: item.getRecordid(),
                uuidRecord: item.getRecorduuid(),
                tabUuid: tabUuid,
                updated: new Date(item.getUpdated()),
                description: item.getMenudescription()
              }
            })
            commit('setRecentItems', recentItems)
            resolve(recentItems)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    notifyCellTableChange: ({ commit, state }, objectParams) => {
      var recordSelection = state.recordSelection.find(recordItem => {
        return recordItem.containerUuid === objectParams.containerUuid
      })
      var row = recordSelection.record.find(itemRecord => {
        return itemRecord[objectParams.keyColumn] === objectParams.rowKey
      })
      var rowSelection = recordSelection.selection.find(itemRecord => {
        return itemRecord[objectParams.keyColumn] === objectParams.rowKey
      })

      commit('notifyCellSelectionChange', {
        row: rowSelection,
        value: objectParams.newValue,
        columnName: objectParams.columnName,
        displayColumn: objectParams.displayColumn
      })
      commit('notifyCellTableChange', {
        row: row,
        value: objectParams.newValue,
        columnName: objectParams.columnName,
        displayColumn: objectParams.displayColumn
      })
    }
  },
  getters: {
    getDataRecordAndSelection: (state, rootGetters) => (containerUuid) => {
      var data = state.recordSelection.find(itemRecord => {
        return itemRecord.containerUuid === containerUuid
      })
      if (data) {
        return data
      }
      return {
        containerUuid: containerUuid,
        record: [],
        selection: [],
        pageNumber: 1
      }
    },
    getDataRecordDetail: (state, getters) => (containerUuid) => {
      var data = getters.getDataRecordAndSelection(containerUuid)
      return data.record
    },
    getDataAllRecord: (state, getters) => (containerUuid) => {
      var data = getters.getDataRecordAndSelection(containerUuid)
      return data.record
    },
    getPageNextToken: (state, getters) => (containerUuid) => {
      var data = getters.getDataRecordAndSelection(containerUuid)
      return data.nextPage
    },
    getDataRecordSelection: (state, getters) => (containerUuid) => {
      var selection = getters.getDataRecordAndSelection(containerUuid)
      return selection.selection
    },
    getPageCount: (state, getters) => (containerUuid) => {
      var data = getters.getDataRecordAndSelection(containerUuid)
      return data.pageNumber
    },
    /**
     * Getter converter selection data record in format
     * [
     *  {
     *    selectionId: keyColumn Value,
     *    selectionValues: [
     *      { columname, value },
     *      { columname, value },
     *      { columname, value }
     *    ]
     *  },
     *  {
     *    selectionId: keyColumn Value,
     *    selectionValues: [
     *      { columname, value },
     *      { columname, value }
     *    ]
     *  }
     * ]
     */
    getSelectionToServer: (state, getters, rootState, rootGetters) => (containerUuid) => {
      var selectionToServer = []
      var data = getters.getDataRecordAndSelection(containerUuid)
      if (data.selection.length > 0) {
        var panel = rootGetters.getPanel(containerUuid)
        var keyColumn = panel.keyColumn

        data.selection.forEach(itemRow => {
          var records = []

          Object.keys(itemRow).forEach(key => {
            records.push({
              columnName: key,
              value: itemRow[key]
            })
          })

          selectionToServer.push({
            selectionId: itemRow[keyColumn],
            selectionValues: records
          })
        })
      }
      return selectionToServer
    },
    getRecentItems: (state) => {
      return state.recentItems
    },
    getLanguageList: (state) => (roleUuid) => {
      var languageList = state.recordSelection.find(
        record => record.containerUuid === roleUuid
      )
      return languageList || []
    }
  }
}

export default data
