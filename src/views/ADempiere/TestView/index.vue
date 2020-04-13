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
        isActive: true,
        isDisplayed: true,
        isDisplayedFromLogic: true,
        isShowedFromUser: true,
        componentPath: 'FieldText',
        name: 'Test Field'
      }
    }
  }
}
</script>
