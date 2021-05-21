<template>
  <div class="wrapper">
    <el-form
      label-position="top"
      label-width="200px"
    >
      <div class="cards-not-group">
        <div class="card">
          <div class="select-filter">
            <!-- <span>
              {{ firstGroup.groupFinal }}
            </span> -->
            <filter-fields
              :container-uuid="containerUuid"
              :panel-type="panelType"
            />
          </div>
          <el-card
            :shadow="shadowGroup"
            :body-style="{ padding: '10px' }"
          >
            <el-row>
              <template v-for="(fieldAttributes, subKey) in fieldsList">
                <field-definition
                  :ref="fieldAttributes.columnName"
                  :key="subKey"
                  :metadata-field="{
                    ...fieldAttributes
                  }"
                />
              </template>
            </el-row>
          </el-card>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

import FieldDefinition from '@/components/ADempiere/Field'
import FilterFields from '@/components/ADempiere/Panel/filterFields'

export default defineComponent({
  name: 'PanelStandard',

  components: {
    FieldDefinition,
    FilterFields
  },

  props: {
    containerUuid: {
      type: String,
      required: true
    },
    panelMetadata: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { root }) {
    let fieldsList = []

    const generatePanel = () => {
      // order and assign groups
      if (props.panelMetadata) {
        fieldsList = props.panelMetadata.fieldsList
      }
    }

    const shadowGroup = computed(() => {
      if (root.$store.state.app.device === 'mobile') {
        return 'never'
      }
      return 'hover'
    })

    generatePanel()

    return {
      fieldsList,
      panelType: props.panelMetadata.panelType,
      shadowGroup
    }
  }
})
</script>
