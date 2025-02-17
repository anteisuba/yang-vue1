<template>
    <div class="card comment">
        <div class="card__title">
            <p class="card__title-name">评论{{ count }}</p>
        </div>
        <yk-scrollbar ref="scrollbar" :height="height" style="padding: 0 24px;">
            <yk-space dir="vertical">
                <reply v-for="item in comments" :key="item.id" :content="item" :is-comment="true" @delete="deleteComment" />
            </yk-space>
        </yk-scrollbar>
        <div class="comment__pagination">
            <yk-pagination :total="count" size="xl"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from "vue"
    import reply from "./reply.vue";
    import { comment } from "../../mock/data";
    import type { CommentProps } from "./replay";

    const props = withDefaults(defineProps<CommentProps>(),{
        pageSize:8,
        height:"560px"
    })

    //总数
    const count = ref<number>(123)
    //数据内容
    const comments = ref();
    //请求
    type Requset = {
        token?:string;
        pageSize:number; //单页条数
        nowPage:number; //当前页
        count?:boolean;
    }

    const request:Requset = {
        pageSize:props.pageSize,
        nowPage:1,
        count:false,
    }

    //获取数据
    const drwCommentData = (e:boolean) => {
        let data = comment.data;
        if(e) {
            count.value = data.count;
        }
        comments.value = data.list.slice(
            (request.nowPage - 1) * request.pageSize,
            request.nowPage * request.pageSize
        )
        comment.value = data.list;
        console.log(data)
    }


    //删除
    const deleteComment = (e:number) => {
        comments.value = comments.value.filter((obj: any) => {
            return obj.id !== e
        })
    }

    //挂载
    onMounted(()=> {
        drwCommentData(true)
    })




</script>

<style lang="less" scoped>
.comment{
    padding: @space-xl 10px 64px 10px;
    position: relative;
    .card__title-name{
        padding: 0 @space-xl;
    }
    &__pagination{
        padding: @space-l @space-xl;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid @line-color-s;
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        background-color: #fff;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    }
}
</style>    