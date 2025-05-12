<template>
  <nav class="nav-bar">
    <ul class="nav-list">
      <li
        v-for="item in navLinks"
        :key="item.path"
        :class="['nav-item', { active: $route.path === item.path }]"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { navLinks } from '../../utils/menu'
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100vw;
  background: #111;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 150;
  min-height: 40px;
}
.nav-list {
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-item {
  font-size: 18px;
  font-weight: 400;
  a {
    color: #fff;
    text-decoration: none;
    padding: 8px 0;
    transition: color 0.2s, border-bottom 0.2s;
    border-bottom: 2px solid transparent;
  }
  &:hover a {
    color: #2b5aed;
    border-bottom: 2px solid #2b5aed;
  }
  &.active a {
    color: #2b5aed;
    font-weight: 600;
    border-bottom: 2px solid #2b5aed;
  }
}
@media (max-width: 768px) {
  .nav-list {
    gap: 20px;
  }
  .nav-item {
    font-size: 16px;
  }
}
</style>
