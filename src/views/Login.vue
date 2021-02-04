<template>
  <div class="login-wrapper">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const name = ref('txm')

    return {
      name,
    }
  },
})
</script>

<style lang="less">
.login-wrapper {
  height: 100%;
  width: 100%;
  background-color: #ccc;
}
</style>
