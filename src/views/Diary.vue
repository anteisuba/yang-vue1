<template>
    我的
    <div class="mermaid">
        graph TD
        A[开始] --> B[处理]
        B --> C[结束]
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import mermaid from 'mermaid'

onMounted(() => {
    mermaid.initialize({
        startOnLoad: true
    })
})
</script>

<style lang="less" scoped>

</style>   