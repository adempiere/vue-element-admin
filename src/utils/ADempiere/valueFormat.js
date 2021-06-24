// ADempiere-Vue (Frontend) for ADempiere ERP & CRM Smart Business Solution
// Copyright (C) 2017-Present E.R.P. Consultores y Asociados, C.A.
// Contributor(s): Yamel Senih ysenih@erpya.com www.erpya.com
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

// A util class for handle format for time, date and others values to beused to display information
// Note that this file use moment library for a easy conversion
import moment from 'moment'
import language from '@/lang'
import { isEmptyValue } from '@/utils/ADempiere/valueUtils.js'
import store from '@/store'
import {
  DATE, DATE_PLUS_TIME, TIME,
  FIELDS_QUANTITY,
  ID,
  isLookup,
  YES_NO
} from '@/utils/ADempiere/references.js'
import { formatNumber, getCountryCode, getStandardPrecision, getCurrency } from '@/utils/ADempiere/numberFormat.js'

/**
 * Convert string values ('Y' or 'N') to component compatible Boolean values
 * @param {mixed} valueToParsed
 */
export const convertStringToBoolean = (valueToParsed) => {
  const valueString = String(valueToParsed).trim()
  if (['N', 'false'].includes(valueString)) {
    return false
  } else if (['Y', 'true'].includes(valueString)) {
    return true
  }

  return valueToParsed
}

export const convertBooleanToString = (booleanValue) => {
  if (booleanValue || booleanValue === 'true') {
    return 'Y'
  }
  return 'N'
}

/**
 * Convert boolean value to current translation language
 * @param {boolean} booleanValue
 * @returns {string} true => 'Yes' or 'Si', false => 'Not' or 'No'
 */
export const convertBooleanToTranslationLang = (booleanValue) => {
  if (booleanValue || booleanValue === 'true') {
    return language.t('components.switchActiveText')
  }
  return language.t('components.switchInactiveText')
}

/**
 * Convert a object to array pairs
 * @param {object} object, object to convert
 * @param {string} nameKey, name from key in pairs
 * @param {string} nameValue, name from value in pairs
 * @returns {array} [ { nameKey: key, nameValue: value } ]
 */
export function convertObjectToKeyValue({
  object,
  keyName = 'columnName',
  valueName = 'value'
}) {
  return Object.keys(object).map(key => {
    const returnPairs = {}
    returnPairs[keyName] = key
    returnPairs[valueName] = object[key]
    return returnPairs
  })
}

/**
 * Convert array pairs of object to literal object { key: value }
 * @param {array} array, Array to convert
 * @param {string} keyName, name from key in pairs
 * @param {string} valueName, name from value in pairs
 * @returns {object} { key: value, key2: value2 }
 */
export function convertArrayKeyValueToObject({
  array,
  keyName = 'columnName',
  valueName = 'value'
}) {
  const result = {}
  array.forEach(element => {
    result[element[keyName]] = element[valueName]
  })

  return result
}

/**
 * Convert map of pairs to literal object
 * @param {object} object
 * @returns {map}
 */
export function convertObjectToHasMap({ object }) {
  return new Map(
    Object.entries(object)
  )
}

/**
 * Convert map of pairs to literal object
 * @param {map} hasMapToConvert
 * @returns {object} { key: value, key2: value2 }
 */
export function convertHasMapToObject({ map }) {
  return Object.fromEntries(map)
}

// This function just convert all java date format to moment format.
// For know about java format pattern see: https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
// Also you can read moment docus: https://momentjs.com/docs/
export function convertDateFormat(dateFormat) {
  return dateFormat
    //	Year
    .replace(/\byy\b/g, 'YY')
    .replace(/\byyyy\b/g, 'YYYY')
    //	Short Day of month
    .replace(/\bdd\b/g, 'DD')
    // Week of Year
    .replace(/\bw\b/g, 'W')
    // Long Day
    .replace(/\bEEE\b/g, 'ddd')
    .replace(/\bu\b/g, 'dddd')
    // Hour
    .replace(/\bhh\b/g, 'h')
    .replace(/\bK\b/g, 'h')
    .replace(/\baaa\b/g, 'a')
    // Hour 24
    .replace(/\bk\b/g, 'HH')
    // Day of Year
    .replace(/\bD\b/g, 'DDD')
    // Day of Week
    .replace(/\bF\b/g, 'R')
    // Time zone
    .replace(/\bz\b/g, 'Z')
}

