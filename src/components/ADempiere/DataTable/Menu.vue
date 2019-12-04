<template>
  <el-menu :default-active="menuTable" :class="classTableMenu + ' menu-table-container'" mode="horizontal" @select="typeFormat">
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-more" />
      </template>
      <el-menu-item
        v-if="!isParent && isPanelWindow"
        :disabled="isDisabledAddNew"
        @click="addNewRow()"
      >
        {{ $t('window.newRecord') }}
      </el-menu-item>
      <el-menu-item
        v-if="isPanelWindow"
        :disabled="Boolean(getDataSelection.length < 1 || (isReadOnlyParent && !isParent))"
        @click="deleteSelection()"
      >
        {{ $t('table.dataTable.deleteSelection') }}
      </el-menu-item>
      <el-menu-item
        v-for="(process, key) in isProcessMenu"
        v-show="isPanelWindow && isProcessMenu"
        :key="key"
        :disabled="Boolean(getDataSelection.length < 1)"
        index="process"
        @click="tableProcess(process)"
      >
        {{ process.name }}
      </el-menu-item>
      <el-submenu
        :disabled="Boolean(getDataSelection.length < 1)"
        index="xlsx"
      >
        <template slot="title">{{ $t('table.dataTable.exportRecordTable') }}</template>
        <template v-for="(format, index) in option">
          <el-menu-item :key="index" :index="index">
            {{ format }}
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item index="optional" @click="optionalPanel()">
        {{ $t('components.filterableItems') }}
      </el-menu-item>
      <el-menu-item index="mandatory" @click="showOnlyMandatoryColumns()">
        {{ $t('table.dataTable.showOnlyMandatoryColumns') }}
      </el-menu-item>
      <el-menu-item index="available" @click="showAllAvailableColumns()">
        {{ $t('table.dataTable.showAllAvailableColumns') }}
      </el-menu-item>
      <el-menu-item
        v-if="['browser', 'window'].includes(panelType)"
        @click="showTotals()"
      >
        {{ getterPanel.isShowedTotals ? $t('table.dataTable.hiddenTotal') : $t('table.dataTable.showTotal') }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import { supportedTypes, exportFileFromJson } from '@/utils/ADempiere/exportUtil'

export default {
  name: 'TableMenu',
  props: {
    parentUuid: {
      type: String,
      default: undefined
    },
    containerUuid: {
      type: String,
      required: true
    },
    panelType: {
      type: String,
      default: 'window'
    },
    isOption: {
      type: Object,
      default: () => {}
    },
    isParent: {
      type: Boolean,
      default: false
    },
    isProcessMenu: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      option: supportedTypes,
      typoFormatExport: [],
      menuTable: '1',
      isCollapse: true,
      visible: false
    }
  },
  computed: {
    isProcessTable() {
      if (this.isProcessMenu) {
        return true
      }
      return false
    },
    isMobile() {
      return this.$store.state.app.device === 'mobile'
    },
    classTableMenu() {
      if (this.isMobile) {
        return 'menu-table-mobile'
      } else if (this.$store.state.app.sidebar.opened) {
        return 'menu-table'
      }
      return 'menu-table'
    },
    getterPanel() {
      return this.$store.getters.getPanel(this.containerUuid)
    },
    getterDataRecordsAndSelection() {
      return this.$store.getters.getDataRecordAndSelection(this.containerUuid)
    },
    getterRecordCount() {
      return this.getterDataRecordsAndSelection.recordCount
    },
    getterDataRecords() {
      return this.getterDataRecordsAndSelection.record
    },
    getterNewRecords() {
      if (this.isPanelWindow && !this.isParent) {
        var newRecordTable = this.getterDataRecordsAndSelection.record.filter(recordItem => {
          return recordItem.isNew
        })
        return newRecordTable.length
      }
      return 0
    },
    getDataSelection() {
      return this.getterDataRecordsAndSelection.selection
    },
    fieldList() {
      if (this.getterPanel && this.getterPanel.fieldList) {
        return this.sortFields(
          this.getterPanel.fieldList,
          this.panelType !== 'browser' ? 'seqNoGrid' : 'sequence'
        )
      }
      return []
    },
    isPanelWindow() {
      return Boolean(this.panelType === 'window')
    },
    isReadOnlyParent() {
      if (this.isPanelWindow) {
        if (this.$store.getters.getContextIsActive(this.parentUuid) === false) {
          return true
        }
        if (this.$store.getters.getContextProcessing(this.parentUuid) === true ||
          this.$store.getters.getContextProcessing(this.parentUuid) === 'Y') {
          return true
        }
        if (this.$store.getters.getContextProcessed(this.parentUuid)) {
          return true
        }
      }
      return false
    },
    isDisabledAddNew() {
      if (this.isParent) {
        return true
      }
      if (this.$route.query.action === 'create-new') {
        return true
      }
      if (!this.getterPanel.isInsertRecord) {
        return true
      }
      if (this.isReadOnlyParent) {
        return true
      }
      if (this.getterNewRecords) {
        return true
      }
      return false
    },
    getterFieldList() {
      return this.$store.getters.getFieldsListFromPanel(this.containerUuid)
    },
    getterFieldListHeader() {
      var header = this.getterFieldList.filter(fieldItem => {
        const isDisplayed = fieldItem.isDisplayed || fieldItem.isDisplayedFromLogic
        if (fieldItem.isActive && isDisplayed && !fieldItem.isKey) {
          return fieldItem.name
        }
      })
      return header.map(fieldItem => {
        return fieldItem.name
      })
    },
    getterFieldListValue() {
      var value = this.getterFieldList.filter(fieldItem => {
        const isDisplayed = fieldItem.isDisplayed || fieldItem.isDisplayedFromLogic
        if (fieldItem.isActive && isDisplayed && !fieldItem.isKey) {
          return fieldItem
        }
      })
      return value.map(fieldItem => {
        if (fieldItem.componentPath === 'FieldSelect') {
          return 'DisplayColumn_' + fieldItem.columnName
        } else {
          return fieldItem.columnName
        }
      })
    },
    gettersRecordContextMenu() {
      var record = []
      var recordTable = this.isOption
      record.push(recordTable)
      return record
    }
  },
  methods: {
    showModal(process) {
      var processData = this.$store.getters.getProcess(process.uuid)
      console.log(processData, process)
      const selection = this.getDataSelection[0]
      var valueProcess
      for (const element in selection) {
        if (element === this.getterPanel.keyColumn) {
          valueProcess = selection[element]
        }
      }
      this.$store.dispatch('setProcessTable', {
        valueRecord: valueProcess,
        tableName: this.getterPanel.keyColumn,
        processTable: true
      })
      if (this.getDataSelection.length <= 1) {
        if (processData === undefined) {
          this.$store.dispatch('getProcessFromServer', {
            containerUuid: process.uuid,
            routeToDelete: this.$route
          })
            .then(response => {
              this.$store.dispatch('setShowDialog', {
                type: process.type,
                action: response,
                record: this.getDataSelection
              })
            }).catch(error => {
              console.warn('ContextMenu: Dictionary Process (State) - Error ' + error.code + ': ' + error.message)
            })
        } else {
          this.$store.dispatch('setShowDialog', { type: process.type, action: processData })
        }
      } else {
        this.showNotification({
          type: 'warning',
          title: this.$t('notifications.selectionProcess'),
          message: this.$t('notifications.selectedQuantity') + ' ' + this.getDataSelection.length
        })
      }
    },
    tableProcess(process) {
      this.showModal(process)
    },
    showTotals() {
      this.$store.dispatch('showedTotals', this.containerUuid)
    },
    showOnlyMandatoryColumns() {
      this.$store.dispatch('showOnlyMandatoryColumns', {
        containerUuid: this.containerUuid
      })
    },
    showAllAvailableColumns() {
      this.$store.dispatch('showAllAvailableColumns', {
        containerUuid: this.containerUuid
      })
    },
    deleteSelection() {
      this.$store.dispatch('deleteSelectionDataList', {
        parentUuid: this.parentUuid,
        containerUuid: this.containerUuid
      })
      this.$store.dispatch('setRecordSelection', {
        parentUuid: this.parentUuid,
        containerUuid: this.containerUuid,
        panelType: this.panelType
      })
    },
    addNewRow() {
      if (this.getterNewRecords <= 0) {
        this.$store.dispatch('addNewRow', {
          parentUuid: this.parentUuid,
          containerUuid: this.containerUuid,
          fieldList: this.fieldList,
          isEdit: true,
          isSendServer: false
        })
      } else {
        const fieldsEmpty = this.$store.getters.getFieldListEmptyMandatory({ containerUuid: this.containerUuid })
        this.$message({
          message: this.$t('notifications.mandatoryFieldMissing') + fieldsEmpty,
          type: 'info'
        })
      }
    },
    optionalPanel() {
      this.showTableSearch = false
      this.isOptional = !this.isOptional
    },
    fixedPanel() {
      this.showTableSearch = false
      this.isFixed = !this.isFixed
    },
    typeFormat(key, keyPath) {
      Object.keys(supportedTypes).forEach(type => {
        if (type === key) {
          this.exporRecordTable(key)
        }
      })
    },
    exporRecordTable(key) {
      const Header = this.getterFieldListHeader
      const filterVal = this.getterFieldListValue
      const list = this.getDataSelection
      const data = this.formatJson(filterVal, list)
      exportFileFromJson({
        header: Header,
        data,
        filename: '',
        exportType: key
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style>
.el-menu--vertical .nest-menu .el-submenu>.el-submenu__title:hover, .el-menu--vertical .el-menu-item:hover {
  background-color: #ffffff !important;
  background: #ffffff !important;
}
.el-menu--collapse {
  width: auto;
}
.el-menu-item:hover {
  background-color: #ffffff !important
}
.hover {
  background-color: initial !important;
}
.el-menu-item {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    -webkit-transition: border-color .3s, background-color .3s, color .3s;
    transition: border-color .3s, background-color .3s, color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
}
</style>
