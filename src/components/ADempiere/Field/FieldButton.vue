<template>
  <el-input
    :ref="metadata.columnName"
    v-model="value"
    type="hidden"
    @change="preHandleChange"
  />
</template>

<script>
import { fieldMixin } from '@/components/ADempiere/Field/FieldMixin'

export default {
  name: 'FieldButton',
  mixins: [fieldMixin],
  methods: {
    parseValue(value) {
      if (this.isEmptyValue(value)) {
        value = ''
      }
      return String(value)
    }
  }
}
</script>
