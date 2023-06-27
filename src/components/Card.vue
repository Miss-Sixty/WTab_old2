<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="content">
    <h4>{{ title }}</h4>
    <slot name="card">
      <div class="card">
        <slot />
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.content {
  h4 {
    margin: 8px 6px 6px 10px;
  }
  .card {
    padding: 10px 20px;
    border-radius: 6px;
    background-color: var(--w-settings-bg-color);
  }
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
