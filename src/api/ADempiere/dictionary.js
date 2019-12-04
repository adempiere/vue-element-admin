import { getLanguage } from '@/lang/index'
import { getToken } from '@/utils/auth'
import Dictionary from '@adempiere/grpc-dictionary-client'
import { HOST_GRPC_DICTIONARY } from '@/api/ADempiere/constants'

// Get Instance for connection
function Instance() {
  return new Dictionary(
    HOST_GRPC_DICTIONARY,
    getToken(),
    getLanguage() || 'en_US'
  )
}

export function getWindow(uuid, childrenTabs = true) {
  return Instance.call(this).requestWindow(uuid, childrenTabs)
}

export function getProcess(uuid, isConvert = true) {
  return Instance.call(this).requestProcess(uuid, isConvert)
}

export function getBrowser(uuid, isConvert = true) {
  return Instance.call(this).requestBrowser(uuid, isConvert)
}

export function getTab(uuid, childrenFields = true) {
  return Instance.call(this).requestTab(uuid, childrenFields)
}

export function getField(uuid) {
  return Instance.call(this).requestField(uuid)
}
