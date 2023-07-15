<script setup lang="ts">
import { EditBox } from '@/icons'
import Detail from './components/Detail.vue'
import Tiny from './components/Tiny.vue'
import Icon from '@/components/Icon.vue'
// import Medium from './components/Medium.vue'

defineOptions({
  name: 'ExternalLink'
})

const props = defineProps({
  dragging: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['tiny', 'small', 'medium', 'large'].includes(val),
    required: true
  },
  editing: Boolean,
  data: {
    type: Object,
    default: () => ({})
  }
})

const clickChange = () => {
  if (props.dragging) return
  window.open(widgetData.value?.src, '_blank')
}

const editChang = () => {
  if (props.dragging) return
  detailVisible.value = true
}

const detailVisible = ref(false)

const widgetData = computed(() => props.data?.widgetData)
</script>

<template>
  <div class="widget">
    <Icon class="edit" v-show="editing" @click="editChang"> <EditBox /> </Icon>
    <Tiny
      v-if="size === 'tiny'"
      @click="clickChange"
      :icon="widgetData?.icon"
      :name="widgetData?.name"
      :style="{ backgroundColor: widgetData?.bgColor }"
    />
    <!-- <Medium
      v-if="size === 'medium'"
      @click="clickChange"
      :icon="widgetData?.icon"
      :name="widgetData?.name"
      :style="{ backgroundColor: widgetData?.bgColor }"
    /> -->

    <Detail
      v-model="detailVisible"
      :id="data.id"
      :name="widgetData?.name"
      :bgColor="widgetData?.bgColor"
      :src="widgetData?.src"
      :icon="widgetData?.icon"
    />
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
