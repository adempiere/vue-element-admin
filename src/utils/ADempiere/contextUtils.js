import { isEmptyValue } from '@/utils/ADempiere/valueUtils'
import evaluator from '@/utils/ADempiere/evaluator'

export default evaluator

/**
 * Extracts the associated fields from the logics or default values
 * @param {string} displayLogic
 * @param {string} mandatoryLogic
 * @param {string} readOnlyLogic
 * @param {string} defaultValue
 */
export function getParentFields({ displayLogic, mandatoryLogic, readOnlyLogic, defaultValue }) {
  let parentFields = []
  //  For Display logic
  if (displayLogic) {
    parentFields = Array.from(new Set([
      ...parentFields,
      ...evaluator.parseDepends(displayLogic)
    ]))
  }
  //  For Mandatory Logic
  if (mandatoryLogic) {
    parentFields = Array.from(new Set([
      ...parentFields,
      ...evaluator.parseDepends(mandatoryLogic)
    ]))
  }
  //  For Read Only Logic
  if (readOnlyLogic) {
    parentFields = Array.from(new Set([
      ...parentFields,
      ...evaluator.parseDepends(readOnlyLogic)
    ]))
  }
  //  For Default Value
  if (defaultValue) {
    parentFields = Array.from(new Set([
      ...parentFields,
      ...evaluator.parseDepends(defaultValue)
    ]))
  }
  return parentFields
}

/**
 * Parse Context String
 * @param {string} value: (REQUIRED) String to parsing
 * @param {string} parentUuid: (REQUIRED from Window) UUID Window
 * @param {string} containerUuid: (REQUIRED) UUID Tab, Process, SmartBrowser, Report and Form
 * @param {string} columnName: (Optional if exists in value) Column name to search in context
 * @param {boolean} isBoolToString, convert boolean values to string
 */
export function parseContext({
  parentUuid,
  containerUuid,
  columnName,
  value,
  isSQL = false
}) {
  const store = require('@/store')
  const getContext = (parametersToGetContext) => store.default.getters.getContext(parametersToGetContext)
  const isBooleanToString = value.includes('@SQL=')
  let isError = false
  const errorsList = []
  value = String(value)

  if (isEmptyValue(value)) {
    return {
      value: undefined,
      isError: true,
      errorsList: []
    }
  }
  if (value.includes('@SQL=')) {
    value = value.replace('@SQL=', '')
  }
  // var instances = value.length - value.replace('@', '').length
  // if ((instances > 0) && (instances % 2) !== 0) { // could be an email address
  //   return value
  // }

  var token
  var inStr = value
  var outStr = ''

  let firstIndexTag = inStr.indexOf('@')

  while (firstIndexTag !== -1) {
    outStr = outStr + inStr.substring(0, firstIndexTag) // up to @
    inStr = inStr.substring(firstIndexTag + 1, inStr.length) // from first @
    const secondIndexTag = inStr.indexOf('@') // next @
    // no exists second tag
    if (secondIndexTag < 0) {
      console.log(`No second tag: ${inStr}`)
      return {
        value: undefined,
        isError: true,
        errorsList
      }
    }

    token = inStr.substring(0, secondIndexTag)
    columnName = token

    var ctxInfo = getContext({
      parentUuid,
      containerUuid,
      columnName
    }) // get context
    if (isBooleanToString && typeof ctxInfo === 'boolean') {
      ctxInfo = 'N'
      if (ctxInfo) {
        ctxInfo = 'Y'
      }
    }

    if ((ctxInfo === undefined || ctxInfo.length === 0) &&
      (token.startsWith('#') || token.startsWith('$'))) {
      ctxInfo = getContext({
        columnName
      }) // get global context
    }
    if (ctxInfo === undefined || ctxInfo.length === 0) {
      console.info(`No Context for: ${token}`)
      isError = true
      errorsList.push(token)
    } else {
      if (typeof ctxInfo === 'object') {
        outStr = ctxInfo
      } else {
        outStr = outStr + ctxInfo // replace context with Context
      }
    }

    inStr = inStr.substring(secondIndexTag + 1, inStr.length) // from second @
    firstIndexTag = inStr.indexOf('@')
  }
  if (typeof ctxInfo !== 'object') {
    outStr = outStr + inStr // add the rest of the string
  }
  if (isSQL) {
    return {
      query: outStr,
      value: ctxInfo
    }
  }
  return {
    value: outStr,
    isError,
    errorsList
  }
} // parseContext

/**
 *  Get Preference.
 *  <pre>
 *      0)  Current Setting
 *      1)  Window Preference
 *      2)  Global Preference
 *      3)  Login settings
 *      4)  Accounting settings
 *  </pre>
 *  @param  ctx context
 *  @param  AD_Window_ID window no
 *  @param  context     Entity to search
 *  @param  system      System level preferences (vs. user defined)
 *  @return preference value
 */
export function getPreference(ctx, AD_Window_ID, context, system) {
  if (ctx === null || context === null) {
    console.warn('Require Context')
  }

  let retValue = null

  if (system) {
    //  System Preferences
    // Login setting
    retValue = ctx.getProperty('#' + context)
    if (retValue == null) {
      //  Accounting setting
      retValue = ctx.getProperty('$' + context)
    }
  } else {
    //  User Preferences
    // Window Pref
    retValue = ctx.getProperty('P' + AD_Window_ID + '|' + context)
    if (retValue == null) {
      //  Global Pref
      retValue = ctx.getProperty('P|' + context)
    }
  }

  return retValue == null ? '' : retValue
} //  getPreference
