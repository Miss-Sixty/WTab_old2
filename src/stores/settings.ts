import { defineStore } from 'pinia'
import useLayoutStore from './layout'
import dayjs from 'dayjs'
import { decrypt, encrypt } from '@/utils/crypto'

export default defineStore('six-settings', () => {
  // 下载配置
  function downloadConfig() {
    const layoutStore = useLayoutStore()
    const layoutData = encrypt(layoutStore.data)

    var aTag = document.createElement('a') // 获取 a 元素
    var blob: any = new Blob([layoutData]) // 将数据保存在 blob 对象中
    aTag.download = `WTab备份-${dayjs().format('YYYY-MM-DD HH:mm')}.wtab` // 设置保存的文件名称
    aTag.href = URL.createObjectURL(blob) // 将数据保存在 href 属性中
    aTag.click() // 模拟点击 a 元素，进行下载
    URL.revokeObjectURL(blob) // 删除内存中的 blob 对象的数据
  }

  // 上传配置
  function uploadConfig(file: any) {
    const layoutStore = useLayoutStore()
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e: any) => {
      layoutStore.data = decrypt(e.target.result)
    }
  }

  return { downloadConfig, uploadConfig }
})
