<script setup lang="ts">
import { AddLine, SubtractLine } from '@/icons'
import Icon from '@/components/Icon.vue'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
import widgets from '@/widget'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'

defineEmits(['addWidget', 'delWidget'])
const props = defineProps({
  // 只能是 addWidget 或 delWidget
  type: {
    type: String,
    validator: (val: string) => {
      return ['addWidget', 'delWidget', ''].includes(val)
    },
    default: 'addWidget'
  },
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['tiny', 'small', 'medium', 'large'].includes(val),
    required: true
  },
  componentKey: {
    type: String,
    required: true
  },
  dragging: {
    type: Boolean
  }
})

const iconType: any = {
  addWidget: {
    icon: AddLine,
    bgColor: '#409eff'
  },
  delWidget: {
    icon: SubtractLine,
    bgColor: '#f56c6c'
  }
}
const iconData: any = computed(() => iconType?.[props.type] || {})
</script>

<template>
  <div
    class="content"
    :class="{
      deling: type === 'delWidget',
      addWidget: type === 'addWidget',
      scale: size === 'large' || size === 'medium'
    }"
    :style="layoutStore.sizeGridWH(size)"
  >
    <Icon @click="$emit(type)" v-show="type" :style="{ backgroundColor: iconData.bgColor }">
      <component :is="iconData.icon" />
    </Icon>
    <component
      class="content__widget"
      :is="widgets[useChangeCase(componentKey, 'pascalCase').value].component"
      :dragging="dragging"
      :size="size"
    />
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  transform: scale(1);
  transition: transform 0.25s;

  &__widget {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
    background-color: var(--w-widget-bg-color);
  }

  .icon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    transition-duration: 0.25s;
    border-radius: 99px;
    color: #fff;
    cursor: pointer;
    padding: 3px;
    margin-right: 20px;
    font-size: 22px;
    transform: translate(-25%, -25%) scale(1);
    transition: transform 0.25s;
  }
}

@media screen and (max-width: 768px) {
  .content.addWidget.scale {
    transform: scale(0.65);
    .el-icon {
      transform: translate(-25%, -25%) scale(1.5);
    }
  }
}
</style>
