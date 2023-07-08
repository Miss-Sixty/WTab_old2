<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  }
})

const changeEvent = (value: any) => {
  emit('update:modelValue', value)
  nextTick(() => emit('change', value))
}

provide(
  'radioGroupContextKey',
  reactive({
    modelValue: props.modelValue,
    changeEvent
  })
)
</script>

<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.radio-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0;
}
</style>
