<template>
  <div class="home">
    你好
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {},
})
</script>

<style lang="less" scoped>
.home {
  height: 400px;
  width: 400px;
  background-color: pink;
}
</style>
