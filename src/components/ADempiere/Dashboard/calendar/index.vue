<template>
  <el-collapse v-if="metadata.isCollapsible" v-model="activeCalendar" accordion>
    <el-collapse-item name="calendar">
      <template slot="title">
        <i class="el-icon-date" style="margin-right: 4px;margin-left: 10px;" />
        {{ $t('route.calendar') }}
      </template>
      <el-calendar>
        <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
        <template
          slot="dateCell"
          slot-scope="{date, data}"
        >
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </el-collapse-item>
  </el-collapse>
  <el-calendar v-else>
    <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
    <template
      slot="dateCell"
      slot-scope="{date, data}"
    >
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </el-calendar>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    metadata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeCalendar: this.metadata.isOpenByDefault ? 'calendar' : undefined,
      value: new Date()
    }
  }
}
</script>

<style>
  .is-selected {
    color: #1989FA;
  }
</style>
