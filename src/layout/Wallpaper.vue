<script setup lang="ts">
import useWallpaperStore from '@/stores/wallpaper'
import useSetThemeColor from '@/hooks/useSetThemeColor'
defineOptions({
  name: 'Wallpaper'
})
const wallpaperStore = useWallpaperStore()

const init = () => {
  const type = {
    bing: wallpaperStore.getBingImg, // 获取bing壁纸
    my: wallpaperStore.getMyWallpaper // 获取自定义壁纸
  }

  type[wallpaperStore.wallpaperType]()
}

const bgImg = ref([0, 0, 0, 0]) // 图片是否加载完成 0:mini 1:normal 2:hd 3:my

watch(
  () => wallpaperStore.wallpaperUrl,
  (url) => useSetThemeColor(url)
)

init()
</script>

<template>
  <TransitionGroup name="opacity">
    <template v-if="wallpaperStore.wallpaperType === 'bing'">
      <img
        @load="bgImg[0] = 1"
        v-show="bgImg[0] === 1"
        :src="wallpaperStore.bing.url_mini"
        class="background"
        style="filter: blur(30px)"
        key="mini"
      />
      <img
        @load="bgImg[1] = 1"
        v-show="bgImg[1] === 1"
        :src="wallpaperStore.bing.url"
        class="background"
        key="normal"
      />
      <img
        @load="bgImg[2] = 1"
        v-show="bgImg[2] === 1"
        :src="wallpaperStore.bing.url_hd"
        class="background"
        key="hd"
      />
    </template>

    <img
      v-else-if="wallpaperStore.wallpaperType === 'my'"
      @load="bgImg[3] = 1"
      v-show="bgImg[3] === 1"
      :src="wallpaperStore.myWallpaper"
      class="background"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.background {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.8s;
}
.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
