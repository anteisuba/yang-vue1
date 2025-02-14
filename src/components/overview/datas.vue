<template>
    <yk-space dir="vertical" size="xl">
        <div class="data-card">
            <div class="data-card__title">
                <p class="data-card__title-name">访问量</p>
                <yk-radio-group v-model="visitRadio" type="button" :solid="true"  @change="getVisit">
                    <yk-radio value="week">近一周</yk-radio>
                    <yk-radio value="moon">近一月</yk-radio>
                </yk-radio-group>
            </div>
        </div>
        <LineChart :data="visitData" chart-height="208px" />
        <div class="data-card">
            <div class="data-card__title">
                <p class="data-card__title-name">数据监测</p>
                <yk-radio-group v-model="checkRadio" type="button" :solid="true">
                    <yk-radio value="week">近一周</yk-radio>
                    <yk-radio value="moon">近一月</yk-radio>
                </yk-radio-group>
            
            </div>
        </div>
        <PieChart title="设备总数" :data="survey.data.device" chart-height="208px"/>
    </yk-space>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { LineChart,PieChart } from '../echarts/index'
import { visit,survey } from '../../mock/data'

//访问量
const visitData = ref(visit.data)
const getVisit= (e:string) => {
    let data = visit.data;
    console.log(data)
    if(e==="week") {
        data=data.slice(0,7)
    }
    visitData.value = data;
    console.log(visitData.value)
}

const visitRadio = ref('week')
const checkRadio = ref('week')

onMounted(() => {
    getVisit(visitRadio.value)
})
</script>

<style lang="less" scoped>
.data-card {
    padding:@space-xl;
    border-radius:@radius-m;
    background:@bg-color-l;
    width:100%;
    &__title{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding-bottom:@space-l;
        &-name{
            .font-l();
            font-weight:600;
            color:@font-color-l;
        }
    } 
}

</style>