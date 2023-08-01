<script setup lang="ts">
import { EditBox } from '@/icons'
import Tiny from './components/Tiny.vue'
import Icon from '@/components/Icon.vue'

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
  window.open(props.itemData.widgetData?.src, '_blank')
}

const widgetData = computed(() => props.itemData.widgetData)

const appContextKey: any = inject('appContextKey')
const editWidget = () => {
  if (props.dragging) return
  appContextKey.editWidget(props.itemData)
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
    background-color: var(--w-alpha-60);
    color: var(--w-icon-text-color);
    z-index: 1;
    font-size: 32px;
    transition: transform 0.25s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
