<template>
  <div class="top_title">
    <div class="left-content">
      <yk-title :level="3" style="margin: 0; line-height: 36px">{{ props.name }}</yk-title>
      <slot name="custom" />
    </div>
    <yk-space size="m" v-if="isSearch">
      <yk-button type="secondary" v-show="SearchData" @click="cancleSearch">取消搜索</yk-button>
      <yk-input-search
        style="width: 320px"
        placeholder="请输入查找的内容"
        v-model="SearchData"
        @search="search"
      >
        <template #suffix>
          <yk-button type="secondary"><IconSearchOutline /></yk-button>
        </template>
      </yk-input-search>
    </yk-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  //创建响应式数据 ,来存储搜索相关的数据
  const SearchData = ref()
  //定义类型接口
  type titleProps = {
    name?: string
    isSearch: boolean
  }
  //设置组件 withDefaults:为props设置默认值  defineProps根据titleProps类型检查传入的属性
  const props = withDefaults(defineProps<titleProps>(), {
    name: '总览',
    isSearch: true,
  })

  //用于声明组件可以触发的自定义事件,传入父级
  const emit = defineEmits(['search'])

  //搜索事件 触发名为 'search' 的自定义事件 将 SearchData.value（搜索框的值）作为参数传递给父组件
  const search = () => {
    emit('search', SearchData.value)
  }

  //取消搜索
  const cancleSearch = () => {
    emit('search', '')
    SearchData.value = ''
  }
</script>

<style lang="less" scoped>
  .top_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: @space-l 0;
    margin-bottom: @space-l;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    .left-content {
      display: flex;
      align-items: center;
      gap: @space-m;

      :deep(.yk-title) {
        color: @font-color-m;
        transition: color 0.3s ease;
        font-weight: 600;

        &:hover {
          color: #2b5aed;
        }
      }
    }

    :deep(.yk-space) {
      .yk-button {
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(43, 90, 237, 0.1);
        }
      }

      .yk-input-search {
        transition: all 0.3s ease;
        
        &:focus-within {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(43, 90, 237, 0.1);
        }

        .yk-input {
          border-radius: @radius-m;
          border-color: rgba(43, 90, 237, 0.2);
          
          &:hover, &:focus {
            border-color: #2b5aed;
          }
        }

        .yk-button {
          border-radius: 0 @radius-m @radius-m 0;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .top_title {
      flex-direction: column;
      align-items: flex-start;
      gap: @space-m;
      padding: @space-m 0;

      :deep(.yk-space) {
        width: 100%;
        
        .yk-input-search {
          width: 100% !important;
        }
      }
    }
  }
</style>
