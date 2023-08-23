<script setup lang="ts">
import { ref } from 'vue'
import Detail from './components/Detail.vue'
import Tiny from './components/Tiny.vue'
import Small from './components/Small.vue'
import Medium from './components/Medium.vue'
import Large from './components/Large.vue'
import { hitokotoApi } from '@/api/hitokoto'
import { useElementVisibility } from '@vueuse/core'
import dayjs from 'dayjs'
// const appConfig: any = inject('app')

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
  }
})

const hitokoto = ref('')
const from_who = ref('')
const from = ref('')
const loading = ref(false)
const init = async () => {
  const widgetData = props.itemData.widgetData || {}

  if (!dayjs().isSame(widgetData.updateDate, 'day')) return getDate()
  if (!widgetData.hitokoto) return getDate()

  hitokoto.value = widgetData.hitokoto
  from_who.value = widgetData.from_who
  from.value = widgetData.from
}

const getDate = async () => {
  loading.value = true
  try {
    const res = await hitokotoApi()
    hitokoto.value = res.hitokoto
    from_who.value = res.from_who
    from.value = res.from
    props.itemData.widgetData = {
      hitokoto: res.hitokoto,
      from_who: res.from_who,
      from: res.from,
      updateDate: dayjs().format('YYYY-MM-DD')
    }
  } finally {
    loading.value = false
  }
}

const widgetRef = ref()
const targetIsVisible = useElementVisibility(widgetRef)
watch(targetIsVisible, (val) => {
  if (val) init()
})

const detailVisible = ref(false)
const clickChange = () => {
  if (props.dragging) return
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
