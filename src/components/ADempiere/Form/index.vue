<template>
  <component
    :is="componentRender"
    :metadata="metadata"
  />
</template>

<script>
export default {
  name: 'FormPanel',
  props: {
    metadata: {
      type: Object,
      required: true
    }
  },
  computed: {
    // load the component that is indicated in the attributes of received property
    componentRender() {
      return () => import(`@/components/ADempiere/Form/${this.metadata.fileName}`)
    }
  }
}
</script>
