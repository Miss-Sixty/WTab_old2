<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { GridLayout, GridItem } from '@/layout/Grid'
import Widget from '@/widget/index.vue'
import Wallpaper from '@/layout/Wallpaper.vue'
import Header from '@/layout/Header.vue'
import Contextmenu from '@/layout/Contextmenu.vue'
import evevtBus from '@/utils/evevtBus'
import WidgetDialog from '@/widget/dialog/index.vue'
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
</script>

<template>
  <div
    class="home"
    ref="homeRef"
    @contextmenu.prevent="onContentMenuVisible({ ev: $event, type: 'desktop', dom: homeRef })"
  >
    <Wallpaper />

    <Header @clickSettings="onContentMenuVisible" />
    <Contextmenu
      ref="contextMenuRef"
      @edit="layoutStore.editing = true"
      @editWidget="editWidget(contextMenuWidgetData)"
      @delWidget="delWidget(contextMenuWidgetData)"
      @close="contextMenuWidgetData = {}"
    />

    <main class="main">
      <GridLayout
        v-model="layoutStore.data"
        :colsNum="layoutStore.colsNum"
        :baseSize="layoutStore.baseSize"
        :baseMargin="layoutStore.baseMargin"
        :editing="layoutStore.editing"
        v-model:dragging="dragging"
        @onLongPress="layoutStore.editing = true"
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

    <WidgetDialog />
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
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
