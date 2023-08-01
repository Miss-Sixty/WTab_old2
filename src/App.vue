<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { GridLayout, GridItem } from '@/layout/Grid'
import Widget from '@/widget/index.vue'
import Wallpaper from '@/layout/Wallpaper.vue'
import ExternalLinkDetail from '@/components/ExternalLinkDetail.vue'

const AsyncHeader = defineAsyncComponent(() => import('@/layout/Header.vue'))
const AsyncContextmenu = defineAsyncComponent(() => import('@/layout/Contextmenu.vue'))

const layoutStore = useLayoutStore()

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

// 删除组件
const delWidget = (item: any) => {
  layoutStore.deleteWidget(item)
}

const externalLinkDetailRef = ref()
// 编辑组件
const editWidget = (item: any) => {
  console.log(222,item);
  
  externalLinkDetailRef.value.openDialog(item)
}

// 编辑组件模式
const edit = () => {
  layoutStore.editing = true
}

const homeRef = ref()
const dragging = ref(false)

provide('appContextKey', {
  editWidget
})
</script>

<template>
  <div
    class="home"
    ref="homeRef"
    @contextmenu.prevent="onContentMenuVisible({ ev: $event, type: 'desktop', dom: homeRef })"
  >
    <Wallpaper />

    <AsyncHeader @clickSettings="onContentMenuVisible" />

    <AsyncContextmenu
      ref="contextMenuRef"
      @editWidget="editWidget(contextMenuWidgetData)"
      @delWidget="delWidget(contextMenuWidgetData)"
      @close="contextMenuWidgetData = {}"
      @edit="edit"
    />

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
            :itemData="item"
            :size="item.size"
            :type="layoutStore.editing ? 'delWidget' : ''"
            :dragging="dragging"
            @delWidget="delWidget(item)"
            @contextmenu.prevent.stop="
              onContentMenuVisible({ ev: $event, type: 'widget', dom: null, item })
            "
          />
        </GridItem>
      </GridLayout>
      <ExternalLinkDetail ref="externalLinkDetailRef" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  user-select: none;

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
</style>
