<script setup lang="ts">
import { computePosition, flip, shift } from '@floating-ui/dom'
import { ArrowRightUp } from '@/icons'
import Icon from '@/components/Icon.vue'
import useAppStore from '@/stores/app'
const appStore = useAppStore()

const AsyncSettings = defineAsyncComponent(() => import('@/layout/Settings/index.vue'))
const AsyncWallpaper = defineAsyncComponent(() => import('@/layout/Wallpaper/index.vue'))
const AsyncAbout = defineAsyncComponent(() => import('@/layout/About.vue'))

const emit = defineEmits(['delWidget', 'editWidget', 'edit', 'close', 'addWidget'])

const contextmenuType = ref('')
const isShowEdit = ref(false)
const styles = ref({})
const floatingRef = ref()
const onContextmenu = async (boundingClientRect: any) => {
  appStore.popperVisible = true
  const obj: any = {
    widget: {
      placement: 'right-start',
      transformOrigin: '0% 0%'
    },
    desktop: {
      placement: 'right-start',
      transformOrigin: '0% 0%'
    },
    settings: {
      placement: 'bottom-end',
      transformOrigin: '90% 0%'
    },
    langTabWidget: {}
  }

  const type = obj[contextmenuType.value]

  const { x, y } = await computePosition(boundingClientRect, floatingRef.value, {
    placement: type.placement,
    middleware: [flip(), shift()],
    strategy: 'fixed'
  })

  styles.value = {
    left: `${x}px`,
    top: `${y}px`,
    transformOrigin: type.transformOrigin //变换的基点
  }
}

const onFeedback = () => {
  appStore.popperVisible = false
  window.open('https://support.qq.com/products/592621/')
}

const show = (type: string, boundingClientRect: any, isEdit: boolean) => {
  contextmenuType.value = type
  isShowEdit.value = isEdit
  onContextmenu(boundingClientRect)
}
defineExpose({ show })

const onEmitChange = (type: 'addWidget' | 'delWidget' | 'editWidget' | 'edit', data?: any) => {
  appStore.popperVisible = false
  emit(type, data)
}

const aboutVisible = ref(false)
const settingsVisible = ref(false)
const wallpaperVisible = ref(false)

const clickChange = (type: 'about' | 'settings' | 'wallpaper') => {
  appStore.popperVisible = false
  const typeRef = {
    about: aboutVisible,
    settings: settingsVisible,
    wallpaper: wallpaperVisible
  }
  typeRef[type].value = true
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <ul @contextmenu.prevent v-show="appStore.popperVisible" ref="floatingRef" :style="styles">
        <li
          v-show="contextmenuType === 'settings' || contextmenuType === 'desktop'"
          class="item"
          @click="clickChange('settings')"
        >
          常规设置
        </li>
        <li
          v-show="contextmenuType === 'settings' || contextmenuType === 'desktop'"
          class="item"
          @click="clickChange('wallpaper')"
        >
          壁纸偏好
        </li>
        <li
          v-show="contextmenuType === 'settings' || contextmenuType === 'desktop'"
          class="separator"
        />

        <li class="item" @click="onEmitChange('addWidget')">添加小组件</li>
        <li class="item" @click="onEmitChange('edit')">编辑小组件</li>
        <li
          v-show="contextmenuType === 'widget' || contextmenuType === 'langTabWidget'"
          class="item"
          @click="onEmitChange('editWidget')"
        >
          编辑此小组件
        </li>
        <li
          v-show="contextmenuType === 'widget' || contextmenuType === 'langTabWidget'"
          class="item delete"
          @click="onEmitChange('delWidget')"
        >
          删除此小组件
        </li>

        <li v-show="contextmenuType === 'settings'" class="separator" />
        <li v-show="contextmenuType === 'settings'" class="item" @click="onFeedback">
          <span>问题反馈</span> <Icon><ArrowRightUp /></Icon>
        </li>
        <li v-show="contextmenuType === 'settings'" class="item" @click="clickChange('about')">
          关于
        </li>
      </ul>
    </Transition>
  </Teleport>

  <AsyncSettings v-model="settingsVisible" />
  <AsyncWallpaper v-model="wallpaperVisible" />
  <AsyncAbout v-model="aboutVisible" />
</template>
<style lang="scss" scoped>
ul {
  position: fixed;
  background-color: var(--w-contextmenu-bg-color);
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  font-size: 13px;
  padding: 8px;
  list-style: none;
  min-width: 150px;
  left: 0;
  top: 0;
  z-index: 9999;
  user-select: none;
  transition: all 0.3s;

  .item {
    padding: 6px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition:
      color 0.25s,
      background-color 0.25s;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 4px;
      color: inherit;
    }

    &:hover:not(.delete) {
      background-color: var(--w-contextmenu-hover-bg-color);
    }
    &:not(:last-child) {
      margin-bottom: 2px;
    }

    &.delete {
      color: var(--el-color-danger);
      &:hover {
        background-color: rgba($color: #ff0000, $alpha: 0.08);
      }
    }
  }
  .separator {
    margin: 6px 0;
    border-top: 1px solid var(--w-alpha-10);
  }
}

.fade-enter-active {
  animation: pulse-in 0.25s;
  transition: opacity 0.25s;
}
.fade-leave-active {
  animation: pulse-out 0.25s;
  transition: opacity 0.25s;
}
</style>
