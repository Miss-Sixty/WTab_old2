<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { GridLayout, GridItem } from '@/layout/Grid'
import Widget from '@/widget/index.vue'
import Wallpaper from '@/layout/Wallpaper.vue'
import Header from '@/layout/Header.vue'
import Contextmenu from '@/layout/Contextmenu.vue'
import evevtBus from '@/utils/evevtBus'
import WidgetDialog from '@/widget/dialog/index.vue'
import WidgetList from '@/layout/WidgetList.vue'
// import { useDrag } from '@vueuse/gesture'
// import { useSpring, useMotionProperties } from '@vueuse/motion'
import { DragGesture } from '@use-gesture/vanilla'
import { onLongPress } from '@vueuse/core'
import anime from 'animejs/lib/anime.es.js'
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const layoutStore = useLayoutStore()

const contextMenuWidgetData = ref<any>({})
const contextMenuRef = ref()
const onContentMenuVisible = ({ ev, type, dom, item, widgetKey }: any) => {
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

  if (type === 'langTabWidget') {
    const rect = dom.getBoundingClientRect()
    console.log('111', dom, rect)

    x = rect.right
    y = rect.bottom
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

  // 是否显示编辑
  const isEditWidget: any = ['externalLink']
  contextMenuRef.value.show(type, reference, isEditWidget.includes(widgetKey))
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
    easing: 'easeInOutExpo',
    complete() {
      anime({
        targets: activeDom.value,
        duration: 200,
        scale: 1.1,
        easing: 'easeInOutExpo'
      })
      onContentMenuVisible({
        ev: null,
        type: 'langTabWidget',
        dom: activeDom.value,
        item: {},
        widgetKey: activeDomId.value
      })
    }
  })

  overlayRef.value.style.display = 'block'
  anime({
    targets: overlayRef.value,
    duration: 0,
    zIndex: 999,
    easing: 'easeInOutExpo',
    complete() {
      anime({
        targets: overlayRef.value,
        duration: 400,
        opacity: 1,
        easing: 'easeInOutExpo'
      })
    }
  })
}

const cancelLongPress = () => {
  anime({
    targets: activeDom.value,
    duration: 200,
    scale: 1,
    easing: 'easeInOutExpo',
    complete() {
      anime({
        targets: activeDom.value,
        duration: 0,
        zIndex: 0,
        easing: 'easeInOutExpo'
      })
    }
  })

  anime({
    targets: overlayRef.value,
    duration: 400,
    opacity: 0,
    easing: 'easeInOutExpo',
    complete() {
      anime({
        targets: overlayRef.value,
        duration: 0,
        zIndex: 0,
        easing: 'easeInOutExpo'
      })
      overlayRef.value.style.display = 'none'
    }
  })

  activeDom.value = null
  activeDomId.value = null
  appStore.popperVisible = false
}

onLongPress(
  mainRef,
  (e: Event) => {
    // 查找最近的父元素
    const target = (e.target as HTMLElement).closest('.grid_item')
    if (!target) return
    activeDom.value = target
    activeDomId.value = target.id
    startAnime()
  },
  { delay: 200 }
)

// onClickOutside(homeRef, () => {
//   appStore.popperVisible = false
//   // emit('close')
// })
</script>

<template>
  <div
    class="home"
    ref="homeRef"
    @contextmenu.prevent="onContentMenuVisible({ ev: $event, type: 'desktop', dom: homeRef })"
  >
    <Wallpaper />

    <Header @clickSettings="onContentMenuVisible" @addWidget="addWidgetVisible = true" />
    <Contextmenu
      ref="contextMenuRef"
      @edit="layoutStore.editing = true"
      @editWidget="editWidget(contextMenuWidgetData)"
      @delWidget="delWidget(contextMenuWidgetData)"
      @close="contextMenuWidgetData = {}"
      @addWidget="addWidgetVisible = true"
    />

    <main class="main" ref="mainRef">
      <!-- 蒙层，图标在原位放大 -->
      <div class="overlay" ref="overlayRef" @click="cancelLongPress"></div>
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
            :itemData="item"
            :size="item.size"
            :type="layoutStore.editing ? 'delWidget' : ''"
            :dragging="dragging"
            @delWidget="delWidget(item)"
            @contextmenu.prevent.stop="
              onContentMenuVisible({
                ev: $event,
                type: 'widget',
                dom: null,
                item,
                widgetKey: item.key
              })
            "
          />
        </GridItem>
      </GridLayout>
    </main>

    <WidgetList v-model="addWidgetVisible" />
    <WidgetDialog />
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
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    opacity: 0;
  }
}
</style>
