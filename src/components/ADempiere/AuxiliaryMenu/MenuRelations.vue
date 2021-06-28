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
  <el-dropdown
    :size="size"
    trigger="click"
    class="menu-relations"
    @command="clickRelation"
  >
    <el-button
      :size="size"
      type="success"
      plain
    >
      {{ $t('components.contextMenuRelations') }}
      <i class="el-icon-arrow-down el-icon--right" />
    </el-button>

    <el-dropdown-menu slot="dropdown">
      <el-scrollbar wrap-class="scroll-child">
        <el-dropdown-item
          v-for="(relation, index) in relationsList"
          :key="index"
          :command="relation"
          :divided="true"
        >
          <div class="contents">
            <div class="auxiliary-menu-icon">
              <svg-icon :icon-class="relation.meta.icon" />
            </div>

            <div>
              <span class="contents">
                <b class="label">
                  {{ relation.meta.title }}
                </b>
              </span>

              <p class="description">
                {{ relation.meta.description }}
              </p>
            </div>
          </div>
        </el-dropdown-item>
      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
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
</script>

<style scoped lang="scss" src="@/components/ADempiere/AuxiliaryMenu/common.scss">
</style>
<style lang="scss">
// dropdown menu item list container
.el-dropdown-menu {
  padding: 10px 0;
  max-width: 220px;

  // height, and font size of the prefix icons of menu items
  .el-dropdown-menu--medium.el-dropdown-menu__item {
    line-height: 14px;
    padding: 0px 15px;
    font-size: 10px;
  }
  .el-dropdown-menu--mini.el-dropdown-menu__item {
    line-height: 14px;
    padding: 0px 15px;
    font-size: 11px;
  }

  // eliminates the first top division line
  .el-dropdown-menu__item--divided:first-child {
    border-top-width: 0px;
    border-top-color: transparent;
    border-top-style: hidden;
  }
}
</style>
