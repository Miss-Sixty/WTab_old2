import { defineStore } from 'pinia'
import * as bookmark from '@/widget/utils/bookmark'

export default defineStore(
  'six-bookmark',
  () => {
    // 自定义壁纸
    const data = ref([])

    const setBookmark = async (rawFile: File) => {
      const text = await rawFile.text()
      data.value = bookmark.parse(text)
    }

    const reset = () => {
      data.value = []
    }

    return { data, setBookmark, reset }
  },
  {
    // 持久化
    persist: { paths: ['data'] }
  }
)
