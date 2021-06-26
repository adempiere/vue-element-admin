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
  <!-- records references only window -->
  <el-dropdown
    :size="size"
    trigger="click"
    class="menu-references"
    @command="openReference"
  >
    <el-button
      :size="size"
      plain
      type="warning"
      :disabled="isDisabledMenu"
    >
      {{ $t('components.contextMenuReferences') }}

      <i
        v-if="!isReferecesContent || isLoadedReferences"
        class="el-icon-arrow-down el-icon--right"
      />
      <i v-else class="el-icon-loading el-icon--right" />
    </el-button>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-if="isEmptyValue(referencesList) && isReferecesContent"
        key="withoutReference"
        style="min-height: 45px"
      >
        <span class="contents">
          <b class="label">
            {{ $t('components.withOutReferences') }}
          </b>
        </span>
      </el-dropdown-item>

      <el-scrollbar v-else key="withReferences" wrap-class="scroll-child">
        <el-dropdown-item
          v-for="(reference, index) in referencesList"
          :key="index"
          :command="reference"
          :divided="true"
        >
          <span class="contents">
            <b class="label">
              {{ reference.displayName }}
            </b>
          </span>
        </el-dropdown-item>

      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script src="@/components/ADempiere/AuxiliaryMenu/menuReferences.js">
</script>

<style scoped lang="scss" src="@/components/ADempiere/AuxiliaryMenu/common.scss">
</style>
<style lang="scss">
.menu-references {
  .el-button--warning {
    // darker orange tone for better readability
    border-color: #ff9b00;
    color: #ff9b00;
  }
}
</style>
