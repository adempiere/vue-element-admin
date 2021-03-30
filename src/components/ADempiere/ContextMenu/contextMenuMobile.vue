<template>
  <div v-if="!isListRecord" class="container-submenu-mobile container-context-menu">
    <!-- actions or process on container -->
    <el-dropdown size="mini" split-button @command="clickRunAction">
      {{ defaultActionName }}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(action, index) in actions"
          :key="index"
          :command="action"
        >
          <span style="display: inline-flex;">
            <i v-if="action.type === 'dataAction'" :class="iconAction(action)" />
            <svg-icon v-else icon-class="component" />
            <b style="font-size: 12px;margin-top: 0% !important;margin-left: 0px;margin-bottom: 10%;">
              {{ action.name }}
            </b>
          </span>

        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- menu relations -->
    <el-dropdown size="mini" @command="clickRelation">
      <el-button size="mini">
        {{ $t('components.contextMenuRelations') }} <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-scrollbar wrap-class="scroll" style="max-height: 200px;max-width: 350px;">
          <el-dropdown-item
            v-for="(relation, index) in relationsList"
            :key="index"
            :command="relation"
            :divided="true"
          >
            <span style="display: inline-flex;">
              <svg-icon :icon-class="relation.meta.icon" />
              <b style="font-size: 14px;margin-top: 0% !important;margin-left: 5px;">
                {{ relation.meta.title }}
              </b>
            </span>
            <p
              style="margin: 0px;font-size: 12px;"
            >
              {{ relation.meta.description }}
            </p>
          </el-dropdown-item>
        </el-scrollbar>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown size="mini">
      <el-button size="mini" :disabled="!(isReferecesContent && isLoadedReferences)">
        {{ $t('components.contextMenuReferences') }} <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(reference, index) in references.referencesList"
          :key="index"
        >
          {{ reference.displayName }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import contextMixin from './contextMenuMixin.js'

export default {
  name: 'ContextMenuMobile',
  mixins: [
    contextMixin
  ],
  data() {
    return {
      openedsMenu: [
        'actions'
      ]
    }
  },
  computed: {
    isPanelTypeMobile() {
      if (['process', 'report'].includes(this.$route.meta.type)) {
        return true
      }
      return false
    },
    isUndoAction() {
      if (this.isWindow) {
        if (!this.isWithRecord) {
          return true
        }
      }
      return false
    },
    typeOfAction() {
      if (this.isUndoAction) {
        return 'warning'
      }
      return 'default'
    },
    isPlain() {
      if (this.isUndoAction) {
        return true
      }
      return false
    },
    defaultActionToRun() {
      if (this.isUndoAction) {
        return this.actions[2]
      }
      return this.actions[0]
    },
    defaultActionName() {
      if (this.isWindow) {
        if (this.isWithRecord) {
          return this.$t('window.newRecord')
        }
        return this.$t('data.undo')
      }
      return this.$t('components.RunProcess')
    },
    iconDefault() {
      if (this.isPanelTypeMobile) {
        return 'component'
      }
      return 'skill'
    }
  },
  methods: {
    clickRelation(item) {
      this.$router.push({
        name: item.name,
        query: {
          tabParent: 0
        }
      }, () => {})
    },
    clickRunAction(action) {
      this.runAction(action)
    },
    iconAction(action) {
      let icon
      switch (action.action) {
        case 'setDefaultValues':
          icon = 'el-icon-news'
          break
        case 'deleteEntity':
          icon = 'el-icon-delete'
          break
        case 'undoModifyData':
          icon = 'el-icon-refresh-left'
          break
        case 'lockRecord':
          icon = 'el-icon-lock'
          break
        case 'unlockRecord':
          icon = 'el-icon-unlock'
          break
      }
      return icon
    }
  }
}
</script>

<style scoped>
  .el-dropdown .el-button-group {
    display: flex;
  }
  .el-dropdown-menu--mini .el-dropdown-menu__item {
    line-height: 14px;
    padding: 0px 15px;
    font-size: 10px;
  }
  .el-dropdown-menu__item--divided {
    position: relative;
    /* margin-top: 6px; */
    border-top: 1px solid #e6ebf5;
  }
  .svg-icon {
    width: 1em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
