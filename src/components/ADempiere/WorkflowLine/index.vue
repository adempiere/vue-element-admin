<template>
  <el-steps v-if="!isEmptyValue(gettersNodeList)" :active="1" finish-status="success" simple :style="styleSteps">
    <el-step
      v-for="(node, index) in gettersNodeList"
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
    }
  },
  data() {
    return {
      currentKey: 100,
      typeAction: 0,
      chatNote: ''
    }
  },
  computed: {
    gettersNodeList() {
      var node = this.$store.getters.getNodeWorkflow
      if (!this.isEmptyValue(node.workflowsList)) {
        return node.workflowsList[0].workflowNodesList
      }
      return node.workflowsList
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
