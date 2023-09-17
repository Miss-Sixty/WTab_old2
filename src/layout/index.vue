<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { GridLayout, GridItem } from '@/layout/Grid'
import Widget from '@/widget/index.vue'
import WallpaperBg from '@/layout/Wallpaper.vue'
import Header from '@/layout/Header.vue'
import Contextmenu from '@/layout/Contextmenu.vue'
import evevtBus from '@/utils/evevtBus'
import WidgetDialog from '@/widget/dialog/index.vue'
import WidgetList from '@/layout/WidgetList.vue'
import anime from 'animejs/lib/anime.es.js'
import useAppStore from '@/stores/app'
import Settings from '@/layout/Settings/index.vue'
import Wallpaper from '@/layout/Wallpaper/index.vue'

const appStore = useAppStore()

const layoutStore = useLayoutStore()

const contextMenuWidgetData = ref<any>({})
const contextMenuRef = ref()
const onContentMenuVisible = (type: string, options: any) => {
  const { ev = {}, dom, item } = options

  let clientRect = {
    width: 0,
    height: 0,
    x: ev.clientX,
    y: ev.clientY,
    top: ev.clientY,
    left: ev.clientX,
    right: ev.clientX,
    bottom: ev.clientY
  }

  let reference = {
    getBoundingClientRect() {
      return clientRect
    }
  }

  if (type === 'settings') {
    reference = dom
  }

  if (type === 'widget') {
    contextMenuWidgetData.value = item
  }

  if (type === 'desktop') {
  }

  if (type === 'langTabWidget') {
    // 以组件中心点为参考点放大1.1倍，计算出新的坐标
    const { width, height, x, y } = dom.getBoundingClientRect()
    const _clientRect = {
      width: width * 1.1,
      height: height * 1.1,
      x: x - (width * 1.1 - width) / 2,
      y: y - (height * 1.1 - height) / 2,
      top: y - (height * 1.1 - height) / 2,
      left: x - (width * 1.1 - width) / 2,
      right: x - (width * 1.1 - width) / 2,
      bottom: y - (height * 1.1 - height) / 2
    }
    clientRect = _clientRect
  }

  contextMenuRef.value.show(type, reference)
}

// 删除组件
const delWidget = (item: any) => {
  layoutStore.deleteWidget(item)
}

// 编辑组件
const editWidget = (item: any) => {
  layoutStore.editing = true
  evevtBus.emit('externalLinkDetailOpenDialog', item)
}

const homeRef = ref()
const dragging = ref(false)
const addWidgetVisible = ref(false)

const mainRef = ref()
const activeDom = ref()
const activeDomId = ref()
const overlayRef = ref()
const startAnime = () => {
  anime({
    targets: activeDom.value,
    duration: 0,
    zIndex: 999,
    easing: 'linear',
    complete() {
      anime({
        targets: activeDom.value,
        duration: 200,
        scale: 1.1,
        easing: 'linear'
      })
      onContentMenuVisible('langTabWidget', {
        dom: activeDom.value
      })
    }
  })

  overlayRef.value.style.display = 'block'
  anime({
    targets: overlayRef.value,
    duration: 0,
    zIndex: 999,
    easing: 'linear',
    complete() {
      anime({
        targets: overlayRef.value,
        duration: 200,
        opacity: 1,
        easing: 'linear'
      })
    }
  })
}

const cancelLongPress = () => {
  anime({
    targets: activeDom.value,
    duration: 200,
    scale: 1,
    easing: 'linear',
    complete() {
      anime({
        targets: activeDom.value,
        duration: 0,
        zIndex: 0,
        easing: 'linear'
      })
      activeDom.value = null
      activeDomId.value = null
    }
  })

  anime({
    targets: overlayRef.value,
    duration: 200,
    opacity: 0,
    easing: 'linear',
    complete() {
      anime({
        targets: overlayRef.value,
        duration: 0,
        zIndex: 0,
        easing: 'linear'
      })
      overlayRef.value.style.display = 'none'
      appStore.popperVisible = false
    }
  })
}

const langTap = (e: any) => {
  const target = (e.target as HTMLElement).closest('.grid_item')
  if (!target) return
  if (activeDom.value) return
  activeDom.value = target
  activeDomId.value = target.id
  startAnime()
}

const settingsVisible = ref(false)
const wallpaperVisible = ref(false)
const close = () => {
  cancelLongPress()
  contextMenuWidgetData.value = {}
}
</script>

<template>
  <div
    class="home"
    ref="homeRef"
    @contextmenu.prevent="onContentMenuVisible('desktop', { ev: $event })"
  >
    <WallpaperBg />

    <Header
      @clickSettings="(data) => onContentMenuVisible(data.type, { dom: data.dom })"
      @addWidget="addWidgetVisible = true"
    />
    <Contextmenu
      ref="contextMenuRef"
      @edit="layoutStore.editing = true"
      @editWidget="editWidget(contextMenuWidgetData)"
      @delWidget="delWidget(contextMenuWidgetData)"
      @close="close"
      @addWidget="addWidgetVisible = true"
    />

    <main class="main" ref="mainRef">
      <div class="overlay" ref="overlayRef" @click="cancelLongPress" @contextmenu.prevent.stop />
      <GridLayout
        v-model="layoutStore.data"
        :colsNum="layoutStore.colsNum"
        :baseSize="layoutStore.baseSize"
        :baseMargin="layoutStore.baseMargin"
        :editing="layoutStore.editing"
        v-model:dragging="dragging"
      >
        <GridItem :id="item.id" @langTap="langTap" v-for="item in layoutStore.data" :key="item.id">
          <Widget
            :editing="layoutStore.editing"
            :itemData="item"
            :size="item.size"
            :type="layoutStore.editing ? 'delWidget' : ''"
            :dragging="dragging"
            @delWidget="delWidget(item)"
            @contextmenu.prevent.stop="
              !activeDom && onContentMenuVisible('widget', { ev: $event, item })
            "
          />
        </GridItem>
      </GridLayout>
    </main>
    <WidgetList v-model="addWidgetVisible" />
    <WidgetDialog />
    <Settings v-model="settingsVisible" />
    <Wallpaper v-model="wallpaperVisible" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  user-select: none;
  -webkit-touch-callout: none;
  user-select: none;
  .main {
    overflow: hidden;
    overflow-y: auto;
    padding: 5vh 0;
    height: 100%;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  // 遮罩层
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    opacity: 0;
    display: none;
  }
}
</style>
