<template>
  <div>
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header class="header">
        <h1>电商管理后台</h1>
        <el-button class="login-out"
                   @click='loginOut'>退出登录</el-button>
      </el-header>
      <!-- 左侧菜单栏 -->
      <el-container>
        <el-aside width="200px">
          <el-menu background-color="#2d3f55"
                   text-color="#fff"
                   unique-opened>
            <!-- 一级菜单区域 -->
            <el-submenu :index="item.id + ''"
                        v-for='item in menuList.data'
                        :key='item.id'>
              <template #title><i :class="iconsObj[item.id]"></i>{{item.authName}}</template>
              <!-- 二级菜单区域 -->
              <!-- :index="'/' + subItem.path" 控制二级菜单的高亮 -->
              <el-menu-item :index="'/' + subItem.path"
                            v-for="subItem in item.children"
                            :key="subItem.id"
                            @click="saveNavState( '/' + subItem.path)">
                <template #title>
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          {{activePath}}
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script >
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    // 获取 vue 实例
    const ctx = getCurrentInstance()

    // 菜单列表数据
    const menuList = reactive({ data: [] })
    // 一级菜单 icon
    const iconsObj = reactive({
      125: 'el-icon-user',
      103: 'el-icon-goods',
      101: 'el-icon-help',
      102: 'el-icon-s-order',
      145: 'el-icon-s-opportunity'
    })
    // 控制菜单栏高亮显示
    let activePath = ref('')

    // 获取菜单列表的方法
    const getMenuList = async () => {
      const { data: res } = await ctx.ctx.$http.get('menus')
      menuList.data = res.data
    }

    // 点击退出登录按钮 => 退出登录操作
    const loginOut = () => {
      // 清空 token
      window.sessionStorage.clear()
      // 跳转到登录页面
      ctx.proxy.$router.push('/login')
    }

    // 点击二级菜单获取其菜单的 path 用作 菜单高亮
    const saveNavState = (active) => {
      console.log(activePath)
      window.sessionStorage.setItem('activePath', activePath)
      activePath = active
      if (active === '/reports') {
        ctx.proxy.$router.push('/reports')
      } else if (active === '/users') {
        ctx.proxy.$router.push('/users')
      }
    }

    onMounted(() => {
      getMenuList()
    })

    return {
      loginOut,
      getMenuList,
      menuList,
      iconsObj,
      saveNavState,
      activePath
    }
  },
})
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  .header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4290ba;
    h1 {
      font-size: 32px;
      color: #fff;
      margin: 0;
      margin-left: 40px;
    }
  }
  .el-aside {
    background-color: #2d3f55;
  }
}
</style>
