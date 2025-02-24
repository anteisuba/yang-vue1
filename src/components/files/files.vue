<template>
    <div class="files">
         <div class="files__tool" v-show="selectedFilesId.length > 0">
            <yk-space>
                <yk-checkbox :checked="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">
                    全选
                </yk-checkbox>
                <yk-text>已选择 {{ selectedFilesId.length }} 个内容</yk-text>
                <yk-text type="primary" style="cursor:pointer;" @click="removeAll">取消选择</yk-text>
            </yk-space>
            <yk-space>
                <IconDeleteOutline class="files__tool-delete" />
                <yk-popconfirm
                title="选择分组"
                tigger="click"
                placement="bottomRight"
                @cancel="cancel"
                @confirm="confirm"
                >
                <IconSwitchOutline class="files__tool-switch"  /> 
                <template #content>
                    <yk-scrollbar ref="scrollbar" height="148px" class="subset">
                        <div v-for="item in subsetStore.data" class="subset__item" :class="{'subset-elected':subsetSelectedId==item.id}" @click="changeOption(item.id)">
                             {{ item.name }}{{ item.value }}
                        </div>
                    </yk-scrollbar>
                </template> 
                </yk-popconfirm>
            </yk-space>
         </div>
         <div class="files__main">
            <filesItem v-for="item in files" :data="item" :key="item.id" @selected="selectFile" @delete="deleteFile" @changeSubsetId="changeSubsetFile"/>
         </div>
         <div class="pagination">
            <yk-pagination :total="count" size="xl" @change="chagePage" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref,getCurrentInstance } from 'vue';
import { mkfile } from '@/mock/data';
import filesItem from './files-item.vue';
import { useSubsetStore } from '../../store/subset'; 
import './files.less'

const subsetStore = useSubsetStore();



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
  //先情况选择Id
  selectedFilesId.value=[]
  if (value) {
    checkedAll.value = true
    for(let i = 0;i < files.value.length;i++){
        files.value[i].selected=true
        selectedFilesId.value.push(files.value[i].id)
    }
  } else {
    checkedAll.value = false
    for(let i = 0;i < files.value.length;i++){
        files.value[i].selected=false
    }
  }
}

//取消选择
const removeAll = () => {
    selectedFilesId.value=[]
    for(let i = 0;i < files.value.length;i++){
        files.value[i].selected=false
    }
}

//被选择图片Id数组
const selectedFilesId = ref<number[]>([])

//选择操作
const selectFile = (e:number) =>{
    for(let i = 0;i < files.value.length;i++){
        if(files.value[i].id===e) {
            files.value[i].selected=!files.value[i].selected
            if(files.value[i].selected) {
                selectedFilesId.value.push(e)
            } else {
                //从数组移除对应项
                selectedFilesId.value=selectedFilesId.value.filter((item)=>{
                    return item != e
                })
            }
            //半选与全选
            if(selectedFilesId.value.length==0){
                indeterminate.value=false
                checkedAll.value=false 
            }else if(selectedFilesId.value.length==files.value.length) {
                indeterminate.value=false
                checkedAll.value=true
            } else {
                indeterminate.value=true
                checkedAll.value=false
            }
        } 
        
    }
}

//删除单张图片
const deleteFile=(e:number)=>{

}
//切换单张图片分组
const changeSubsetFile=()=>{

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
        //加入选择项
        for(let i = 0;i < files.value.length;i++) {
            files.value[i].selected = false;
        }
        // console.log(files.value)
    }

    //翻页
    const chagePage = (e:number) => {
        request.nowPage = e;
        drwData(false);
    }

    //分类选择
    const subsetSelectedId = ref<number|string>();
    //切换分组
    const changeOption=(e:number | string)=>{
        subsetSelectedId.value=e
    }


const proxy: any = getCurrentInstance()?.proxy
function cancel() {
  proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
}
function confirm() {
  proxy.$message({ type: 'primary', message: '你点击了确认按钮' })
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
            &-delete,
            &-switch {
                width: 20px;
                height: 20px;
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