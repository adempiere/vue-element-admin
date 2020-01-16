<template>
  <span>
    <el-popover
      ref="translatedField"
      placement="top"
      width="300"
      trigger="click"
    >
      <div>
        <span class="custom-tittle-popover">
          {{ name }}
        </span>
        <el-button
          type="primary"
          style="float: right;"
          :icon="icon"
          circle
          size="mini"
          @click="getTranslations"
        />
      </div>
      <el-form-item
        :required="true"
      >
        <template slot="label">
          {{ $t('language') + ':' }}
        </template>
        <el-select
          v-model="langValue"
          size="medium"
          style="width: 100%;"
        >
          <el-option
            key="blank-option"
            :value="undefined"
            label=" "
          />
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
          :disabled="isEmptyValue(langValue)"
        />
      </el-form-item>
    </el-popover>
    <svg-icon
      v-popover:translatedField
      class-name="international-icon"
      icon-class="language"
    />
  </span>
</template>

<script>
import { getLanguage } from '@/lang/index'

export default {
  name: 'FieldTranslated',
  props: {
    containerUuid: {
      type: String,
      required: true
    },
    columnName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: undefined
    },
    recordUuid: {
      type: String,
      default: undefined
    },
    tableName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      langValue: getLanguage() || 'en_US',
      translatedValue: '',
      isLoading: false
    }
  },
  computed: {
    languageList() {
      return this.$store.getters.getLanguagesList
    },
    icon() {
      if (this.isLoading) {
        return 'el-icon-loading'
      }
      return 'el-icon-refresh'
    }
  },
  methods: {
    getTranslations() {
      this.isLoading = true
      this.$store.dispatch('getTranslationsFromServer', {
        containerUuid: this.containerUuid,
        recordUuid: this.recordUuid,
        tableName: this.tableName,
        language: this.langValue
      })
        .then(translationResponse => {
          console.log(translationResponse)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-tittle-popover {
    font-size: 17px;
    font-weight: bold;
  }
</style>
<style lang="scss">
  /**
   * Separation between elements (item) of the form
   */
  .el-form-item {
    margin-bottom: 10px !important;
    margin-left: 10px;
    margin-right: 10px;
  }
  /**
   * Reduce the spacing between the form element and its label
   */
  .el-form--label-top .el-form-item__label {
    padding-bottom: 0px !important;
  }
</style>
