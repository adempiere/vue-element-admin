<template>
  <div :id="id" />
</template>

<script>
// deps for editor
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content
import 'codemirror/lib/codemirror.css' // codemirror
import Editor from 'tui-editor'

import { getLanguage } from '@/lang'
import { fieldMixin } from '@/components/ADempiere/Field/FieldMixin'

export default {
  name: 'FieldTextLong',
  mixins: [fieldMixin],
  props: {
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0))
      }
    }
  },
  data() {
    return {
      mode: 'markdown', // or wysiwyg
      height: '200px',
      editor: null
    }
  },
  computed: {
    language() {
      // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
      if (this.isEmptyValue(getLanguage())) {
        return 'en_US'
      }
      return getLanguage()
    },
    editorOptions() {
      // const options = {
      //   viewer: true,
      //   height: '500px',
      //   initialValue: '# content to be rendered'
      // }
      const options = {
        previewStyle: 'tab',
        useCommandShortcut: false,
        usageStatistics: false
      }
      options.initialEditType = this.mode
      options.height = this.height
      options.language = this.language
      return options
    }
  },
  watch: {
    valueModel(value) {
      if (this.metadata.inTable) {
        if (this.isEmptyValue(value)) {
          value = ''
        }
        this.value = String(value)
        this.editor.setValue(value)
      }
    },
    'metadata.value'(value) {
      if (!this.metadata.inTable) {
        if (this.isEmptyValue(value)) {
          value = ''
        }
        this.value = String(value)
        this.editor.setValue(value)
      }
    },
    value(newValue, oldValue) {
      this.editor.preview.isViewer = true
      if (newValue !== oldValue && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue)
      }
      console.log(this.editor)
    },
    editorOptions(options) {
      console.lg(options)
    },
    language(langValue) {
      this.destroyEditor()
      this.initEditor()
    },
    height(heightValue) {
      this.editor.height(heightValue)
    }
  },
  mounted() {
    this.initEditor()
    console.log(this.editor.preview.isViewer)
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions
      })
      if (!this.isEmptyValue(this.value)) {
        this.editor.setValue(this.value)
      }
      this.editor.on('blur', () => {
        this.preHandleChange(this.editor.getValue())
      })
    },
    destroyEditor() {
      if (!this.editor) {
        return
      }
      this.editor.off('change')
      this.editor.remove()
    },
    setHtml(value) {
      this.editor.setHtml(value)
    },
    getHtml() {
      console.log(this.editor.getHtml())
      return this.editor.getHtml()
    }
  }
}
</script>
