<template>
  <yk-modal v-model="visible" title="管理相册">
    <yk-table :data="albums" :columns="columns">
      <template #operation="{ record }">
        <yk-space>
          <yk-button type="text" size="s" @click="$emit('edit', record)">编辑</yk-button>
          <yk-button type="text" size="s" danger @click="$emit('delete', record)">删除</yk-button>
        </yk-space>
      </template>
    </yk-table>
    <template #footer>
      <yk-button type="primary" @click="handleClose">确定</yk-button>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  albums: any[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'edit', album: any): void
  (e: 'delete', album: any): void
}>()

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(() => visible.value, (val) => {
  emit('update:modelValue', val)
})

const columns = [
  { title: '相册名称', dataIndex: 'name', width: 200 },
  { title: '照片数量', dataIndex: 'count', width: 100 },
  { title: '操作', slotName: 'operation', width: 150 }
]

const handleClose = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
// 无需额外样式
</style> 