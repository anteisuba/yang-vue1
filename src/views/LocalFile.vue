<!-- LocalFile.vue -->
<template>
    <yk-space size="xl" dir="vertical" class="file-container">
        <top-title class="custom-top-title" name="本地文件" :isSearch="false">
            <template #custom>
                <div class="upload-section">
                    <yk-text type="third" class="upload-hint">图片、视频、音频大小不超过20M</yk-text>
                    <yk-button type="primary">上传</yk-button>
                </div>
            </template>
        </top-title>
        <subset />
        <files :page-size="8" :subset-id="-1" />
    </yk-space>
</template>

<script lang="ts" setup>
import TopTitle from '../components/bar/TopTitle.vue';
import subset from '../components/subset/subset.vue';
import files from '../components/files/FIles.vue';
</script>

<style lang="less" scoped>
.file-container {
    width: 100%;
    background-color: #fff;
    padding: 16px 24px;
}

.custom-top-title {
    :deep(.top_title) {
        width: 100%;
    }

    :deep(.left-content) {
        width: 100%;
        justify-content: space-between;
    }
}

.upload-section {
    display: flex;
    align-items: center;
    gap: 12px;
}

.upload-hint {
    font-size: 14px;
}
</style>