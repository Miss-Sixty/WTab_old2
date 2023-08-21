<script setup lang="ts">
import { Close } from '@/icons'
import Icon from '@/components/Icon.vue'
const emit = defineEmits(['update:modelValue', 'closed'])
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题'
  },
  width: {
    type: Number,
    default: 1024
  },
  header: {
    type: Boolean,
    default: true
  }
})
const closeDialog = () => {
  emit('update:modelValue', false)
  setTimeout(() => {
    emit('closed')
  }, 250)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-show="modelValue" class="overlay-dialog" @contextmenu.prevent>
        <transition name="zoom">
          <div v-show="modelValue" class="dialog" :style="{ width: `${width}px` }">
            <div v-if="header" class="dialog-header">
              <span class="dialog-header__title">{{ title }}</span>
              <slot name="header-right"></slot>
            </div>

            <button class="close" @click="closeDialog">
              <Icon><Close /></Icon>
            </button>

            <div class="dialog-body">
              <el-scrollbar view-class="dialog-body__scrollbar">
                <slot></slot>
              </el-scrollbar>
            </div>
          </div>
        </transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.overlay-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  backdrop-filter: blur(10px);

  .dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 500px;
    margin: auto;
    max-width: calc(100vw - 40px);
    height: 600px;
    border-radius: 10px;
    box-shadow:
      0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    background-color: var(--w-dialog-bg-color);
    transition: background-color 0.3s;
    &-header {
      padding: 0 62px 0 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      height: 52px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      justify-content: space-between;

      &__title {
        line-height: 24px;
        font-size: 18px;
      }
    }

    .close {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 50px;
      height: 40px;
      border-radius: 5px;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s;
      z-index: 1;
      &:hover {
        background-color: var(--w-alpha-5);
      }

      .icon {
        font-size: 18px;
        color: #adadad;
      }
    }

    &-body {
      flex: 1;
      overflow: hidden;

      :deep(.dialog-body__scrollbar) {
        padding: 20px 40px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .dialog {
      bottom: 0;
      top: 0;
      height: 100%;
      width: 100%;
      max-width: 100vw;
      border-radius: 0;
      :deep(.dialog-body__scrollbar) {
        padding: 0 10px 10px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active {
  animation: pulse-in 0.25s;
}
.zoom-leave-active {
  animation: pulse-out 0.25s;
}
</style>
