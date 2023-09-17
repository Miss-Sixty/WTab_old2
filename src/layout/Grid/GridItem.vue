<script setup lang="ts">
import { onLongPress } from '@vueuse/core'
const emit = defineEmits(['langTap'])
const props = defineProps({
  x: {
    type: Number
  },
  y: {
    type: Number
  },
  w: {
    type: Number
  },
  h: {
    type: Number
  },
  id: {
    type: String,
    required: true
  }
})

const gridLayoutContext: any = inject('gridLayoutContextKey')
const colsNum = gridLayoutContext.colsNum
const baseSize = gridLayoutContext.baseSize
const baseMargin = gridLayoutContext.baseMargin

/**
 * 操作item的数据
 */
const dragingData: any = computed(() => {
  return gridLayoutContext.layoutData.value.find((item: any) => item.id === props.id)
})

const xywh = computed(() => {
  return {
    x: props.x ?? dragingData.value.position[colsNum.value][0],
    y: props.y ?? dragingData.value.position[colsNum.value][1],
    w: props.w ?? dragingData.value.w,
    h: props.h ?? dragingData.value.h
  }
})

// 初始排序
const initStyle = computed(() => {
  const { x, y, w, h } = xywh.value
  return {
    transform: `translate3d(
        ${x * (baseMargin.value + baseSize.value) + baseMargin.value}px,
        ${y * (baseMargin.value + baseSize.value) + baseMargin.value}px,
        0
    )`,
    width: `${w * baseSize.value + (w - 1) * baseMargin.value}px`,
    height: `${h * baseSize.value + (h - 1) * baseMargin.value}px`
  }
})

const dragStyle = computed(() => {
  if (gridLayoutContext.dragingData.value?.id !== props.id) return
  if (!gridLayoutContext.dragingData.value?.newPosition) return
  const { x, y } = gridLayoutContext.dragingData.value?.newPosition

  return {
    transform: `translate3d(${x}px, ${y}px,0)`,
    zIndex: 2,
    transition: 'none'
  }
})

const itemRef = ref()

const onPress = (ev: Event) => {
  emit('langTap', ev)
}

//按压
onLongPress(itemRef, onPress, { modifiers: { prevent: true }, delay: 300 })
</script>

<template>
  <div
    :id="id"
    ref="itemRef"
    class="grid_item"
    :style="{
      ...initStyle,
      ...dragStyle
    }"
    @click.stop
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.grid_item {
  position: absolute;
  user-select: none;
}
</style>
