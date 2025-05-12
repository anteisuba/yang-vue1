<template>
  <div class="gallery__list">
    <yk-table :data="photos" :columns="columns">
      <template #operation="{ record }">
        <yk-space>
          <yk-button type="text" size="s" @click="$emit('preview', record)">
            👁️
          </yk-button>
          <yk-button type="text" size="s" @click="$emit('move', record)">
            📁
          </yk-button>
          <yk-button type="text" size="s" danger @click="$emit('delete', record)">
            🗑️
          </yk-button>
        </yk-space>
      </template>
    </yk-table>
    <div class="gallery__empty" v-if="photos.length === 0">
      <div class="empty-icon">📷</div>
      <yk-text type="secondary">{{ emptyMessage }}</yk-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  photos: any[]
  emptyMessage: string
}>()

const emit = defineEmits<{
  (e: 'preview', photo: any): void
  (e: 'move', photo: any): void
  (e: 'delete', photo: any): void
}>()

const columns = [
  { title: '照片名称', dataIndex: 'name', width: 200 },
  { title: '大小', dataIndex: 'size', width: 100 },
  { title: '上传日期', dataIndex: 'date', width: 150 },
  { title: '操作', slotName: 'operation', width: 150 }
]
</script>

<style lang="less" scoped>
.gallery__list {
  width: 100%;
}

.gallery__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: @space-xl 0;
  color: @font-color-s;
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: @space-m;
    opacity: 0.6;
  }
}
</style> 