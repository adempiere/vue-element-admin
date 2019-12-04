import evaluator from '@/utils/ADempiere/evaluator'
import { isEmptyValue, parsedValueComponent } from '@/utils/ADempiere/valueUtil'
import { getParentFields, parseContext } from '@/utils/ADempiere/contextUtils'
import REFERENCES, { FIELD_NOT_SHOWED } from '@/components/ADempiere/Field/references'
import { FIELD_DISPLAY_SIZES, DEFAULT_SIZE } from '@/components/ADempiere/Field/fieldSize'
import language from '@/lang'

/**
 *
 * @param {object} fieldToGenerate
 * @param {object} moreAttributes
 * @param {boolean} typeRange
 */
export function generateField(fieldToGenerate, moreAttributes, typeRange = false) {
  let isShowedFromUser = false
  // verify if it no overwrite value with ...moreAttributes
  if (moreAttributes.isShowedFromUser) {
    isShowedFromUser = moreAttributes.isShowedFromUser
  }

  const componentReference = evalutateTypeField(fieldToGenerate.displayType, true)

  let parsedDefaultValue = fieldToGenerate.defaultValue
  if (String(parsedDefaultValue).includes('@')) {
    if (String(parsedDefaultValue).includes('@SQL=')) {
      parsedDefaultValue.replace('@SQL=', '')
    }
    parsedDefaultValue = parseContext({
      ...moreAttributes,
      columnName: fieldToGenerate.columnName,
      value: parsedDefaultValue
    })
  }
  parsedDefaultValue = parsedValueComponent({
    fieldType: componentReference.type,
    value: parsedDefaultValue,
    referenceType: componentReference.alias[0],
    isMandatory: fieldToGenerate.isMandatory
  })

  let parsedDefaultValueTo = fieldToGenerate.defaultValueTo
  if (String(parsedDefaultValueTo).includes('@')) {
    parsedDefaultValueTo = parseContext({
      ...moreAttributes,
      columnName: fieldToGenerate.columnName,
      value: fieldToGenerate.defaultValueTo
    })
  }
  parsedDefaultValueTo = parsedValueComponent({
    fieldType: componentReference.type,
    value: parsedDefaultValueTo,
    referenceType: componentReference.alias[0],
    isMandatory: fieldToGenerate.isMandatory
  })

  const field = {
    ...fieldToGenerate,
    ...moreAttributes,
    // displayed attributes
    componentPath: componentReference.type,
    isSupport: componentReference.support,
    referenceType: componentReference.alias[0],
    displayColumn: undefined, // link to value from selects and table
    // value attributes
    value: String(parsedDefaultValue).trim() === '' ? undefined : parsedDefaultValue,
    oldValue: parsedDefaultValue,
    valueTo: parsedDefaultValueTo,
    parsedDefaultValue: parsedDefaultValue,
    parsedDefaultValueTo: parsedDefaultValueTo,
    //
    isDisplayedFromLogic: fieldToGenerate.isDisplayed,
    isReadOnlyFromLogic: undefined,
    isMandatoryFromLogic: undefined,
    //
    parentFieldsList: getParentFields(fieldToGenerate),
    dependentFieldsList: [],
    // TODO: Add support on server
    // app attributes
    isShowedFromUser: isShowedFromUser,
    isShowedTableFromUser: fieldToGenerate.isDisplayed,
    isFixedTableColumn: false
  }

  // evaluate simple logics without context
  if (field.displayLogic.trim() !== '' && !field.displayLogic.includes('@')) {
    field.isDisplayedFromLogic = evaluator.evaluateLogic({
      type: 'displayed',
      logic: field.displayLogic
    })
  }
  if (field.mandatoryLogic.trim() !== '' && !field.mandatoryLogic.includes('@')) {
    field.isMandatoryFromLogic = evaluator.evaluateLogic({
      logic: field.mandatoryLogic
    })
  }
  if (field.readOnlyLogic.trim() !== '' && !field.readOnlyLogic.includes('@')) {
    field.isReadOnlyFromLogic = evaluator.evaluateLogic({
      logic: field.readOnlyLogic
    })
  }

  // Sizes from panel and groups
  field.sizeFieldFromType = FIELD_DISPLAY_SIZES.find(item => {
    return item.type === field.componentPath
  })
  if (field.sizeFieldFromType === undefined) {
    console.warn(`Field size no found: ${field.name} type: ${field.componentPath}`)
    field.sizeFieldFromType = {
      type: field.componentPath,
      size: DEFAULT_SIZE
    }
  }

  // Overwrite some values
  if (typeRange) {
    field.uuid = `${field.uuid}_To`
    field.columnName = `${field.columnName}_To`
    field.name = `${field.name} To`
    field.value = parsedDefaultValueTo
    field.defaultValue = field.defaultValueTo
    field.parsedDefaultValue = field.parsedDefaultValueTo
  }

  // hidden field type button
  const notShowedField = FIELD_NOT_SHOWED.find(itemField => {
    if (field.displayType === itemField.id) {
      return true
    }
  })
  if (notShowedField) {
    field.isDisplayedFromLogic = false
    field.isDisplayed = false
  }

  return field
}

