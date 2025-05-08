<template>
  <yk-space dir="vertical" size="xl">
    <!-- 顶部 -->
    <TopTitleVue :is-search="true" />
    <!-- 展示 -->
    <gather />
    <!-- 左右各一个空间 -->
    <yk-space style="width: 100%" size="xl">
      <datas style="width: 50%; height: 1000px"/>
      <Comment style="width: 50%" :page-size="5" height="1000px" :show-pagination="true" />
    </yk-space>
  </yk-space>
</template>

<script lang="ts" setup>
  import TopTitleVue from '../components/bar/TopTitle.vue'
  import gather from '../components/overview/gather.vue'
  import datas from '../components/overview/datas.vue'
  import { Comment } from '../components/reply'
</script>

<style lang="less" scoped></style>
