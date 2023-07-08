import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { isEqual } from 'lodash-es'
import { useBreakpoints } from '@vueuse/core'

export default defineStore(
  'six-layout',
  () => {
    const editing = ref(false) // 编辑状态
    const data: any = ref([]) // 小组件数据
    const baseSize = 66 // 图标大小
    const baseMargin = 15 // 图标间距
    // 小组件占几份
    const sizeType = {
      tiny: [1, 1],
      small: [2, 2],
      medium: [4, 2],
      large: [4, 4]
    } as any

    const breakpoints = {
      4: 475,
      8: 705,
      12: 1050,
      14: 1225,
      16: 1400,
      18: 1575,
      20: 1750
    }

    // 小组件宽高
    function sizeGridWH(size: string) {
      const [w, h] = sizeType[size]
      return {
        width: w * baseSize + (w - 1) * baseMargin + 'px',
        height: h * baseSize + (h - 1) * baseMargin + 'px'
      }
    }

    // =============屏幕适配================
    const breakpointsData = useBreakpoints(breakpoints)
    const current: ComputedRef<string[]> = breakpointsData.current() //当前布局断点
    // 一共多少列
    const colsNum: ComputedRef<number> = computed(() => {
      let colsNum: string | undefined
      if (!current.value.length) colsNum = Object.keys(breakpoints)[0]
      else colsNum = current.value.at(-1) || '4'
      return Number(colsNum)
    })

    // 将小组件分解为坐标数组
    function coordinateWidget(arr: any, colsNum: number) {
      const _arr: any = []
      for (let i = 0; i < arr.length; i++) {
        const { w, h } = arr[i]
        const [x, y] = arr[i].position[colsNum]
        const maxX = x + w - 1
        const maxY = y + h - 1
        for (let j = x; j <= maxX; j++) {
          for (let k = y; k <= maxY; k++) {
            _arr.push([j, k])
          }
        }
      }
      return _arr
    }

    // 根据宽高获取布局中可放下的x,y坐标
    function getXYByWH(w: number, h: number, colsNum: number) {
      // 从左上角开始遍历，找到第一个 arr 里没有的坐标
      let x = 0
      let y = 0
      let newArray = coordinateWidget([{ position: { [colsNum]: [x, y] }, w, h }], colsNum)

      const allGridXY = coordinateWidget(data.value, colsNum)

      while (newArray.some((item: any) => allGridXY.some((xy: any) => isEqual(xy, item)))) {
        x++
        if (x + w > colsNum) {
          x = 0
          y++
        }
        newArray = coordinateWidget([{ position: { [colsNum]: [x, y] }, w, h }], colsNum)
      }
      return [x, y]
    }

    // 添加页面小组件
    function addPageWidget(key: string, size: string) {
      const id = nanoid()
      const [w, h] = sizeType[size]

      const position: any = {}
      for (const key in breakpoints) {
        const [x, y] = getXYByWH(w, h, +key)
        position[key] = [x, y]
      }

      data.value.push({ id, key, size, w, h, position })
    }

    // 删除小组件
    function deleteWidget(item: any) {
      const index = data.value.findIndex((i: any) => i.id === item.id)
      data.value.splice(index, 1)
    }
    return {
      editing,
      data,
      sizeGridWH,
      addPageWidget,
      colsNum,
      baseSize,
      baseMargin,
      deleteWidget
    }
  },
  {
    // 持久化
    persist: { paths: ['data'] }
  }
)
