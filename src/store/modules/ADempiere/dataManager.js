import {
  requestListEntities
} from '@/api/ADempiere/common/persistence'

const dataManager = {
  namespaced: true,

  state: {
    containerData: []
  },

  mutations: {
    setContainerData(state, payload) {
      const index = state.containerData.findIndex(element => {
        return element.containerUuid === payload.containerUuid
      })
      if (index > -1) {
        // update records
        state.containerData.splice(index, 0, payload)
      } else {
        state.containerData.push(payload)
      }
    }
  },

  actions: {
    getEntitiesList({
      commit
    }, {
      parentUuid,
      containerUuid,
      tableName,
      query,
      whereClause,
      pageToken,
      pageSize
    }) {
      // TODO: Parsed query and where clause
      return new Promise((resolve) => {
        requestListEntities({
          tableName,
          query,
          whereClause,
          pageToken,
          pageSize
        })
          .then(responseData => {
            const dataToStored = responseData.recordsList.map(record => {
              return record.attributes
            })

            commit('setContainerData', {
              parentUuid,
              containerUuid,
              recordsList: dataToStored
            })

            resolve(dataToStored)
          })
      })
    }
  },

  getters: {
    getContainerData: (state) => ({
      containerUuid
    }) => {
      return state.containerData.find(dataStored => {
        return dataStored.containerUuid === containerUuid
      })
    }
  }
}

export default dataManager
