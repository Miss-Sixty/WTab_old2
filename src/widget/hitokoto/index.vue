<script setup lang="ts">
import { ref } from 'vue'
import Detail from './components/Detail.vue'
import Tiny from './components/Tiny.vue'
import Small from './components/Small.vue'
import Medium from './components/Medium.vue'
import Large from './components/Large.vue'
defineOptions({
  name: 'Hitokoto'
})

const porps = defineProps({
  dragging: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['tiny', 'small', 'medium', 'large'].includes(val),
    required: true
  },
  editing: Boolean,
  data: Object
})

const hitokoto = ref('')
const from_who = ref('')
const from = ref('')
const init = async () => {
  // const res = await fetch('https://v1.hitokoto.cn/?c=d&c=e&c=h&c=i&c=k')
  // const resJson = await res.json()
  // hitokoto.value = resJson.hitokoto
  // from_who.value = resJson.from_who
  // from.value = resJson.from
  hitokoto.value = '天下没有不散的宴席，那就放下过去，憧憬未来！'
  from_who.value = '姜传江'
  from.value = '灵感'
}
init()

const detailVisible = ref(false)
const clickChange = () => {
  if (porps.dragging) return
  detailVisible.value = true
}
</script>

<template>
  <div class="widget" @click="clickChange">
    <Tiny v-if="size === 'tiny'" :hitokoto="hitokoto" :from_who="from_who" />
    <Small v-if="size === 'small'" :hitokoto="hitokoto" :from_who="from_who" />
    <Medium v-if="size === 'medium'" :hitokoto="hitokoto" :from_who="from_who" />
    <Large v-if="size === 'large'" :hitokoto="hitokoto" :from_who="from_who" />

    <Detail
      v-model="detailVisible"
      :hitokoto="hitokoto"
      :from_who="from_who"
      :from="from"
      @reset="init"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget {
  cursor: pointer;
  padding: 10px 16px;
}
</style>
