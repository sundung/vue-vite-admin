<template>
  <div class="login-wrapper">
    <el-form :model="loginForm"
             status-icon
             :rules="rulesLogin"
             ref="ruleFormRef"
             label-width="100px"
             class="login-form">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="loginForm.username"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="loginForm.password"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary"
                   @click="submitForm('ruleFormRef')">登录</el-button>
        <el-button @click="resetForm('ruleFormRef')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script >
import { defineComponent, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance()
    // 登录表单绑定字段
    const loginForm = ref({
      username: 'admin',
      password: '123456',
    })
    // 登录表单的 验证规则
    const rulesLogin = ref({
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 4, max: 16, message: '账号4-16位', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 4, max: 16, message: '密码4-16位', trigger: 'blur' },
      ],
    })

    const submitForm = (formName) => {
      ctx.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(ctx.$router)
          // console.log(ctx.$http)
          // 发送请求
          // console.log(loginForm.value.username)
          const { data: res } = await ctx.$http.post('login', loginForm.value)
          if (res.meta.status !== 200) return ctx.$message.error('登录失败')
          ctx.$message.success('登陆成功')
          // 存储 token 令牌
          window.sessionStorage.setItem('token', res.data.token)
          // 登录成功跳转到首页
          ctx.$router.push('/')
        } else {
          ctx.$message.error('用户名或密码错误')
          return false
        }
      })
    }
    // 重置表单事件
    const resetForm = (formName) => {
      console.log(ctx)
      ctx.$refs[formName].resetFields()
    }

    return {
      loginForm,
      rulesLogin,
      resetForm,
      submitForm
    }
  },
})
</script>

<style lang="less" scoped>
.login-wrapper {
  height: 100%;
  width: 100%;
  background-color: #ccc;
  .login-form {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    padding-top: 50px;
    box-sizing: border-box;
    .btn {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
