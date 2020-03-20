<template>
  <el-container v-if="isLoaded" key="browser-loaded" class="view-base" style="height: 86vh;">
    <el-header>
      <context-menu
        :menu-parent-uuid="$route.meta.parentUuid"
        :container-uuid="browserUuid"
        :panel-type="panelType"
      />
      <div class="w-33">
        <div class="center">
          <el-button
            v-if="isEmptyValue(browserMetadata.help)"
            slot="reference"
            type="text"
            :class="cssClassTitle + ' warn-content text-center'"
          >
            {{ browserMetadata.name }}
          </el-button>
        </div>
      </div>
      <el-popover
        v-if="!isEmptyValue(browserMetadata.name)"
        placement="top-start"
        :title="browserMetadata.name"
        :class="cssClassHelp"
        trigger="hover"
      >
        <div v-html="browserMetadata.help" />
        <div class="w-33">
          <div class="center">
            <el-button
              v-if="isEmptyValue(browserMetadata.help)"
              slot="reference"
              type="text"
              :class="cssClassTitle + 'warn-content text-center'"
            >
              {{ browserMetadata.name }}
            </el-button>
          </div>
        </div>
      </el-popover>
    </el-header>
    <el-main>
      <Split :style="infoTab ? 'overflow: auto' : 'overflow: hidden'" :gutter-size="infoTab ? 8 : 0">
        <SplitArea :size="sisePanel" direction="vertical">
          <el-collapse v-model="activeSearch" class="container-collasep-open" @change="handleChange">
            <el-collapse-item :title="$t('views.searchCriteria')" name="opened-criteria">
              <main-panel
                :container-uuid="browserUuid"
                :metadata="browserMetadata"
                :panel-type="panelType"
              />
            </el-collapse-item>
          </el-collapse>
          <div style="position: inherit;display: -webkit-box;margin-top: 8px;">
            <data-table
              v-if="isLoaded"
              :container-uuid="browserUuid"
              :panel-type="panelType"
              :metadata="browserMetadata"
            />
            <el-button type="info" icon="el-icon-s-tools" circle style="position: absolute;top: 51%;" class="el-button-window" @click="ShowPanelInfo" />
          </div>
        </SplitArea>
        <SplitArea :size="infoTab ? 50 : 2">
          <el-card v-if="infoTab" class="box-card">
            <tab-info
              :panel-uuid="browserUuid"
              :panel-type="panelType"
              :record="recordsRun"
              :is-process-browser="getContainerIsReadyForSubmit"
            />
          </el-card>
        </SplitArea>
      </Split>
    </el-main>
  </el-container>
  <div
    v-else
    key="browser-loading"
    v-loading="!isLoaded"
    :element-loading-text="$t('notifications.loading')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    class="loading-browser"
  />
</template>

<script>
// When supporting the processes, smart browser and reports,
// the ContextMenu and sticky must be placed in the layout
import ContextMenu from '@/components/ADempiere/ContextMenu'
import MainPanel from '@/components/ADempiere/Panel'
import DataTable from '@/components/ADempiere/DataTable'
// import ModalDialog from '@/components/ADempiere/Dialog'
import TabInfo from '@/components/ADempiere/ContainerInfo'

export default {
  name: 'BrowserView',
  components: {
    MainPanel,
    DataTable,
    ContextMenu,
    // ModalDialog,
    TabInfo
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
      panelType: 'browser',
      infoTab: false
    }
  },
  computed: {
    getterBrowser() {
      return this.$store.getters.getBrowser(this.browserUuid)
    },
    getDataRecords() {
      return this.$store.getters.getDataRecordsList(this.browserUuid)
    },
    getContainerIsReadyForSubmit() {
      return !this.$store.getters.isNotReadyForSubmit(this.browserUuid) && !this.browserMetadata.awaitForValuesToQuery
    },
    isMobile() {
      return this.$store.state.app.device === 'mobile'
    },
    cssClassTitle() {
      if (this.isMobile) {
        return 'title-mobile'
      }
      return 'title'
    },
    cssClassHelp() {
      if (this.isMobile) {
        return 'content-help-mobile'
      }
      return 'content-help'
    },
    isShowedCriteria() {
      if (this.getterBrowser) {
        return this.getterBrowser.isShowedCriteria
      }
      return false
    },
    recordsRun() {
      const record = this.$store.getters.getDataRecordAndSelection(this.browserUuid).selection
      if (!this.isEmptyValue(record)) {
        return record
      }
      return []
    },
    sisePanel() {
      if (this.infoTab) {
        return 50
      }
      return 99
    }
  },
  watch: {
    isShowedCriteria(value) {
      const activeSearch = []
      if (value) {
        activeSearch.push('opened-criteria')
      }
      this.activeSearch = activeSearch
    }
  },
  created() {
    this.getBrowser()
  },
  methods: {
    ShowPanelInfo() {
      this.infoTab = !this.infoTab
    },
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
    getBrowser() {
      if (this.getterBrowser) {
        this.browserMetadata = this.getterBrowser
        this.isLoaded = true
        this.defaultSearch()
        return
      }
      this.$store.dispatch('getPanelAndFields', {
        containerUuid: this.browserUuid,
        panelType: this.panelType,
        routeToDelete: this.$route
      })
        .then(() => {
          this.browserMetadata = this.getterBrowser
          this.defaultSearch()
        })
        .finally(() => {
          this.isLoaded = true
        })
    },
    defaultSearch() {
      // open or closed show criteria
      this.activeSearch = []
      if (this.browserMetadata.isShowedCriteria) {
        this.activeSearch = ['opened-criteria']
      }

      if (this.getDataRecords.length <= 0) {
        if (this.getContainerIsReadyForSubmit) {
          this.$store.dispatch('getBrowserSearch', {
            containerUuid: this.browserUuid
          })
        } else {
          this.$store.dispatch('setRecordSelection', {
            containerUuid: this.browserUuid,
            panelType: this.panelType
          })
        }
      }
    }
  }
}
</script>

<style>
  .el-collapse-item__header:hover {
    background-color: #fcfcfc;
  }
  .el-button-window {
    cursor: pointer;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-color: #DCDFE6;
    color: white;
    background: #008fd3;
  }
  .center{
    text-align: center;
  }
  .w-33 {
    width: 100%;
    background-color: transparent;
  }
</style>
<style scoped>
  .view-base {
    height: 100%;
    min-height: calc(100vh - 84px);
  }

  .loading-browser {
    padding: 100px 100px;
    height: 100%;
  }

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
  .title {
    color: #000000;
    text-size-adjust: 20px;
    font-size: 100%;
    font-weight: 605!important;
    /* left: 50%; */
  }
  .title-mobile {
    text-align: center;
    color: #000000;
    text-size-adjust: 20px;
    font-size: 100%;
    font-weight: 605!important;
    /* left: 50%; */
  }
  .content-help {
    width: 100%;
    height: 200%;
    padding-left: 15px !important;
  }
  .content-help-mobile {
    width: 50%;
    height: 50%;
    padding-left: 15px !important;
  }
  .center{
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
