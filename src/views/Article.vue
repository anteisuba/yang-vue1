<template>
  <yk-space dir="vertical" style="width: 100%" size="l">
    <TopTitle name="博客" style="margin-bottom: 8px" :is-search="true" />
    <subsetVue />
    <yk-space style="width: 100%">
      <articleVue style="width: 100%;"/>
      <labelVue />
    </yk-space>

  </yk-space>
</template>

<script lang="ts" setup>
  import TopTitle from '@/components/bar/TopTitle.vue'
  import subsetVue from '@/components/subset/subset.vue'
  import labelVue from '@/components/label/label.vue'
  import articleVue from '@/components/article/article.vue'
</script>

<style lang="less" scoped>
    
</style>
