<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="cell">
    <slot>
      <div class="header">
        <div class="left">
          <slot name="left">
            <span v-if="title">{{ title }}</span>
          </slot>
        </div>

        <div class="right">
          <slot name="right"> </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.cell {
  padding: 4px;
  border-radius: 6px;
  font-size: 14px;

  .header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
