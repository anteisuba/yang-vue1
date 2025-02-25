<script setup lang="ts">
  import HeadBar from './components/bar/HeadBar.vue'
</script>

<!-- App.vue是全部页面 -->
<template>
  <!-- 头部 -->
  <head-bar />
  <!-- IndexView在这里渲染 当 URL 改变时，<router-view> 会自动渲染与当前路由匹配的组件 -->
  <router-view />
</template>

<style scoped>
  /* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
