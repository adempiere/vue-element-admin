// Get Instance for connection
function Instance() {
  const BusinessData = require('@adempiere/grpc-data-client')
  const { BUSINESS_DATA_ADDRESS } = require('@/api/ADempiere/constants')
  const { getLanguage } = require('@/lang/index')
  const { getToken, getCurrentOrganization, getCurrentWarehouse } = require('@/utils/auth')

  return new BusinessData({
    host: BUSINESS_DATA_ADDRESS,
    sessionUuid: getToken(),
    organizationUuid: getCurrentOrganization(),
    warehouseUuid: getCurrentWarehouse(),
    language: getLanguage() || 'en_US'
  })
}

// Get private access for a record
export function getPrivateAccessFromServer({ tableName, recordId, userUuid }) {
  return Instance.call(this).requestGetPrivateAccess({
    tableName,
    recordId,
    userUuid
  })
}

// Lock a record for a user
export function lockPrivateAccessFromServer({ tableName, recordId, userUuid }) {
  return Instance.call(this).requestLockPrivateAccess({
    tableName,
    recordId,
    userUuid
  })
}

// Unlock a record from a user
export function unlockPrivateAccessFromServer({ tableName, recordId, userUuid }) {
  return Instance.call(this).requestUnlockPrivateAccess({
    tableName,
    recordId,
    userUuid
  })
}
