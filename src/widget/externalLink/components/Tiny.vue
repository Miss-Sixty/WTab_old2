<script setup lang="ts">
import Image from '@/components/Image/index.vue'
const props = defineProps({
  icon: String,
  name: {
    type: String,
    default: ''
  }
})

const nameFontSize = computed(() => {
  const sizes = ['40px', '30px', '20px', '15px', '10px']
  return {
    fontSize: sizes[props.name?.length - 1]
  }
})
</script>

<template>
  <div class="content">
    <Image v-if="icon" height="100%" width="100%" :src="icon" />
    <span v-else :style="nameFontSize">{{ name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}
</style>
