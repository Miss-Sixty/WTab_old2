<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="card">
    <h4 v-if="title">{{ title }}</h4>
    <slot name="card">
      <div class="content">
        <slot />
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  h4 {
    margin: 8px 6px 6px 10px;
  }
  .content {
    padding: 20px;
    border-radius: 6px;
    background-color: var(--w-settings-bg-color);
  }
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
