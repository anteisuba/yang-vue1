 <!-- 整个模块 -->
 <template>
    <yk-space dir="vertical" style="width: 100%" size="xl">
        <articleItem v-for="item in articleList" :data="item" :key="item.id"/>  

    </yk-space>
 </template>
 
 <script lang="ts" setup>
    import articleItem from './article-item.vue';
    import { mkarticle } from '@/mock/data';
    import { ArticleData } from '@/utils/interface';
    import { ref,onMounted } from 'vue'; 

    const props = defineProps({
        pageSize:{
            type:Number,
            default:8
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

    onMounted(() => {
        getData(true)
        // console.log(articleList.value)
    })
    
 </script>
 
 <style lang="less" scoped>
    
 </style>