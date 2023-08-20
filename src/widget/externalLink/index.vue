<script setup lang="ts">
import { EditBox } from '@/icons'
import Tiny from './components/Tiny.vue'
import Icon from '@/components/Icon.vue'
import evevtBus from '@/utils/evevtBus'

defineOptions({
  name: 'ExternalLink'
})

const props = defineProps({
  dragging: Boolean,
  editing: Boolean,
  itemData: {
    type: Object,
    required: true
  },
  size: String
})

const clickChange = () => {
  if (props.dragging) return
  const { src, protocol } = props.itemData.widgetData
  if (!src || !protocol) return ElMessage.error('地址配置错误！')
  window.open(protocol + src, '_blank')
}

const widgetData = computed(() => props.itemData.widgetData)

const editWidget = () => {
  if (props.dragging) return
  // appContextKey.editWidget(props.itemData)
  console.log(1111)
  evevtBus.emit('externalLinkDetailOpenDialog', props.itemData)
}
</script>

<template>
  <div class="widget">
    <Icon class="edit" v-show="editing || !widgetData.src" @click="editWidget"> <EditBox /> </Icon>
    <Tiny v-if="size === 'tiny'" @click="clickChange" :widgetData="widgetData" />
  </div>
</template>

<style lang="scss" scoped>
.widget {
  cursor: pointer;
  position: relative;

  .edit {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--w-icon-text-color);
    background-color: var(--w-icon-bg-color);
    z-index: 1;
    font-size: 28px;
    transition: transform 0.25s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
