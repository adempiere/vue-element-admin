import Vue from 'vue'

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
    }
  },
  getters: {
    getValueOfField: (state) => (metadata) => {
      return state.field[metadata.containerUuid + '_' + metadata.columnName]
    }
  }
}

export default value
