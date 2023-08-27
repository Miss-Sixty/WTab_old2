import { createApp } from 'vue'
import stores from './stores'
import App from './App.vue'
import './styles/global-index.scss'

import Dialog from '@/components/Dialog.vue'
import Icon from '@/components/Icon.vue'

import dayjs from 'dayjs'
import zhCn from 'dayjs/locale/zh-cn'
dayjs.locale(zhCn) // use locale globally

const app = createApp(App)
// 全局注册组件
app.component('Dialog', Dialog)
app.component('Icon', Icon)
app.use(stores)
app.mount('#app')
