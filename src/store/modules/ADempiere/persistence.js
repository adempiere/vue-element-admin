import { createEntity, updateEntity } from '@/api/ADempiere/persistence'
import { isEmptyValue } from '@/utils/ADempiere/valueUtils'

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
    flushPersistenceQueue({ getters }, {
      tableName,
      recordUuid
    }) {
      return new Promise((resolve, reject) => {
        const attributes = getters.getPersistenceAttributes(tableName)
        if (attributes) {
          if (recordUuid) {
            // Update existing entity
            updateEntity({
              tableName,
              recordUuid,
              attributes
            })
              .then(response => resolve(response))
              .catch(error => reject(error))
          } else {
            // Create new entity
            createEntity({
              tableName,
              attributes
            })
              .then(response => resolve(response))
              .catch(error => reject(error))
          }
        }
      })
    }
  },
  getters: {
    getPersistenceMap: (state) => (tableName) => {
      return state.persistence[tableName]
    },
    getPersistenceAttributes: (state) => (tableName) => {
      const attributesMap = state.persistence[tableName]
      if (!isEmptyValue(attributesMap)) {
        return [...attributesMap.values()]
      }
      return undefined
    }
  }
}

export default persistence
