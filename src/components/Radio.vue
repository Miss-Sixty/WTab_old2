<script setup lang="ts">
defineProps({
  modelValue: {
    type: [Boolean, String],
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <label class="radio">
    <input type="radio" />
    <span class="radio__inner" :class="{ checked: modelValue === label }"><slot /> </span>
  </label>
</template>

<style lang="scss" scoped>
label {
  position: relative;
  display: inline-block;
  outline: none;
  input {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
  }
  span {
    padding: 12px 19px;
    font-weight: 500;
    font-size: 14px;

    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    background-color: var(--w-radio-button-bg-color);
    border: 1px solid var(--w-radio-button-border-color);

    border-left: 0;
    // color: var(--w-radio-butto-text-color);
    -webkit-appearance: none;
    text-align: center;
    outline: none;
    margin: 0;
    position: relative;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    user-select: none;
    padding: 8px 15px;
    border-radius: 0;

    &:hover {
      color: var(--w-radio-button-hover-text-color);
    }

    &.checked {
      color: var(--w-radio-button-checked-text-color);
      background-color: var(--w-radio-button-checked-bg-color);
      border-color: var(--w-radio-button-checked-border-color);
    }
  }
}

.radio-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0;
  .radio__inner {
    border: 1px solid #dcdfe6;
    border-left: 0;
  }
  .radio {
    &:first-child .radio__inner {
      border-radius: 4px 0 0 4px;
      border-left: 1px solid #dcdfe6;
    }
    &:last-child .radio__inner {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
