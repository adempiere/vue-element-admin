<template>
  <el-popover
    v-if="(field.columnName === 'DocStatus') && (!isEmptyValue(processOrderUuid))"
    placement="right"
    width="400"
    trigger="click"
    @show="listActionDocument"
  >
    <el-select
      v-model="valueActionDocument"
      @change="documentActionChange"
    >
      <el-option
        v-for="(item, key) in listDocumentActions"
        :key="key"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-tag
      v-if="isEmptyValue(valueActionDocument)"
      :type="tagStatus(field.value)"
    >
      {{ field.displayColumn }}
    </el-tag>
    <el-tag
      v-else
      :type="tagStatus(valueActionDocument)"
    >
      {{ labelDocumentActions }}
    </el-tag>
    <p v-if="isEmptyValue(valueActionDocument)"> {{ field.description }} </p>
    <p v-else> {{ descriptionDocumentActions }} </p>
    <el-button
      slot="reference"
      type="text"
      icon="el-icon-set-up"
    />
  </el-popover>
</template>

<script>
export default {
  name: 'FieldDocumentStatus',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valueActionDocument: ''
    }
  },
  computed: {
    listDocumentActions() {
      return this.$store.getters.getListDocumentActions.documentActionsList
    },
    defaultDocumentActions() {
      return this.$store.getters.getListDocumentActions.defaultDocumentAction
    },
    labelDocumentActions() {
      const found = this.listDocumentActions.find(element => {
        if (element.value === this.valueActionDocument) {
          return element
        }
      })
      if (this.isEmptyValue(found)) {
        return this.valueActionDocument
      }
      return found.name
    },
    descriptionDocumentActions() {
      const found = this.listDocumentActions.find(element => {
        if (element.value === this.valueActionDocument) {
          return element
        }
      })
      if (this.isEmptyValue(found)) {
        return this.valueActionDocument
      }
      return found.description
    },
    processOrderUuid() {
      return this.$store.getters.getOrders
    }
  },
  methods: {
    listActionDocument() {
      this.$store.dispatch('listDocumentActionStatus', {
        tableName: 'C_Order',
        recordUuid: this.$route.query.action
      })
    },
    documentActionChange(value) {
      var actionProcess = this.$store.getters.getOrders
      this.$store.dispatch('notifyFieldChange', {
        parentUuid: this.parentUuid,
        containerUuid: this.containerUuid,
        columnName: 'DocAction',
        isSendToServer: true,
        newValue: value
      })
      this.$store.dispatch('startProcess', {
        action: {
          uuid: actionProcess.uuid,
          id: actionProcess.id,
          name: actionProcess.name
        }, // process metadata
        tableName: this.$route.params.tableName,
        recordId: this.$route.params.recordId,
        recordUuid: this.$route.query.action,
        parametersList: [{
          columnName: 'DocStatus',
          value: this.valueActionDocument
        }],
        isActionDocument: true,
        parentUuid: this.parentUuid,
        panelType: this.panelType,
        containerUuid: this.containerUuid// determinate if get table name and record id (window) or selection (browser)
      })
      this.valueActionDocument = ''
    }
  }
}
</script>
