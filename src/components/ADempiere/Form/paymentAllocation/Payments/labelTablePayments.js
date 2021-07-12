// ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
// Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
// Contributor(s): Elsio Sanchez elsiosanches@gmail.com www.erpya.com
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// List of fields to send in search
import language from '@/lang'

export default [
  {
    columnName: 'NrDocument',
    label: 'Nr Docuemnto',
    isNumeric: false,
    size: '200'
  },
  {
    columnName: 'Date',
    label: language.t('form.allocationPayments.table.date'),
    isNumeric: false,
    size: '200'
  },
  {
    columnName: 'description',
    label: language.t('form.allocationPayments.field.description'),
    isNumeric: false,
    size: '200'
  },
  {
    columnName: 'converted',
    label: language.t('form.allocationPayments.table.converted'),
    isNumeric: true,
    size: '200'
  },
  {
    columnName: 'applied',
    label: language.t('form.allocationPayments.table.applied'),
    isNumeric: true,
    size: '200'
  }
]
