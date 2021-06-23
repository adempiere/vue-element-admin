
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'MenuRelations',

  setup(props, { root }) {
    const relationsList = computed(() => {
      let menuUuid = root.$route.params.menuParentUuid
      if (root.isEmptyValue(menuUuid)) {
        menuUuid = null // this.menuParentUuid
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

    const isEmptyChilds = computed(() => {
      const childs = relationsList.value
      const len = childs.length
      if (len < 1) {
        return true
      }
      if (len === 1) {
        // diferent to current view
        return childs[0].meta.uuid === root.$route.meta.uuid
      }
      return false
    })

    const getChilds = (item) => {
      if (!root.isEmptyValue(item.children)) {
        return item.children
      }
      if (item.meta && !root.isEmptyValue(item.meta.childs)) {
        return item.meta.childs
      }
      return []
    }

    const clickRelation = (item) => {
      root.$router.push({
        name: item.name,
        query: {
          tabParent: 0
        }
      }, () => {})
    }

    return {
      // computeds
      relationsList,
      isEmptyChilds,
      // methods
      getChilds,
      clickRelation
    }
  }
})
