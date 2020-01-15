import { requestLanguages } from '@/api/ADempiere'

const languageControl = {
  state: {
    languagesList: []
  },
  mutations: {
    setlanguagesList(state, payload) {
      state.languagesList = payload
    }
  },
  actions: {
    getLanguagesFromServer({ commit }) {
      return new Promise((resolve, reject) => {
        requestLanguages()
          .then(languageResponse => {
            commit('setlanguagesList', languageResponse.languagesList)
            resolve(languageResponse.languagesList)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getLanguagesList: (state) => {
      return state.languagesList
    },
    getLanguageByParameter: (state) => (parameter) => {
      var list = state.languagesList
      list.forEach(language => {
        if (language.hasOwnProperty(parameter)) {
          return language
        }
      })
    }
  }
}
export default languageControl
