<template>
  <el-steps v-if="!isEmptyValue(gettersNodeList)" :active="1" finish-status="success" simple>
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
  .el-steps--simple {
    /* padding: 13px 8%; */
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 0%;
    padding-right: 0px;
    border-radius: 4px;
    background: #F5F7FA;
    overflow-x: auto;
    max-width: 100%;
  }
</style>
