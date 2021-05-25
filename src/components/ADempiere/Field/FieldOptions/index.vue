<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Edwin Betancourt EdwinBetanc0urt@oulook.com www.erpya.com
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
  <div>
    <el-dropdown
      v-if="isMobile"
      key="options-mobile"
      size="mini"
      :hide-on-click="true"
      trigger="click"
      :style="isMobile ? 'text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width:'+ labelStyle+'%' : ''"
      @command="handleCommand"
      @click="false"
    >
      <div :style="isMobile ? 'display: flex;width: auto;' : 'display: block;'">
        <span :style="metadata.required && isEmptyValue(valueField) ? 'border: aqua; color: #f34b4b' : 'border: aqua;'">
          <span key="is-field-name">
            {{ metadata.name }}
          </span>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <template
          v-for="(option, key) in optionsList"
        >
          <el-dropdown-item
            v-if="option.enabled"
            :key="key"
            :command="option"
            :divided="true"
          >
            <el-popover
              v-if="!isMobile"
              placement="top"
              trigger="click"
              style="padding: 0px;"
            >
              <component
                :is="option.componentRender"
                v-if="visibleForDesktop"
                :field-attributes="fieldAttributes"
                :source-field="fieldAttributes"
                :field-value="contextMenuField.valueField"
              />
              <el-button
                slot="reference"
                type="text"
                style="color: #606266;"
              >
                <div class="contents">
                  <div v-if="!option.svg" style="margin-right: 5%;padding-top: 3%;">
                    <i :class="option.icon" style="font-weight: bolder;" />
                  </div>
                  <div v-else style="margin-right: 5%">
                    <svg-icon :icon-class="option.icon" style="margin-right: 5px;" />
                  </div>
                  <div>
                    <span class="contents">
                      <b class="label">
                        {{ option.name }}
                      </b>
                    </span>
                  </div>
                </div>
              </el-button>
            </el-popover>
            <div v-if="isMobile" class="contents">
              <div v-if="!option.svg" style="margin-right: 5%;padding-top: 3%;">
                <i :class="option.icon" style="font-weight: bolder;" />
              </div>
              <div v-else style="margin-right: 5%">
                <svg-icon :icon-class="option.icon" style="margin-right: 5px;" />
              </div>
              <div>
                <span class="contents">
                  <b class="label">
                    {{ option.name }}
                  </b>
                </span>
              </div>
            </div>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>

    <el-menu
      v-else-if="metadata.panelType !== 'form' && !isMobile"
      key="options-desktop"
      class="el-menu-demo"
      mode="horizontal"
      :unique-opened="true"
      style="z-index: 0"
      :menu-trigger="triggerMenu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-submenu index="menu">
        <template slot="title">
          <div :style="isMobile ? 'display: flex;width: auto;' : 'display: block;'">
            <span :style="metadata.required && isEmptyValue(valueField) ? 'border: aqua; color: #f34b4b' : 'border: aqua;'">
              <span key="is-field-name">
                {{ metadata.name }}
              </span>
            </span>
          </div>
        </template>
        <el-menu-item
          v-for="(option, key) in listOption"
          :key="key"
          :index="option.name"
        >
          <el-popover
            v-if="!isMobile"
            placement="top"
            trigger="click"
            style="padding: 0px; max-width: 400px"
            @hide="closePopover"
          >
            <component
              :is="option.componentRender"
              v-if="visibleForDesktop && showPanelFieldOption"
              :field-attributes="fieldAttributes"
              :source-field="fieldAttributes"
              :field-value="contextMenuField.valueField"
            />
            <el-button slot="reference" type="text" style="color: #606266;">
              <div class="contents">
                <div
                  v-if="!option.svg"
                  style="margin-right: 5%;padding-top: 3%;"
                >
                  <i :class="option.icon" style="font-weight: bolder;" />
                </div>
                <div v-else style="margin-right: 5%;; padding-left: 2%;">
                  <svg-icon :icon-class="option.icon" style="margin-right: 5px;" />
                </div>
                <div>
                  <span class="contents">
                    <b class="label">
                      {{ option.name }}
                    </b>
                  </span>
                </div>
              </div>
            </el-button>
          </el-popover>
        </el-menu-item>
      </el-submenu>
    </el-menu>

    <span v-else key="options-form">
      {{ metadata.name }}
    </span>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from '@vue/composition-api'
import { recursiveTreeSearch } from '@/utils/ADempiere/valueUtils.js'

