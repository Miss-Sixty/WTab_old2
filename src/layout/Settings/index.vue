<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import Cell from '@/components/Cell.vue'
import Button from '@/components/Button.vue'
import { Radio, RadioGroup } from '@/components/Radio'
import { useFileDialog, useColorMode } from '@vueuse/core'
// import { Sunny, Moon } from '@element-plus/icons-vue'
import useSettingsStore from '@/stores/settings'
import useBookmarkStore from '@/stores/bookmark'
const bookmarkStore = useBookmarkStore()

const settingsStore = useSettingsStore()
const { open, onChange } = useFileDialog({
  multiple: false,
  accept: '.wtab'
})

const { open: openBooks, onChange: onChangeBooks } = useFileDialog({
  multiple: false,
  accept: '.html'
})

onChangeBooks((files) => {
  const [rawFile]: any = files || []

  bookmarkStore.setBookmark(rawFile)
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
  const [rawFile]: any = files || []
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
          <Button @click="exportData">导 出</Button>
        </template>
      </Cell>
      <Cell title="导入备份数据">
        <template #right>
          <Button @click="open()">导 入</Button>
        </template>
      </Cell>
      <Cell title="导入浏览器书签">
        <template #right>
          <Button
            v-show="bookmarkStore.data.length"
            plain
            type="danger"
            @click="bookmarkStore.reset"
          >
            清空书签
          </Button>
          <Button @click="openBooks()">导 入</Button>
        </template>
      </Cell>
    </Card>

    <Card title="主题">
      <Cell title="深色模式">
        <template #right>
          <RadioGroup v-model="store">
            <Radio value="auto">跟随系统</Radio>
            <Radio value="light">亮色主题</Radio>
            <Radio value="dark">暗色主题</Radio>
          </RadioGroup>
        </template>
      </Cell>
    </Card>

    <div class="reset">
      <div class="left">
        <p>重置数据</p>
        <p>将设置项还原为默认值，不会清除桌面小组件。</p>
      </div>
      <Button plain type="danger" @click="resetData">重 置</Button>
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