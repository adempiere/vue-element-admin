<template>
  <el-col
    :xs="24"
    :sm="24"
    :md="24"
    :lg="24"
    :xl="24"
  >
    <el-form-item
      :label="$t('language') + ':'"
      :required="true"
    >
      <el-select
        v-model="langValue"
        size="mini"
        style="width: 100%;"
      >
        <el-option
          v-for="(optionLang, key) in languageList"
          :key="key"
          :value="optionLang.languageISO"
          :label="optionLang.languageName"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Translated Value:"
      :required="true"
    >
      <el-input
        v-model="translatedValue"
        @blur="sendValue"
      />
    </el-form-item>
  </el-col>
</template>

<script>
import { getLanguage } from '@/lang/index'

export default {
  name: 'FieldTranslated',
  data() {
    return {
      langValue: getLanguage() || 'en_US',
      translatedValue: ''
    }
  },
  computed: {
    languageList() {
      return this.$store.getters.getLanguagesList
    }
  },
  methods: {
    sendValue() {
      console.log(this.translatedValue)
    }
  }
}
</script>
