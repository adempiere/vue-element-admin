import {
  paymentList,
  invocesList,
  summaryList
} from '@/api/ADempiere/form/paymentAllocation.js'
import { showMessage } from '@/utils/ADempiere/notification.js'

const AllocationPayments = {
  invoiceList: [],
  paymentList: [],
  summaryList: [],
  selectedPayments: [],
  selectedInvoce: []
}

export default {
  state: AllocationPayments,
  mutations: {
    setInvoiceLis(state, list) {
      state.invoiceList = list
    },
    setPaymentList(state, list) {
      state.paymentList = list
    },
    setSummaryList(state, list) {
      state.summaryList = list
    },
    setSelectedPayments(state, select) {
      state.selectedPayments = select
    },
    setSelectedInvoce(state, select) {
      state.selectedInvoce = select
    }
  },
  actions: {
    serverPaymentList({ commit }, businessPartnerUuid) {
      paymentList({
        businessPartnerUuid
      })
        .then(responsePaymentList => {
          commit('setPaymentList', responsePaymentList)
        })
        .catch(error => {
          console.warn(`serverPaymentList: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    serverBillingList({ commit }, businessPartnerUuid) {
      invocesList({
        businessPartnerUuid
      })
        .then(response => {
          commit('setInvoiceLis', response)
        })
        .catch(error => {
          console.warn(`serverBillingList: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    searchServerPaymentAllocationSummaryList({ commit }, businessPartnerUuid) {
      summaryList({
        businessPartnerUuid
      })
        .then(response => {
          commit('setSummaryList', response)
        })
        .catch(error => {
          console.warn(`searchServerPaymentAllocationSummaryList: ${error.message}. Code: ${error.code}.`)
          showMessage({
            type: 'error',
            message: error.message,
            showClose: true
          })
        })
    },
    selectedPaymentsAndColletion({ commit }, select) {
      commit('setSelectedPayments', select)
    },
    selectedInvoce({ commit }, select) {
      commit('setSelectedInvoce', select)
    }
  },
  getters: {
    getInvoiceList: (state) => {
      return state.invoiceList
    },
    getPaymentList: (state) => {
      return state.paymentList
    },
    getSummaryList: (state) => {
      return state.summaryList
    },
    getSelectedPayments: (state) => {
      return state.selectedPayments
    },
    getSelectedInvoce: (state) => {
      return state.selectedInvoce
    }
  }
}
