<script setup lang="ts">
import { AddLine, SubtractLine } from '@/icons'
import Icon from '@/components/Icon.vue'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
import widgets from '@/widget'
import { useChangeCase } from '@vueuse/integrations/useChangeCase'

defineEmits(['addWidget', 'delWidget'])
const props = defineProps({
  type: {
    type: String,
    default: 'addWidget'
  },
  itemData: {
    type: Object,
    required: true
  },
  dragging: {
    type: Boolean
  },
  editing: Boolean,
  size: {
    type: String,
    default: 'tiny'
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

const widgetComponent = computed(() => {
  const componentName = useChangeCase(props.itemData.key, 'pascalCase').value
  return widgets[componentName]
})
</script>

<template>
  <div
    class="content"
    :class="{
      scaleLarge: type === 'addWidget' && size === 'large',
      scale: type === 'addWidget' && (size === 'large' || size === 'medium')
    }"
    :style="layoutStore.sizeGridWH(size)"
  >
    <Icon @click="$emit(type)" v-show="type" :style="{ backgroundColor: iconData.bgColor }">
      <component :is="iconData.icon" />
    </Icon>
    <component
      class="content__widget"
      :is="widgetComponent.component"
      :dragging="dragging"
      :editing="editing"
      :size="size"
      :itemData="itemData"
      :type="type"
    />
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  transform: scale(1);
  transition: transform 0.25s;
  border-radius: 14px;
  background-color: var(--w-widget-bg-color);

  &.scaleLarge {
    transform: scale(0.65);
    .icon {
      transform: translate(-25%, -25%) scale(1.5);
    }
  }

  &__widget {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
  }

  .icon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
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

@media screen and (max-width: 500px) {
  .content.scale {
    transform: scale(0.65);
    .icon {
      transform: translate(-25%, -25%) scale(1.5);
    }
  }
}
</style>
