<script setup lang="ts">
const emit = defineEmits(['load', 'error'])
const props = defineProps({
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  radius: {
    type: Number,
    default: 0
  },
  src: String,
  scale: {
    type: Boolean,
    default: false
  }
})

watch(
  () => props.src,
  () => {
    error.value = false
    loading.value = true
  }
)

const styles = computed(() => {
  const style: any = {
    width: props.width,
    height: props.height
  }
  if (props.radius) {
    style.borderRadius = `${props.radius}px`
  }

  return style
})

const loading = ref(true)
const error = ref(false)

const onLoad = (event: Event) => {
  if (!loading.value) return
  loading.value = false
  emit('load', event)
}

const onError = (event: Event) => {
  error.value = true
  loading.value = false
  emit('error', event)
}
</script>

<template>
  <div class="image" :style="styles">
    <img
      class="image__img"
      :class="{ 'image__img-scale': scale }"
      :src="src"
      @load="onLoad"
      @error="onError"
      v-if="!error"
    />

    <div class="image__placeholder" v-if="loading || error">
      <slot name="loading" v-if="loading">加载中</slot>
      <slot name="error" v-if="error">加载失败</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image {
  position: relative;
  display: inline-block;
  overflow: hidden;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    &-scale {
      transition: transform 0.25s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--w-image-placeholder-text-color);
    font-size: 14px;
    background: var(--w-image-placeholder-background);
    width: 100%;
    height: 100%;
    user-select: none;
  }
}
</style>
