import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Reports from '../components/Reports.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{ path: '/reports', component: Reports }],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// 挂载路由导航守卫(前置守卫)

router.beforeEach((to, from, next) => {
  // to 将要跳转的路由
  // from 从哪里来的路由
  // next next是一个函数,表示放行
  //    next() 放行, next('/login) 强制跳转

  // 判断当前路由地址
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有 token 强制跳转到登录页面
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
