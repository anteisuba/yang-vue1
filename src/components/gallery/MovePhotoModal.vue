<template>
  <yk-modal v-model="visible" title="移动照片到其他相册">
    <div class="move-photo-container">
      <div class="move-photo-preview">
        <img :src="selectedPhoto?.url ? getImageUrl(selectedPhoto.url) : ''" :alt="selectedPhoto?.name" class="move-photo-thumbnail" />
        <div class="move-photo-info">
          <yk-text>{{ selectedPhoto?.name }}</yk-text>
          <yk-text type="secondary" size="s">当前相册: {{ getCurrentAlbumName(selectedPhoto?.albumId) }}</yk-text>
        </div>
      </div>
      
      <div class="move-photo-selector">
        <yk-title :level="5">选择目标相册</yk-title>
        <div class="custom-select" style="margin-top: 16px;">
          <select v-model="targetAlbum" class="album-select">
            <option v-for="album in availableAlbums" :key="album.id" :value="album.id">
              {{ album.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <template #footer>
      <yk-space>
        <yk-button @click="handleCancel">取消</yk-button>
        <yk-button type="primary" @click="handleMove" :loading="isMoving">确认移动</yk-button>
      </yk-space>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { baseImgPath } from '@/utils/env'

const props = defineProps<{
  modelValue: boolean
  selectedPhoto: any
  albums: any[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'move', photoId: number, targetAlbumId: number): void
}>()

const visible = ref(props.modelValue)
const targetAlbum = ref(1)
const isMoving = ref(false)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(() => visible.value, (val) => {
  emit('update:modelValue', val)
})

const availableAlbums = computed(() => {
  return props.albums.filter(a => a.id !== props.selectedPhoto?.albumId)
})

const getCurrentAlbumName = (albumId: number | undefined) => {
  const album = props.albums.find(a => a.id === albumId)
  return album ? album.name : '未命名相册'
}

const getImageUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url
  } else {
    return baseImgPath + url.replace(/^\/img/, '')
  }
}

const handleMove = () => {
  if (!props.selectedPhoto) return
  emit('move', props.selectedPhoto.id, targetAlbum.value)
}

const handleCancel = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
.move-photo-container {
  display: flex;
  flex-direction: column;
  gap: @space-l;
}

.move-photo-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: @space-m;
}

.move-photo-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: @radius-m;
}

.move-photo-info {
  text-align: center;
}

.move-photo-selector {
  margin-top: @space-m;
}

.custom-select {
  position: relative;
  width: 100%;
  margin-top: 8px;
  
  .album-select {
    width: 100%;
    padding: 8px 12px;
    border-radius: @radius-s;
    border: 1px solid @line-color-m;
    background-color: @bg-color-m;
    font-size: 14px;
    appearance: none;
    cursor: pointer;
    transition: all 0.3s;
    
    &:focus {
      outline: none;
      border-color: @pcolor;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }
    
    &:hover {
      border-color: @pcolor-1;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid @font-color-m;
    pointer-events: none;
  }
}
</style> 