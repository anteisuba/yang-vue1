<template>
    <yk-space dir="vertical" size="xl">
        <!-- 顶部 -->
        <TopTitleVue :is-search="true" />
        <!-- 展示 -->
        <gather />
        <!-- 左右各一个空间 -->
        <yk-space style="width:100%">
            <datas style="width:50%"/>
            <div class="report" style="background-color:#fff;height:30px;">评论</div>
        </yk-space>
    </yk-space>
    

</template>

<script lang="ts" setup>
import TopTitleVue from "../components/bar/TopTitle.vue"
import gather from "../components/overview/gather.vue"
import datas from "../components/overview/datas.vue"
</script>

<style lang="less" scoped>
</style>