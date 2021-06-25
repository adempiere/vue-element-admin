<template>
  <div class="container-submenu-mobile container-context-menu">
    <menu-actions />
    <menu-relations />
    <menu-references />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import MenuActions from '@/components/ADempiere/AuxiliaryMenu/desktop/MenuActions'
import MenuRelations from '@/components/ADempiere/AuxiliaryMenu/desktop/MenuRelations'
import MenuReferences from '@/components/ADempiere/AuxiliaryMenu/desktop/MenuReferences'

export default defineComponent({
  name: 'AuxiliaryMenuDesktop',

  props: {
    menuParentUuid: {
      type: String,
      default: undefined
    },
    // uuid of the component where it is called
    parentUuid: {
      type: String,
      default: undefined
    },
    // uuid of the component where it is called
    containerUuid: {
      type: String,
      default: undefined
    },
    panelType: {
      type: String,
      default: undefined
    },
    tableName: {
      type: String,
      default: undefined
    },
    isReport: {
      type: Boolean,
      default: false
    },
    lastParameter: {
      type: String,
      default: undefined
    },
    reportFormat: {
      type: String,
      default: undefined
    },
    // used only window
    isInsertRecord: {
      type: Boolean,
      default: undefined
    },
    isListRecord: {
      type: Boolean,
      default: false
    }
  },

  components: {
    MenuActions,
    MenuRelations,
    MenuReferences
  },

  setup() {

  }
})
</script>
