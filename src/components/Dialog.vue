<script setup lang="ts">
import { Close } from '@/icons'
import Icon from '@/components/Icon.vue'
const emit = defineEmits(['update:modelValue'])
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
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-show="modelValue" class="overlay-dialog" @contextmenu.prevent>
        <transition name="zoom">
          <div v-show="modelValue" class="dialog" :style="{ width: width + 'px' }">
            <div v-if="header" class="dialog-header">
              <span class="dialog-header__title">{{ title }}</span>
            </div>

            <button class="close" @click="closeDialog">
              <Icon><Close /></Icon>
            </button>

            <el-scrollbar>
              <div class="dialog-body">
                <!-- <el-scrollbar view-style="padding: 10px 40px;"> -->
                <slot></slot>
                <!-- </el-scrollbar> -->
              </div>
            </el-scrollbar>
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
    margin: auto;
    max-width: calc(100vw - 40px);
    height: 640px;
    max-height: 100%;
    border-radius: 10px;
    box-shadow:
      0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    background-color: var(--w-dialog-bg-color);

    &-header {
      padding: 0 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      height: 52px;
      display: flex;
      align-items: center;

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
      padding: 10px 40px;
    }
  }

  @media screen and (max-width: 768px) {
    .dialog {
      max-height: 90%;
      bottom: 0;
      top: 0;
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
