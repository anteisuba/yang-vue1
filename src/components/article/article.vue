 <!-- 整个模块 -->
 <template>
    <yk-space dir="vertical" style="width: 100%" size="xl">
        <articleItem v-for="item in articleList" :data="item" :key="item.id" @delete="deleteAriticle" @state="updateState"/>  
        <div class="pagination">
            <yk-pagination :total="count" size="xl" @change="chagePage" />
        </div>
    </yk-space>
 </template>
 
 <script lang="ts" setup>
    import articleItem from './article-item.vue';
    import { mkarticle } from '@/mock/data';
    import { ArticleData } from '@/utils/interface';
import message from '@yike-design/ui/es/components/message/src/utils';
import { state } from 'mermaid/dist/rendering-util/rendering-elements/shapes/state';
    import { ref,onMounted,getCurrentInstance } from 'vue'; 

    const proxy:any = getCurrentInstance()?.proxy

    const props = defineProps({
        pageSize:{
            type:Number,
            default:6
        },
        subsetId:{
            default:-1,
            type:Number,
        },
        state :{
            default:0,
            type:Number
        },
        searchTerm:{
            default:'',
            type:String
        }
    })
     
    type Request={
        pageSize:number;
        nowPage:number;
        state?: number;
        subsetId?:number;
        searchTerm?:string|number;
        count?:boolean;
    }


    const request = {
        pageSize:props.pageSize,
        nowPage:1,
        state:props.state,
        subsetId:props.subsetId,
        searchTerm:props.searchTerm,
        count:true
    }
    
    //获取文章
    const articleList = ref<ArticleData[]>([])
    //文章总数
    const count = ref<number>(0)

    //
    const getData = (e:boolean)=>{
        if(e){
            count.value = mkarticle.data.count
        }
  
        let arr = mkarticle.data.list.slice(
            (request.nowPage - 1) * request.pageSize,
            request.nowPage * request.pageSize
        )
        articleList.value = [...arr]
    }

    //削除
    const deleteAriticle = (e:number) => {
        //
        articleList.value = articleList.value.filter((obj:any) => {
            return obj.id !== e
        })
        proxy.$message({type:'primary',message:'削除完成'})
    }

    //改修
    const updateState = (e:any) => {
        articleList.value.filter((i:{id:number;state:number}) => {
            if(i.id === e.id){
                i.state = e.state
                if(e.state === 1){
                    proxy.$message({type:'primary',message:'成功'})
                } else {
                    proxy.$message({type:'primary',message:'失败'})
                }
            }
        })
        console.log(e)
    }
    /**
     * 处理分页变化
     * @param e 新的页码
     */
    const chagePage = (e: number) => {
        request.nowPage = e
        getData(false)
    }


    onMounted(() => {
        getData(true)
        // console.log(articleList.value)
    })
    
 </script>
 
 <style lang="less" scoped>
    .pagination {
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