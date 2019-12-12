import { getLanguage } from '@/lang/index'
import { getToken } from '@/utils/auth'
import BusinessData from '@adempiere/grpc-data-client'
import { HOST_GRPC_DATA } from '@/api/ADempiere/constants'

// Get Instance for connection
function Instance() {
  return new BusinessData(
    HOST_GRPC_DATA,
    getToken(),
    getLanguage() || 'en_US'
  )
}

/**
 * Converted the gRPC value to the value needed
 * @param {object} grpcValue Value get of gRPC
 * @returns {mixed}
 */
export function convertValueFromGRPC(grpcValue) {
  return Instance.call(this).convertValueFromGRPC(grpcValue)
}

/**
 * Create entity
 * @param {string}  parameters.tableName
 * @param {array}   parameters.attributesList
 */
export function createEntity({ tableName, attributesList }) {
  return Instance.call(this).createEntity({
    tableName,
    attributesList
  })
}

/**
 * Update entity
 * @param {string}  tableName
 * @param {integer} recordId
 * @param {string}  recordUuid
 * @param {array}   attributesList
 */
export function updateEntity({ tableName, recordId, recordUuid, attributesList }) {
  return Instance.call(this).updateEntity({
    tableName,
    recordId,
    recordUuid,
    attributesList
  })
}

/**
 * Delete entity
 * @param {string}  tableName
 * @param {integer} recordId
 * @param {string}  recordUuid
 */
export function deleteEntity({ tableName, recordId, recordUuid }) {
  return Instance.call(this).deleteEntity({
    tableName,
    recordId,
    recordUuid
  })
}

export function getCriteria(tableName) {
  return Instance.call(this).getCriteria(tableName)
}

export function getObject(table, uuid = false, id = false) {
  return Instance.call(this).requestEntity({
    table,
    recordId: id,
    uuid
  })
}

/**
 * Object List from window
 * @param {string} tableName
 * @param {string} query
 * @param {string} whereClause
 * @param {array}  conditions
 * @param {string} orderByClause
 * @param {string} nextPageToken
 */
export function getObjectListFromCriteria({ tableName, query, whereClause, conditions = [], orderByClause, nextPageToken }) {
  return Instance.call(this).requestEntitiesList({
    tableName,
    query,
    whereClause,
    conditionsList: conditions,
    orderByClause,
    nextPageToken
  })
}

/**
 * Rollback entity (Create, Update, Delete)
 * @param {string} tableName
 * @param {integer} recordId
 * @param {string} eventType
 */
export function rollbackEntity({ tableName, recordId, eventType }) {
  return Instance.call(this).rollbackEntityRequest({
    tableName,
    recordId,
    eventTypeExecuted: eventType
  })
}

/**
 * Request a Lookup list data from Reference
 * The main attributes that function hope are:
 * @param {string} reference.tableName
 * @param {string} reference.query
 */
export function getLookupList(reference) {
  return Instance.call(this).requestLookupListFromReference(reference)
}

/**
 * Request a Lookup data from Reference
 * The main attributes that function hope are:
 * @param {string} reference.tableName
 * @param {string} reference.directQuery
 * @param {string|number} value
 */
export function getLookup(reference) {
  return Instance.call(this).requestLookupFromReference({
    tableName: reference.tableName,
    directQuery: reference.directQuery
  }, reference.value)
}

/**
 * Request a process
 * This function allows follow structure:
 * @param {string}  uuid, uuid from process to run
 * @param {integer} tableName, table name of tab, used only window
 * @param {integer} recordId, record identifier, used only window
 * @param {array}   parameters, parameters from process [{ columnName, value }]
 * @param {array}   selection, selection records, used only browser
      [{
          selectionId,
          selectionValues: [{ columnName, value }]
      }]
 */
export function runProcess({ uuid, reportType, tableName, recordId, parameters, selection }) {
  //  Run Process
  return Instance.call(this).requestRunProcess({
    uuid,
    reportType,
    tableName,
    recordId,
    parametersList: parameters,
    selection
  })
}