/**
 *
 * @param {object} processToGenerate
 * @returns {object}
 */
export function generateProcess({ processToGenerate, isAssociated = false, containerUuidAssociated }) {
  const panelType = processToGenerate.isReport ? 'report' : 'process'
  const additionalAttributes = {
    processUuid: processToGenerate.uuid,
    processId: processToGenerate.id,
    processName: processToGenerate.name,
    containerUuid: processToGenerate.uuid,
    panelType: panelType
  }

  //  Convert from gRPC
  const fieldsRangeList = []
  let fieldDefinitionList = processToGenerate.parametersList
    .map(fieldItem => {
      const field = generateField(fieldItem, additionalAttributes)
      // Add new field if is range number
      if (field.isRange && field.componentPath === 'FieldNumber') {
        const fieldRange = generateField(fieldItem, additionalAttributes, true)
        if (!isEmptyValue(fieldRange.value)) {
          fieldRange.isShowedFromUser = true
        }
        fieldsRangeList.push(fieldRange)
      }

      // if field with value displayed in main panel
      if (!isEmptyValue(field.value)) {
        field.isShowedFromUser = true
      }

      return field
    })
  fieldDefinitionList = fieldDefinitionList.concat(fieldsRangeList)

  //  Get dependent fields
  fieldDefinitionList
    .filter(field => field.parentFieldsList && field.isActive)
    .forEach((field, index, list) => {
      field.parentFieldsList.forEach(parentColumnName => {
        var parentField = list.find(parentField => {
          return parentField.columnName === parentColumnName && parentColumnName !== field.columnName
        })
        if (parentField) {
          parentField.dependentFieldsList.push(field.columnName)
        }
      })
    })

  //  Default Action
  const actions = []
  actions.push({
    name: language.t('components.RunProcess'),
    processName: processToGenerate.name,
    type: 'action',
    action: 'startProcess',
    uuid: processToGenerate.uuid,
    id: processToGenerate.id,
    description: processToGenerate.description,
    isReport: processToGenerate.isReport,
    isDirectPrint: processToGenerate.isDirectPrint,
    reportExportType: undefined
  }, {
    name: language.t('components.ChangeParameters'),
    processName: processToGenerate.name,
    type: 'process',
    action: 'changeParameters',
    uuid: processToGenerate.uuid,
    id: processToGenerate.id,
    description: processToGenerate.description,
    isReport: processToGenerate.isReport,
    isDirectPrint: processToGenerate.isDirectPrint
  })

  const summaryAction = {
    name: language.t('components.RunProcessAs'),
    processName: processToGenerate.name,
    type: 'summary',
    action: '',
    childs: [],
    uuid: processToGenerate.uuid,
    id: processToGenerate.id,
    description: processToGenerate.description,
    isReport: processToGenerate.isReport,
    isDirectPrint: processToGenerate.isDirectPrint
  }
  processToGenerate.reportExportTypeList.forEach(actionValue => {
    //  Push values
    summaryAction.childs.push({
      name: `${language.t('components.ExportTo')} (${actionValue.name})`,
      processName: processToGenerate.name,
      type: 'action',
      action: 'startProcess',
      uuid: processToGenerate.uuid,
      id: processToGenerate.id,
      description: actionValue.description,
      isReport: processToGenerate.isReport,
      isDirectPrint: processToGenerate.isDirectPrint,
      reportExportType: actionValue.reportExportType
    })
  })
  //  Add summary Actions
  actions.push(summaryAction)

  const processDefinition = {
    ...processToGenerate,
    panelType: panelType,
    fieldList: fieldDefinitionList
  }

  return {
    processDefinition: processDefinition,
    actions: actions
  }
}

/**
 * Evaluate by the ID and name of the reference to call the component type
 * @param {integer} displayTypeId, received from data
 * @param {boolean} isAllInfo
 * @return string type, assigned value to folder after evaluating the parameter
 */
export function evalutateTypeField(displayTypeId, isAllInfo = false) {
  var component = REFERENCES.find(reference => displayTypeId === reference.id)
  if (isAllInfo) {
    return component
  }
  return component.type
}
