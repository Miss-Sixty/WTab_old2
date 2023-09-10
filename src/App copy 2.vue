<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import useAppStore from '@/stores/app'
import { GridLayout, GridItem } from '@/layout/Grid'
import Widget from '@/widget/index.vue'
import Wallpaper from '@/layout/Wallpaper.vue'
import Header from '@/layout/Header.vue'
import Contextmenu from '@/components/Contextmenu.vue'
import evevtBus from '@/utils/evevtBus'
import WidgetDialog from '@/widget/dialog/index.vue'
import { onLongPress } from '@vueuse/core'
import WidgetList from '@/layout/WidgetList.vue'
import Core from '@any-touch/core'
import press from '@any-touch/press'
import tap from '@any-touch/tap'
import pan from '@any-touch/pan'
const appStore = useAppStore()

const layoutStore = useLayoutStore()

const contextMenuWidgetData = ref<any>({})
const contextMenuRef = ref()
const xy = ref({ x: 0, y: 0 })
const onContentMenuVisible = ({ type, ev, dom, item, widgetKey }: any) => {
  let x = 0
  let y = 0
  if (type === 'settings') {
    const rect = dom.getBoundingClientRect()
    x = rect.right
    y = rect.bottom
  }

  if (type === 'widget') {
    contextMenuWidgetData.value = item
    x = ev.clientX || ev.x
    y = ev.clientY || ev.y
  }

  if (type === 'desktop') {
    x = ev.clientX
    y = ev.clientY
  }

  if (type === 'contextmenuWidget') {
    console.log(33, dom)

    const rect = dom.getBoundingClientRect()
    console.log(2323, rect)
    x = rect.left
    y = rect.bottom
  }

  if (type === 'demo') {
    const rect = dom.getBoundingClientRect()
    console.log(2323, rect)
    x = rect.left
    y = rect.bottom
    xy.value = {
      x: rect.left,
      y: rect.bottom
    }
  }

  // const reference = {
  //   getBoundingClientRect() {
  //     return {
  //       width: 0,
  //       height: 0,
  //       x: x,
  //       y: y,
  //       top: y,
  //       left: x,
  //       right: x,
  //       bottom: y
  //     }
  //   }
  // }

  // // 是否显示编辑
  // const isEditWidget: any = ['externalLink']
  // contextMenuRef.value.show(type, reference, isEditWidget.includes(widgetKey))
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

// onLongPress(
//   homeRef,
//   () => {
//     if (layoutStore.editing) return
//     layoutStore.editing = true
//   },
//   { delay: 1000 }
// )

const addWidgetVisible = ref(false)

const onTap = (data) => {
  console.log('onTap', data)
  activeData.value = null
  // if (layoutStore.editing) layoutStore.editing = false
  // if (appStore.activeData) appStore.activeData = null
  // if (appStore.popperVisible) appStore.popperVisible = false
}

const activeData: any = ref(null)
const onPress = (e) => {
  console.log('onPress', e)
  let child: any = e.target
  while (!child.id && child.className !== 'main') {
    child = child.parentNode
  }
  console.log('2323', child)
  activeData.value = { id: child.id }

  onContentMenuVisible({ type: 'demo', dom: child })

  // if (child.id === '' && !layoutStore.editing) return (layoutStore.editing = true)

  // appStore.setActiveDataById(child.id)
  // onContentMenuVisible({ ev: e, type: 'contextmenuWidget', dom: child })
}
const onPan = (data) => {
  console.log('onPan', data)
}

const init = () => {
  const at = new Core(homeRef.value)
  at.use(press, {
    minPressTime: 500
  })
  at.use(tap)
  at.use(pan)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div
    class="home"
    ref="homeRef"
    @contextmenu.prevent="onContentMenuVisible({ ev: $event, type: 'desktop', dom: homeRef })"
    @press="onPress"
    @tap="onTap"
  >
    <img
      src="https://www.bing.com/th?id=OHR.TinyHummer_EN-US3171586787_1920x1080.jpg"
      class="bg"
      :class="{ scale: activeData }"
    />
    <div ref="divRef" class="box" :class="{ scale2: activeData?.id === '001' }">
      <div style="top: 200px" class="widget" id="001">
        {{ xy }}
        div--{{}}
      </div>
      <div class="overlay" :class="{ aa: activeData?.id }"></div>
    </div>

    <div
      style="top: 500px"
      :class="{
        scale2: activeData?.id === '002',
        scale3: !activeData?.id === false && activeData?.id !== '002'
      }"
      class="widget"
      id="001"
      ref="divRef"
    >
      div--{{ activeData?.id }}--
      {{ !activeData?.id === false && activeData?.id !== '002' }}
    </div>

    <!-- <Wallpaper />

    <Header @clickSettings="onContentMenuVisible" @addWidget="addWidgetVisible = true" />-->
    <Contextmenu ref="contextMenuRef" />

    <!-- <main class="main"> -->

    <!-- <GridLayout
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
            :activeData="appStore.activeData"
          />
        </GridItem>
      </GridLayout>
    </main> -->

    <!-- <WidgetList v-model="addWidgetVisible" />
    <WidgetDialog /> -->
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  user-select: none;

  .bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: scale(1.2);
    transition: all 3s;
    width: 100%;
    height: 100%;
    &.scale {
      transform: scale(1.1);
      filter: blur(10px);
    }
  }

  .box {
    transform: scale(1);
    transition: all 3s;
    position: relative;
    z-index: 1;
    &.scale2 {
      transform: scale(1.1);
    }
  }

  .overlay {
    // position: fixed;
    background-color: red;
    width: 100px;
    height: 100px;
    transition: all 3s;
    position: absolute;
    top: 400px;
    left: 200px;
    opacity: 0;

    &.aa {
      opacity: 1;
    }
  }

  .widget {
    transition: all 3s;
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: aquamarine;
    left: 200px;
    // &.scale2 {
    //   transform: scale(1.1);
    // }
    // &.scale3 {
    //   transform: scale(0.9);
    //   filter: blur(10px);
    // }
  }

  // .main {
  //   overflow: hidden;
  //   overflow-y: auto;
  //   padding: 5vh 0;
  //   height: 100%;
  //   -webkit-overflow-scrolling: touch;

  //   &::-webkit-scrollbar {
  //     display: none; /* Chrome Safari */
  //   }
  // }
}
</style>
