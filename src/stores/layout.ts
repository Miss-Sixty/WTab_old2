import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { isEqual } from 'lodash-es'
import { useBreakpoints } from '@vueuse/core'

export default defineStore(
  'six-layout',
  () => {
    const editing = ref(false) // 编辑状态
    const data: any = ref([
      {
        id: '37a01213-f59e-4c3e-8b0d-f10a95b2d3b8',
        key: 'hitokoto',
        size: 'small',
        w: 2,
        h: 2,
        position: {
          '4': [0, 0],
          '8': [2, 2],
          '12': [0, 0],
          '14': [0, 0],
          '16': [0, 0],
          '18': [0, 0],
          '20': [0, 0]
        }
      },
      {
        id: '37a01213-f59e-4c3e-8b0d-f10a95b2d3f8',
        key: 'hitokoto',
        size: 'small',
        w: 2,
        h: 2,
        position: {
          '4': [0, 0],
          '8': [5, 3],
          '12': [0, 0],
          '14': [0, 0],
          '16': [0, 0],
          '18': [0, 0],
          '20': [0, 0]
        }
      }
    ]) // 小组件数据
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
      let colsNum: string
      if (!current.value.length) colsNum = Object.keys(breakpoints)[0]
      else colsNum = current.value.at(-1)
      return Number(colsNum)
    })

    // 将小组件分解为坐标数组
    // function coordinateWidget(arr: any, colsNum: number) {
    //   const _arr: any = []
    //   for (let i = 0; i < arr.length; i++) {
    //     const { w, h } = arr[i]
    //     const [x, y] = arr[i].position[colsNum]
    //     const maxX = x + w - 1
    //     const maxY = y + h - 1
    //     for (let j = x; j <= maxX; j++) {
    //       for (let k = y; k <= maxY; k++) {
    //         _arr.push([j, k])
    //       }
    //     }
    //   }
    //   return _arr
    // }

    // 根据宽高获取布局中可放下的x,y坐标
    function getXYByWH(w: number, h: number, colsNum: number) {
      // 从左上角开始遍历，找到第一个 arr 里没有的坐标
      let gridX = 0
      let gridY = 0
      const maxGridX = gridX + w - 1
      const maxGridY = gridY + h - 1

      // 给出x,y,w,h判断是否跟data中的小组件重叠
      function isOverlap(x: number, y: number, w: number, h: number) {
        console.log('111',data.value);
        
        return data.value.some((item: any) => {
          const [itemX, itemY] = item.position[colsNum]
          const itemW = item.w
          const itemH = item.h
          const itemMaxX = itemX + itemW - 1
          const itemMaxY = itemY + itemH - 1
          const isOverlapX = x <= itemMaxX && itemX <= maxGridX
          const isOverlapY = y <= itemMaxY && itemY <= maxGridY
          return isOverlapX && isOverlapY
        })
      }

      // 无限循环，直到找到能够放下的坐标
      while (true) {
        if (!isOverlap(gridX, gridY, w, h)) break

        gridX++
        if (gridX > colsNum) {
          gridX = 0
          gridY++
        }
      }

      return [gridX, gridY]
    }

    function addPageWidget(key: string, size: string) {
      const id = uuidv4()
      const [w, h] = sizeType[size]

      const position: any = {}
      for (const key in breakpoints) {
        const [x, y] = getXYByWH(w, h, +key)

        position[key] = [x, y]
      }

      data.value.push({ id, key, size, w, h, position })
    }

    return {
      editing,
      data,
      sizeGridWH,
      addPageWidget,
      colsNum,
      baseSize,
      baseMargin
    }
  },
  {
    // 持久化
    persist: { paths: ['data'] }
  }
)
