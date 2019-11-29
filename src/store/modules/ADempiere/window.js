import {
  getWindow as getWindowMetadata,
  getTab as getTabMetadata
} from '@/api/ADempiere/dictionary'
import { convertContextInfoFromGRPC, convertField, getFieldTemplate, showMessage } from '@/utils/ADempiere'
import language from '@/lang'
import router from '@/router'

const window = {
  state: {
    window: [],
    windowIndex: 0
  },
  mutations: {
    addWindow(state, payload) {
      state.window.push(payload)
      state.windowIndex++
    },
    dictionaryResetCacheWindow(state) {
      state.window = []
      state.windowIndex = 0
    },
    changeShowedDetailWindow(state, payload) {
      payload.window.isShowedDetail = payload.changeShowedDetail
    },
    changeShowedRecordWindow(state, payload) {
      payload.window.isShowedRecordNavigation = payload.isShowedRecordNavigation
    },
    setCurrentTab(state, payload) {
      payload.window.currentTabUuid = payload.tabUuid
    },
    setTabIsLoadField(state, payload) {
      payload.tab.isLoadFieldList = payload.isLoadFieldList
    }
  },
  actions: {
    getWindowFromServer({ commit, state, dispatch }, params) {
      return getWindowMetadata(params.windowUuid)
        .then(response => {
          let newWindow = {
            id: response.getId(),
            uuid: params.windowUuid,
            name: response.getName(),
            contextInfo: convertContextInfoFromGRPC(response.getContextinfo()),
            windowType: response.getWindowtype(),
            isShowedRecordNavigation: undefined,
            firstTabUuid: response.getTabsList()[0].getUuid()
          }
          let tabs = response.getTabsList()
          const firstTab = tabs[0].getTablename()
          const childrenTabs = []
          const parentTabs = []

          const tabsSequence = []
          tabs = tabs.filter(itemTab => {
            if (itemTab.getIssorttab()) {
              // TODO: Add convert tab function
              tabsSequence.push({
                uuid: itemTab.getUuid(),
                id: itemTab.getId(),
                parentUuid: params.windowUuid,
                containerUuid: itemTab.getUuid(),
                parentTabUuid: itemTab.getParenttabuuid(),
                panelType: 'window',
                type: 'sequence',
                isSortTab: itemTab.getIssorttab(),
                name: itemTab.getName(),
                description: itemTab.getDescription(),
                tableName: itemTab.getTablename(),
                sortOrderColumnName: itemTab.getSortordercolumnname(), // order column
                sortYesNoColumnName: itemTab.getSortyesnocolumnname() // included column
              })
            }
            // TODO: Add support to isAdvancedTab, isTranslationTab and isHasTree
            return !itemTab.getIstranslationtab()
          })

          tabs = tabs.map((tabItem, index) => {
            const group = {
              groupName: '',
              groupType: ''
            }
            if (tabItem.getFieldgroup()) {
              group.groupName = tabItem.getFieldgroup().getName()
              group.groupType = tabItem.getFieldgroup().getFieldgrouptype()
            }

            const tab = {
              id: tabItem.getId(),
              uuid: tabItem.getUuid(),
              containerUuid: tabItem.getUuid(),
              parentUuid: params.windowUuid,
              windowUuid: params.windowUuid,
              name: tabItem.getName(),
              tabGroup: group,
              firstTabUuid: newWindow.firstTabUuid,
              //
              displayLogic: tabItem.getDisplaylogic(),
              isView: tabItem.getIsview(),
              isDocument: tabItem.getIsdocument(),
              isInsertRecord: tabItem.getIsinsertrecord(),
              // sort and sequence
              isSortTab: tabItem.getIssorttab(),
              sortOrderColumnName: tabItem.getSortordercolumnname(),
              sortYesNoColumnName: tabItem.getSortyesnocolumnname(),
              sequence: tabItem.getSequence(),
              // relations
              isParentTab: Boolean(firstTab === tabItem.getTablename()),
              tabLevel: tabItem.getTablevel(),
              parentTabUuid: tabItem.getParenttabuuid(),
              linkColumnName: tabItem.getLinkcolumnname(),
              parentColumnName: tabItem.getParentcolumnname(),
              //
              contextInfo: convertContextInfoFromGRPC(
                tabItem.getContextinfo()
              ),
              isActive: tabItem.getIsactive(),
              isAdvancedTab: tabItem.getIsadvancedtab(),
              isHasTree: tabItem.getIshastree(),
              isInfoTab: tabItem.getIsinfotab(),
              isTranslationTab: tabItem.getIstranslationtab(),
              isReadOnly: tabItem.getIsreadonly(),
              isDeleteable: tabItem.getIsdeleteable(),
              accessLevel: tabItem.getAccesslevel(),
              isSingleRow: tabItem.getIssinglerow(),
              // conditionals
              commitWarning: tabItem.getCommitwarning(),
              // query db
              tableName: tabItem.getTablename(),
              query: tabItem.getQuery(),
              whereClause: tabItem.getWhereclause(),
              orderByClause: tabItem.getOrderbyclause(),
              isChangeLog: tabItem.getIschangelog(),
              // app properties
              isAssociatedTabSequence: false, // show modal with order tab
              isShowedRecordNavigation: !(tabItem.getIssinglerow()),
              isLoadFieldList: false,
              index: index
            }

            // Convert from gRPC process list
            // action is dispatch used in vuex
            let actions = []
            actions.push({
              // action to set default values and enable fields not isUpdateable
              name: language.t('window.newRecord'),
              processName: language.t('window.newRecord'),
              type: 'dataAction',
              action: 'resetPanelToNew',
              uuidParent: newWindow.uuid,
              disabled: !tab.isInsertRecord || tab.isReadOnly
            }, {
              // action to delete record selected
              name: language.t('window.deleteRecord'),
              processName: language.t('window.deleteRecord'),
              type: 'dataAction',
              action: 'deleteEntity',
              uuidParent: newWindow.uuid,
              disabled: tab.isReadOnly
            }, {
              // action to undo create, update, delete record
              name: language.t('data.undo'),
              processName: language.t('data.undo'),
              type: 'dataAction',
              action: 'undoModifyData',
              uuidParent: newWindow.uuid,
              disabled: false
            })
            const processList = tabItem.getProcessesList().map(processItem => {
              return {
                name: processItem.getName(),
                type: 'process',
                uuid: processItem.getUuid(),
                containerUuid: processItem.getUuid(),
                description: processItem.getDescription(),
                help: processItem.getHelp(),
                isReport: processItem.getIsreport(),
                accessLevel: processItem.getAccesslevel(),
                showHelp: processItem.getShowhelp(),
                isDirectPrint: processItem.getIsdirectprint()
              }
            })
            actions = actions.concat(processList)

            if (tab.isSortTab) {
              const tabParent = tabs.find(itemTab => itemTab.getTablename() === tab.tableName && !itemTab.getIssorttab())
              if (tabParent) {
                tab.tabAssociatedUuid = tabParent.getUuid() // tab source
                tab.tabAssociatedName = tabParent.getName() // tab source
              }

              console.log(tab.name, tabParent, tabs)
            } else {
              let orderTabs = tabsSequence.filter(itemTab => itemTab.tableName === tab.tableName)
              if (orderTabs.length) {
                orderTabs = orderTabs.map(itemTab => {
                  return {
                    ...itemTab,
                    // appication attributes
                    tabAssociatedUuid: tab.uuid, // tab source
                    tabAssociatedName: tab.name, // tab source
                    action: 'orderSequence',
                    type: 'application'
                  }
                })
                actions = actions.concat(orderTabs)
                tab.isAssociatedTabSequence = true
                tab.tabsOrder = orderTabs
              }
            }

            //  Add process menu
            dispatch('setContextMenu', {
              containerUuid: tab.uuid,
              relations: [],
              actions: actions,
              references: []
            })

            if (tab.isParentTab) {
              parentTabs.push(tab)
            } else {
              childrenTabs.push(tab)
            }
            return tab
          })

          var tabProperties = {
            tabsList: tabs,
            currentTab: parentTabs[0],
            tabsListParent: parentTabs,
            tabsListChildren: childrenTabs,
            // app attributes
            isShowedDetail: Boolean(childrenTabs.length),
            currentTabUuid: parentTabs[0].uuid
          }

          newWindow = {
            ...newWindow,
            ...tabProperties,
            windowIndex: state.windowIndex + 1
          }
          commit('addWindow', newWindow)
          return newWindow
        })
        .catch(error => {
          router.push({ path: '/dashboard' })
          dispatch('tagsView/delView', params.routeToDelete)
          showMessage({
            message: language.t('login.unexpectedError'),
            type: 'error'
          })
          console.warn('Dictionary Window (State Window) - Error ' + error.code + ': ' + error.message)
        })
    },
    getTabAndFieldFromServer({ dispatch, getters }, {
      parentUuid,
      containerUuid,
      panelType = 'window',
      isAdvancedQuery = false
    }) {
      return getTabMetadata(containerUuid)
        .then(response => {
          const additionalAttributes = {
            parentUuid: parentUuid,
            containerUuid: containerUuid,
            isShowedFromUser: true,
            panelType: panelType,
            tableName: response.getTablename(),
            //
            isReadOnlyFromForm: false,
            isAdvancedQuery: isAdvancedQuery
          }

          let fieldUuidsequence = 0
          let fieldLinkColumnName
          //  Convert from gRPC
          const fieldsList = response.getFieldsList().map((item, index) => {
            item = convertField(item, {
              ...additionalAttributes,
              fieldListIndex: index
            })
            if (item.sequence > fieldUuidsequence) {
              fieldUuidsequence = item.sequence
            }

            if (item.isParent) {
              fieldLinkColumnName = item.columnName
            }

            return item
          })

          //  Get dependent fields
          fieldsList
            .filter(field => field.parentFieldsList && field.isActive)
            .forEach((field, index, list) => {
              field.parentFieldsList.forEach(parentColumnName => {
                var parentField = list.find(parentField => {
                  return parentField.columnName === parentColumnName && parentColumnName !== field.columnName
                })
                if (parentField) {
                  parentField.dependentFieldsList.push(field.columnName)
                }
              })
            })

          if (!fieldsList.find(field => field.columnName === 'UUID')) {
            var attributesOverwrite = {
              panelType: panelType,
              sequence: (fieldUuidsequence + 10),
              name: 'UUID',
              columnName: 'UUID',
              isAdvancedQuery: isAdvancedQuery,
              componentPath: 'FieldText'
            }
            var field = getFieldTemplate(attributesOverwrite)
            fieldsList.push(field)
          }

          //  Panel for save on store
          const panel = {
            ...getters.getTab(parentUuid, containerUuid),
            isAdvancedQuery: isAdvancedQuery,
            fieldLinkColumnName: fieldLinkColumnName,
            fieldList: fieldsList,
            panelType: panelType
          }

          dispatch('addPanel', panel)
          dispatch('setTabIsLoadField', {
            parentUuid: parentUuid,
            containerUuid: containerUuid
          })
          return panel
        })
        .catch(error => {
          showMessage({
            message: language.t('login.unexpectedError'),
            type: 'error'
          })
          console.warn('Dictionary Tab (State Window) - Error ' + error.code + ': ' + error.message)
        })
    },
    changeShowedDetailWindow({ commit, state }, params) {
      var window = state.window.find(itemWindow => {
        return itemWindow.uuid === params.containerUuid
      })
      commit('changeShowedDetailWindow', {
        window: window,
        changeShowedDetail: params.isShowedDetail
      })
    },
    changeShowedRecordWindow({ commit, state }, params) {
      var window = state.window.find(itemWindow => {
        return itemWindow.uuid === params.parentUuid
      })
      commit('changeShowedRecordWindow', {
        window: window,
        isShowedRecordNavigation: params.isShowedRecordNavigation
      })
    },
    /**
     * @param {string} parameters.parentUuid
     * @param {string} parameters.containerUuid
     */
    setCurrentTab({ commit, getters }, parameters) {
      commit('setCurrentTab', {
        window: getters.getWindow(parameters.parentUuid),
        tabUuid: parameters.containerUuid
      })
    },
    setTabIsLoadField({ commit, getters }, { parentUuid, containerUuid }) {
      const tab = getters.getTab(parentUuid, containerUuid)
      commit('setTabIsLoadField', {
        tab: tab,
        isLoadFieldList: true
      })
    }
  },
  getters: {
    getWindow: (state) => (windowUuid) => {
      return state.window.find(
        item => item.uuid === windowUuid
      )
    },
    getIsShowedRecordNavigation: (state, getters) => (windowUuid) => {
      const window = getters.getWindow(windowUuid)
      if (window) {
        return window.isShowedRecordNavigation
      }
      return window
    },
    getTab: (state, getters) => (windowUuid, tabUuid) => {
      const window = getters.getWindow(windowUuid)
      if (window) {
        return window.tabsList.find(tabItem => {
          return tabItem.uuid === tabUuid
        })
      }
      return window
    },
    getCurrentTab: (state, getters) => (windowUuid) => {
      const window = getters.getWindow(windowUuid)
      if (window) {
        return window.tabsList.find(tabItem => {
          return tabItem.uuid === window.currentTabUuid
        })
      }
      return {
        isInsertRecord: false
      }
    },
    getTabIsLoadField: (state, getters) => (windowUuid, tabUuid) => {
      const tab = getters.getTab(windowUuid, tabUuid)
      if (tab) {
        return tab.isLoadFieldList
      }
      return tab
    },
    getTableNameFromTab: (state, getters) => (windowUuid, tabUuid) => {
      return getters.getTab(windowUuid, tabUuid).tableName
    }
  }
}

export default window
