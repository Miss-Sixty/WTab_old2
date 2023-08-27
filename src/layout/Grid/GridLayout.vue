<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import GridItem from './GridItem.vue'
import { onLongPress } from '@vueuse/core'
const emit = defineEmits(['update:modelValue', 'update:dragging', 'onLongPress'])

const props = defineProps({
  // 是否拖拽中
  dragging: {
    type: Boolean,
    default: false
  },
  colsNum: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  baseSize: {
    type: Number,
    required: true
  },
  baseMargin: {
    type: Number,
    required: true
  },
  editing: {
    type: Boolean,
    default: false
  }
})

const gridRef = ref()
// 样式计算
const widthStyle = computed(() => {
  if (!props.colsNum) return '100%'
  return props.colsNum * (props.baseSize + props.baseMargin) + props.baseMargin + 'px'
})

onLongPress(
  gridRef,
  () => {
    if (props.editing) return
    emit('onLongPress')
  },
  { delay: 1000 }
)

const heightStyle = computed(() => {
  let h = 0
  let y = 0
  props.modelValue.forEach((item: any) => {
    const positionY = item.position[props.colsNum][1]
    if (positionY + item.h > y + h) {
      h = item.h
      y = positionY
    }
  })

  return `${(y + h) * (props.baseSize + props.baseMargin) + props.baseMargin}px`
})

let startEventListener: any
let moveEventListener: any
let endEventListener: any
watch(
  () => props.editing,
  (val) => {
    if (val) {
      startEventListener = useEventListener(gridRef.value, 'pointerdown', start)
      moveEventListener = useEventListener(window, 'pointermove', move)
      endEventListener = useEventListener(window, 'pointerup', end)
    } else {
      startEventListener()
      moveEventListener()
      endEventListener()
      startEventListener = undefined
      moveEventListener = undefined
      endEventListener = undefined
    }
  }
)

let dragingData: any = ref()
const placeholderGridItem = ref()
let pressedDelta = ref()
const start = (e: PointerEvent) => {
  if (e.button !== 0) return
  let child: any = e.target
  while (!child.id && e.target !== gridRef.value) {
    child = child.parentNode
  }
  if (child.id === '') return

  dragingData.value = cloneDeep(props.modelValue.find((item: any) => item.id === child.id))
  placeholderGridItem.value = { ...dragingData.value, id: '-1' }
  const childRect = child.getBoundingClientRect()
  const parentRect = gridRef.value.getBoundingClientRect()
  // 子元素相对于父元素的坐标
  dragingData.value.newPosition = {
    x: childRect.x - parentRect.x,
    y: childRect.y - parentRect.y
  }

  // 子元素相对于父元素移动的初始坐标
  pressedDelta.value = {
    x: e.x - childRect.left + parentRect.left,
    y: e.y - childRect.top + parentRect.top
  }
}

const move = (e: PointerEvent) => {
  if (!pressedDelta.value) return
  emit('update:dragging', true)
  let { x, y } = dragingData.value.newPosition
  x = e.x - pressedDelta.value.x
  y = e.y - pressedDelta.value.y
  dragingData.value.newPosition = { x, y }

  let gridX = Math.round((x - props.baseMargin) / (props.baseSize + props.baseMargin))
  let gridY = Math.round((y - props.baseMargin) / (props.baseSize + props.baseMargin))

  // 边界计算，超出边界时，placeholderGridItem 不可移动到该位置，且不与其他元素重叠
  if (gridX + dragingData.value.w > props.colsNum) {
    gridX = props.colsNum - dragingData.value.w
  }
  if (gridX <= 0) gridX = 0
  if (gridY <= 0) gridY = 0

  // 判断拖动是否跟其他小组件坐标重叠，如果重叠则不可移动到此处
  const isOverlap = props.modelValue.some((item: any) => {
    if (item.id === dragingData.value.id) return false
    const [x, y] = item.position[props.colsNum]
    const { w, h } = item
    const isOverlapX = gridX < x + w && gridX + dragingData.value.w > x
    const isOverlapY = gridY < y + h && gridY + dragingData.value.h > y
    return isOverlapX && isOverlapY
  })

  if (isOverlap) return

  placeholderGridItem.value.position[props.colsNum] = [gridX, gridY]
}

const end = () => {
  if (!pressedDelta.value) return
  const [x, y] = placeholderGridItem.value.position[props.colsNum]

  const data = props.modelValue.map((item) => {
    if (item.id === dragingData.value.id) {
      return {
        ...item,
        position: {
          ...item.position,
          [props.colsNum]: [x, y]
        }
      }
    }
    return item
  })

  emit('update:modelValue', data)
  pressedDelta.value = undefined
  dragingData.value = {}

  setTimeout(() => {
    emit('update:dragging', false)

    placeholderGridItem.value = {}
  }, 200) //拖拽200ms后才更改状态，防止拖拽过程中触发点击事件
}

provide('gridLayoutContextKey', {
  colsNum: computed(() => props.colsNum),
  baseSize: computed(() => props.baseSize),
  baseMargin: computed(() => props.baseMargin),
  layoutData: computed(() => props.modelValue),
  dragingData: dragingData
})
</script>

<template>
  <div
    ref="gridRef"
    class="grid"
    :style="{ height: heightStyle, width: widthStyle, touchAction: editing ? 'none' : 'auto' }"
  >
    <GridItem
      v-show="props.dragging"
      :x="placeholderGridItem?.position?.[props.colsNum]?.[0] || 0"
      :y="placeholderGridItem?.position?.[props.colsNum]?.[1] || 0"
      :w="placeholderGridItem?.w || 0"
      :h="placeholderGridItem?.h || 0"
      id="-1"
      style="border: 2px solid var(--w-color-primary); border-radius: 14px"
    />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  position: relative;
  margin: auto;
  transition: width 0.2s;
}
</style>
