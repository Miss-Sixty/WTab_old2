<script setup lang="ts">
const componentsContext: any = import.meta.glob('./*/index.vue', { eager: true })

const components: any = {}
for (const path in componentsContext) {
  const component = componentsContext[path]?.default
  components[component.name] = component
}
</script>

<template>
  <component :is="item" v-for="item in components" :key="item.name" />
</template>
