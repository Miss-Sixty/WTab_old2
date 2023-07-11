<script setup lang="ts">
import { ref } from 'vue'
// import Detail from './components/Detail.vue'
import Tiny from './components/Tiny.vue'
// import Small from './components/Small.vue'
// import Medium from './components/Medium.vue'
// import Large from './components/Large.vue'
import Icon from '@/components/Icon.vue'
defineOptions({
  name: 'ExternalLink'
})

const porps = defineProps({
  dragging: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['tiny', 'small', 'medium', 'large'].includes(val),
    required: true
  },
  editing: Boolean
})

const clickChange = () => {
  if (porps.dragging) return
  const newWindow: any = window.open('_blank')
  newWindow.location.href = 'https://www.gamersky.com/'
}
</script>

<template>
  <div class="widget" @click="clickChange">
    <Icon class="edit" >
      
    </Icon>
    <Tiny
      v-if="size === 'tiny'"
      icon="https://infinityicon.infinitynewtab.com/user-share-icon/6ed5ee396463ecee368cad1dbd2309ba.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim"
    />
    <!--  <Small v-if="size === 'small'" :hitokoto="hitokoto" :from_who="from_who" />
    <Medium v-if="size === 'medium'" :hitokoto="hitokoto" :from_who="from_who" />
    <Large v-if="size === 'large'" :hitokoto="hitokoto" :from_who="from_who" />

    <Detail
      v-model="detailVisible"
      :hitokoto="hitokoto"
      :from_who="from_who"
      :from="from"
      @reset="init"
    /> -->
  </div>
</template>

<style lang="scss" scoped>
.widget {
  cursor: pointer;
}
</style>
