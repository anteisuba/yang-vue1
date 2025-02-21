<template>
    <div class="files">
         <div class="files__tool">
            <yk-space>
                <yk-checkbox :checked="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">
                    全选
                </yk-checkbox>
                <yk-text>已选择 3 个内容</yk-text>
                <yk-text type="primary" style="cursor:pointer;">取消选择</yk-text>
            </yk-space>
            <yk-space>
                <IconDeleteOutline class="files__tool-delete" />
                <IconSwitchOutline class="files__tool-switch"  />  
            </yk-space>
         </div>
         <div class="files__main">
            <filesItem v-for="item in files" :data="item" :key="item.id"/>
         </div>
         <div class="pagination">
            <yk-pagination :total="count" size="xl" @change="chagePage" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { mkfile } from '@/mock/data';
import filesItem from './files-item.vue';

type FileProps = {
    pageSize:number;
    subsetId:number | string;

}

const props = withDefaults(defineProps<FileProps>(),{
    pageSize:8,
    subsetId:-1, //全部，undefine
})
//头部操作
const indeterminate = ref(false)
const checkedAll = ref(false)
const handleChangeAll = (value:boolean) => {
  indeterminate.value = false
  if (value) {
    checkedAll.value = true
  } else {
    checkedAll.value = false
  }
}

    //总数
    const count = ref<number>(123)
    //数据内容
    const files = ref();
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
    const drwData = (e:boolean) => {
        let data = mkfile.data;
        if(e){
            count.value = data.count
        }
        files.value = data.list.slice(
            (request.nowPage - 1) * request.pageSize,
            request.nowPage * request.pageSize
        );
        console.log(files.value)
    }

    //翻页
    const chagePage = (e:number) => {
        request.nowPage = e;
        drwData(false);
    }

    onMounted(()=>{
        drwData(true);
    })
    
</script>

<style lang="less" scoped>
    .files{
        background: @bg-color-l;
        border-radius: @radius-m;
        background: @bg-color-l;
        width: 100%;
        &__tool {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: @space-l;
            border-radius: @radius-s;
            background: @bg-color-m;
            &-delete {
                width: 20px;
                height: 20px;
                color: @font-color-s;
                cursor: pointer;
                &:hover{
                    color: @font-color-l;
                }
            }
            &-switch{

                color: @font-color-s;
                cursor: pointer;
                &:hover{
                    color: @font-color-l;
                }
            }
        }
        &__main {
            padding: 24px 0 32px;
            display: grid;
            grid-template-columns: repeat(auto-fill,200px);
            row-gap: 32px;
            column-gap: 24px;
            justify-content: center; 
        }
    }
        .pagination{
        padding: @space-l @space-xl;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid @line-color-s;

        bottom: 0;
        width: 100%;
        left: 0;
        background-color: #fff;
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    }
</style>