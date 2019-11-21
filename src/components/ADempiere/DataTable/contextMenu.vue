<template>
  <ul>
    <li @click="exporWindow">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          Export Registro <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="xlsx">xlsx</el-dropdown-item>
          <el-dropdown-item command="csv">csv</el-dropdown-item>
          <el-dropdown-item command="txt">txt</el-dropdown-item>
          <el-dropdown-item command="xls">xls</el-dropdown-item>
          <el-dropdown-item command="xml">xml</el-dropdown-item>
          <el-dropdown-item command="html">html</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</template>
<script>
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
    }
  },
  data() {
    return {
      type: 'xlsx',
      visible: false
    }
  },
  computed: {
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
    handleCommand(command) {
      this.type = command
      this.exporWindow(command)
    },
    exporWindow(command) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = this.getterFieldListHeader
          const filterVal = this.getterFieldListValue
          const list = this.gettersRecordContextMenu
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.isOption.Value,
            bookType: this.type
          })
        })
        this.$store.dispatch('showMenuTable', {
          isShowedTable: false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
