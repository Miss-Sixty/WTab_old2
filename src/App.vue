<script setup lang="ts">
// @ts-ignore
import analyze from 'rgbaster'
import useWallpaperStore from '@/stores/wallpaper'
import useColorMeta from '@/hooks/useColorMeta'
import useLayoutStore from '@/stores/layout'
import { GridLayout, GridItem } from '@/components/Grid'
import Widget from '@/widget/index.vue'
const AsyncHeader = defineAsyncComponent(() => import('@/components/Header.vue'))
const AsyncContextmenu = defineAsyncComponent(() => import('@/components/Contextmenu.vue'))
const AsyncAbout = defineAsyncComponent(() => import('@/components/About.vue'))
const AsyncSettings = defineAsyncComponent(() => import('@/components/Settings/index.vue'))
const AsyncWallpaper = defineAsyncComponent(() => import('@/components/Wallpaper/index.vue'))
const AsyncWidgetList = defineAsyncComponent(() => import('@/components/WidgetList.vue'))

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

const contextMenuWidgetData = ref<any>({})
const contextMenuRef = ref()
const onContentMenuVisible = ({ ev, type, dom, item }: any) => {
  let x = 0
  let y = 0
  if (type === 'settings') {
    const rect = dom.getBoundingClientRect()
    x = rect.right
    y = rect.bottom
  }

  if (type === 'widget') {
    contextMenuWidgetData.value = item
    x = ev.clientX
    y = ev.clientY
  }

  if (type === 'desktop') {
    x = ev.clientX
    y = ev.clientY
  }

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
const addWidgetVisible = ref(false)

const dragging = ref(false)
// 删除组件
const delWidget = (item: any) => {
  layoutStore.deleteWidget(item)
}
// 编辑组件
const editWidget = (item: any) => {
  layoutStore.editing = true
}

const addWidge = () => {
  addWidgetVisible.value = true
}

const homeRef = ref()
</script>

<template>
  <div
    class="home"
    ref="homeRef"
    @contextmenu.prevent="onContentMenuVisible({ ev: $event, type: 'desktop', dom: homeRef })"
  >
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
        v-else-if="wallpaperStore.wallpaperType === 'my' && wallpaperStore?.myWallpaper"
        @load="bgImg[3] = 1"
        v-show="bgImg[3] === 1"
        :src="wallpaperStore.myWallpaper"
        class="background"
      />
    </TransitionGroup>

    <AsyncHeader @clickSettings="onContentMenuVisible"></AsyncHeader>

    <AsyncContextmenu
      ref="contextMenuRef"
      @settings="settingsVisible = true"
      @editWidget="editWidget(contextMenuWidgetData)"
      @about="aboutVisible = true"
      @wallpaper="wallpaperVisible = true"
      @addWidget="addWidge"
      @delWidget="delWidget(contextMenuWidgetData)"
      @close="contextMenuWidgetData = {}"
    ></AsyncContextmenu>
    <AsyncAbout v-model="aboutVisible"></AsyncAbout>
    <AsyncSettings v-model="settingsVisible"></AsyncSettings>
    <AsyncWallpaper v-model="wallpaperVisible"></AsyncWallpaper>
    <AsyncWidgetList v-model="addWidgetVisible"></AsyncWidgetList>

    <main class="main">
      <GridLayout
        v-model="layoutStore.data"
        :colsNum="layoutStore.colsNum"
        :baseSize="layoutStore.baseSize"
        :baseMargin="layoutStore.baseMargin"
        :editing="layoutStore.editing"
        v-model:dragging="dragging"
      >
        <GridItem v-for="item in layoutStore.data" :key="item.id" :id="item.id">
          <Widget
            :editing="layoutStore.editing"
            :size="item.size"
            :type="layoutStore.editing ? 'delWidget' : ''"
            scale
            :componentKey="item.key"
            :dragging="dragging"
            @delWidget="delWidget(item)"
            @contextmenu="onContentMenuVisible({ ev: $event, type: 'widget', dom: null, item })"
            :data="item"
          ></Widget>
        </GridItem>
      </GridLayout>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  user-select: none;

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

  .main {
    overflow: hidden;
    overflow-y: auto;
    padding: 5vh 0;
    height: 100%;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.25s,
    opacity 0.25s;
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
