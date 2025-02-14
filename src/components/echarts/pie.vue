<template>
    <div :style="{ height:chartHeight }" ref="chart" class="chart">
        
    </div>
</template>

<script lang="ts" setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';

import { ref,onMounted,onBeforeUnmount,markRaw,watch } from 'vue';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { PieChart } from 'echarts/charts';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout, UniversalTransition } from 'echarts/features';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const chart = ref<HTMLDivElement>()
//接受父组件传过来的option,和echarts的高度
const myChart = ref()
//可以根据父组件传过来的option对象生成折线图,柱状图,饼图等
const props = defineProps(['data','title','chartHeight'])

const option = ref();

const survey = (e:any) => {
    let total:number = 0;
    for(let i = 0;i < e.length;i++) {
        // 计算总数
        total += e[i].value
    }
    option.value = {
        color:['#2B5AED','#FA5247','#1CCBB6','#F625AF','#FFB435'],
        title: {
            text:total, //主标题文本
            subtext:props.title, //副标题文本
            left:"center",
            top:"34%",
            textStyle: {
                fontSize:32,
                color:"#686B73",
                align:"center",
            },
            subtextStyle: {
                fontSize:14,
                color:"#686B73",
            },
        },
        tooltip: {
            trigger:'item'
        },
        legend: {
            show:false,
            bottom:0,
            icon:'circle'
        },
        series: [
            {
                //设备总数
                type:'pie',
                radius:['60%','76%'],
                avoidLabelOverlap:true,

                label: {
                    normal: {
                        show:true, //默认显示关闭,如果此处是true,则数据重叠
                    },
                    emphasis: {
                        show:true,
                    },
                },
                emphasis: {
                    label:{
                        show:true,
                        fontSize:40,
                        fontWeight:'bold'
                    }
                },
                labelLine: {
                    show:false,
                },
                data:e,
            }
        ]
    }
}

survey(props.data);

onMounted(() => {
    //函数体
    //这里必须用markRaw包裹住,否则当前页面宽度变化控制台会报错
    myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
    
    myChart.value.setOption(option.value)
    window.addEventListener("resize",() => {
        myChart.value.resize()
    })
})

watch(
    () => props.data,
    (n) => {
        survey(n);
        myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
        myChart.value.setOption(option.value)
    },
)

//组件销毁前一定要取消监听的事情,不然会影响性能和暂用内存
onBeforeUnmount(() => {
    window.removeEventListener("resize",() => {
        myChart.value.resize()
    })
})
</script>

<style lang="less" scoped>
.chart {
    width:100%;
}
</style>