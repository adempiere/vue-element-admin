import {
  importedMovements,
  systemPay,
  matchingPay
} from '@/api/ADempiere/form/vBankState.js'
import { showMessage } from '@/utils/ADempiere/notification.js'

const bankState = {
  listMovements: {
    record: [],
    selectedRecord: []
  },
  listSystemPay: {
    record: [],
    selectedRecord: []
  },
  listMatchingPay: {
    record: [],
    selectedRecord: []
  }
}

export default {
  state: bankState,
  mutations: {
    setImportedMovements(state, movements) {
      state.listMovements = movements
    },
    setSystemPay(state, systemPay) {
      state.listSystemPay = systemPay
    },
    setMatchingPay(state, matchingPay) {
      state.listMatchingPay = matchingPay
    }
  },
  actions: {
    serverImportedMovementsList({ commit }, {
      bankAccountUuid,
      formUuid
    }) {
      importedMovements({
        bankAccountUuid,
        formUuid
      })
        .then(importedMovementsResponse => {
          const listMovements = {
            record: importedMovementsResponse,
            selectedRecord: []
          }
          commit('setImportedMovements', listMovements)
        })
        .catch(error => {
          console.warn(`serverImportedMovementsList: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    selectMovement({ commit, state }, select) {
      const listMovements = {
        record: state.listMovements.record,
        selectedRecord: select
      }
      commit('setImportedMovements', listMovements)
    },
    serverSystemPayList({ commit }, {
      bankAccountUuid,
      formUuid
    }) {
      systemPay({
        bankAccountUuid,
        formUuid
      })
        .then(systemPayResponse => {
          const listSystemPay = {
            record: systemPayResponse,
            selectedRecord: []
          }
          commit('setSystemPay', listSystemPay)
        })
        .catch(error => {
          console.warn(`serverSystemPayList: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    selectSystemPay({ commit, state }, select) {
      const listSystemPay = {
        record: state.listSystemPay.record,
        selectedRecord: select
      }
      commit('setImportedMovements', listSystemPay)
    },
    serverMatchingPayList({ commit }, {
      bankAccountUuid,
      formUuid
    }) {
      matchingPay({
        bankAccountUuid,
        formUuid
      })
        .then(matchingPayResponse => {
          const listMatchingPay = {
            record: matchingPayResponse,
            selectedRecord: []
          }
          commit('setMatchingPay', listMatchingPay)
        })
        .catch(error => {
          console.warn(`serverMatchingPayList: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    selectMatchingPay({ commit, state }, select) {
      const listMatchingPay = {
        record: state.listMatchingPay.record,
        selectedRecord: select
      }
      commit('setMatchingPay', listMatchingPay)
    }
  },
  getters: {
    getImportedMovements: (state) => {
      return state.listMovements
    },
    getSystemPay: (state) => {
      return state.listSystemPay
    },
    getMatchingPay: (state) => {
      return state.listMatchingPay
    }
  }
}
