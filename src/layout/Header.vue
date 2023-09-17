<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { Settings, AddLine } from '@/icons'

const layoutStore = useLayoutStore()
defineEmits(['clickSettings', 'addWidget'])
const settingsRef = ref()
</script>

<template>
  <header class="header">
    <Transition name="slide-fade" v-show="layoutStore.editing">
      <div>
        <ElButton
          style="width: 48px"
          size="small"
          @click="$emit('addWidget')"
          type="info"
          round
          :icon="AddLine"
          key="add"
        />
        <ElButton size="small" @click="layoutStore.editing = false" type="info" round key="ok">
          完成
        </ElButton>
      </div>
    </Transition>

    <Icon
      ref="settingsRef"
      class="settings header--hover"
      @click.stop="$emit('clickSettings', { type: 'settings', dom: settingsRef.$el })"
    >
      <Settings />
    </Icon>
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 10px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .icon {
    padding: 6px;
    margin-left: 6px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 36px;
  }

  .settings {
    transition:
      transform 0.25s,
      color 0.25s;
    color: rgba(255, 255, 255, 0.35);
    will-change: transform;
    &:hover {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.25s,
    opacity 0.25s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
