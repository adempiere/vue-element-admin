// ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
// Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
// Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com www.erpya.com
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'MenuRelations',

  props: {
    size: {
      type: String,
      default: ''
    }
  },

  setup(props, { root, parent }) {
    const {
      menuParentUuid
    } = parent._props

    const relationsList = computed(() => {
      let menuUuid = root.$route.params.menuParentUuid
      if (root.isEmptyValue(menuUuid)) {
        menuUuid = menuParentUuid
      }
      const relations = root.$store.getters.getRelations(menuUuid)
      if (!root.isEmptyValue(relations)) {
        if (!root.isEmptyValue(relations.children)) {
          return relations.children
        }
        if (relations.meta && !root.isEmptyValue(relations.meta.childs)) {
          return relations.meta.childs
        }
      }
      return []
    })

    const clickRelation = (item) => {
      let tabParent
      if (item.meta && item.meta.type === 'window') {
        tabParent = 0
      }
      root.$router.push({
        name: item.name,
        query: {
          tabParent
        }
      }, () => {})
    }

    return {
      // computeds
      relationsList,
      // methods
      clickRelation
    }
  }
})
