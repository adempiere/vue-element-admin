<template>
  <div class="wrapper">
    <el-form
      v-if="isLoaded"
      key="panel-loaded"
      label-position="top"
      label-width="200px"
    >
      <el-row
        v-for="(metadata) in metadataList"
        :key="metadata.columnName"
      >
        <field
          :metadata-field="metadata"
        />
      </el-row>
    </el-form>
    <div
      v-else
      key="panel-loading"
      v-loading="!isLoaded"
      :element-loading-text="$t('notifications.loading')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      class="loading-panel"
    />
  </div>
</template>

<script>
import Field from '@/components/ADempiere/Field'
import { createField } from '@/utils/ADempiere/lookupFactory'
import { URL, TEXT, NUMBER, INTEGER, TEXT_LONG } from '@/utils/ADempiere/references'

export default {
  name: 'TestView',
  components: {
    Field
  },
  data() {
    return {
      metadataList: [],
      panelMetadata: {},
      isLoaded: false,
      panelUuid: 'Test-View',
      panelType: 'test'
    }
  },
  computed: {
    getterPanel() {
      return this.$store.getters.getPanel(this.panelUuid)
    }
  },
  created() {
    this.getPanel()
  },
  methods: {
    getPanel() {
      const panel = this.getterPanel
      if (panel) {
        this.metadataList = panel.fieldList
        this.isLoaded = true
      } else {
        this.setFieldsList()
        this.$store.dispatch('addPanel', {
          name: 'Test View',
          uuid: this.panelUuid,
          panelType: this.panelType,
          fieldList: this.metadataList
        })
          .then(responsePanel => {
            this.metadataList = responsePanel.fieldList
          })
          .finally(() => {
            this.isLoaded = true
          })
      }
    },
    setFieldsList() {
      const fieldsList = []
      const additionalAttributes = {
        panelType: this.panelType,
        containerUuid: this.panelUuid
      }
      console.log(additionalAttributes)
      let sequence = 10
      // URL
      fieldsList.push(createField({
        columnName: 'URL',
        name: 'Web',
        displayType: URL.id,
        containerUuid: this.panelUuid,
        additionalAttributes,
        sequence
      }))

      sequence = sequence + 10
      // Text
      fieldsList.push(createField({
        columnName: 'Name',
        name: 'Only Name',
        displayType: TEXT.id,
        containerUuid: this.panelUuid,
        additionalAttributes,
        sequence
      }))

      sequence = sequence + 10
      // Amount
      fieldsList.push(createField({
        columnName: 'Amount',
        name: 'Amount for it',
        displayType: NUMBER.id,
        containerUuid: this.panelUuid,
        additionalAttributes,
        sequence
      }))

      sequence = sequence + 10
      // Integer
      fieldsList.push(createField({
        columnName: 'SeqNo',
        name: 'Sequence for record',
        displayType: INTEGER.id,
        containerUuid: this.panelUuid,
        additionalAttributes,
        sequence
      }))

      sequence = sequence + 10
      // Text Long
      fieldsList.push(createField({
        columnName: 'Description',
        name: 'Only Description',
        displayType: TEXT_LONG.id,
        containerUuid: this.panelUuid,
        additionalAttributes,
        sequence
      }))
      // Table direct
      // To be define
      // fieldsList.push(createField({
      //   columnName: 'C_Country',
      //   name: 'Country',
      //   displayType: TABLE_DIR.id,
      //   additionalAttributes
      // }))
      this.metadataList = fieldsList
    }
  }
}
</script>
