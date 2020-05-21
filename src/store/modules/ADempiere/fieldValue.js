import Vue from 'vue'
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
  getters: {
    getValueOfField: (state) => ({ containerUuid, columnName }) => {
      return state.field[containerUuid + '_' + columnName]
    },
    getValueOfContainer: (state) => ({ parentUuid, containerUuid, columnName }) => {
      let value = state.field[containerUuid + '_' + columnName]
      if (!value && parentUuid) {
        value = state.field[parentUuid + '_' + columnName]
      }
      return value
    },
    getUuidOfContainer: (state) => (containerUuid) => {
      return state.field[containerUuid + '_' + UUID_KEY]
    }
  }
}

export default value
