<script setup lang="ts">
import { ref } from 'vue'
import Detail from './components/Detail.vue'
import Tiny from './components/Tiny.vue'
import Small from './components/Small.vue'
import Medium from './components/Medium.vue'
import Large from './components/Large.vue'
import { hitokotoApi } from '@/api/hitokoto'
import dayjs from 'dayjs'
import useInterval from '@/hooks/useInterval'

defineOptions({
  name: 'Hitokoto'
})

const props = defineProps({
  dragging: Boolean,
  editing: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['tiny', 'small', 'medium', 'large'].includes(val),
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

const loading = ref(false)
const hitokoto = computed(() => props.itemData.widgetData?.hitokoto)
const from_who = computed(() => props.itemData.widgetData?.from_who)
const from = computed(() => props.itemData.widgetData?.from)

const getDate = async () => {
  loading.value = true
  try {
    const res = await hitokotoApi()
    props.itemData.widgetData.hitokoto = res.hitokoto
    props.itemData.widgetData.from_who = res.from_who
    props.itemData.widgetData.from = res.from
    props.itemData.widgetData.update = dayjs().valueOf()
  } finally {
    loading.value = false
  }
}

const widgetRef = ref()
const init = async () => {
  if (props.type === 'addWidget') return
  if (!hitokoto.value) return getDate()

  useInterval({
    date: props.itemData.widgetData.update,
    dateType: 'day',
    callback: getDate,
    elementVisibilityRef: widgetRef,
    loading: loading
  })
}
init()

const detailVisible = ref(false)
const clickChange = () => {
  if (props.dragging || props.editing) return
  detailVisible.value = true
}
</script>

<template>
  <div class="widget" @click="clickChange" ref="widgetRef">
    <Tiny v-if="size === 'tiny'" />
    <Small
      v-else-if="size === 'small'"
      :hitokoto="hitokoto"
      :from_who="from_who"
      :loading="loading"
    />
    <Medium
      v-else-if="size === 'medium'"
      :hitokoto="hitokoto"
      :from_who="from_who"
      :loading="loading"
    />
    <Large
      v-else-if="size === 'large'"
      :hitokoto="hitokoto"
      :from_who="from_who"
      :from="from"
      @reset="getDate"
      :loading="loading"
    />

    <Detail
      v-model="detailVisible"
      :hitokoto="hitokoto"
      :from_who="from_who"
      :from="from"
      @reset="getDate"
      :loading="loading"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
