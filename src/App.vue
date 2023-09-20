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

    cleanup = useEventListener(document, 'pointerup', (e) => {
      if (e.button !== 0) return
      const targetSettingsIcon = (e.target as HTMLElement).closest('.icon.settings.header--hover')
      if (targetSettingsIcon) return
      if (appStore.popperVisible) appStore.popperVisible = false
    })
  }
)
</script>

<template>
  <IndexPage />
</template>
