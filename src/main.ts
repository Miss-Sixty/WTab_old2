import { createApp } from 'vue'
import stores from './stores'
import App from './App.vue'
import './styles/global-index.scss'
import Dialog from '@/components/Dialog.vue'

const app = createApp(App)
// 全局注册组件
app.component('Dialog', Dialog)
app.use(stores)
app.mount('#app')
