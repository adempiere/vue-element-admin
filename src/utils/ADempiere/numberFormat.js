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
import { INTEGER } from '@/utils/ADempiere/references.js'
import store from '@/store'

/**
 * Get Default currency ISO code
 */
export function getCurrency() {
  return store.getters.getCurrency.iSOCode
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

/**
 * Get formatted price and show currency
 * @param {number} value
 * @param {string} currencyCode
 * @param {string} countryCode
 * @param {number} precision
 */
export function formatPrice({
  value,
  currencyCode,
  countryCode,
  precision
}) {
  if (isEmptyValue(value)) {
    value = 0
  }

  if (isEmptyValue(currencyCode)) {
    currencyCode = getCurrency()
  }

  if (isEmptyValue(countryCode)) {
    countryCode = getCountryCode()
  }

  if (isEmptyValue(precision)) {
    precision = getStandardPrecision()
  }

  // get formatted currency number
  return new Intl.NumberFormat(countryCode, {
    style: 'currency',
    currency: currencyCode,
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value)
}

export function getTaxAmount(basePrice, taxRate) {
  if (isEmptyValue(basePrice) || isEmptyValue(taxRate)) {
    return 0
  }

  return (basePrice * taxRate) / 100
}

/**
 * Get formatted number, integer and decimal
 * @param {number} value
 * @param {number} precision
 * @param {number} displayType
 */
export function formatQuantity({
  value,
  precision,
  displayType
}) {
  if (isEmptyValue(value)) {
    value = 0
  }

  if (displayType === INTEGER.id) {
    // without decimals
    precision = 0
  }
  // if (!Number.isInteger(value)) {
  //   return value
  // }

  if (isEmptyValue(precision)) {
    precision = getStandardPrecision()
  }

  // get formatted decimal number
  return new Intl.NumberFormat(undefined, {
    useGrouping: true, // thousands separator
    minimumIntegerDigits: 1,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value)
}

/**
 * Format percentage based on Intl library
 * @param {number} value
 */
export function formatPercent(value) {
  if (isEmptyValue(value)) {
    return undefined
  }

  // get formatted number
  return new Intl.NumberFormat(getCountryCode(), {
    style: 'percent'
  }).format(value)
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

    // return formatQuantity({
    //   value,
    //   precision: exponential
    // })
    return Number.parseFloat(value)
      .toFixed(exponential)
  }

  return value
}
