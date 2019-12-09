
// Convert action to action name for route
export function convertAction(action) {
  const actionAttributes = {
    name: '',
    icon: '',
    hidden: false,
    isIndex: false,
    component: () => import('@/views/ADempiere/Unsupported')
  }

  switch (action) {
    case 'B':
      actionAttributes.name = 'workbech'
      actionAttributes.icon = 'peoples'
      break
    case 'F':
      actionAttributes.name = 'workflow'
      actionAttributes.icon = 'example'
      break
    case 'P':
      actionAttributes.name = 'process'
      actionAttributes.icon = 'component'
      actionAttributes.component = () => import('@/views/ADempiere/Process')
      break
    case 'R':
      actionAttributes.name = 'report'
      actionAttributes.icon = 'skill'
      actionAttributes.component = () => import('@/views/ADempiere/Process')
      break
    case 'S':
      actionAttributes.name = 'browser'
      actionAttributes.icon = 'search'
      actionAttributes.component = () => import('@/views/ADempiere/Browser')
      break
    case 'T':
      actionAttributes.name = 'task'
      actionAttributes.icon = 'size'
      break
    case 'W':
      actionAttributes.name = 'window'
      actionAttributes.icon = 'tab'
      actionAttributes.component = () => import('@/views/ADempiere/Window')
      break
    case 'X':
      actionAttributes.name = 'form'
      actionAttributes.icon = 'form'
      break
    default:
      actionAttributes.name = 'summary'
      actionAttributes.icon = 'nested'
      // actionAttributes.hidden = true
      actionAttributes.isIndex = true
      actionAttributes.component = () => import('@/views/ADempiere/Summary')
      break
  }
  return actionAttributes
}
