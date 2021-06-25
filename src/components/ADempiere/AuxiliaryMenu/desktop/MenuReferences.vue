<template>
  <!-- records references only window -->
  <el-dropdown size="mini" trigger="click" @command="openReference">
    <el-button
      plain
      type="warning"
      :disabled="isDisabledMenu"
    >
      {{ $t('components.contextMenuReferences') }}

      <template v-if="isLoadedReferences">
        <i class="el-icon-arrow-down el-icon--right" />
      </template>
      <template v-else>
        <i class="el-icon-loading el-icon--right" />
      </template>
    </el-button>

    <el-dropdown-menu slot="dropdown">
      <el-scrollbar wrap-class="scroll-child">
        <el-dropdown-item
          v-if="isEmptyValue(referencesList)"
          key="withoutReference"
        >
          <div class="contents">
            <p class="description">
              {{ $t('components.withOutReferences') }}
            </p>
          </div>
        </el-dropdown-item>

        <el-dropdown-item
          v-for="(reference, index) in referencesList"
          :key="index"
          :command="reference"
          :divided="true"
        >
          <div class="contents">
            <span class="contents">
              <b class="label">
                {{ reference.displayName }}
              </b>
            </span>

            <!--
            <p class="description">
              {{ $t('data.noDescription') }}
            </p>
            -->
          </div>
        </el-dropdown-item>

      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script src="@/components/ADempiere/AuxiliaryMenu/menuReferences.js"></script>