export default defineComponent({
  name: 'FieldOptions',

  props: {
    metadata: {
      type: Object
    }
  },

  setup(props, { root }) {
    const visibleForDesktop = ref(false)
    const showPopoverPath = ref(false)
    const triggerMenu = ref('click')
    const optionColumnName = ref(root.$route.query.fieldColumnName)

    const isMobile = computed(() => {
      return root.$store.state.app.device === 'mobile'
    })

    const valueField = computed(() => {
      const { parentUuid, containerUuid, columnName } = props.metadata
      return root.$store.getters.getValueOfField({
        parentUuid,
        containerUuid,
        columnName
      })
    })

    setTimeout(() => {
      if (isMobile.value && optionColumnName.value === props.metadata.columnName) {
        root.$store.commit('changeShowRigthPanel', true)
        root.$store.dispatch('setOptionField', {
          fieldAttributes: props.metadata,
          name: root.$route.query.typeAction,
          valueField: valueField.value
        })
      } else {
        showPopoverPath.value = true
      }
    }, 2000)

    const panelContextMenu = computed(() => {
      return root.$store.state.contextMenu.isShowRightPanel
    })

    const isContextInfo = computed(() => {
      const field = props.metadata
      if (!field.isPanelWindow) {
        return false
      }
      return Boolean(field.contextInfo &&
        field.contextInfo.isActive) ||
        Boolean(field.reference &&
        field.reference.zoomWindows.length)
    })

    const showPanelFieldOption = computed(() => {
      return root.$store.state.contextMenu.isShowOptionField
    })

    const labelStyle = computed(() => {
      if (props.metadata.name.length >= 25) {
        return '35'
      } else if (props.metadata.name.length >= 20) {
        return '50'
      }
      return '110'
    })

    const contextMenuField = computed(() => {
      return root.$store.getters.getFieldContextMenu
    })

    const permissionRoutes = computed(() => {
      return root.$store.getters.permission_routes
    })

    const processOrderUuid = computed(() => {
      return root.$store.getters.getOrders
    })

    const isDocuemntStatus = computed(() => {
      if (props.metadata.isPanelWindow && !props.metadata.isAdvancedQuery) {
        if (props.metadata.columnName === 'DocStatus' && !root.isEmptyValue(processOrderUuid.value)) {
          return true
        }
      }
      return false
    })

    const redirect = ({ window }) => {
      const viewSearch = recursiveTreeSearch({
        treeData: permissionRoutes.value,
        attributeValue: window.uuid,
        attributeName: 'meta',
        secondAttribute: 'uuid',
        attributeChilds: 'children'
      })

      if (viewSearch) {
        root.$router.push({
          name: viewSearch.name,
          query: {
            action: 'advancedQuery',
            tabParent: 0,
            [props.metadata.columnName]: valueField
          }
        }, () => {})
      } else {
        root.$message({
          type: 'error',
          showClose: true,
          message: root.$t('notifications.noRoleAccess')
        })
      }
    }

    const handleCommand = (command) => {
      root.$store.commit('setRecordAccess', false)
      if (command.name === root.$t('table.ProcessActivity.zoomIn')) {
        if (!root.isEmptyValue(props.metadata.reference.zoomWindows)) {
          redirect({
            window: props.metadata.reference.zoomWindows[0]
          })
        }
        return
      }
      if (isMobile.value) {
        root.$store.commit('changeShowRigthPanel', true)
      } else {
        visibleForDesktop.value = true
      }

      root.$store.commit('changeShowPopoverField', true)
      root.$store.dispatch('setOptionField', {
        ...command,
        fieldAttributes: props.metadata
      })
    }

    const optionsList = computed(() => {
      const infoField = {
        name: root.$t('field.info'),
        enabled: true,
        svg: false,
        icon: 'el-icon-info',
        componentRender: () => import('@/components/ADempiere/Field/FieldOptions/contextInfo')
      }
      if (props.metadata.isAdvancedQuery) {
        return [
          infoField,
          {
            name: root.$t('operators.operator'),
            enabled: true,
            svg: false,
            icon: 'el-icon-rank',
            componentRender: () => import('@/components/ADempiere/Field/FieldOptions/operatorComparison')
          }
        ]
      }
      const menuOptions = [
        infoField
      ]
      if (!root.isEmptyValue(props.metadata.reference.zoomWindows)) {
         menuOptions.push({
          name: root.$t('table.ProcessActivity.zoomIn'),
          enabled: isContextInfo,
          svg: false,
          icon: 'el-icon-files',
          componentRender: () => import('@/components/ADempiere/Field/FieldOptions/contextInfo')
        })
      }
      menuOptions.push({
          name: root.$t('language'),
          enabled: props.metadata.isTranslatedField,
          svg: true,
          icon: 'language',
          componentRender: () => import('@/components/ADempiere/Field/FieldOptions/translated')
        },
        {
          name: root.$t('field.calculator'),
          enabled: props.metadata.isNumericField,
          recordDataFields: 11, // this.recordDataFields,
          valueField: valueField.value,
          svg: false,
          icon: 'el-icon-s-operation',
          componentRender: () => import('@/components/ADempiere/Field/FieldOptions/calculator')
        },
        {
          name: root.$t('field.preference'),
          enabled: true,
          valueField: valueField.value,
          svg: false,
          icon: 'el-icon-notebook-2',
          componentRender: () => import('@/components/ADempiere/Field/FieldOptions/preference')
        },
        {
          name: root.$t('field.logsField'),
          enabled: true,
          valueField: valueField.value,
          svg: true,
          icon: 'tree-table',
          componentRender: () => import('@/components/ADempiere/Field/FieldOptions/changeLogs')
        })
        return menuOptions
    })

    const openOptionField = computed({
      get() {
        const option = optionsList.value.find(option => {
          return root.$route.query.typeAction === option.name
        })
        if (!root.isEmptyValue(root.$route.query) && option) {
          return true
        }
        return false
      },
      set(value) {
        if (!value) {
          showPopoverPath.value = false
          root.$router.push({
            name: root.$route.name,
            query: {
              ...root.$route.query,
              typeAction: '',
              fieldColumnName: ''
            }
          }, () => {})
        }
      }
    })

    const listOption = computed(() => {
      return optionsList.value.filter(option => option.enabled)
    })

    const closePopover = () => {
      root.$router.push({
        name: root.$route.name,
        query: {
          ...root.$route.query,
          typeAction: '',
          fieldColumnName: ''
        }
      }, () => {})
    }
    const handleOpen = (key, keyPath) => {
      triggerMenu.value = 'hover'
    }
    const handleClose = (key, keyPath) => {
      triggerMenu.value = 'click'
    }
    const handleSelect = (key, keyPath) => {
      if (key === root.$t('table.ProcessActivity.zoomIn')) {
        redirect({
          window: props.metadata.reference.zoomWindows[0]
        })
        return
      }
      if (isMobile.value) {
        root.$store.commit('changeShowRigthPanel', true)
      } else {
        root.$store.commit('changeShowOptionField', true)
        visibleForDesktop.value = true
        root.$router.push({
          name: root.$route.name,
          query: {
            ...root.$route.query,
            typeAction: key,
            fieldColumnName: props.metadata.columnName
          }
        }, () => {})
      }
      root.$store.commit('changeShowPopoverField', true)
      const option = listOption.value.find(option => {
        return option.name === key
      })
      root.$store.dispatch('setOptionField', {
        ...option,
        fieldAttributes: props.metadata
      })
      triggerMenu.value = 'hover'
    }

    watch(panelContextMenu, (newValue, oldValue) => {
      visibleForDesktop.value = false
    })

    watch(openOptionField, (newValue, oldValue) => {
      if (!newValue) {
        showPopoverPath.value = false
      }
    })

    const fieldAttributes = ref(props.metadata)
    return {
      isMobile,
      labelStyle,
      contextMenuField,
      fieldAttributes,
      optionsList,
      closePopover,
      openOptionField,
      handleCommand,
      handleOpen,
      handleClose,
      handleSelect,
      isDocuemntStatus,
      visibleForDesktop,
      valueField,
      listOption,
      triggerMenu,
      showPanelFieldOption
    }
  }
})
</script>

