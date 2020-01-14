// Default store for handle dashboard refresh and other functionalities
import { requestLisDashboards } from '@/api/ADempiere/data'
const dashboard = {
  state: {
    dashboard: []
  },
  mutations: {
    addDashboard(state, payload) {
      state.dashboard.push(payload)
    },
    notifyDashboardRefresh: (state, payload) => {

    }
  },
  actions: {
    refreshDashboard({ commit, getters }, parameters) {
      commit('notifyDashboardRefresh', parameters)
    },
    listDashboard({ commit }, roleUuid) {
      return new Promise((resolve, reject) => {
        requestLisDashboards(roleUuid)
          .then(dashboardResponse => {
            const roleDashboards = {
              roleUuid: roleUuid,
              ...dashboardResponse
            }
            commit('addDashboard', roleDashboards)
            resolve(roleDashboards)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getDashboard: (state) => (dashboardUuid) => {
      return state.dashboard.find(
        item => item.uuid === dashboardUuid
      )
    },
    getDashboardByRole: (state) => (roleUuid) => {
      return state.dashboard.find(
        item => item.roleUuid === roleUuid
      )
    }
  }
}

export default dashboard
