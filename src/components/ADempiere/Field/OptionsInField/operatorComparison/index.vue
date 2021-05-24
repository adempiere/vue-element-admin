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
  <div class="operator-comparison">
    <span class="custom-tittle-popover">
      {{ $t('operators.compareSearch') }}:
    </span>
    <br>

    <el-select
      v-model="currentOperator"
      @change="changeOperator"
    >
      <el-option
        v-for="(item, key) in fieldAttributes.operatorsList"
        :key="key"
        :value="item"
        :label="$t('operators.' + item)"
      />
    </el-select>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'FieldOperatorComparison',

  props: {
    fieldAttributes: {
      type: Object,
      required: true
    }
  },

  setup(props, { root }) {
    const currentOperator = ref(props.fieldAttributes.operator)

    const changeOperator = (operatorValue) => {
      root.$store.dispatch('changeFieldAttribure', {
        containerUuid: props.fieldAttributes.containerUuid,
        columnName: props.fieldAttributes.columnName,
        attributeName: 'operator',
        attributeValue: operatorValue
      })
    }

    /**
     * @param {mixed} value, main value in component
     * @param {mixed} valueTo, used in end value in range
     * @param {string} label, or displayColumn to show in select
     */
    const handleChange = (value) => {
      // const sendParameters = {
      //   parentUuid: props.fieldAttributes.parentUuid,
      //   containerUuid: props.fieldAttributes.containerUuid,
      //   field: props.fieldAttributes,
      //   panelType: props.fieldAttributes.panelType,
      //   columnName: props.fieldAttributes.columnName,
      //   newValue: value === 'NotSend'
      //     ? currentOperator.value
      //     : value,
      //   isAdvancedQuery: true,
      //   isSendToServer: !(value === 'NotSend'),
      //   isSendCallout: false
      // }

      // root.$store.dispatch('notifyFieldChange', {
      //   ...sendParameters,
      //   isChangedOldValue: props.fieldAttributes.componentPath === 'FieldYesNo' && Boolean(value === 'NotSend')
      // })
    }

    // watch('fieldAttributes.operator', (newValue, oldValue) => {
    //   currentOperator.value = newValue
    //   if (!root.isEmptyValue(props.fieldAttributes.value) ||
    //     ['NULL', 'NOT_NULL'].includes(props.fieldAttributes.operator)) {
    //     handleChange(props.fieldAttributes.value)
    //   }
    // })

    return {
      currentOperator,
      handleChange,
      changeOperator
    }
  }
})
</script>

<style scoped lang="scss">
.custom-tittle-popover {
  font-size: 14px;
  font-weight: bold;
  float: left;
}

.operator-comparison {
  margin: 10px;
  padding: 10px;
}
</style>
