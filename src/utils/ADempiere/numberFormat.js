// ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
// Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
// Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com www.erpya.com
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

import { isEmptyValue } from '@/utils/ADempiere/valueUtils.js'
import { formatPrice, formatQuantity } from '@/utils/ADempiere/valueFormat.js'
import {
  // currencies
  FIELDS_CURRENCY,
  //
  NUMBER, QUANTITY,
  // integers
  FIELDS_INTEGER
} from '@/utils/ADempiere/references.js'
import store from '@/store'

/**
 * Get Default currency ISO code
 */
export function getCurrency() {
  return store.getters.getCurrencyCode
}

export function getStandardPrecision() {
  return store.getters.getStandardPrecision
}

/**
 * Get country code from store
 */
export function getCountryCode() {
  return store.getters.getCountryLanguage
}

export function formatNumber({
  value,
  displayType,
  currency,
  country
}) {
  if (isEmptyValue(value)) {
    value = 0
  }

  let formattedNumber
  switch (displayType) {
    case (FIELDS_CURRENCY.includes(displayType) && displayType):
      formattedNumber = formatPrice(value, currency, country)
      break

    case NUMBER.id:
    case QUANTITY.id:
      formattedNumber = formatQuantity(value)
      break

    case (FIELDS_INTEGER.includes(displayType) && displayType):
    default:
      formattedNumber = formatQuantity(value, true)
      break
  }

  return formattedNumber
}

export function getTaxAmount(basePrice, taxRate) {
  if (isEmptyValue(basePrice) || isEmptyValue(taxRate)) {
    return 0
  }

  return (basePrice * taxRate) / 100
}

/**
 * zero pad
 * @author EdwinBetanc0urt <EdwinBetanc0urt@oulook.com>
 * @param {number|string} number
 * @param {number} pad
 * @returns {string}
 */
export function zeroPad(number, pad = 2) {
  const zero = Number(pad) - number.toString().length + 1
  return Array(+(zero > 0 && zero)).join('0') + number
}

/**
 * Convert exponetial to decimals quantity
 * @param {number} value ej: 314e-2, 4e+3
 * @returns ej: 3.14, 400
 */
export function formatExponential(value) {
  const regExpr = /(\d{1,})(e-)/g // number end e-
  const strValue = value.toString()

  if (regExpr.test(strValue)) {
    let exponential = strValue.replace(regExpr, '')

    if (isEmptyValue(exponential) || exponential <= 0) {
      exponential = getStandardPrecision()
    }

    // TODO: Verify with formatQuantity
    return Number.parseFloat(value)
      .toFixed(exponential)
  }

  return value
}
