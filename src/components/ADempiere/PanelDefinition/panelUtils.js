
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
    // tab attributes
    tabTableName: tabMetadata.tableName,
    tabQuery: tabMetadata.query,
    tabWhereClause: tabMetadata.whereClause,
    // app attributes
    isShowedFromUser: true,
    isReadOnlyFromForm: false
  }

  // convert fields and add app attributes
  const fieldsList = tabMetadata.fields.map((fieldItem, index) => {
    fieldItem = generateField({
      fieldToGenerate: fieldItem,
      moreAttributes: {
        ...fieldAdditionalAttributes,
        fieldsListIndex: index
      }
    })

    return fieldItem
  })

  // parent link column name
  let fieldLinkColumnName = fieldsList.find(fieldItem => {
    return fieldItem.isParent
  })
  if (fieldLinkColumnName) {
    fieldLinkColumnName = fieldLinkColumnName.columnName
  }

  // indicates it contains the uuid field
  const isWithUuidField = fieldsList.some(fieldItem => {
    return fieldItem.columnName === 'UUID'
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
