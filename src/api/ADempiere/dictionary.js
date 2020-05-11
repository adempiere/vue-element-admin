// Get Instance for connection
function Instance() {
  const Dictionary = require('@adempiere/grpc-dictionary-client')
  const { DICTIONARY_ADDRESS } = require('@/api/ADempiere/constants')
  const { getLanguage } = require('@/lang/index')
  const { getToken } = require('@/utils/auth')

  return new Dictionary(
    DICTIONARY_ADDRESS,
    getToken(),
    getLanguage() || 'en_US'
  )
}

export function getWindow(uuid, isWithTabs = true) {
  return Instance.call(this).requestWindow({
    uuid,
    isWithTabs,
    isConvertedMetadata: true
  })
}

export function getProcess(uuid, isConvertedMetadata = true) {
  return Instance.call(this).requestProcess({
    uuid: uuid,
    isConvertedMetadata,
    isConvertedFields: true
  })
}

export function getBrowser(uuid, isConvertedMetadata = true) {
  return Instance.call(this).requestBrowser({
    uuid,
    isConvertedMetadata,
    isConvertedFields: true
  })
}

export function getTab(uuid, isWithFields = true, isConvertedMetadata = true) {
  return Instance.call(this).requestTab({
    uuid,
    isWithFields,
    isConvertedMetadata,
    isConvertedFields: true
  })
}

export function getField({
  fieldUuid,
  columnUuid,
  elementUuid,
  // TableName + ColumnName
  tableName,
  columnName,
  elementColumnName
}) {
  return Instance.call(this).requestField({
    fieldUuid,
    columnUuid,
    elementUuid,
    // TableName + ColumnName
    tableName,
    columnName,
    elementColumnName
  })
}

/**
 * Request Form
 * @param {string} uuid
 * @param {number} id, integer identifier
 */
export function requestForm({ uuid, id }) {
  return Instance.call(this).requestForm({
    uuid,
    id
  })
}

export function requestReference({ referenceUuid, columnName }) {
  return Instance.call(this).requestReference({
    referenceUuid,
    columnName
  })
}

export function requestValidationRule({ validationRuleUuid }) {
  return Instance.call(this).requestValidationRule({
    validationRuleUuid
  })
}
