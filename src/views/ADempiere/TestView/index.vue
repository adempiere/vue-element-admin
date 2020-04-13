<template>
  <el-form>
    <el-row>
      <field
        :metadata-field="metadata"
      />
    </el-row>
  </el-form>
</template>

<script>
import Field from '@/components/ADempiere/Field'

export default {
  name: 'TestView',
  components: {
    Field
  },
  data() {
    return {
      metadata: {
        name: 'Test Field',
        displayType: 14,
        isCustomField: true
      }
    }
  }
}
</script>
