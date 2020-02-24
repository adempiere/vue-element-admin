<template>
  <el-dropdown trigger="click">
    <el-button type="text">
      <i class="el-icon-monitor el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-input v-model="calcValue" />
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :show-header="false"
        :span-method="spanMethod"
        class="calc-table"
        @cell-click="sendValue"
      >
        <el-table-column
          align="center"
          prop="row1"
          height="50"
          width="50"
        >
          <template slot-scope="{ row, column }">
            <el-button type="text" :disabled="isDisabled(row, column)">{{ row.row1.value }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="row2"
          height="50"
          width="50"
        >
          <template slot-scope="{ row, column }">
            <el-button type="text" :disabled="isDisabled(row, column)">{{ row.row2.value }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="row3"
          height="50"
          width="50"
        >
          <template slot-scope="{ row, column }">
            <el-button type="text" :disabled="isDisabled(row, column)">{{ row.row3.value }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="row4"
          height="50"
          width="50"
        >
          <template slot-scope="{ row, column }">
            <el-button type="text" :disabled="isDisabled(row, column)">{{ row.row4.value }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="row5"
          height="50"
          width="50"
        >
          <template slot-scope="{ row, column }">
            <el-button type="text" :disabled="isDisabled(row, column)">{{ row.row5.value }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'FieldCalc',
  props: {
    fieldAttributes: {
      type: Object,
      required: true
    },
    fieldValue: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      calcValue: this.fieldValue,
      selectedValues: [],
      tableData: [{
        row1: {
          type: 'operator',
          value: '%'
        },
        row2: {
          type: 'operator',
          value: '/'
        },
        row3: {
          type: 'operator',
          value: '*'
        },
        row4: {
          type: 'operator',
          value: '-'
        },
        row5: {
          type: 'clear',
          value: 'C'
        }
      }, {
        row1: {
          type: 'value',
          value: 7
        },
        row2: {
          type: 'value',
          value: 8
        },
        row3: {
          type: 'value',
          value: 9
        },
        row4: {
          type: 'operator',
          value: '+'
        },
        row5: {
          type: 'clear',
          value: 'AC'
        }
      }, {
        row1: {
          type: 'value',
          value: 4
        },
        row2: {
          type: 'value',
          value: 5
        },
        row3: {
          type: 'value',
          value: 7
        },
        row4: {
          type: 'operator',
          value: '('
        },
        row5: {
          type: undefined,
          value: undefined
        }
      }, {
        row1: {
          type: 'value',
          value: 1
        },
        row2: {
          type: 'value',
          value: 2
        },
        row3: {
          type: 'value',
          value: 3
        },
        row4: {
          type: 'result',
          value: '='
        },
        row5: {
          type: 'operator',
          value: ')'
        }
      }, {
        row1: {
          type: 'value',
          value: 0
        },
        row2: {
          type: 'operator',
          value: '.'
        },
        row3: {
          type: 'operator',
          value: '+/-'
        },
        row4: {
          type: undefined,
          value: undefined
        },
        row5: {
          type: undefined,
          value: undefined
        }
      }]
    }
  },
  watch: {
    fieldValue(value) {
      this.calcValue = value
    }
  },
  methods: {
    sendValue(row, column) {
      const isAcceptedType = ['result', 'clear'].includes(row[column.property].type)
      if (!isAcceptedType && !this.isDisabled(row, column)) {
        this.calcValue += row[column.property].value
      }
      if (row[column.property].type === 'clear') {
        if (row[column.property].value === 'C') {
          this.calcValue = this.calcValue.slice(0, -1)
        } else if (row[column.property].value === 'AC') {
          this.calcValue = ''
        }
      }
      if (row[column.property].value === '=') {
        // eslint-disable-next-line no-eval
        this.calcValue = '' + eval(this.calcValue)
        this.$children[0].visible = false
        if (!this.isEmptyValue(this.calcValue)) {
          this.$store.dispatch('notifyFieldChange', {
            isAdvancedQuery: this.fieldAttributes.isAdvancedQuery,
            panelType: this.fieldAttributes.panelType,
            parentUuid: this.fieldAttributes.parentUuid,
            containerUuid: this.fieldAttributes.containerUuid,
            columnName: this.fieldAttributes.columnName,
            newValue: Number(this.calcValue),
            field: this.fieldAttributes,
            isChangedOldValue: true
          })
        }
      }
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        if (row[column.property].value === '+') {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      } else if (rowIndex === 3) {
        if (row[column.property].value === '=') {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      } else if (rowIndex === 4) {
        if (row[column.property].value === 0) {
          return {
            rowspan: 1,
            colspan: 2
          }
        }
      }
    },
    isDisabled(row, column) {
      const isInteger = ['Integer', 'ID'].includes(this.fieldAttributes.referenceType)
      const value = row[column.property].value
      if (isInteger && value === ',') {
        return true
      }
      return false
    }
  }
}
</script>
<style>
	.el-table--enable-row-hover .el-table__body tr:hover>td{
		background-color: #ffffff !important;
	}
</style>
