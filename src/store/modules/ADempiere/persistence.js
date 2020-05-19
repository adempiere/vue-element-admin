const persistence = {
  state: {
    persistence: {}
  },
  mutations: {
    resetStatepersistence(state) {
      state = {
        persistence: {}
      }
    }
  },
  actions: {
    addChangeToQueue({ commit }, {
      tableName,
      columnName
    }) {
      console.log({
        tableName,
        columnName
      })
    }
  },
  getters: {
    getPersistence: (state) => {
      return state.persistence
    }
  }
}

export default persistence
