import { defineStore } from 'pinia'

export default defineStore(
  'six-layout',
  () => {
    const editing = ref(false) // 编辑状态
    const data = ref({}) // 小组件数据
    const baseSize = ref(66) // 图标大小
    const baseMargin = ref(15) // 图标间距

    return { editing, data }
  },
  {
    // 持久化
    // persist: { paths: ['wallpaperType', 'myWallpaper'] }
  }
)
