import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { useIntervalFn } from '@vueuse/core'
import eventBus from '@/utils/evevtBus'
export default defineStore('six-app', () => {
  const date = ref(dayjs().valueOf())
  useIntervalFn(() => (date.value = dayjs().valueOf()), 1000)

  watch(date, (newVal, oldVal) => {
    if (dayjs(newVal).isSame(oldVal, 'day')) return
    eventBus.emit('onReset')
  })

  return {}
})
