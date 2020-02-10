export const MixinInfo = {
  data() {
    return {
      currentKey: 100,
      typeAction: 0,
      chatNote: ''
    }
  },
  computed: {
    gettersLischat() {
      return this.$store.getters.getChatEntries.chatEntriesList
    },
    gettersListRecordLogs() {
      const changeLog = this.$store.getters.getRecordLogs.recorLogs
      if (this.isEmptyValue(changeLog)) {
        return changeLog
      }
      changeLog.sort((a, b) => {
        var c = new Date(a.logDate)
        var d = new Date(b.logDate)
        return d - c
      })
      return changeLog
    },
    getIsChangeLog() {
      if (this.isEmptyValue(this.gettersListRecordLogs)) {
        return false
      }
      return true
    },
    getIsChat() {
      return this.$store.getters.getIsNote
    },
    gettersListWorkflow() {
      return this.$store.getters.getWorkflow
    },
    getIsWorkflowLog() {
      if (this.isEmptyValue(this.gettersListWorkflow)) {
        return false
      }
      return true
    },
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    sendComment(comment) {
      this.$store.dispatch('createChatEntry', {
        tableName: this.$route.params.tableName,
        recordId: this.$route.params.recordId,
        comment: comment
      })
      this.chatNote = ''
    },
    showkey(key, index) {
      if (key === this.currentKey && index === this.typeAction) {
        this.currentKey = 1000
      } else {
        this.currentKey = key
        this.typeAction = index
      }
    },
    translateDate(value) {
      return this.$d(new Date(value), 'long', this.language)
    }
  }
}
