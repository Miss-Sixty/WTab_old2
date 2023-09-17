import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import localforage from 'localforage'
import { wallpaperApi } from '@/api/wallpaper'
import useSetThemeColor from '@/hooks/useSetThemeColor'

export default defineStore(
  'six-wallpaper',
  () => {
    const my_url = ref('')
    const bing_mini_url = ref('')
    const bing_1080_url = ref('')
    const bing_hd_url = ref('')
    const bingCopyright = ref('') //bing 壁纸描述
    const type = ref('bing') as Ref<'my' | 'bing'>
    const date = ref('')

    // 动态设置主题颜色
    const wallpaperUrl = computed(() => {
      if (type.value === 'bing') {
        return bing_mini_url || bing_1080_url || bing_hd_url
      }
      return my_url
    })
    watch(wallpaperUrl.value, (url) => useSetThemeColor(url))

    async function getBingWallpaper() {
      try {
        const { copyright, urlbase } = await wallpaperApi()
        if (!urlbase) return

        bingCopyright.value = copyright
        bing_mini_url.value = `https://www.bing.com${urlbase}_320x240.jpg`
        bing_1080_url.value = `https://www.bing.com${urlbase}_1920x1080.jpg`
        bing_hd_url.value = `https://www.bing.com${urlbase}_UHD.jpg`
        date.value = dayjs().format('YYYY-MM-DD')
      } catch (e) {}
    }

    async function getMyWallpaper() {
      const file: Blob | null = await localforage.getItem('wallpaper')
      my_url.value = file ? URL.createObjectURL(file) : ''
    }

    const getWallpaper = async () => {
      return Promise.all([getMyWallpaper(), getBingWallpaper()])
    }

    return {
      type,
      my_url,
      bing_mini_url,
      bing_1080_url,
      bing_hd_url,
      bingCopyright,
      date,
      getBingWallpaper,
      getMyWallpaper,
      getWallpaper
    }
  },
  {
    // 持久化
    persist: {
      paths: ['bing_mini_url', 'bing_1080_url', 'bing_hd_url', 'bingCopyright', 'type', 'date']
    }
  }
)
