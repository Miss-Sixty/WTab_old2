<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import Cell from '@/components/Cell.vue'
import { useFileDialog, useColorMode } from '@vueuse/core'
// import { Sunny, Moon } from '@element-plus/icons-vue'
import useSettingsStore from '@/stores/settings'
const settingsStore = useSettingsStore()
const { open, onChange } = useFileDialog({
  multiple: false
})

/**
 * 导出配置
 */
const exportData = () => {
  settingsStore.downloadConfig()
}

/**
 * 导入配置
 * @param {File} rawFile
 */
onChange((files) => {
  const [rawFile] = files || []
  settingsStore.uploadConfig(rawFile)
})

const { store } = useColorMode({
  disableTransition: false
})

// 恢复默认设置
const resetData = async () => {
  try {
    store.value = 'auto'
  } catch {}
}
</script>

<template>
  <Dialog :width="650" title="常规设置">
    <Card title="备份数据">
      <Cell title="导出备份数据">
        <template #right>
          <button @click="exportData">导 出</button>
        </template>
      </Cell>
      <Cell title="导入备份数据">
        <template #right>
          <button @click="open()">导 入</button>
        </template>
      </Cell>
    </Card>

    <Card title="主题">
      <Cell title="深色模式">
        <template #right>
          <button @click="store = 'auto'">跟随系统</button>
          <button @click="store = 'light'">亮色主题</button>
          <button @click="store = 'dark'">暗色主题</button>
        </template>
      </Cell>
    </Card>

    <div class="reset">
      <div class="left">
        <p>重置数据</p>
        <p>将设置项还原为默认值，不会清除桌面小组件。</p>
      </div>
      <button plain @click="resetData">重 置</button>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.reset {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 10px;
  p {
    margin: 0;
    &:last-child {
      color: var(--b-alpha-60);
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
