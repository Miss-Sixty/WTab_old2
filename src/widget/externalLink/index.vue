<script setup lang="ts">
import { EditBox } from '@/icons'
import Detail from './components/Detail.vue'
import Tiny from './components/Tiny.vue'
// import Small from './components/Small.vue'
// import Medium from './components/Medium.vue'
// import Large from './components/Large.vue'
import Icon from '@/components/Icon.vue'

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
  data: Object
})

const clickChange = () => {
  if (props.dragging) return
  window.open(props.data?.url, '_blank')
}

const editChang = () => {
  if (props.dragging) return
  detailVisible.value = true
}

const detailVisible = ref(false)
</script>

<template>
  <div class="widget">
    <Icon class="edit" v-show="editing" @click="editChang"> <EditBox /> </Icon>
    <Tiny
      v-if="size === 'tiny'"
      @click="clickChange"
      :icon="data?.icon"
      :name="data?.name"
      :bgColor="data?.bgColor"
      :src="data?.src"
    />
    <!--  <Small v-if="size === 'small'" :hitokoto="hitokoto" :from_who="from_who" />
    <Medium v-if="size === 'medium'" :hitokoto="hitokoto" :from_who="from_who" />
    <Large v-if="size === 'large'" :hitokoto="hitokoto" :from_who="from_who" />
-->
    <Detail v-model="detailVisible" :data="data" />
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
    z-index: 1;
    font-size: 32px;
    transition: transform 0.25s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
