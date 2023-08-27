<script setup lang="ts">
import Medium from './components/Medium.vue'
import { Settings as SettingsIcon } from '@/icons'
import Settings from './components/Settings.vue'

defineOptions({
  name: 'Electricity'
})

const props = defineProps({
  dragging: Boolean,
  editing: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['medium'].includes(val),
    required: true
  },
  itemData: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'addWidget'
  }
})

const settingsRef = ref()
const handleSettings = () => {
  settingsRef.value.openDialog(props.itemData)
}

const mediumRef = ref()
const update = () => {
  mediumRef.value.getDate()
}
</script>

<template>
  <div ref="widgetRef" class="widget">
    <Icon v-show="editing" class="setting" @click="handleSettings"> <SettingsIcon /> </Icon>
    <Medium
      ref="mediumRef"
      v-if="size === 'medium'"
      :dragging="dragging"
      :widgetData="itemData.widgetData"
      :type="type"
    />
    <Settings ref="settingsRef" @update="update" />
  </div>
</template>

<style lang="scss" scoped>
.widget {
  position: relative;
  .setting {
    position: absolute;
    right: 2px;
    top: 0;
    z-index: 2;
    padding: 5px;
    box-sizing: content-box;
    cursor: pointer;
    transition:
      transform 0.25s,
      color 0.25s;
    color: var(--w-settings-icon-color);
    will-change: transform;
    &:hover {
      transform: rotateZ(60deg);
    }
  }
}
</style>
