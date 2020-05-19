<template>
  <el-color-picker
    :ref="metadata.columnName"
    v-model="value"
    show-alpha
    :disabled="isDisabled"
    :class="metadata.cssClassName"
    @change="preHandleChange"
  />
</template>

<script>
import { fieldMixin } from '@/components/ADempiere/Field/FieldMixin'

export default {
  name: 'FieldColor',
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
