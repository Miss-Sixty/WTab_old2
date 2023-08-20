<script setup lang="ts">
import { Check, ImageFill, ImageAddFill } from '@/icons'
defineEmits(['click'])
defineProps({
  src: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="box">
    <div class="img-box" @click="src && $emit('click')" v-loading="loading">
      <el-image
        fit="cover"
        :src="src"
        :style="{ width: '100%', height: '100%', cursor: src ? 'pointer' : '' }"
      >
        <template #placeholder>
          <div class="image-slot">
            <Icon class="icon__slot"><ImageFill /></Icon>
          </div>
        </template>
        <template #error>
          <div class="image-slot">
            <Icon class="icon__slot"><ImageAddFill /></Icon>
          </div>
        </template>
      </el-image>
      <Icon v-if="active" class="icon__check"><Check /></Icon>
    </div>
    <div class="right">
      <p class="right__info">{{ title }}</p>
      <p class="right__tip">{{ tip }}</p>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;

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
    .el-image :deep(img) {
      transition: transform 0.25s;
      &:hover {
        transform: scale(1.1);
      }
    }

    .image-slot {
      width: 100%;
      height: 100%;
      background-color: var(--el-fill-color-light);
    }
  }
  .right {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      margin: 0;
    }
    &__info {
      font-size: 15px;
      font-weight: 700;
    }
    &__tip {
      font-size: 13px;
      color: var(--b-alpha-60);
      padding-bottom: 8px;
    }
  }
}
</style>
