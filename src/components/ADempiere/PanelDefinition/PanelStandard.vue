<template>
  <div>
    {{ containerUuid }}
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PanelStandard',

  props: {
    containerUuid: {
      type: String,
      required: true
    }
  },

  setup() {

  }
})
</script>
