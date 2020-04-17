<template>
  <div class="view-base">
    <h3 v-show="!isEmptyValue(formTitle)" class="warn-content text-center">
      <el-popover
        v-if="!isEmptyValue($route.help)"
        ref="helpTitle"
        placement="top-start"
        :title="formTitle"
        width="400"
        trigger="hover"
      >
        <div v-html="$route.help" />
      </el-popover>
      <el-button
        v-popover:helpTitle
        type="text"
        class="title text-center"
      >
        {{ formTitle }}
      </el-button>
    </h3>
    <form-panel
      :metadata="{
        fileName: 'PriceInquiry',
        containerUuid: formUuid,
        name: formTitle
      }"
    />
  </div>
</template>

<script>
import FormPanel from '@/components/ADempiere/Form'

export default {
  name: 'FormView',
  components: {
    FormPanel
  },
  data() {
    return {
      formUuid: this.$route.meta.uuid
    }
  },
  computed: {
    formTitle() {
      return this.$route.meta.title
    }
  }
}
</script>
