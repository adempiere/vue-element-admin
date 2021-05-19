<template>
  <component :is="panel" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    containerUuid: {
      require: true
    }
  },
  setup() {
    let panel

    return {
      panel
    }
  }
})
</script>
