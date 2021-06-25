<template>
  <el-dropdown size="mini" trigger="click" @command="clickRelation">
    <el-button type="success" plain>
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
            <div style="margin-right: 5%;margin-top: 10%;">
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

<script src="@/components/ADempiere/AuxiliaryMenu/menuRelations.js"></script>
