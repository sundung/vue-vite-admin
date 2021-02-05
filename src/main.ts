import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 全局样式
import './assets/style/global.css'
// 导入 axios
import axios from 'axios'
// 导入 api
import './api/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

// 将axios 注册到全局
app.config.globalProperties.$http = axios

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
