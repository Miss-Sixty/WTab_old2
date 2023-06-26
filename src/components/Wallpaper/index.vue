<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import { ArrowRightUp } from '@/icons'
import Icon from '@/components/Icon.vue'
import { useFileDialog } from '@vueuse/core'
import localforage from 'localforage'
import useWallpaperStore from '@/stores/wallpaper'
const wallpaperStore = useWallpaperStore()

const { open, onChange } = useFileDialog({
  multiple: false
})

onChange((files) => {
  const [rawFile] = files || []
  localforage.setItem('wallpaper', rawFile)
  wallpaperStore.myWallpaper = URL.createObjectURL(rawFile)
})

const getMyWallpaper = async () => {
  const url = localStorage.getItem('myWallpaper')
  if (url) return
  
  const file: Blob | null = await localforage.getItem('wallpaper')
  if (file) {
    wallpaperStore.myWallpaper = URL.createObjectURL(file) || ''
  }
}
getMyWallpaper()

const setActiveImg = (type: 'my' | 'bing') => {
  wallpaperStore.wallpaperType = type
}

const active = (type: 'my' | 'bing') => wallpaperStore.wallpaperType === type
</script>

<template>
  <Dialog :width="650" title="壁纸偏好">
    <div class="content">
      <Card
        :active="active('my')"
        title="自定义"
        :src="wallpaperStore.myWallpaper"
        @click="setActiveImg('my')"
      >
        <el-button type="primary" @click="open">浏览…</el-button>
      </Card>
      <Card
        :active="active('bing')"
        title="每日 Bing"
        info="来自 Bing 的壁纸，每日更新。"
        tip="每天更新来自 Bing 的壁纸。"
        :src="wallpaperStore.bing.url_hd || wallpaperStore.bing.url"
        @click="setActiveImg('bing')"
      >
        <span style="vertical-align: middle">图像来源：</span>
        <el-link type="primary" href="https://cn.bing.com" target="_blank" :underline="false">
          Bing
          <Icon><ArrowRightUp /></Icon>
        </el-link>
        <el-link
          style="margin-left: 10px"
          type="primary"
          :href="wallpaperStore.bing.url_hd || wallpaperStore.bing.url"
          target="_blank"
          :underline="false"
        >
          原图
          <Icon><ArrowRightUp /></Icon>
        </el-link>
      </Card>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.content {
}
</style>
