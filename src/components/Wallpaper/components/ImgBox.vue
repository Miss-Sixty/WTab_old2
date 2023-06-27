<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { Check } from '@/icons'
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
  <div class="img-box">
    <img class="img" :src="src" fit="cover" />
    <Icon v-if="active"><Check /></Icon>
  </div>
</template>

<style lang="scss" scoped>
.img-box {
  width: 135px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    display: block;
    transition: transform 0.25s;
    &:hover {
      transform: scale(1.1);
    }
  }
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
