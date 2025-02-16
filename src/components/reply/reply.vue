<template>
    <yk-space size="m" class="reply">
        <div class="reply__name">
            <yk-avatar img-url="https://pbs.twimg.com/profile_images/1759288578851708928/3vfE6G6y_400x400.jpg" />
            <div class="name-time">
                <yk-text><a href="https://x.com/ndng16752248">{{content?.user.name}}</a></yk-text>
                <yk-text type="third" class="time">時間 {{content?.moment}}</yk-text>
            </div>
        </div> 
    </yk-space>
    <yk-space dir="vertical" size="s" class="reply__main">
        <div class="comment">
            <yk-text type="secondary">{{content?.comment}}</yk-text>
            <img src="https://pbs.twimg.com/media/Gjqk9TsbwAEmbf5?format=jpg&name=4096x4096" alt="Phoebe fanart" />
        </div>
        <yk-space>
            <yk-tag type="primary">コミック</yk-tag>
            <yk-text type="success" v-show="content?.complaint! > 0">いいね {{ content?.complaint }}</yk-text>
        </yk-space>

    </yk-space>
</template>

<script lang="ts" setup>
import { ReplyProps } from './replay';

const props = withDefaults(defineProps<ReplyProps>(),{
    isComment:true,

})
</script>

<style lang="less" scoped>
.reply {
    width: 100%;
    &__main{
        border-bottom: 1px solid @line-color-s;
        width: 100%;
        padding-bottom: 16px;
        flex: 1;
    }
    &__name {
        display:flex;
        align-items: center;
        gap: 8px;
        .name-time {
            display: flex;
            align-items: baseline;
            gap: 8px;
        }
        :deep(.time) {
            color: #666;
            font-size: 12px;
        }
    }

}
.comment img {
    max-width: 534px;  // 设置最大宽度为容器宽度
    width: 100%;       // 确保图片宽度不超过容器
    height: auto;      // 高度自动调整以保持比例
    display: block;    // 块级显示避免行内元素的间距问题
}
</style>    