<script setup lang="ts">
import id from './id'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

const radioGroup: any = inject('radioGroupContextKey', undefined)
const isGroup = computed(() => !!radioGroup)
const radioRef = ref<HTMLInputElement | null>(null)
const model = computed({
  get() {
    return isGroup.value ? radioGroup!.modelValue : props.modelValue!
  },
  set(val) {
    if (isGroup.value) return radioGroup!.changeEvent(val)
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <label class="radio">
    <input
      type="radio"
      class="radio__checkbox"
      :value="value"
      v-model="model"
      ref="radioRef"
      :name="id"
    />
    <span class="radio__inner">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.radio {
  position: relative;
  display: inline-block;
  outline: none;
  .radio__checkbox {
    opacity: 0;
    display: none;
    outline: none;
    position: absolute;
    z-index: -1;
  }
  &:first-child .radio__inner {
    border-radius: 4px 0 0 4px;
    border-left: 1px solid var(--w-radio-button-border-color);
    box-shadow: none !important;
  }
  &:last-child .radio__inner {
    border-radius: 0 4px 4px 0;
  }

  &__inner {
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
    transition:
      color 0.2s,
      background-color 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
    user-select: none;
    padding: 8px 15px;
    border-radius: 0;

    &:hover {
      color: var(--w-color-primary);
    }
  }

  &__checkbox:checked + &__inner {
    color: #fff;
    background-color: var(--w-color-primary);
    border-color: var(--w-color-primary);
    box-shadow: -1px 0 0 0 var(--w-color-primary);
  }
}
</style>
