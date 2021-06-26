
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'MenuRelations',

  setup(props, { root, parent }) {
    const {
      menuParentUuid
    } = parent._props

    const relationsList = computed(() => {
      let menuUuid = root.$route.params.menuParentUuid
      if (root.isEmptyValue(menuUuid)) {
        menuUuid = menuParentUuid
      }
      const relations = root.$store.getters.getRelations(menuUuid)
      if (!root.isEmptyValue(relations)) {
        if (!root.isEmptyValue(relations.children)) {
          return relations.children
        }
        if (relations.meta && !root.isEmptyValue(relations.meta.childs)) {
          return relations.meta.childs
        }
      }
      return []
    })

    const clickRelation = (item) => {
      let tabParent
      if (item.meta && item.meta.type === 'window') {
        tabParent = 0
      }
      root.$router.push({
        name: item.name,
        query: {
          tabParent
        }
      }, () => {})
    }

    return {
      // computeds
      relationsList,
      // methods
      clickRelation
    }
  }
})
