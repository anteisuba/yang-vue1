<template>
    <yk-space size="m" class="reply">
        <div class="reply__name">
            <yk-avatar img-url="https://pbs.twimg.com/profile_images/1759288578851708928/3vfE6G6y_400x400.jpg" v-if="isComment"/>
            <div class="name-time">
                <yk-text><a href="https://x.com/ndng16752248">{{content?.user.name}}</a></yk-text>
                <yk-text type="third" class="time">時間 {{content?.moment}}</yk-text>
            </div>
        </div>
        <div class="reply__main--delete">
            <IconDeleteOutline @click="deleteReply(props.content!.id)" />
        </div> 
    </yk-space>
    <yk-space dir="vertical" size="s" class="reply__main">
        <div class="comment">
            <yk-text type="secondary">{{ content?.comment }}</yk-text>
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

const emits = defineEmits(["delete"])

//删除
const deleteReply = (e:number) => {
    emits("delete", e)
}
</script>

<style lang="less" scoped>
.reply {
    width: 100%;
    &__main{
        border-bottom: 1px solid @line-color-s;
        width: 100%;
        padding-bottom: 16px;
        flex: 1;
        position: relative;
        &--delete{
            position: absolute;
            right: 16px;
            top: 0;
            width: 16px;
            cursor: pointer;
            color: @font-color-s;
            display: none;
            z-index: 1;
            font-size: 16px;
        }
    }
    &__name {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }
    &__name .name-time {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    &:hover {
        .reply__main--delete {
            display: block;
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