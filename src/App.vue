<script setup lang="ts">
import HeadBar from './components/bar/HeadBar.vue'
import MenuBar from './components/bar/MenuBar.vue'
</script>

<!-- App.vue是全部页面 -->
<template>
  <HeadBar />
  <MenuBar />
  <div class="hero-img"></div>
  <div class="main-content">
    <router-view />
  </div>
</template>

<style scoped>
.hero-img {
  width: 100vw;
  height: 420px;
  background: url('@/assets/touxiang/mujika1.jpeg') center center/cover no-repeat;
  margin-top: 35px; /* HeadBar + MenuBar 高度，实际可根据需要微调 */
}
.main-content {
  max-width: 1200px;
  margin: -60px auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  padding: 48px 32px;
  min-height: 400px;
  position: relative;
  z-index: 10;
}
@media (max-width: 768px) {
  .hero-img {
    height: 220px;
    margin-top: 100px;
  }
  .main-content {
    padding: 16px 8px;
    margin-top: -40px;
  }
}
</style>
