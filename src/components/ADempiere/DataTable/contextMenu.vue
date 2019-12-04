<template>
  <el-menu :collapse="isCollapse" class="el-menu-demo" @select="typeFormat">
    <el-submenu
      index="xlsx"
    >
      <template
        slot="title"
      >
        {{ $t('components.contextMennuWindowReport') }}
      </template>
      <template v-for="(format, index) in option">
        <el-menu-item
          :key="index"
          :index="index"
        >
          {{ format }}
        </el-menu-item>
      </template>
    </el-submenu>
    <el-menu-item
      index="eliminar"
      @click="deleteRecord()"
    >
      {{ $t('window.deleteRecord') }}
    </el-menu-item>
    <el-menu-item
      v-for="(process, key) in isProcessMenu"
      :key="key"
      index="process"
      @click="tableProcess(process)"
    >
      {{ process.name }}
    </el-menu-item>
  </el-menu>
</template>
<script>
import { supportedTypes, exportFileFromJson } from '@/utils/ADempiere/exportUtil'

export default {
  name: 'ContextMenu',
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
    isProcessMenu: {
      type: Array,
      default: function() {
        return []
      }
    },
    isPanelWindow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      option: supportedTypes,
      isCollapse: true,
      visible: false
    }
  },
  computed: {
    getterPanel() {
      return this.$store.getters.getPanel(this.containerUuid)
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
    },
    getDataSelection() {
      return this.$store.getters.getDataRecordSelection(this.containerUuid)
    }
  },
  methods: {
    classTableMenu() {
      if (this.isMobile) {
        return 'menu-table-mobile'
      } else if (this.$store.state.app.sidebar.opened) {
        return 'menu-table'
      }
      return 'menu-table'
    },
    typeFormat(key, keyPath) {
      Object.keys(supportedTypes).forEach(type => {
        if (type === key) {
          this.exporRecordTable(key)
        }
      })
      this.$store.dispatch('showMenuTable', {
        isShowedTable: false
      })
    },
    exporRecordTable(key) {
      const Header = this.getterFieldListHeader
      const filterVal = this.getterFieldListValue
      const list = this.gettersRecordContextMenu
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
    },
    deleteRecord() {
      this.$store.dispatch('deleteEntity', {
        parentUuid: this.parentUuid,
        containerUuid: this.containerUuid,
        recordUuid: this.isOption.UUID,
        panelType: this.panelType,
        isNewRecord: 'deleteEntity' === 'resetPanelToNew'
      })
    },
    tableProcess(process) {
      this.showModal(process)
    },
    showModal(process) {
      var processData = this.$store.getters.getProcess(process.uuid)
      const selection = this.isOption
      var valueProcess
      for (const element in selection) {
        if (element === this.getterPanel.keyColumn) {
          valueProcess = selection[element]
        }
      }
      console.log(processData, 'valueRecord:', valueProcess, 'TableName:', this.getterPanel.keyColumn, process)
      this.$store.dispatch('setProcessTable', {
        valueRecord: valueProcess,
        tableName: this.getterPanel.keyColumn,
        processTable: true
      })
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
    }
  }
}
</script>
