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

import store from '@/store'
import { isEmptyValue } from '@/utils/ADempiere/valueUtils.js'
import { zeroPad } from '@/utils/ADempiere/numberFormat.js'

/**
 * Convert all java date format to moment format. For know about java format
 * pattern see:
 * https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
 * Also you can read moment docus: https://momentjs.com/docs/
 */
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

/**
 * Format a date with specific format, if format is void use default date format
 * for language
 * @param {mixed} value
 * @param {string} fromat
 */
export function formatDate({
  value,
  format,
  isTime
}) {
  format = getDateFormat({
    isTime,
    format
  })

  if (isEmptyValue(value)) {
    // instance the objet Data with current date from client
    value = new Date()
  } else {
    if (typeof value !== 'object') {
      // instance the objet Data with date or time send
      value = new Date(value)
    }
  }

  return format
}

// Get default format or optional
export function getDateFormat({
  format,
  isDate = true,
  isTime = false
}) {
  if (!isEmptyValue(format)) {
    return format
  }

  // system format
  const languageDefinition = store.getters['getCurrentLanguageDefinition']
  if (languageDefinition) {
    return isTime ? languageDefinition.timePattern : languageDefinition.datePattern
  }
}

/**
 * Get date and time from client in a object value
 * @param {string} type Type value of return
 * @returns {object|string}
 * @deprecated TODO: replace with formatDate
 */
export function clientDateTime(date = null, type = '') {
  if (date == null || date === undefined || (typeof date === 'string' && date.trim() === '')) {
    // instance the objet Data with current date from client
    date = new Date()
  } else {
    // instance the objet Data with date or time send
    date = new Date(date)
  }

  const currentDate = date.getFullYear() +
    '-' + zeroPad(date.getMonth() + 1) +
    '-' + zeroPad(date.getDate())

  const currentTime = date.getHours() +
    ':' + date.getMinutes() +
    ':' + date.getSeconds()

  const currentDateTime = {
    date: currentDate,
    time: currentTime
  }

  if (type.toLowerCase() === 't') {
    // time format HH:II:SS
    return currentDateTime.time
  } else if (type.toLowerCase() === 'd') {
    // date format YYYY-MM-DD
    return currentDateTime.date
  } else if (type.toLocaleLowerCase() === 'o') {
    // object format
    return currentDateTime
  }
  return currentDateTime.date + ' ' + currentDateTime.time
}
