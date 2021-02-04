import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 全局样式
import './assets/style/global.css'
createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
