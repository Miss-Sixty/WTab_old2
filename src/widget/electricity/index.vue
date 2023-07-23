<script setup lang="ts">
import Medium from './components/Medium.vue'

defineOptions({
  name: 'Electricity'
})

defineProps({
  dragging: Boolean,
  size: {
    type: String,
    // 限制传入的值
    validator: (val: string) => ['medium'].includes(val),
    required: true
  }
})
</script>

<template>
  <div class="widget">
    <Medium :dragging="dragging" v-if="size === 'medium'" />
  </div>
</template>
