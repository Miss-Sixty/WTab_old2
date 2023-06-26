import { defineStore } from 'pinia'

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

    const wallpaperColor = computed(() => {
      if (wallpaperType.value === 'bing') {
        return bing.value.url_mini || bing.value.url || bing.value.url_hd
      }
      return myWallpaper.value
    })

    function getBingImg() {
      try {
        // const res = await fetch('https://bingw.jasonzeng.dev?format=json')
        // const data = await res.json()
        const data = { urlbase: '/th?id=OHR.PetraTreasury_EN-US1981994011' }
        setTimeout(() => {
          bing.value.url_mini = `https://www.bing.com${data.urlbase}_320x240.jpg`
          bing.value.url = `https://www.bing.com${data.urlbase}_1920x1080.jpg`
          bing.value.url_hd = `https://www.bing.com${data.urlbase}_UHD.jpg`
        }, 1000)
      } catch (e) {
        console.log(e)
      }
    }

    return { myWallpaper, bing, wallpaperType, wallpaperColor, getBingImg }
  },
  {
    // 持久化
    persist: { paths: ['wallpaperType', 'myWallpaper'] }
  }
)
