<template>
  <yk-space dir="vertical" style="width: 100%" size="l">
    <TopTitle name="博客" style="margin-bottom: 8px" />
    <subsetVue />
    <yk-space style="width: 100%">
      <div style="background-color: #eee; height: 12px; width: 100%"></div>
      <labelVue />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
  import TopTitle from '@/components/bar/TopTitle.vue'
  import subsetVue from '@/components/subset/subset.vue'
  import labelVue from '@/components/label/label.vue'
</script>

<style lang="less" scoped>
    
</style>
