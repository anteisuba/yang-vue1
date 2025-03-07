<template>
    <yk-space dir="vertical" style="width: 100%" size="l">
        <TopTitle name="安装指南" style="margin-bottom: 8px" :isSearch="true"/>
    </yk-space>
    <div class="install-container">
        <div class="card">
            <div class="card__title">
                <div class="card__title-name">项目介绍</div>
            </div>
            <div class="card__content">
                这是一个基于 Vue 3 + TypeScript + Vite 构建的现代化博客系统
            </div>
            <yk-space dir="vertical" class="feature-list">
          <yk-text>• 使用 Vue 3 Composition API，更好的代码组织和复用</yk-text>
          <yk-text>• TypeScript 支持，提供更好的类型检查和开发体验</yk-text>
          <yk-text>• Vite 构建，快速的开发体验和优秀的生产构建</yk-text>
          <yk-text>• 响应式设计，支持多端适配</yk-text>
        </yk-space>
        </div>
    </div>
    <!-- 安装步骤 -->
    <yk-space dir="vertical" style="width: 100%" size="l">
        <yk-text-area v-model="val" clearable placeholder="请输入..." show-word-limit :max-length="20" class="install-step"></yk-text-area>    
    </yk-space>
</template>

<script lang="ts" setup>
    import TopTitle from '@/components/bar/TopTitle.vue'
    import { ref } from 'vue'

    
    const val = ref('')
</script>

<style lang="less" scoped>
    .install-container {
        width: 100%;
        background-color: #fff;
        padding: 16px 24px;
    }
    .card__content {
    line-height: 1.6;
}
.install-step {
    background-color: #fff;
    margin-bottom: 16px;
}
</style>