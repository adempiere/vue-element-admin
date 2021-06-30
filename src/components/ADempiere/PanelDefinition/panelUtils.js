
import { generateField } from '@/utils/ADempiere/dictionaryUtils'
import { getFieldTemplate } from '@/utils/ADempiere/lookupFactory'

export function generatePanelAndFields({
  parentUuid,
  containerUuid,
  panelMetadata: tabMetadata = {}
}) {
  const fieldAdditionalAttributes = {
    parentUuid,
    containerUuid,
    containerType: tabMetadata.containerType,
    // tab attributes
    tabTableName: tabMetadata.tableName,
    tabQuery: tabMetadata.query,
    tabWhereClause: tabMetadata.whereClause,
    // app attributes
    isShowedFromUser: true,
    isReadOnlyFromForm: false
  }

  let isWithUuidField = false // indicates it contains the uuid field
  let fieldLinkColumnName

  // convert fields and add app attributes
  const fieldsList = tabMetadata.fields.map((fieldItem, index) => {
    fieldItem = generateField({
      fieldToGenerate: fieldItem,
      moreAttributes: {
        ...fieldAdditionalAttributes,
        fieldsListIndex: index
      }
    })

    if (!isWithUuidField && fieldItem.columnName === 'UUID') {
      isWithUuidField = true
    }

    if (fieldItem.isParent) {
      fieldLinkColumnName = fieldItem.columnName
    }

    return fieldItem
  })

  // add field uuid column name
  if (!isWithUuidField) {
    const fieldUuid = getFieldTemplate({
      ...fieldAdditionalAttributes,
      fieldsListIndex: fieldsList.length,
      isShowedFromUser: false,
      name: 'UUID',
      columnName: 'UUID',
      componentPath: 'FieldText'
    })

    fieldsList.push(fieldUuid)
  }

  // panel for save on store
  const panel = {
    ...tabMetadata,
    containerUuid,
    fieldLinkColumnName,
    fieldsList,
    // app attributes
    isLoadedFieldsList: true,
    isShowedTotals: false
  }

  // delete unused and dupicated property with 'fieldsList'
  delete panel.fields

  return panel
}
