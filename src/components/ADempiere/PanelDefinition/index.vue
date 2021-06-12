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
  <component
    :is="componentRender"
    :container-uuid="containerUuid"
    :panel-type="panelType"
    :panel-metadata="panelMetadata"
  />
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'PanelDefinition',

  props: {
    parentUuid: {
      type: String,
      default: undefined
    },
    containerUuid: {
      type: String,
      required: true
    },
    panelType: {
      type: String,
      required: true
    },
    isAdvancedQuery: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { root }) {
    const panelMetadata = computed(() => {
      return root.$store.getters.getPanel(props.containerUuid)
    })

    const componentRender = computed(() => {
      if (['browser', 'process', 'table', 'window'].includes(props.panelType)) {
        return () => import('@/components/ADempiere/PanelDefinition/StandardPanel')
      }

      const panel = () => import('@/components/ADempiere/PanelDefinition/UnsupportedPanel')

      return panel
    })

    /**
     * Get the tab object with all its attributes as well as
     * the fields it contains
     */
    const getPanel = () => {
      let panel = panelMetadata.value
      if (root.isEmptyValue(panel) || !panel.fieldsList) {
        if (props.containerUuid.includes('table_')) {
          const containerUuid = props.containerUuid.replace('table_', '')
          panel = root.$store.getters.getPanel(containerUuid)
        }

        root.$store.dispatch('getPanelAndFields', {
          parentUuid: props.parentUuid,
          containerUuid: props.containerUuid,
          panelType: props.panelType,
          panelMetadata: panel,
          isAdvancedQuery: props.isAdvancedQuery
        }).then(panelResponse => {
          //
        }).catch(error => {
          console.warn(`Field Load Error: ${error.message}. Code: ${error.code}.`)
        })
      }
    }

    getPanel()

    return {
      // computeds
      componentRender,
      panelMetadata
    }
  }
})
</script>
