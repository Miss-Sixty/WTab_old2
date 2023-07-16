<script setup lang="ts">
import Medium from './components/Medium.vue'
import Small from './components/Small/index.vue'

defineOptions({
  name: 'Shop'
})

defineProps({
  dragging: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['small', 'medium'].includes(val),
    required: true
  }
})
</script>

<template>
  <div class="widget">
    <Medium v-if="size === 'medium'" />
    <Small :dragging="dragging" v-if="size === 'small'" />
  </div>
</template>
