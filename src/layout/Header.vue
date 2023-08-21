<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { Settings, AccountCircleFill, CheckboxCircleFill, LoopRightLine } from '@/icons'
import Icon from '@/components/Icon.vue'
import Button from '@/components/Button.vue'
import { nanoid } from 'nanoid'
import { getQrCodeApi, loopGetWxStateApi } from '@/api/qrCode'

const layoutStore = useLayoutStore()
defineEmits(['clickSettings'])
const uuid = nanoid()
const settingsRef = ref()
const cropperVisible = ref(false)
const url = ref('')
const loading = ref(false)
const state = ref('0')
const stateText: any = {
  '-1': '二维码已失效，请刷新页面重新登录',
  '0': '请使用微信扫码登录',
  '1': '请在手机上确认登录',
  '2': '登录成功'
}
watch(
  () => cropperVisible.value,
  (val) => {
    val ? getQrCode() : clearInterval(interval)
  }
)

let interval: any = null
const getQrCode = async () => {
  state.value = '0'
  loading.value = true
  try {
    const { data } = await getQrCodeApi(uuid)
    url.value = `data:image/png;base64,${data.qrCode}`
    interval = setInterval(() => {
      wxLoginState()
    }, 1000)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const wxLoginState = async () => {
  try {
    const { data } = await loopGetWxStateApi(uuid)
    state.value = data.state || '-1'
    if (!data.state || data.state === '2') {
      interval && clearInterval(interval)
    }
  } finally {
  }
}
</script>

<template>
  <header class="header">
    <Transition name="slide-fade">
      <ElButton
        style="margin-right: 6px"
        size="small"
        v-show="layoutStore.editing"
        @click="layoutStore.editing = false"
      >
        保 存
      </ElButton>
    </Transition>

    <Icon class="settings">
      <AccountCircleFill @click="cropperVisible = true" />
    </Icon>

    <Icon
      ref="settingsRef"
      class="settings header--hover"
      @click="$emit('clickSettings', { ev: $event, type: 'settings', dom: settingsRef.$el })"
    >
      <Settings />
    </Icon>

    <!-- <Dialog
      v-model="cropperVisible"
      :width="650"
      title="扫码登录"
      :bodyStyle="{ padding: '40px 0', textAlign: 'center' }"
    >
      <div class="wxlogin-box">
        <div class="wxlogin-box--img">
          <el-image
            v-loading="loading"
            style="width: 100%; height: 100%; display: block"
            :src="url"
          />
          <div class="wxlogin-box--filled" v-if="state !== '0'">
            <Icon class="wxlogin-box--icon">
              <CheckboxCircleFill v-if="state === '1' || state === '2'" />
              <LoopRightLine
                @click="getQrCode"
                class="wxlogin-box--icon__reset"
                v-if="state === '-1'"
              />
            </Icon>
          </div>
        </div>
      </div>
      <div class="wxlogin--text">{{ stateText[state] }}</div>
    </Dialog> -->
  </header>
</template>
<style lang="scss">
.wxlogin--text {
  margin-top: 20px;
  font-size: 16px;
}
.wxlogin-box {
  display: flex;
  align-items: center;
  justify-content: center;
  &--img {
    width: 200px;
    height: 200px;
    position: relative;
  }

  &--filled {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--icon {
    font-size: 40px;

    &__reset {
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 10px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .settings {
    padding: 6px;
    margin-left: 6px;
    border-radius: 8px;
    cursor: pointer;
    transition:
      transform 0.25s,
      color 0.25s;
    color: rgba(255, 255, 255, 0.35);
    font-size: 36px;
    will-change: transform;
    &:hover {
      color: rgba(255, 255, 255, 0.65);
    }
  }

  &--hover {
    &:hover {
      transform: rotateZ(60deg);
    }
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
  transform: translateX(15px);
  opacity: 0;
}
</style>
