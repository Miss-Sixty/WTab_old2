<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import { useFileDialog, useColorMode } from '@vueuse/core'
import { ComputerFill, MoonClearFill, SunFill } from '@/icons'
import useSettingsStore from '@/stores/settings'

const settingsStore = useSettingsStore()
const { open, onChange } = useFileDialog({
  multiple: false,
  accept: '.wtab'
})

/**
 * 导出配置
 */
const exportData = () => {
  settingsStore.downloadConfig()
  ElMessage.success('导出成功！')
}

/**
 * 导入配置
 * @param {File} rawFile
 */
onChange((files) => {
  const [rawFile]: any = files || []
  settingsStore.uploadConfig(rawFile)
  ElMessage.success('导入成功！')
})

const { store } = useColorMode({
  disableTransition: false
})

// 恢复默认设置
const resetData = async () => {
  store.value = 'auto'
}
</script>

<template>
  <Dialog :width="650" title="常规设置">
    <el-form label-position="left">
      <Card title="备份数据">
        <el-form-item label="导出备份数据">
          <div class="item">
            <ElButton @click="exportData" type="primary"> 导 出 </ElButton>
          </div>
        </el-form-item>
        <el-form-item label="导入备份数据" class="no-margin-bottom">
          <div class="item">
            <ElButton @click="open()" type="primary"> 导 入 </ElButton>
          </div>
        </el-form-item>
      </Card>

      <Card title="主题">
        <el-form-item label="外观" class="no-margin-bottom">
          <div class="item">
            <el-button-group>
              <el-button
                @click="store = 'auto'"
                :type="store === 'auto' ? 'primary' : ''"
                :icon="ComputerFill"
              >
                系统
              </el-button>
              <el-button
                @click="store = 'dark'"
                :type="store === 'dark' ? 'primary' : ''"
                :icon="MoonClearFill"
              >
                深色
              </el-button>
              <el-button
                @click="store = 'light'"
                :type="store === 'light' ? 'primary' : ''"
                :icon="SunFill"
              >
                浅色
              </el-button>
            </el-button-group>
          </div>
        </el-form-item>
      </Card>
    </el-form>

    <div class="reset">
      <div class="left">
        <p>重置数据</p>
        <p>将设置项还原为默认值，不会清除桌面小组件。</p>
      </div>
      <el-button type="danger" plain @click="resetData">重 置</el-button>
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

.item {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.no-margin-bottom {
  margin-bottom: 0;
}
</style>
