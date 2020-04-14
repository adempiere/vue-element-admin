<template>
  <el-form>
    <el-row
      v-for="(metadata) in metadataList"
      :key="metadata.columnName"
    >
      <field
        :metadata-field="metadata"
      />
    </el-row>
  </el-form>
</template>

<script>
import Field from '@/components/ADempiere/Field'
import { createField } from '@/utils/ADempiere/lookupFactory'
import { TEXT } from '@/utils/ADempiere/references'

export default {
  name: 'TestView',
  components: {
    Field
  },
  data() {
    return {
      metadataList: []
    }
  },
  created() {
    // Text
    this.metadataList.push(createField({
      columnName: 'Name',
      name: 'Only Name',
      displayType: TEXT.id
    }))
    // Text
    this.metadataList.push(createField({
      columnName: 'Name2',
      name: 'Name 2',
      displayType: TEXT.id
    }))
    // Text
    this.metadataList.push(createField({
      columnName: 'Description',
      name: 'Only Description',
      displayType: TEXT.id
    }))
    // Table direct
    // To be define
    // this.metadataList.push(createField({
    //   columnName: 'C_Country',
    //   name: 'Country',
    //   displayType: TABLE_DIR.id
    // }))
  }
}
</script>
