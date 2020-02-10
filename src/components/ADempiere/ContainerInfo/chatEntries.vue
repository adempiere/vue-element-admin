<template>
  <div>
    <el-card
      v-if="getIsChat"
      class="box-card"
    >
      <div slot="header" class="clearfix">
        <span>{{ $t('window.containerInfo.notes') }}</span>
      </div>
      <el-scrollbar wrap-class="scroll-window-log-chat">
        <el-timeline>
          <el-timeline-item
            v-for="(chats, key) in gettersLischat"
            :key="key"
            :timestamp="translateDate(chats.logDate)"
            placement="top"
          >
            <el-card shadow="hover">
              <div>
                <span>{{ chats.userName }}</span>
                <span>{{ chats.characterData }}</span>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{ $t('window.containerInfo.logWorkflow.addNote') }}
      </div>
      <el-input
        v-model="chatNote"
        type="textarea"
        :rows="2"
        placeholder="Please input"
      />
      <el-button icon="el-icon-circle-check" type="text" style="float: right" @click="sendComment(chatNote)" />
    </el-card>
  </div>
</template>
<script>
import { MixinInfo } from '@/components/ADempiere/ContainerInfo/mixinInfo'
export default {
  name: 'ChatEntries',
  mixins: [MixinInfo]
}
</script>
