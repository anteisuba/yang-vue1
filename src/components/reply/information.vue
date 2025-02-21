<template>
    <yk-drawer placement="right" :show="active" @close="closes" :title="'私信'+count">
    <template #header>
      <h2>
        <IconBulbOutline />
        私信
      </h2> 
    </template>
    <yk-space dir="vertical">
        <reply v-for="item in comments" :key="item.id" :content="item" :is-comment="true" @delete="deleteComment" :isComment="false"/>
    </yk-space>
    <template #footer>
        <yk-pagination :total="count" simple @change="chagePage" />
    </template>
  </yk-drawer>
</template>  

<script lang="ts" setup>
import { toRefs } from "vue"
import { InformationProps } from "./replay"
import { onMounted, ref,getCurrentInstance, h } from "vue"
import { comment } from "../../mock/data";

const proxy:any = getCurrentInstance()?.proxy

const props = withDefaults(defineProps<InformationProps>(),{
    active:false,
    pageSize:8
})
const emits = defineEmits(["close"])

const nowActive = ref(props.active)
const { active } = toRefs(props)
const closes = () => {
    emits("close",false)
    console.log(nowActive.value)
}
    //总数
    const count = ref<number>(123)
    //数据内容
    const comments = ref();
    //请求
    type Requset = {
        token?:string;
        pageSize:number; //单页条数
        nowPage:number; //当前页
    }

    const request:Requset = {
        pageSize:props.pageSize,
        nowPage:1,
    }

    //获取数据
    const drwCommentData = () => {
        let data = comment.data;
        count.value = data.count;
        comments.value = data.list.slice(
            (request.nowPage - 1) * request.pageSize,
            request.nowPage * request.pageSize
        )
        comment.value = data.list;
        console.log(data)
    }

    //翻页
    const chagePage = (e:number) => {
        request.nowPage = e;
        drwCommentData()

    }

    //删除
    const deleteComment = (e:number) => {
        comments.value = comments.value.filter((obj: any) => {
            return obj.id !== e
        })
        proxy.$message({
            type: 'success',
            message: h('span', { style: 'color:green;' }, '删除成功')
        })

    }

    //挂载
    onMounted(()=> {
        drwCommentData()
    })

</script>

<style lang="less" scoped>

</style>