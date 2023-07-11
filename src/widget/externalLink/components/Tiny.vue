<script setup lang="ts">
import Image from '@/components/Image/index.vue'
defineProps({
  icon: String
})
</script>

<template>
  <div class="content">
    <Image :src="icon" />
  </div>
</template>

<style lang="scss" scoped>
.content {
}
</style>
