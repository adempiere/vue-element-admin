import Field from '@/components/ADempiere/Field'
import { createField, createFieldDictionary } from '@/utils/ADempiere/lookupFactory'

export default {
  name: 'FormMixn',
  components: {
    Field
  },
  props: {
    metadata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      metadataList: [],
      panelMetadata: {},
      isLoaded: false,
      panelType: 'custom'
    }
  },
  computed: {
    getterPanel() {
      return this.$store.getters.getPanel(this.metadata.containerUuid)
    }
  },
  methods: {
    createField,
    createFieldDictionary
  }
}
