import { useIntervalFn, useElementVisibility, useDocumentVisibility } from '@vueuse/core'
import dayjs from 'dayjs'
interface obj {
  date: any
  dateType: string
  callback: Function
  elementVisibilityRef: any
  loading: any
}
// 隔一段时间执行一次
export default async ({ date, dateType, callback, elementVisibilityRef, loading }: obj) => {
  const timestamp = ref(unref(date))
  const targetIsVisible = useElementVisibility(elementVisibilityRef)
  const visibility = useDocumentVisibility()
  watch(targetIsVisible, (bl) => (bl ? resume() : pause()))
  watch(visibility, (bl) => (bl === 'visible' ? resume() : pause()))
  const { pause, resume } = useIntervalFn(
    () => intervalFn(timestamp, dateType, callback, loading),
    1000
  )
}

const intervalFn = (timestamp: any, dateType: any, callback: Function, loading: any) => {
  const date = dayjs().valueOf()
  if (!loading.value && !dayjs(date).isSame(timestamp.value, dateType)) {
    timestamp.value = dayjs().valueOf()
    callback()
  }
}
