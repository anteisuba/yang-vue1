<template>
  <yk-space class="gather">
    <div
      v-for="(item, index) in overLinkData"
      :key="index"
      class="gather__list"
      :style="{ background: 'linear-gradient(' + item.bgColor + ')' }"
    >
      <yk-space dir="vertical" size="s">
        <yk-text type="secondary">{{ item.name }}</yk-text>
        <yk-title :level="2" style="margin: 0">{{ item.total }}</yk-title>
      </yk-space>
      <yk-button v-if="index > 0" size="xl" type="secondary" shape="square">
        <IconPlusOutline />
      </yk-button>
    </div>
  </yk-space>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { overLink } from '../../utils/menu'
  import { overview } from '../../mock/data'
  const overLinkData = ref(overLink)

  //获取数量
  const drawGatherData = () => {
    let data = overview.data
    overLinkData.value[0].total = data.file
    overLinkData.value[1].total = data.article
    overLinkData.value[2].total = data.gallery
    overLinkData.value[3].total = data.diary
  }

  onMounted(() => {
    drawGatherData()
  })
</script>

<style lang="less" scoped>
  .gather {
    width: 100%;
    &__list {
      width: 25%;
      background: #eee;
      display: flex;
      justify-content: space-between;
      padding: @space-xl;
      border-radius: @radius-m;
      align-items: center;
      &:first-child {
        .yk-title,
        .yk-text {
          color: @white;
        }
      }
    }
  }
</style>