// Format a date with specific format, if format is void use default date format for language
export function formatDate(date, isTime = false) {
  if (isEmptyValue(date)) {
    return undefined
  }
  //  Format
  return moment.utc(date).format(getDateFormat({
    isTime
  }))
}

/**
 * Get formatted price and show currency
 * @param {number} value
 * @param {string} currency default 'USD'
 * @returns {string} number format with thousands separator, precision, currency format
 */
export function formatPrice(value, currency, country) {
  if (isEmptyValue(value)) {
    value = 0
  }

  if (isEmptyValue(currency)) {
    currency = getCurrency()
  }

  // const precision = getStandardPrecision()

  if (isEmptyValue(country)) {
    country = getCountryCode()
  }

  // get formatted currency number
  return new Intl.NumberFormat(country, {
    style: 'currency',
    currency,
    useGrouping: true,
    // minimumFractionDigits: precision,
    // maximumFractionDigits: precision,
    minimumIntegerDigits: 1
  }).format(value)
}

/**
 * Get formatted number, integer and decimal
 * @param {number} value
 * @returns {string} number format with thousands separator, precision
 * @returns {boolean} number format without precision
 */
export function formatQuantity(value, isInteger = false) {
  if (isEmptyValue(value)) {
    value = 0
  }

  let precision = getStandardPrecision()
  // without decimals
  if (isInteger) {
    // if (Number.isInteger(value)) {
    precision = 0
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
 * @returns {string} number format with percentage
 */
export function formatPercent(value) {
  if (isEmptyValue(value)) {
    value = 0
  }

  // get formatted number
  return new Intl.NumberFormat(getCountryCode(), {
    style: 'percent'
  }).format(value)
}

/**
 * Return a format for field depending of reference for him
 */
export function formatField({
  value,
  displayedValue,
  defaultValue,
  displayType,
  optionalFormat
}) {
  //  format
  let formattedValue

  switch (displayType) {
    case (isLookup(displayType) && displayType):
      if (isEmptyValue(displayedValue) && value === 0) {
        // TODO: Verify parsedDefaultValue with getDefaultValue
        formattedValue = defaultValue
        break
      }
      formattedValue = displayedValue
      break

    case DATE.id:
      formattedValue = moment.utc(value).format(getDateFormat({
        format: optionalFormat
      }))
      break

    case DATE_PLUS_TIME.id:
    case TIME.id:
      formattedValue = moment.utc(value).format(getDateFormat({
        isTime: true
      }))
      break

    case ID.id:
    case (FIELDS_QUANTITY.includes(displayType) && displayType):
      formattedValue = formatNumber({
        value,
        displayType
      })
      break

    case YES_NO.id:
      formattedValue = convertBooleanToTranslationLang(value)
      break

    // without format (String value)
    default:
      formattedValue = value
      break
  }

  return formattedValue
}

// Get default format without format pattern
export function getDefaultFormat(isTime) {
  return getDateFormat({
    isTime
  })
}

// Get default format or optional
function getDateFormat({
  format,
  isTime
}) {
  if (format) {
    return format
  }
  //  Else
  const languageDefinition = store.getters['getCurrentLanguageDefinition']
  if (languageDefinition) {
    return isTime ? languageDefinition.timePattern : languageDefinition.datePattern
  }
}

/**
 * Removes the % of a text string, only from the beginning and end if they exist,
 * this in case you need to use a match or local search to find matches between
 * text strings.
 * @param {string} stringToParsed ej: '%qwerty asd%' | '%zxc 123'
 * @returns {string} ej: 'qwerty asd' | 'zxc 123'
 */
export function trimPercentage(stringToParsed) {
  if (isEmptyValue(stringToParsed) || !String(stringToParsed).includes('%')) {
    return stringToParsed
  }

  let parsedValue = stringToParsed
  if (parsedValue[0] === '%') {
    parsedValue = parsedValue.slice(1)
  }

  const wordSize = parsedValue.length - 1
  if (parsedValue[wordSize] === '%') {
    parsedValue = parsedValue.slice(0, wordSize)
  }

  return parsedValue
}
