<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  isBg: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="content">
    <h4>{{ title }}</h4>
    <div class="card" :class="{ bg: isBg }">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  h4 {
    margin: 8px 6px 6px 10px;
  }
  .card {
    // box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    padding: 10px 20px;
    border-radius: 6px;
    &.bg {
      background-color: var(--w-settings-bg-color);
    }
  }
}
</style>
