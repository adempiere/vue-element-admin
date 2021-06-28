<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com www.erpya.com
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https:www.gnu.org/licenses/>.
-->

<template>
  <div class="auxiliary-menu auxiliary-menu-mobile">
    <menu-actions :size="size" />

    <menu-relations :size="size" />

    <menu-references :size="size" />

    <modal-dialog
      :parent-uuid="parentUuid"
      :container-uuid="containerUuid"
      :report-export-type="reportFormat"
      :panel-type="panelType"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

import MenuActions from '@/components/ADempiere/AuxiliaryMenu/MenuActions'
import MenuRelations from '@/components/ADempiere/AuxiliaryMenu/MenuRelations'
import MenuReferences from '@/components/ADempiere/AuxiliaryMenu/MenuReferences'
import ModalDialog from '@/components/ADempiere/Dialog'

export default defineComponent({
  name: 'AuxiliaryMenu',

  components: {
    MenuActions,
    MenuRelations,
    MenuReferences,
    ModalDialog
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
  },

  setup(props, { root }) {
    const isMobile = computed(() => {
      return root.$store.getters.device === 'mobile'
    })

    const size = computed(() => {
      if (isMobile.value) {
        return 'mini'
      }
      return 'medium'
    })

    return {
      size
    }
  }

})
</script>

<style lang="scss">
.auxiliary-menu {
  z-index: 1;

  .el-dropdown-menu {
    &.el-popper {
      max-height: 250px;
      overflow: auto;
    }

    max-height: 250px;
    overflow: auto;
  }
}

.auxiliary-menu-mobile {
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
