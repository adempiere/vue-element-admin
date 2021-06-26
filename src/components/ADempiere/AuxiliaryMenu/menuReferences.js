
import { computed, defineComponent, ref } from '@vue/composition-api'

import { zoomIn } from '@/utils/ADempiere/coreUtils.js'

export default defineComponent({
  name: 'MenuReferences',

  setup(props, { root, parent }) {
    const {
      containerUuid, parentUuid, panelType, tableName
    } = parent._props

    const isLoadedReferences = ref(false)
    const referencesList = ref([])

    const recordUuid = computed(() => {
      const { action } = root.$route.query
      return action
    })

    const isWindow = computed(() => {
      return panelType === 'window'
    })

    const isWithRecord = computed(() => {
      return !root.isEmptyValue(recordUuid.value) &&
        recordUuid.value !== 'create-new'
    })

    const isReferecesContent = computed(() => {
      if (isWindow.value && isWithRecord.value) {
        return true
      }
      return false
    })

    const isDisabledMenu = computed(() => {
      return !(isReferecesContent.value &&
        isLoadedReferences.value)
    })

    const getterReferences = computed(() => {
      if (isReferecesContent.value) {
        return root.$store.getters.getReferencesList(parentUuid, recordUuid.value)
      }

      return undefined
    })

    const openReference = (referenceElement) => {
      if (isDisabledMenu.value || root.isEmptyValue(referenceElement)) {
        return
      }

      if (referenceElement.windowUuid && referenceElement.recordUuid) {
        zoomIn({
          uuid: referenceElement.windowUuid,
          query: {
            action: referenceElement.type,
            referenceUuid: referenceElement.uuid,
            recordUuid: referenceElement.recordUuid,
            // windowUuid: parentUuid,
            tabParent: 0
          }
        })
      }
    }

    const getReferences = () => {
      const references = getterReferences.value
      if (!root.isEmptyValue(references)) {
        referencesList.value = references.referencesList
        isLoadedReferences.value = true
      } else {
        isLoadedReferences.value = false

        root.$store.dispatch('getReferencesListFromServer', {
          parentUuid: parentUuid,
          containerUuid: containerUuid,
          tableName: tableName,
          recordUuid: recordUuid.value
        })
          .then(responseReferences => {
            referencesList.value = responseReferences.referencesList
          })
          .finally(() => {
            isLoadedReferences.value = true
          })
      }
    }

    if (isReferecesContent.value) {
      getReferences()
    }

    return {
      referencesList,
      // computeds
      isLoadedReferences,
      isDisabledMenu,
      // methods
      openReference
    }
  }
})
