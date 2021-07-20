<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Elsio Sanchez elsiosanches@gmail.com www.erpya.com
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
  <div class="container-main">
    <el-row :gutter="12" style="height: 100% !important;">
      <transition name="slide-fade" style="height: 100% !important;">
        <el-col :span="8" class="container-main" :style="!isEmptyValue(position) ? {right: percent(position)} : ''">
          <el-card class="table">
            <div slot="header">
              {{ label }}
              <el-button type="text" icon="el-icon-close" style="float: right; padding: 3px 0" @click="closeContainer" />
            </div>
            <slot />
          </el-card>
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'AuxiliaryPanel',
  props: {
    // Container Title or Description
    label: {
      type: String,
      required: true
    },
    // Container opening position
    position: {
      type: String,
      default: ''
    }
  },

  setup(props, { root }) {
    const closeContainer = () => {
      root.$store.commit('setExternalContainer', false)
    }
    const percent = (position) => {
      if (position) {
        return '0%'
      }
      return ''
    }

    return {
      // methodo
      closeContainer,
      percent
    }
  }

})
</script>

<style>
  .el-card__body {
    height: 100% !important;
    padding: 20px;
  }
  .el-card__header {
    padding: 0px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
<style scoped>
.container-main{
  padding-left: 0px;
  padding-right: 0px;
  height: 100% !important;
  position: fixed;
  z-index: 5;
  top: 0px;
}
.table {
  padding: 20px;
  height: 100% !important;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .0s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
