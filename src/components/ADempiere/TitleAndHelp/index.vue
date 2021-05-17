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
  <h3 class="warn-content text-center">
    <el-popover
      v-if="!isEmptyValue(help)"
      ref="helpTitle"
      placement="top-start"
      :title="title"
      width="400"
      trigger="hover"
    >
      <div v-html="help" />
    </el-popover>

    <el-button
      v-popover:helpTitle
      type="text"
      :class="cssClassTitle + ' text-center'"
    >
      {{ title }}
    </el-button>

    <slot />
  </h3>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'TitleAndHelp',

  props: {
    name: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    }
  },

  setup(props, { root }) {
    const title = computed(() => {
      return props.name || root.$route.meta.title
    })

    const cssClassTitle = computed(() => {
      if (root.$store.state.app.device === 'mobile') {
        return 'custom-title-mobile'
      }
      return 'custom-title'
    })

    return {
      cssClassTitle,
      title
    }
  }

})
</script>
