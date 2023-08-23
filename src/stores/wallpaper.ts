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

    // 更新壁纸后重新加载
    watch(bing_mini_url, (newVal, oldVal) => {
      if (!oldVal) return
      bing_1080_url.value = ''
      bing_hd_url.value = ''
    })

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
        if (dayjs().isSame(date.value, 'day') && (bing_hd_url.value || bing_hd_url.value)) return
        const { copyright, urlbase } = await wallpaperApi()
        if (!urlbase) return
        // const copyright = '看着相机镜头的松鼠 (nh© Alfredo Piedrafita/Getty Images)'
        // const urlbase = '/th?id=OHR.CameraSquirrel_ZH-CN3580119980'

        bingCopyright.value = copyright
        bing_mini_url.value = `https://www.bing.com${urlbase}_320x240.jpg`
        bing_1080_url.value = `https://www.bing.com${urlbase}_1920x1080.jpg`
        bing_hd_url.value = `https://www.bing.com${urlbase}_UHD.jpg`
        date.value = dayjs().format('YYYY-MM-DD')
      } catch (e) {
        console.log(e)
      }
    }

    async function getMyWallpaper() {
      const file: Blob | null = await localforage.getItem('wallpaper')
      my_url.value = file ? URL.createObjectURL(file) : ''
    }

    const getWallpaper = (type: 'all' | 'my' | 'bing') => {
      if (type === 'all') {
        getBingWallpaper()
        getMyWallpaper()
      } else if (type === 'my') {
        getMyWallpaper()
      } else if (type === 'bing') {
        getBingWallpaper()
      }
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
