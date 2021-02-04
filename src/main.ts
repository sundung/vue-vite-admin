import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 全局样式
import './assets/style/global.css'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
