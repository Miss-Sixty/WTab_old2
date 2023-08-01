<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import Image from '@/components/Image/index.vue'
import { Check } from '@/icons'
defineEmits(['click'])
defineProps({
  src: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="img-box" @click="src && $emit('click')">
    <Image
      scale
      width="100%"
      height="100%"
      class="img"
      :src="src"
      fit="cover"
      :style="src ? 'cursor: pointer' : ''"
    >
      <template #error>{{ src ? '加载失败' : '请上传壁纸' }}</template>
    </Image>
    <Icon v-if="active"><Check /></Icon>
  </div>
</template>

<style lang="scss" scoped>
.img-box {
  width: 145px;
  height: 96px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  .icon {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    font-size: 28px;
    color: #fff;
  }
}
</style>
