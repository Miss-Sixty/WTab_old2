<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  plain: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button class="button" type="button" :class="[`button--${type}`, { 'is-plain': plain }]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: var(--w-button-text-color);
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: var(--w-button-bg-color);
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid var(--w-button-border-color);
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--w-button-hover-border-color);
    background-color: var(--w-button-hover-bg-color);
    color: var(--w-button-hover-text-color);
    outline: none;
  }

  &--primary {
    --w-button-hover-text-color: #ffffff;
    --w-button-bg-color: #409eff;
    --w-button-border-color: #409eff;
    --w-button-hover-border-color: #79bbff;
    --w-button-hover-bg-color: #79bbff;
  }

  &--danger {
    --w-button-hover-text-color: #ffffff;
    --w-button-bg-color: #f56c6c;
    --w-button-border-color: #f56c6c;
    --w-button-hover-border-color: #fab6b6;
    --w-button-hover-bg-color: #fab6b6;
    &.is-plain {
      --w-button-text-color: #f56c6c;
      --w-button-bg-color: #fef0f0;
      --w-button-border-color: #f56c6c;
      --w-button-hover-bg-color: #f56c6c;
      --w-button-hover-text-color: #ffffff;
    }
  }
}
</style>
