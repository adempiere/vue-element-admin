<template>
  <!-- actions or process on container -->
  <el-dropdown
    :hide-on-click="true"
    split-button
    type="primary"
    trigger="click"
    @command="clickRunAction"
    @click="runAction(defaultActionToRun)"
  >
    {{ defaultActionName }}
    <el-dropdown-menu slot="dropdown">
      <el-scrollbar wrap-class="scroll-child">
        <el-dropdown-item
          command="refreshData"
        >
          <div class="contents">
            <div style="margin-right: 5%;margin-top: 10%;">
              <i class="el-icon-refresh" style="font-weight: bolder;" />
            </div>
            <div>
              <span class="contents">
                <b class="label">
                  {{ $t('components.contextMenuRefresh') }}
                </b>
              </span>
              <p
                class="description"
              >
                {{ $t('data.noDescription') }}
              </p>
            </div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item
          v-for="(action, index) in actions"
          :key="index"
          :command="action"
          :divided="true"
        >
          <div class="contents">
            <div style="margin-right: 5%;margin-top: 10%;">
              <i :class="iconAction(action)" style="font-weight: bolder;" />
            </div>
            <el-dropdown v-if="!isEmptyValue(action.childs)">
              <span class="contents">
                <b class="label">
                  {{ action.name }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>
              <el-dropdown-menu
                slot="dropdown"
                @command="handleCommand"
              >
                <el-dropdown-item
                  v-for="(childs, key) in action.childs"
                  :key="key"
                  :command="childs"
                  :divided="true"
                >
                  <span class="contents">
                    <b class="label" @click="handleCommand(childs)">
                      {{ childs.name }}
                    </b>
                  </span>
                  <p
                    v-if="!isEmptyValue(childs.description)"
                    class="description"
                  >
                    {{ childs.description }}
                  </p>
                  <p
                    v-else
                    class="description"
                  >
                    {{ $t('data.noDescription') }}
                  </p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div
              v-else
            >
              <span class="contents">
                <b class="label">
                  {{ action.name }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>
            </div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item
          command="shareLink"
          :divided="true"
        >
          <div class="contents">
            <div style="margin-right: 5%;margin-top: 10%;">
              <i class="el-icon-copy-document" style="font-weight: bolder;" />
            </div>
            <div>
              <span class="contents">
                <b class="label">
                  {{ $t('components.contextMenuShareLink') }}
                </b>
              </span>
              <p class="description">
                {{ $t('data.noDescription') }}
              </p>
            </div>
          </div>
        </el-dropdown-item>
      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script src="@/components/ADempiere/AuxiliaryMenu/menuActions.js"></script>
