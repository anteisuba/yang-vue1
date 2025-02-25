<template>
  <yk-table>
    <yk-table-column property="name" label="分组名称"></yk-table-column>
    <yk-table-column property="value" label="关联文章数"></yk-table-column>
    <yk-table-column property="moment" label="创建时间"></yk-table-column>
    <yk-table-column property="manage" label="操作" align="right"></yk-table-column>
    <template #tbody>
      <tr v-for="(item, index) in labelStore.data" :key="index" class="yk-table__row">
        <td class="yk-table__cell">
          <yk-input v-model="item.name" @focus="focuslabel(item.id)" @blur="blurlabel(item.id)" />
        </td>
        <td class="yk-table__cell">
          {{ item.value }}
        </td>
        <td class="yk-table__cell">
          {{ item.moment }}
        </td>
        <td class="yk-table__cell text-right">
          <yk-text type="primary" style="cursor: pointer" @click="deletelabel(item.id)"
            >删除</yk-text
          >
        </td>
      </tr>
    </template>
  </yk-table>
</template>

<script lang="ts" setup>
  import { number } from 'echarts'
  import { getCurrentInstance } from 'vue'

  const proxy: any = getCurrentInstance()?.proxy

  //当前分组名称
  let nowName: string | number
  //聚焦名称
  const focuslabel = (id: number | string) => {
    let result = labelStore.data.find((item: { id: number | string }) => item.id === id)
    if (result) {
      nowName = result.name
    }
  }
  //失焦
  const blurlabel = (id: number | string) => {
    let result = labelStore.data.find((item: { id: number | string }) => item.id === id)
    if (result && nowName != result.name) {
      //提交后端处理
      proxy.$message({ type: 'primary', message: '修改成功' })
    }
  }

  //删除分组
  const deletelabel = (e: number | string) => {
    labelStore.data = labelStore.data.filter((obj: { value: any; id: number | string }) => {
      if (obj.id === e) {
        labelStore.exclude.value += obj.value
      }
      return obj.id !== e
    })
    proxy.$message({ type: 'primary', message: '成功' })
  }
</script>

<style lang="less" scoped></style>
