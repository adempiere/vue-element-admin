import {
  trialBalance
} from '@/api/ADempiere/form/trial-balance.js'
import { showMessage } from '@/utils/ADempiere/notification.js'

const balance = {
  trialBalance: {
    record: [],
    selectedRecord: []
  }
}

export default {
  state: balance,
  mutations: {
    setTrialBalance(state, params) {
      state.trialBalance = params
    }
  },
  actions: {
    serverTrialBalance({ commit, state }, {
      orgUuid,
      periodUuid,
      reportCubeUuid,
      formUuid
    }) {
      trialBalance({
        orgUuid,
        periodUuid,
        reportCubeUuid,
        formUuid
      })
        .then(trialBalanceResponse => {
          const listTrialBalance = {
            record: trialBalanceResponse,
            selectedRecord: state.trialBalance.selectedRecord
          }
          commit('setTrialBalance', listTrialBalance)
        })
        .catch(error => {
          console.warn(`serverTrialBalance: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    selectTrialBalance({ commit, state }, select) {
      const listTrialBalance = {
        record: state.trialBalance.record,
        selectedRecord: select
      }
      commit('setTrialBalance', listTrialBalance)
    }
  },
  getters: {
    getTrialBalance: (state) => {
      return state.trialBalance
    }
  }
}
