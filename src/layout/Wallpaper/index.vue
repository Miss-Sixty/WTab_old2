<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import { ArrowRightUp } from '@/icons'
import Icon from '@/components/Icon.vue'
import { useFileDialog } from '@vueuse/core'
import localforage from 'localforage'
import useWallpaperStore from '@/stores/wallpaper'
import ImgBox from './components/ImgBox.vue'
import Button from '@/components/Button.vue'
const wallpaperStore = useWallpaperStore()

const { open, onChange } = useFileDialog({
  multiple: false
})

onChange((files) => {
  const [rawFile]: any = files || []
  localforage.setItem('wallpaper', rawFile)
  wallpaperStore.myWallpaper = URL.createObjectURL(rawFile)
})

const getMyWallpaper = async () => {
  const url = localStorage.getItem('myWallpaper')
  if (url) return

  const file: Blob | null = await localforage.getItem('wallpaper')
  if (file) {
    wallpaperStore.myWallpaper = URL.createObjectURL(file) || ''
  }
}
getMyWallpaper()

const setActiveImg = (type: 'my' | 'bing') => {
  wallpaperStore.wallpaperType = type
}

const active = (type: 'my' | 'bing') => wallpaperStore.wallpaperType === type
</script>

<template>
  <Dialog :width="650" title="壁纸偏好">
    <Card title="自定义">
      <template #card>
        <div class="box">
          <ImgBox
            @click="setActiveImg('my')"
            :active="active('my')"
            :src="wallpaperStore.myWallpaper"
          />
          <div class="right">
            <p class="right__info">将您的图片设为壁纸。</p>
            <p class="right__tip">建议分辨率：1920×1080 或更高</p>
            <div>
              <Button style="width: 130px" type="primary" @click="open">浏览…</Button>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <Card title="每日 Bing">
      <template #card>
        <div class="box">
          <ImgBox
            @click="setActiveImg('bing')"
            :active="active('bing')"
            :src="wallpaperStore.bing.url_hd || wallpaperStore.bing.url"
          />
          <div class="right">
            <p class="right__info">来自 Bing 的壁纸，每日更新。</p>
            <p class="right__tip">{{ wallpaperStore.bingCopyright }}</p>
            <div>
              <span style="vertical-align: middle">图像来源：</span>
              <a href="https://cn.bing.com" target="_blank">
                Bing
                <Icon><ArrowRightUp /></Icon>
              </a>
              <a
                style="margin-left: 10px"
                :href="wallpaperStore.bing.url_hd || wallpaperStore.bing.url"
                target="_blank"
              >
                原图
                <Icon><ArrowRightUp /></Icon>
              </a>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </Dialog>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  .right {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      margin: 0;
    }
    &__info {
      font-size: 15px;
      font-weight: 700;
    }
    &__tip {
      font-size: 13px;
      color: var(--b-alpha-60);
      padding-bottom: 8px;
    }

    a {
      margin: 0 5px;
      transition: color 0.25s;
      color: #fcbe10;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      &:hover {
        color: rgba($color: #fcbe10, $alpha: 0.7);
      }
    }
  }
}
</style>
