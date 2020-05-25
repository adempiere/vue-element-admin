import Vue from 'vue'
import { convertStringToBoolean, isEmptyValue } from '@/utils/ADempiere/valueUtils'

const UUID_KEY = 'UUID'

const value = {
  state: {
    field: {}
  },
  mutations: {
    resetStatevalue(state) {
      state = {
        field: {}
      }
    },
    updateValueOfField(state, payload) {
      //  Only Parent
      if (payload.parentUuid) {
        Vue.set(state.field, payload.parentUuid + '_' + payload.columnName, payload.value)
      }
      //  Only Container
      if (payload.containerUuid) {
        Vue.set(state.field, payload.containerUuid + '_' + payload.columnName, payload.value)
      }
    },
    updateValuesOfContainer(state, payload) {
      payload.attributes.forEach(attribute => {
        //  Only Parent
        if (payload.parentUuid) {
          Vue.set(state.field, payload.parentUuid + '_' + attribute.columnName, attribute.value)
        }
        //  Only Container
        if (payload.containerUuid) {
          Vue.set(state.field, payload.containerUuid + '_' + attribute.columnName, attribute.value)
        }
      })
    }
  },
  actions: {
    updateValuesOfContainer({ commit }, {
      parentUuid,
      containerUuid,
      attributes = []
    }) {
      commit('updateValuesOfContainer', {
        parentUuid,
        containerUuid,
        attributes
      })
    }
  },
  getters: {
    getValueOfField: (state) => ({ containerUuid, columnName }) => {
      return state.field[containerUuid + '_' + columnName]
    },
    getValueOfContainer: (state) => ({ parentUuid, containerUuid, columnName }) => {
      // get in tab level
      let value = state.field[containerUuid + '_' + columnName]
      if (isEmptyValue(value) && parentUuid) {
        // get in window level
        value = state.field[parentUuid + '_' + columnName]
      }
      return value
    },
    getUuidOfContainer: (state) => (containerUuid) => {
      return state.field[containerUuid + '_' + UUID_KEY]
    },
    // Using to read only in data tables in Window
    getContainerIsActive: (state) => (parentUuid) => {
      const valueIsActive = state.field[`${parentUuid}_IsActive`]

      return convertStringToBoolean(valueIsActive)
    },
    getContainerProcessing: (state) => (parentUuid) => {
      const valueProcessing = state.field[`${parentUuid}_Processing`]

      return convertStringToBoolean(valueProcessing)
    },
    getContainerProcessed: (state) => (parentUuid) => {
      const valueProcessed = state.field[`${parentUuid}_Processed`]

      return convertStringToBoolean(valueProcessed)
    }
  }
}

export default value
