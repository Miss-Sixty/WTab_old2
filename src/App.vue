<script setup lang="ts">
// @ts-ignore
import analyze from 'rgbaster'
import useWallpaperStore from '@/stores/wallpaper'
import useColorMeta from '@/hooks/useColorMeta'
import useLayoutStore from '@/stores/layout'
const wallpaperStore = useWallpaperStore()
const layoutStore = useLayoutStore()

// 获取bing壁纸
wallpaperStore.getBingImg()
const bgImg = ref([0, 0, 0, 0])

// 设置主题色
const setThemeColor = async (url: string) => {
  const result = await analyze(url, { scale: 0.1 })
  useColorMeta(result[0].color)
}

watch(
  () => wallpaperStore.wallpaperColor,
  (url) => setThemeColor(url)
)

const contextMenuRef = ref()
const onContentMenuVisible = ({
  ev,
  type,
  dom,
  item
}: {
  ev: string
  type: 'widget' | 'settings'
  dom: any
  item: any
}) => {
  console.log('111', ev, type, dom, item)

  let x = 0
  let y = 0
  if (type === 'settings') {
    const rect = dom.getBoundingClientRect()
    x = rect.right
    y = rect.bottom
  }

  // if (type === 'widget') {
  //   widgetData.value = item
  //   x = $event.clientX
  //   y = $event.clientY
  // }

  const reference = {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: x,
        y: y,
        top: y,
        left: x,
        right: x,
        bottom: y
      }
    }
  }

  contextMenuRef.value.show(type, reference)
}

// import AsyncContextmenu from '@/components/Contextmenu.vue'
// import AsyncAbout from '@/components/About.vue'
// import AsyncSettings from '@/components/Settings/index.vue'
// import AsyncWallpaper from '@/components/Wallpaper/index.vue'
// import AsyncHeader from '@/components/Header.vue'

const aboutVisible = ref(false)
const settingsVisible = ref(false)
const wallpaperVisible = ref(false)
const AsyncHeader = defineAsyncComponent(() => import('@/components/Header.vue'))
const AsyncContextmenu = defineAsyncComponent(() => import('@/components/Contextmenu.vue'))
const AsyncAbout = defineAsyncComponent(() => import('@/components/About.vue'))
const AsyncSettings = defineAsyncComponent(() => import('@/components/Settings/index.vue'))
const AsyncWallpaper = defineAsyncComponent(() => import('@/components/Wallpaper/index.vue'))
</script>

<template>
  <div class="home" @contextmenu.prevent>
    <TransitionGroup name="opacity">
      <img
        v-if="wallpaperStore.wallpaperType === 'my'"
        @load="bgImg[3] = 1"
        v-show="bgImg[3] === 1"
        :src="wallpaperStore.myWallpaper"
        class="background"
      />

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
    </TransitionGroup>

    <AsyncHeader @clickSettings="onContentMenuVisible" />

    <AsyncContextmenu
      ref="contextMenuRef"
      @settings="settingsVisible = true"
      @editWidget="layoutStore.editing = true"
      @about="aboutVisible = true"
      @wallpaper="wallpaperVisible = true"
    />
    <AsyncAbout v-model="aboutVisible" />
    <AsyncSettings v-model="settingsVisible" />
    <AsyncWallpaper v-model="wallpaperVisible" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;

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
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.25s, opacity 0.25s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
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
