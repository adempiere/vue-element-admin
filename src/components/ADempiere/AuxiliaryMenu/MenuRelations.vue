<template>
  <el-dropdown
    size="mini"
    trigger="click"
    @command="clickRelation"
  >
    <el-button
      size="mini"
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

<script src="@/components/ADempiere/AuxiliaryMenu/menuRelations.js">
</script>

<style scoped lang="scss" src="@/components/ADempiere/AuxiliaryMenu/common.scss">
</style>
<style lang="scss">
// dropdown menu item container
.el-dropdown-menu {
  padding: 10px 0;
  max-width: 220px;
}

// height, and font size of the prefix icons of menu items
.el-dropdown-menu--mini .el-dropdown-menu__item {
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
</style>
