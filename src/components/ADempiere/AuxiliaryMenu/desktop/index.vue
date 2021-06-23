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

  components: {
    MenuActions,
    MenuRelations,
    MenuReferences
  },

  setup() {

  }
})
</script>
