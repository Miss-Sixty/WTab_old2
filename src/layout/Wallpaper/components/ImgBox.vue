<script setup lang="ts">
import useWallpaperStore from '@/stores/wallpaper'
import { Check, ImageFill, ImageAddFill } from '@/icons'
const wallpaperStore = useWallpaperStore()
wallpaperStore.getWallpaper('all')
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
    <el-image
      fit="cover"
      :src="src"
      :style="{ width: '100%', height: '100%', cursor: src ? 'pointer' : '' }"
    >
      <template #placeholder>
        <div class="image-slot">
          <Icon class="icon__slot"><ImageAddFill /></Icon>
        </div>
      </template>
      <template #error>
        <div class="image-slot">
          <Icon class="icon__slot"><ImageFill /></Icon>
        </div>
      </template>
    </el-image>
    <Icon v-if="active" class="icon__check"><Check /></Icon>
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
    font-size: 28px;
    width: 100%;
    height: 100%;
    &__check {
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
    }
    &__slot {
      color: var(--el-text-color-secondary);
    }
  }

  .image-slot {
    width: 100%;
    height: 100%;
    background-color: var(--el-fill-color-light);
  }
}
</style>
