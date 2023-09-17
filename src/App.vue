<script setup lang="ts">
import IndexPage from '@/layout/index.vue'
import useAppStore from '@/stores/app'
const appStore = useAppStore()
import { useEventListener } from '@vueuse/core'

let cleanup: any
watch(
  () => appStore.popperVisible,
  (bl) => {
    if (!bl) return cleanup()
    cleanup = useEventListener(document, 'click', (e) => {
      appStore.popperVisible = false
    })
  }
)
</script>

<template>
  <IndexPage />
</template>
