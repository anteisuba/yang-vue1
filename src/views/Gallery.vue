<template>
    <yk-space dir="vertical" style="width: 100%" size="l">
      <TopTitle name="撮影" style="margin-bottom: 8px" :is-search="true" />
      <galleryVue />
  
    </yk-space>
  </template>
  
  <script lang="ts" setup>
    import TopTitle from '@/components/bar/TopTitle.vue'
    import galleryVue from '@/components/gallery/gallery.vue'
  </script>
  
  <style lang="less" scoped>
      
  </style>
  