import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import localforage from 'localforage'

export default defineStore(
  'six-wallpaper',
  () => {
    // 自定义壁纸
    const myWallpaper = ref('')
    const bing = ref({
      url_mini: '',
      url: '',
      url_hd: ''
    })
    const wallpaperType = ref('bing') as Ref<'my' | 'bing'>
    const date = ref()

    const wallpaperUrl = computed(() => {
      if (wallpaperType.value === 'bing') {
        return bing.value.url_mini || bing.value.url || bing.value.url_hd
      }
      return myWallpaper.value
    })

    async function getBingImg() {
      try {
        if (dayjs().diff(date.value, 'day') === 0 && bing.value.url) return
        const res = await fetch('https://bingw.jasonzeng.dev?format=json')
        const data = await res.json()
        bing.value.url_mini = `https://www.bing.com${data.urlbase}_320x240.jpg`
        bing.value.url = `https://www.bing.com${data.urlbase}_1920x1080.jpg`
        bing.value.url_hd = `https://www.bing.com${data.urlbase}_UHD.jpg`
        date.value = dayjs().format('YYYY-MM-DD')
      } catch (e) {
        console.log(e)
      }
    }

    async function getMyWallpaper() {
      if (myWallpaper.value) return myWallpaper.value
      const file: Blob | null = await localforage.getItem('wallpaper')
      if (!file) return ''
      myWallpaper.value = URL.createObjectURL(file)
    }

    return { myWallpaper, getMyWallpaper, bing, wallpaperType, wallpaperUrl, getBingImg, date }
  },
  {
    // 持久化
    persist: { paths: ['wallpaperType', 'myWallpaper', 'bing', 'date'] }
  }
)
