
import { isEmptyValue, recursiveTreeSearch } from '@/utils/ADempiere/valueUtils.js'
import { showMessage } from '@/utils/ADempiere/notification'
import router from '@/router'
import language from '@/lang'
import store from '@/store'

export function zoomIn({
  uuid,
  params = {},
  query = {}
}) {
  const menuTree = store.getters.permissionRoutes

  const viewSearch = recursiveTreeSearch({
    treeData: menuTree,
    attributeValue: uuid,
    attributeName: 'meta',
    secondAttribute: 'uuid',
    attributeChilds: 'children'
  })

  if (!isEmptyValue(viewSearch)) {
    router.push({
      name: viewSearch.name,
      params,
      query
    }, () => {})
  } else {
    showMessage({
      type: 'error',
      showClose: true,
      message: language.$t('notifications.noRoleAccess')
    })
  }
}