<style>
.el-popover {
  position: fixed;
  padding: 0px;
}
.el-textarea {
  position: relative;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
  display: flex;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
  color: #535457e3;
}
</style>
<style scoped>
.el-form--label-top .el-form-item__label {
  padding-bottom: 0px !important;
  display: block;
}
.el-menu.el-menu--horizontal {
  border-bottom: solid 0px #E6E6E6;
}
.svg-icon {
  width: 1em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.el-dropdown .el-button-group {
  display: flex;
}
.el-dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 0px;
  margin: 0px;
  background-color: #FFFFFF;
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-height: 250px;
  max-width: 220px;
  overflow: auto;
}
.el-dropdown-menu--mini .el-dropdown-menu__item {
  line-height: 14px;
  padding: 0px 15px;
  padding-top: 1%;
  padding-right: 15px;
  padding-bottom: 1%;
  padding-left: 15px;
  font-size: 10px;
}
.el-dropdown-menu__item--divided {
  position: relative;
  /* margin-top: 6px; */
  border-top: 1px solid #e6ebf5;
}
.label {
  font-size: 14px;
  margin-top: 0% !important;
  margin-left: 0px;
  text-align: initial;
}
.description {
  margin: 0px;
  font-size: 12px;
  text-align: initial;
}
.contents {
  display: inline-flex;
}
</style>
