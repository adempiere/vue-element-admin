import { requestLanguages, requestTranslations } from '@/api/ADempiere/data'

const languageControl = {
  state: {
    languagesList: [],
    translationsList: []
  },
  mutations: {
    setlanguagesList(state, payload) {
      state.languagesList = payload
    },
    setTranslationsList(state, payload) {
      state.translationsList = payload
    },
    setTranslation(state, payload) {
      payload.currentTranlation = payload.newTranlation
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
    },
    setTranslation({ state, commit }, {
      containerUuid,
      recordUuid,
      recordId,
      language
    }) {
      const currentTranlation = state.translationsList.find(itemTrannslation => {
        return itemTrannslation.containerUuid === containerUuid &&
        itemTrannslation.language === language &&
        (itemTrannslation.recordUuid === recordUuid || itemTrannslation.recordId === recordId)
      })
      const newTranlation = {}
      commit('setTranslation', {
        currentTranlation,
        newTranlation
      })
    },
    getTranslationsFromServer({ commit }, {
      containerUuid,
      tableName,
      recordUuid,
      recordId,
      language
    }) {
      return requestTranslations({
        recordUuid,
        recordId,
        tableName,
        language
      })
        .then(translationResponse => {
          commit('setTranslationsList', {
            containerUuid,
            tableName,
            recordUuid,
            recordId,
            language,
            values: translationResponse.values
          })
          return translationResponse
        })
        .catch(error => {
          console.warn(error)
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