/**
 * Request a browser search
 * @param {string} uuid
 * @param {string} query
 * @param {string} whereClause
 * @param {string} orderByClause
 * @param {string}  nextPageToken
 * @param {array}  parameters, This allows follow structure:
 * [{
 *     columnName,
 *     value
 * }]
 */
export function getBrowserSearch({ uuid, parameters = [], query, whereClause, orderByClause, nextPageToken }) {
  //  Run browser
  return Instance.call(this).requestBrowserSearch({
    uuid,
    parametersList: parameters,
    query,
    whereClause,
    orderByClause,
    nextPageToken
  })
}

// Request a Process Activity list
export function requestProcessActivity() {
  //  Get Process Activity
  return Instance.call(this).requestProcessActivity()
}

export function getRecentItems() {
  return Instance.call(this).requestRecentItems()
}

/**
 * forget password
 * @param {string} parameters.forgetPassword
 */
export function getForgetPassword(parameters) {
  return Instance.call(this).requestForgetPassword(parameters)
}

/**
 * Reference List from Window
 * @param {string}  parameters.tableName
 * @param {string}  parameters.windowUuid
 * @param {string}  parameters.recordUuid
 * @param {integer} parameters.recordId
 */
export function getReferencesList(parameters) {
  var requestReference = Instance.call(this).getReferencesRequest()
  requestReference.setWindowuuid(parameters.windowUuid)
  requestReference.setTablename(parameters.tableName)
  requestReference.setUuid(parameters.recordUuid)
  if (parameters.recordId) {
    requestReference.setRecordid(parameters.recordId)
  }

  return Instance.call(this).listReferencesRequest(requestReference)
}

/**
 * Run callout request
 * @param {string}  parametersCallout.windowUuid
 * @param {integer} parametersCallout.windowNo
 * @param {string}  parametersCallout.tabUuid
 * @param {string}  parametersCallout.tableName
 * @param {string}  parametersCallout.columnName
 * @param {mixed}   parametersCallout.value
 * @param {mixed}   parametersCallout.oldValue
 * @param {string}  parametersCallout.callout
 * @param {array}   parametersCallout.attributesList
 * @returns {Map} Entity
 */
export function runCallOutRequest(parametersCallout) {
  return Instance.call(this).runCalloutRequest(parametersCallout)
}

export function getDefaultValueFromServer(query) {
  return Instance.call(this).getDefaultValue(query)
}

export function getContextInfoValueFromServer({ uuid, query }) {
  return Instance.call(this).getContextInfoValue({ uuid: uuid, query: query })
}

export function getPrivateAccessFromServer({ tableName: tableName, recordId: recordId, userUuid: userUuid }) {
  return Instance.call(this).getPrivateAccess({ tableName: tableName, recordId: recordId, userUuid: userUuid })
}

export function lockPrivateAccessFromServer({ tableName: tableName, recordId: recordId, userUuid: userUuid }) {
  return Instance.call(this).lockPrivateAccess({ tableName: tableName, recordId: recordId, userUuid: userUuid })
}

export function unlockPrivateAccessFromServer({ tableName: tableName, recordId: recordId, userUuid: userUuid }) {
  return Instance.call(this).unlockPrivateAccess({ tableName: tableName, recordId: recordId, userUuid: userUuid })
}

export function getFavoritesFromServer(userUuid) {
  return Instance.call(this).requestFavorites(userUuid)
}

export function getPendingDocumentsFromServer(userUuid, roleUuid) {
  return Instance.call(this).requestPendingDocuments(userUuid, roleUuid)
}

export function requestReportViews({ tableName, processUuid }) {
  return Instance.call(this).requestReportViews({ tableName: tableName, processUuid: processUuid })
}

export function requestPrintFormats({ tableName, reportViewUuid, processUuid }) {
  return Instance.call(this).requestPrintFormats({ tableName: tableName, reportViewUuid: reportViewUuid, processUuid: processUuid })
}
