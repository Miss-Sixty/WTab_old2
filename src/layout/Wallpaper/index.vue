<script setup lang="ts">
import Card from '@/components/Card.vue'
import { ArrowRightUp } from '@/icons'
import { useFileDialog } from '@vueuse/core'
import localforage from 'localforage'
import useWallpaperStore from '@/stores/wallpaper'
import Content from './components/Content.vue'
const wallpaperStore = useWallpaperStore()
// wallpaperStore.getWallpaper('all')
defineEmits(['click'])
const { open, onChange } = useFileDialog({
  multiple: false
})

const editImgLoading = ref(false)
onChange(async (files) => {
  editImgLoading.value = true
  const [rawFile]: any = files || []
  await localforage.setItem('wallpaper', rawFile)
  wallpaperStore.getMyWallpaper()
  editImgLoading.value = false
})
</script>

<template>
  <Dialog :width="650" title="壁纸偏好">
    <Card title="自定义">
      <template #content>
        <Content
          @click="wallpaperStore.type = 'my'"
          :active="wallpaperStore.type === 'my'"
          :src="wallpaperStore.my_url"
          :loading="editImgLoading"
          title="将您的图片设为壁纸。"
          tip="建议分辨率：1920×1080 或更高"
        >
          <ElButton style="width: 130px" type="primary" @click="open">浏览…</ElButton>
        </Content>
      </template>
    </Card>

    <Card title="每日 Bing">
      <template #content>
        <Content
          @click="wallpaperStore.type = 'bing'"
          :active="wallpaperStore.type === 'bing'"
          :src="wallpaperStore.bing_hd_url || wallpaperStore.bing_1080_url"
          title="来自 Bing 的壁纸，每日更新。"
          :tip="wallpaperStore.bingCopyright"
        >
          <span style="vertical-align: middle">图像来源：</span>
          <el-link href="https://cn.bing.com" target="_blank" :underline="false" type="primary">
            Bing<Icon><ArrowRightUp /></Icon>
          </el-link>

          <el-link
            style="margin-left: 10px"
            :href="wallpaperStore.bing_hd_url || wallpaperStore.bing_1080_url"
            target="_blank"
            :underline="false"
            type="primary"
          >
            原图<Icon><ArrowRightUp /></Icon>
          </el-link>
        </Content>
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
  }
}
</style>
