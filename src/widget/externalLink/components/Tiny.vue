<script setup lang="ts">
import Image from '@/components/Image/index.vue'
const props = defineProps({
  widgetData: {
    type: Object,
    required: true
  }
})

const nameFontSize = computed(() => {
  const sizes = ['35px', '26px', '20px', '15px']
  return {
    fontSize: sizes[props.widgetData.name?.length - 1] || '12px'
  }
})

const imgUrl = computed(() => {
  const type: any = {
    pure: 'pureIcon',
    online: 'onlineIcon'
  }

  return props.widgetData[type[props.widgetData.iconType]]
})
</script>

<template>
  <div
    class="content"
    :style="{ backgroundColor: widgetData.iconType === 'pure' ? widgetData.bgColor : '' }"
  >
    <Image
      v-if="widgetData.iconType !== 'pure' && widgetData.src"
      height="100%"
      width="100%"
      :src="imgUrl"
    />
    <span v-else :style="nameFontSize">{{ widgetData.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}
</style>
