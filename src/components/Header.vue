<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { Settings } from '@/icons'
import Icon from '@/components/Icon.vue'
const layoutStore = useLayoutStore()
defineEmits(['clickSettings'])
const settingsRef = ref()
</script>

<template>
  <header class="header">
    <button @click="layoutStore.editing = true">click</button>
    <Transition name="slide-fade">
      <button v-show="layoutStore.editing" @click="layoutStore.editing = false">完成编辑</button>
    </Transition>
    <Icon
      ref="settingsRef"
      class="settings"
      @click="$emit('clickSettings', { ev: $event, type: 'settings', dom: settingsRef.$el })"
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
  padding: 10px 20px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .settings {
    padding: 6px;
    margin-left: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.25s, color 0.25s;
    color: rgba(255, 255, 255, 0.35);
    font-size: 36px;

    &:hover {
      transform: rotate(60deg);
      color: rgba(255, 255, 255, 0.65);
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.25s, opacity 0.25s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
