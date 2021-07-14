<!--
 ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
 Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
 Contributor(s): Elsio Sanchez elsiosanchez@erpya.com www.erpya.com
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
  <el-tabs type="border-card">
    <el-tab-pane :label="$t('form.bankStatementMatch.title.importedMovements')">
      <table-from
        :ref-table="ref"
        :records-data="movementsList"
        :label="labelTable"
        :selection="selectMovement"
        :add-selection="addMovement"
        :is-selection="true"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import labelTable from './labelTable.js'
import tableFrom from '../tableFrom'

export default {
  name: 'ImportedMovements',
  components: {
    tableFrom
  },
  data() {
    return {
      labelTable,
      ref: 'ImportedMovements',
      addMovement: 'selectMovement'
    }
  },
  computed: {
    movementsList() {
      return this.$store.getters.getImportedMovements.record
    },
    selectMovement() {
      return this.$store.getters.getImportedMovements.selectedRecord
    }
  }
}
</script>
