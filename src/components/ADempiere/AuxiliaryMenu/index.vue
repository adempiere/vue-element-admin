<template>
  <div class="container-auxiliary-menu container-auxiliary-mobile">
    <menu-actions />

    <menu-relations />

    <menu-references />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import MenuActions from '@/components/ADempiere/AuxiliaryMenu/MenuActions'
import MenuRelations from '@/components/ADempiere/AuxiliaryMenu/MenuRelations'
import MenuReferences from '@/components/ADempiere/AuxiliaryMenu/MenuReferences'

export default defineComponent({
  name: 'AuxiliaryMenu',

  components: {
    MenuActions,
    MenuRelations,
    MenuReferences
  },

  props: {
    // used only report view
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
  }

})
</script>

<style lang="scss">
.container-auxiliary-menu {
  z-index: 1;

  .el-dropdown-menu {
    max-height: 250px;
    overflow: auto;
  }
}

.container-auxiliary-mobile {
  position: absolute;
  height: 39px !important;
  right: 0%;
  top: 0;
  display: flex;
}

.scroll-child {
  max-height: 300px;
}
</style>
