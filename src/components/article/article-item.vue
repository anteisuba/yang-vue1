<!-- 模块里面的每一条 -->
<template>
    <div class="article-item">
        <yk-space>
            <div class="article-item__cover">
                <yk-image 
                :src="coverUrl"
                width="200"
                height="200"
                :is-lazy="true"
                :preview="true"
                />
            </div>
        </yk-space>
    </div>
</template>

<script lang="ts" setup>
    import { ArticleData } from '@/utils/interface';
    import { computed } from 'vue';
    type ArticleItemProps = {
        data?:ArticleData
    }
    const props = withDefaults(defineProps<ArticleItemProps>(), {})
    console.log(props.data)

    //封面地址
    const coverUrl = computed(() => {
        if (!props.data?.cover) return '';
        return `/src/assets/fengmian/${props.data.cover}`;
    })

</script>

<style lang="less" scoped>
    .article-item{
        border-radius: @radius-m;
        background: @bg-color-l;
        padding: @space-xl;
        width: 100%;
    }
</style>