<template>
  <el-steps v-if="!isEmptyValue(gettersNodeList)" :active="getActive" :process-status="typeStatus" finish-status="success" simple :style="styleSteps">
    <el-step
      v-for="(node, index) in listDocumentStatus"
      :key="index"
      :title="node.name"
    />
  </el-steps>
</template>
<script>
export default {
  name: 'WorkflowLine',
  props: {
    styleSteps: {
      type: Object,
      default: () => {}
    },
    containerUuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentKey: 100,
      typeAction: 0,
      chatNote: '',
      documentStatusesList: []
    }
  },
  computed: {
    getPanelRight() {
      return this.$store.getters.getPanelRight
    },
    getterPanel() {
      return this.$store.getters.getPanel(this.containerUuid)
    },
    getValueStatus() {
      if (!this.isEmptyValue(this.getterPanel)) {
        var epale = this.getterPanel.fieldList.find(field => {
          if (field.columnName === 'DocStatus') {
            return field
          }
        })
        return epale.value
      }
      return 'CL'
    },
    getActive() {
      const active = this.listDocumentStatus.findIndex(index => index.value === this.getValueStatus)
      return active
    },
    gettersNodeList() {
      var node = this.$store.getters.getNodeWorkflow
      if (!this.isEmptyValue(node.workflowsList)) {
        return node.workflowsList[0].workflowNodesList
      }
      return node.workflowsList
    },
    listDocumentStatus() {
      return this.$store.getters.getListDocumentStatus.documentActionsList
    },
    typeStatus() {
      if (this.getValueStatus === 'VO') {
        return 'error'
      } else if (this.getValueStatus === 'CO') {
        return 'success'
      } else {
        return 'finish'
      }
    }
  },
  created() {
    this.gettersNodeList
  }
}
</script>

<style>
  .scroll-window-log-change {
    max-height: 74vh !important;
  }
  .el-step.is-simple {
    display: -webkit-box;
    display: -ms-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 50%;
  }
  .el-step.is-simple .el-step__main {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: inline-block;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    /* -webkit-box-flex: 1; */
    -ms-flex-positive: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    width: 15vw;
  }
</style>
