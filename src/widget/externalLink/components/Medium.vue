<script setup lang="ts">
import Tiny from './Tiny.vue'

defineProps({
  hitokoto: String,
  from_who: {
    type: String,
    default: '佚名'
  }
})
</script>

<template>
  <div class="medium">
    <Tiny class="tiny" />
    <Tiny class="tiny" />
    <Tiny class="tiny" />
  </div>
</template>

<style lang="scss" scoped>
.medium {
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: aquamarine;
  align-items: center;

  .tiny {
    width: 80px;
    height: 80px;
    background-color: antiquewhite;
  }
}
</style>
