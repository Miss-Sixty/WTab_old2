<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'

const cropperVisible = ref(false)
const cropperUrl = ref('')

const cropperRef = ref()
const zoom = (factor: number) => {
  cropperRef.value.zoom(factor)
}
const flip = (x: boolean, y: boolean) => {
  const { image } = cropperRef.value.getResult()
  if (image.transforms.rotate % 180 !== 0) {
    cropperRef.value.flip(!x, !y)
  } else {
    cropperRef.value.flip(x, y)
  }
}
const rotate = (angle: number) => {
  cropperRef.value.rotate(angle)
}

const cropperSubmit = () => {
  //   _icon.value = cropperRef.value.getResult().canvas.toDataURL()
  //   cropperVisible.value = false
}

const open = (url: string) => {
  cropperUrl.value = url
  cropperVisible.value = true
}
defineExpose({ open })
</script>

<template>
  <Dialog v-model="cropperVisible" :width="650" title="图标设置">
    <div class="cropper">
      <cropper
        class="cropper__content"
        ref="cropperRef"
        :src="cropperUrl"
        :stencil-props="{
          aspectRatio: 1 / 1
        }"
        image-restriction="fit-area"
      />
      <div class="cropper__btn">
        <el-button @click="zoom(2)">放 大</el-button>
        <el-button @click="zoom(0.5)">缩 小</el-button>
        <el-button @click="flip(true, false)">左右翻转</el-button>
        <el-button @click="flip(false, true)">上下翻转</el-button>
        <el-button @click="rotate(90)">右旋转</el-button>
        <el-button @click="rotate(-90)">左旋转</el-button>
      </div>
      <el-button @click="cropperSubmit">确 定</el-button>
    </div>
  </Dialog>
</template>
