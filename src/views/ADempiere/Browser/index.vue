<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com www.erpya.com
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https:www.gnu.org/licenses/>.
-->
<template>
  <el-container
    v-if="isLoaded"
    key="browser-loaded"
    class="view-base"
    style="height: 86vh;"
  >
    <modal-dialog
      :parent-uuid="browserMetadata.uuid"
      :container-uuid="browserUuid"
      :panel-type="panelType"
    />
    <el-header
      v-if="showContextMenu"
    >
      <context-menu
        :menu-parent-uuid="$route.meta.parentUuid"
        :container-uuid="browserUuid"
        :panel-type="panelType"
      />
      <div class="w-33">
        <div class="center">
          <title-and-help
            :name="browserMetadata.name"
            :help="browserMetadata.help"
          />
        </div>
      </div>
    </el-header>

    <el-main>

      <el-collapse
        v-model="activeSearch"
        class="container-collasep-open"
        @change="handleChange"
      >
        <el-collapse-item :title="$t('views.searchCriteria')" name="opened-criteria">
          <main-panel
            :container-uuid="browserUuid"
            :metadata="browserMetadata"
            :panel-type="panelType"
          />
        </el-collapse-item>
      </el-collapse>
      <data-table
        v-if="isLoaded"
        :container-uuid="browserUuid"
        :panel-type="panelType"
        :metadata="browserMetadata"
      />
    </el-main>
  </el-container>

  <div
    v-else
    key="browser-loading"
    v-loading="!isLoaded"
    :element-loading-text="$t('notifications.loading')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    class="view-loading"
  />
</template>

<script>
// When supporting the processes, smart browser and reports,
// the ContextMenu and sticky must be placed in the layout
import ContextMenu from '@/components/ADempiere/ContextMenu'
import MainPanel from '@/components/ADempiere/Panel'
import DataTable from '@/components/ADempiere/DataTable'
import ModalDialog from '@/components/ADempiere/Dialog'
import TitleAndHelp from '@/components/ADempiere/TitleAndHelp'

export default {
  name: 'BrowserView',
  components: {
    MainPanel,
    DataTable,
    ContextMenu,
    ModalDialog,
    TitleAndHelp
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      browserMetadata: {},
      browserUuid: this.$route.meta.uuid,
      activeSearch: [],
      isLoaded: false,
      panelType: 'browser'
    }
  },
  computed: {
    showContextMenu() {
      return this.$store.state.settings.showContextMenu
    },
    getterBrowser() {
      return this.$store.getters.getBrowser(this.browserUuid)
    },
    isLoadedRecords() {
      return this.$store.getters.getDataRecordAndSelection(this.browserUuid).isLoaded
    },
    isReadyToSearch() {
      if (this.browserMetadata.awaitForValuesToQuery) {
        return false
      }
      return !this.$store.getters.isNotReadyForSubmit(this.browserUuid)
    },
    isShowedCriteria() {
      if (this.browserMetadata) {
        return this.browserMetadata.isShowedCriteria
      }
      return false
    }
  },
  watch: {
    isShowedCriteria(value) {
      this.handleCollapse(value)
    }
  },
  created() {
    this.getBrowser()
    this.$store.dispatch('settings/changeSetting', {
      key: 'showContextMenu',
      value: true
    })
  },
  methods: {
    handleChange(value) {
      let showCriteria = false
      if (this.activeSearch.length) {
        showCriteria = true
      }
      this.$store.dispatch('changeBrowserAttribute', {
        containerUuid: this.browserUuid,
        attributeName: 'isShowedCriteria',
        attributeValue: showCriteria
      })
    },
    /**
     * Manage open or closed component collapse of criteria
     */
    handleCollapse(isShowedCriteria) {
      // by default criteria if closed
      const activeSearch = []
      if (isShowedCriteria) {
        // open criteria
        activeSearch.push('opened-criteria')
      }
      this.activeSearch = activeSearch
    },
    getBrowser() {
      const browser = this.getterBrowser
      if (browser) {
        this.browserMetadata = browser
        this.isLoaded = true
        this.defaultSearch()
        return
      }
      this.$store.dispatch('getPanelAndFields', {
        containerUuid: this.browserUuid,
        panelType: this.panelType,
        routeToDelete: this.$route
      })
        .then(browserResponse => {
          this.browserMetadata = browserResponse
          this.handleCollapse(browserResponse.isShowedCriteria)
          this.defaultSearch()
        })
        .finally(() => {
          this.isLoaded = true
        })
    },
    defaultSearch() {
      if (this.isLoadedRecords) {
        // not research
        return
      }

      if (this.isReadyToSearch) {
        // first search by default
        this.$store.dispatch('getBrowserSearch', {
          containerUuid: this.browserUuid
        })
        return
      }

      // set default values into data
      this.$store.dispatch('setRecordSelection', {
        containerUuid: this.browserUuid,
        panelType: this.panelType
      })
    }
  }
}
</script>

<style>
  .el-collapse-item__header:hover {
    background-color: #fcfcfc;
  }
</style>
<style scoped>
  .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 0px;
    padding-right: 20px;
    padding-top: 0px;
    padding-left: 20px;
  }
  .el-header {
    height: 50px;
  }
  .containert {
    padding-left: 20px;
    padding-right: 20px;
    width: 50%;
  }
  .menu {
    height: 40px;
  }
  .center {
    text-align: center;
  }
  .w-33 {
    width: 100%;
    background-color: transparent;
  }
  .container-panel {
    bottom: 0;
    right: 0;
    z-index: 0;
    transition: width 0.28s;
    border: 1px solid #e5e9f2;
  }
  .container-panel-open {
    bottom: 0;
    right: 0;
    border: 1px solid #e5e9f2;
    height: -webkit-fill-available;
    height:-webkit-calc(100% - 100px);
    z-index: 0;
    transition: width 0.28s;
  }
  .container-collasep-open {
    bottom: 0;
    right: 0;
    z-index: 0;
    transition: width 0.28s;
  }
</style>
