// A simple class for make easy lookup for dynamic forms from ADempiere Meta-Data
// note that it can be used for create meta-data for lookups
// Field component: this component is created dinamically from meta-data and can be used for
// many form incluyed Window/Tab/Fields, Process and Smart Browsers
// The aproach for this file is allows define field type manual and allows get metadata from server
// Exists many attributes fro handle behavior of field, the follow is a example:
// General:
// - columnName:
// - name:
// - help
// - inTable:
// - isAdvancedQuery:
// - isMandatory:
// - isMandatoryFromLogic
// - isReadOnly:
// - isDisplayed:
// - isShowedFromUser
// - isActive:
// - isSelectCreated:
// - isAlwaysUpdateable:
// - parentUuid:
// - containerUuid:
// - value:
// Lookup:
// - query:
// - directQuery:
// - tableName:
// Date and Time:
// - isRange
// - vFormat
// - valueTo
// - valueMax
// - valueMin
// Number:
// - isRange
// - valueTo
// - valueMax
// - valueMin
// Text:
// - isEncrypted
// - fieldLength
// Select:
// - isSelectCreated (created from ui for multi-selection)
// - query
// - directQuery
// - tableName
// - displayColumn
// - defaultValue

import { TEXT } from '@/utils/ADempiere/references'
import { evalutateTypeField } from '@/utils/ADempiere/dictionaryUtils'
import { isEmptyValue } from '@/utils/ADempiere/valueUtils'
import evaluator, { getContext, getParentFields } from '@/utils/ADempiere/contextUtils'
import FIELDS_DISPLAY_SIZES, { DEFAULT_SIZE } from '@/components/ADempiere/Field/fieldSize'

export function createField({
  parentUuid,
  containerUuid,
  tableName,
  columnName,
  definition = {}
}) {
  if (!isEmptyValue(definition)) {
    if (isEmptyValue(definition.displayType)) {
      definition.displayType = TEXT.id
    }
    if (isEmptyValue(definition.isActive)) {
      definition.isActive = true
    }
    if (isEmptyValue(definition.isDisplayed)) {
      definition.isDisplayed = true
    }
    if (isEmptyValue(definition.isDisplayedFromLogic)) {
      definition.isDisplayedFromLogic = true
    }
    if (isEmptyValue(definition.isReadOnly)) {
      definition.isReadOnly = false
    }

    if (isEmptyValue(definition.isMandatory)) {
      definition.isMandatory = false
    }
    if (isEmptyValue(definition.sequence)) {
      definition.sequence = 0
      if (definition.isDisplayed) {
        definition.sequence = 10
      }
    }

    let reference = {}
    if (!isEmptyValue(definition.directQuery) || !isEmptyValue(definition.query)) {
      reference = {
        directQuery: definition.directQuery,
        query: definition.query,
        tableName: definition.tableName || undefined,
        keyColumnName: definition.keyColumnName || undefined,
        validationCode: definition.validationCode || undefined,
        windowsList: definition.windowsList || []
      }
      delete definition.directQuery
      delete definition.query
      delete definition.tableName
      delete definition.validationCode
      delete definition.windowsList
    }
    definition.reference = reference
  }

  // Special cases
  // Please if you need use a special case remember that already exists many implementations
  // switch (displayType) {
  //   case TEXT.id:
  //     break
  // }

  return getFieldTemplate({
    ...definition,
    isCustomField: true,
    isShowedFromUser: true,
    parentUuid,
    containerUuid,
    columnName,
    tableName
  })
}

// Default template for injected fields
export function getFieldTemplate(attributesOverwrite) {
  let displayType = 10
  if (!isEmptyValue(attributesOverwrite.displayType)) {
    displayType = attributesOverwrite.displayType
  }

  const componentReference = evalutateTypeField(displayType)
  const referenceType = componentReference.alias[0]

  let sizeFieldFromType = FIELDS_DISPLAY_SIZES.find(item => {
    return item.type === componentReference.type
  })
  if (isEmptyValue(sizeFieldFromType)) {
    sizeFieldFromType = {
      type: referenceType,
      size: DEFAULT_SIZE.size
    }
  }

  const fieldTemplateMetadata = {
    id: 0,
    uuid: '',
    name: '',
    description: '',
    help: '',
    columnName: '',
    fieldGroup: {
      name: '',
      fieldGroupType: ''
    },
    displayType,
    componentPath: componentReference.type,
    referenceType,
    isFieldOnly: false,
    isRange: false,
    isSameLine: false,
    sequence: 0,
    seqNoGrid: 0,
    isIdentifier: 0,
    isKey: false,
    isSelectionColumn: false,
    isUpdateable: true,
    formatPattern: undefined,
    VFormat: undefined,
    value: undefined,
    valueTo: undefined,
    defaultValue: undefined,
    parsedDefaultValue: undefined,
    defaultValueTo: undefined,
    parsedDefaultValueTo: undefined,
    valueMin: undefined,
    valueMax: undefined,
    //
    isDisplayed: false,
    isActive: true,
    isMandatory: false,
    isReadOnly: false,
    isDisplayedFromLogic: undefined,
    isReadOnlyFromLogic: undefined,
    isMandatoryFromLogic: undefined,
    // browser attributes
    callout: undefined,
    isQueryCriteria: false,
    displayLogic: undefined,
    mandatoryLogic: undefined,
    readOnlyLogic: undefined,
    parentFieldsList: undefined,
    dependentFieldsList: [],
    reference: {
      tableName: '',
      keyColumnName: '',
      query: '',
      directQuery: '',
      validationCode: '',
      windowsList: []
    },
    contextInfo: undefined,
    isShowedFromUser: false,
    isFixedTableColumn: false,
    sizeFieldFromType,
    ...attributesOverwrite
  }

  // get parsed parent fields list
  fieldTemplateMetadata.parentFieldsList = getParentFields(fieldTemplateMetadata)

  // evaluate logics
  const setEvaluateLogics = {
    parentUuid: fieldTemplateMetadata.parentUuid,
    containerUuid: fieldTemplateMetadata.containerUuid,
    context: getContext
  }
  if (!isEmptyValue(fieldTemplateMetadata.displayLogic)) {
    fieldTemplateMetadata.isDisplayedFromLogic = evaluator.evaluateLogic({
      ...setEvaluateLogics,
      logic: fieldTemplateMetadata.displayLogic
    })
  }
  if (!isEmptyValue(fieldTemplateMetadata.mandatoryLogic)) {
    fieldTemplateMetadata.isMandatoryFromLogic = evaluator.evaluateLogic({
      ...setEvaluateLogics,
      logic: fieldTemplateMetadata.mandatoryLogic
    })
  }
  if (!isEmptyValue(fieldTemplateMetadata.readOnlyLogic)) {
    fieldTemplateMetadata.isReadOnlyFromLogic = evaluator.evaluateLogic({
      ...setEvaluateLogics,
      logic: fieldTemplateMetadata.readOnlyLogic
    })
  }

  return fieldTemplateMetadata
}
