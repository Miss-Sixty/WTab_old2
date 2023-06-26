import { createApp } from 'vue'
import stores from './stores'
import App from './App.vue'
import './styles/global-index.scss'

const app = createApp(App)
app.use(stores)
app.mount('#app')
