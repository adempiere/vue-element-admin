import { createEntity, updateEntity } from '@/api/ADempiere/persistence'
import { showMessage } from '@/utils/ADempiere/notification'
import language from '@/lang'
const persistence = {
  state: {
    persistence: {}
  },
  mutations: {
    resetStatepersistence(state) {
      state = {
        persistence: {}
      }
    },
    addChangeToPersistenceQueue(state, {
      tableName,
      columnName,
      valueType,
      value
    }) {
      if (!state.persistence[tableName]) {
        state.persistence[tableName] = new Map()
      }
      // Set value
      state.persistence[tableName].set(columnName, {
        columnName,
        valueType,
        value
      })
    }
  },
  actions: {
    flushPersistenceQueue({ commit, getters }, {
      tableName,
      recordUuid
    }) {
      const attributes = getters.getPersistenceAttributes(tableName)
      if (attributes) {
        if (recordUuid) {
          updateEntity({
            tableName,
            recordUuid,
            attributes
          })
            .then(response => {
              showMessage({
                message: language.t('notifications.updateSuccessfully'),
                type: 'success'
              })
            })
            .catch(error => {
              showMessage({
                message: error.message,
                type: 'error'
              })
              console.warn(`Update Entity error: ${error.message}.`)
            })
        } else { //  Create new
          createEntity({
            tableName,
            attributes
          })
            .then(response => {
              showMessage({
                message: language.t('data.createRecordSuccessful'),
                type: 'success'
              })
            })
            .catch(error => {
              showMessage({
                message: error.message,
                type: 'error'
              })
              console.warn(`Create Entity error: ${error.message}.`)
            })
        }
      }
    }
  },
  getters: {
    getPersistenceMap: (state) => (tableName) => {
      return state.persistence[tableName]
    },
    getPersistenceAttributes: (state) => (tableName) => {
      const attributesMap = state.persistence[tableName]
      if (attributesMap) {
        return [...attributesMap]
      }
      return undefined
    }
  }
}

export default persistence
