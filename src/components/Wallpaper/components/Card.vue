<script setup lang="ts">
import ImgBox from './ImgBox.vue'
defineEmits(['click'])
defineProps({
  title: {
    type: String,
    required: true
  },
  info: {
    type: String,
    default: '将您的图片设为壁纸。'
  },
  tip: {
    type: String,
    default: '建议分辨率：1920×1080 或更高'
  },
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
  <div class="card">
    <p class="title">{{ title }}</p>
    <div class="content">
      <ImgBox @click="$emit('click')" :active="active" :src="src" />
      <div class="right">
        <p class="right__info">{{ info }}</p>
        <p class="right__tip">{{ tip }}</p>
        <div>
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &:not(:last-child) {
    margin-bottom: 30px;
  }
  .title {
    margin: 8px 6px;
  }
  .content {
    display: flex;

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
}
</style>
