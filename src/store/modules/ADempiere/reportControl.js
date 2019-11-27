import { requestReportViews, requestPrintFormats, requestDrillTables, getReportOutput } from '@/api/ADempiere'
const contextMenu = {
  state: {
    reportFormatsList: [],
    reportViewsList: [],
    drillTablesList: []
  },
  mutations: {
    setReportFormatsList(state, payload) {
      state.reportFormatsList.push(payload)
    },
    setReportViewsList(state, payload) {
      state.reportViewsList.push(payload)
    },
    setDrillTablesList(state, payload) {
      state.drillTablesList.push(payload)
    }
  },
  actions: {
    requestPrintFormats({ commit }, parameters) {
      return requestPrintFormats({ processUuid: parameters.processUuid })
        .then(response => {
          const printFormatList = response.getPrintformatsList().map(printFormat => {
            return {
              uuid: printFormat.getUuid(),
              name: printFormat.getName(),
              description: printFormat.getDescription(),
              isDefault: printFormat.getIsdefault(),
              type: 'updateReport',
              option: 'printFormat'
            }
          })
          commit('setReportFormatsList', {
            containerUuid: parameters.processUuid,
            printFormatList: printFormatList
          })
          return printFormatList
        })
        .catch(error => {
          console.error(error)
        })
    },
    requestReportViews({ commit }, parameters) {
      return requestReportViews({ processUuid: parameters.processUuid })
        .then(response => {
          const reportViewList = response.getReportviewsList().map(reportView => {
            return {
              uuid: reportView.getUuid(),
              name: reportView.getName(),
              tableName: reportView.getTablename(),
              description: reportView.getDescription(),
              type: 'updateReport',
              option: 'reportView'
            }
          })
          commit('setReportViewsList', {
            containerUuid: parameters.processUuid,
            viewList: reportViewList
          })
          return reportViewList
        })
        .catch(error => {
          console.error(error)
        })
    },
    requestDrillTables({ commit }, parameters) {
      return requestDrillTables(parameters.tableName)
        .then(response => {
          const drillTablesList = response.getDrilltablesList().map(drillTable => {
            return {
              name: drillTable.getPrintname(),
              tableName: drillTable.getTablename(),
              type: 'updateReport',
              option: 'drillTable'
            }
          })
          commit('setDrillTablesList', {
            containerUuid: parameters.processUuid,
            drillTablesList: drillTablesList
          })
          return drillTablesList
        })
        .catch(error => {
          console.error(error)
        })
    },
    getReportOutputFromServer({ commit }, parameters) {
      return getReportOutput({ criteria: parameters.criteria, printFormatUuid: parameters.printFormatUuid, reportViewUuid: parameters.reportViewUuid, isSummary: parameters.isSummary, reportName: parameters.reportName, reportType: parameters.reportType })
        .then(response => {
          console.log('store', response)
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  getters: {
    getPrintFormatList: (state) => (containerUuid) => {
      var printFormatList = state.reportFormatsList.find(list => list.containerUuid === containerUuid)
      if (printFormatList) {
        return printFormatList.printFormatList
      }
      return []
    },
    getReportViewList: (state) => (containerUuid) => {
      var reportViewList = state.reportViewsList.find(list => list.containerUuid === containerUuid)
      if (reportViewList) {
        return reportViewList.viewList
      }
      return []
    },
    getDrillTablesList: (state) => (containerUuid) => {
      var drillTablesList = state.drillTablesList.find(list => list.containerUuid === containerUuid)
      if (drillTablesList) {
        return drillTablesList.viewList
      }
      return []
    }
  }
}

export default contextMenu
