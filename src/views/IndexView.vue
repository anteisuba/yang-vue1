<template>
  <div class="index-view">
    <!-- 菜单 -->
    <menu-bar />
    <!-- 子路由 -->
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import MenuBar from '../components/bar/MenuBar.vue'
</script>

<style lang="less" scoped>
  
</style>
