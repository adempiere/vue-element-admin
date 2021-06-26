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
  <!-- actions or process on container -->
  <el-dropdown
    :hide-on-click="true"
    :size="size"
    split-button
    type="primary"
    trigger="click"
    class="menu-actions"
    @command="clickRunAction"
    @click="runAction(defaultActionToRun)"
  >
    {{ defaultActionName }}

    <el-dropdown-menu slot="dropdown">
      <el-scrollbar wrap-class="scroll-child">
        <el-dropdown-item
          command="refreshData"
        >
          <div class="contents">
            <div class="auxiliary-menu-icon">
              <i class="el-icon-refresh" />
            </div>
            <div>
              <span class="contents">
                <b class="label">
                  {{ $t('components.contextMenuRefresh') }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>
            </div>
          </div>
        </el-dropdown-item>

        <el-dropdown-item
          v-for="(action, index) in actionsList"
          :key="index"
          :command="action"
          :divided="true"
        >
          <div class="contents">
            <div class="auxiliary-menu-icon">
              <i :class="iconAction(action)" />
            </div>
            <el-dropdown v-if="!isEmptyValue(action.childs)">
              <span class="contents">
                <b class="label">
                  {{ action.name }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>

              <el-dropdown-menu
                slot="dropdown"
                @command="runAction"
              >
                <el-scrollbar wrap-class="scroll-child">
                  <el-dropdown-item
                    v-for="(childs, key) in action.childs"
                    :key="key"
                    :command="childs"
                    :divided="true"
                  >
                    <span class="contents">
                      <b class="label" @click="runAction(childs)">
                        {{ childs.name }}
                      </b>
                    </span>

                    <p
                      v-if="!isEmptyValue(childs.description)"
                      class="description"
                    >
                      {{ childs.description }}
                    </p>
                    <p v-else class="description">
                      {{ $t('data.noDescription') }}
                    </p>
                  </el-dropdown-item>
                </el-scrollbar>
              </el-dropdown-menu>
            </el-dropdown>

            <div v-else>
              <span class="contents">
                <b class="label">
                  {{ action.name }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>
            </div>
          </div>
        </el-dropdown-item>

        <el-dropdown-item
          command="shareLink"
          :divided="true"
        >
          <div class="contents">
            <div class="auxiliary-menu-icon">
              <i class="el-icon-copy-document" />
            </div>
            <div>
              <span class="contents">
                <b class="label">
                  {{ $t('components.contextMenuShareLink') }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>
            </div>
          </div>
        </el-dropdown-item>
      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script src="@/components/ADempiere/AuxiliaryMenu/menuActions.js">
</script>

<style scoped lang="scss" src="@/components/ADempiere/AuxiliaryMenu/common.scss">
</style>
<style scoped lang="scss">
.menu-actions {
  .el-button-group {
    display: inline-flex;
  }
}

.el-dropdown-menu.el-dropdown-menu--medium {
  // height, and font size of the prefix icons of menu items
  .el-dropdown-menu__item {
    line-height: 17px;
    padding: 0 17px;
    display: grid;
    font-size: 14px;

    // additional space on top of the first item in the list
    &:first-child {
      margin-top: 10px;
    }
    // additional space on bottom of the last item in the list
    &:last-child {
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss">
.menu-actions {
  .el-button-group {
    // light blue style of the first section of the menu button
    // >.el-button::first-child {
    >.el-button:not(:last-child) {
      // margin-right: -1px;
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }

    // light blue style of the drop down menu section
    .el-button--primary:last-child {
      // margin-right: 2px;
      color: #409eff;
      background: #e6f1fd;
      border-color: #b3d8ff;
      border-left-color: #000000 !important;
    }

    // dark blue style when pointing to the menu
    .el-button--primary:hover {
      background: #1890ff;
      border-color: #1890ff;
      color: #FFFFFF;
    }
  }
}
</style>
