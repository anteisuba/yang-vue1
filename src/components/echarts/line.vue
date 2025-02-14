<template>
    <div :style="{ height: chartHeight }" ref="chart" class="chart"></div>
  </template>
  
  <script lang="ts" setup>
  import * as echarts from 'echarts/core';
  import { ref, onMounted, onBeforeUnmount, markRaw, watch } from 'vue';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent
  } from 'echarts/components';
  import { LineChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  
  // 注册组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);
  
  // 定义 props 类型
  interface ChartProps {
    data: { date: string; count: number; }[];
    chartHeight: string;
  }
  
  const props = defineProps<ChartProps>();
  const chart = ref<HTMLDivElement>();
  const myChart = ref<echarts.ECharts>();
  const xAxisD = ref<string[]>([]);
  const seriesD = ref<number[]>([]);
  const option = ref();
  
  const visit = (e: ChartProps['data']) => {
    xAxisD.value = [];
    seriesD.value = [];
    for(let i = 0; i < e.length; i++) {
      xAxisD.value.push(e[i].date);
      seriesD.value.push(e[i].count);
    }
    option.value = {
      color: ['#2B5AED'],
      grid: {
        top: "4%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xAxisD.value,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: seriesD.value,
          type: 'line',
          smooth: true
        }
      ]
    };
  };
  
  const handleResize = () => {
    if (myChart.value) {
      myChart.value.resize();
    }
  };
  
  onMounted(() => {
    if (props.data && chart.value) {
      visit(props.data);
      myChart.value = markRaw(echarts.init(chart.value));
      myChart.value.setOption(option.value);
      window.addEventListener("resize", handleResize);
    }
  });
  
  watch(
    () => props.data,
    (newData) => {
      if (newData) {
        visit(newData);
        myChart.value?.setOption(option.value);
      }
    },
    { deep: true }
  );
  
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    myChart.value?.dispose();
  });
  </script>
  
  <style lang="less" scoped>
  .chart {
    width: 100%;
    min-height: 200px; /* 添加最小高度防止容器塌陷 */
  }
  </style>