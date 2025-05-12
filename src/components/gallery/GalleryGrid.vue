<template>
  <div class="gallery__grid">
    <div 
      class="gallery__grid-item" 
      v-for="(photo, index) in photos" 
      :key="index"
      :class="{ 'photo-highlight': highlightedPhotoIds.includes(photo.id) }"
    >
      <div class="gallery__image-container">
        <img :src="getImageUrl(photo.url)" :alt="photo.name" class="gallery__image" />
        <div class="gallery__image-overlay">
          <yk-space>
            <yk-button circle size="s" type="secondary" @click="$emit('preview', photo)">
              👁️
            </yk-button>
            <yk-button circle size="s" type="secondary" @click="$emit('move', photo)">
              📁
            </yk-button>
            <yk-button circle size="s" type="danger" @click="$emit('delete', photo)">
              🗑️
            </yk-button>
          </yk-space>
        </div>
      </div>
      <div class="gallery__image-info">
        <yk-text>{{ photo.name }}</yk-text>
        <yk-text type="secondary" size="s">{{ photo.date }}</yk-text>
      </div>
    </div>
    <div class="gallery__empty" v-if="photos.length === 0">
      <div class="empty-icon">📷</div>
      <yk-text type="secondary">{{ emptyMessage }}</yk-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { baseImgPath } from '@/utils/env'

const props = defineProps<{
  photos: any[]
  highlightedPhotoIds: number[]
  emptyMessage: string
}>()

const emit = defineEmits<{
  (e: 'preview', photo: any): void
  (e: 'move', photo: any): void
  (e: 'delete', photo: any): void
}>()

const getImageUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url
  } else {
    return baseImgPath + url.replace(/^\/img/, '')
  }
}
</script>

<style lang="less" scoped>
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: @space-l;
}

.gallery__grid-item {
  display: flex;
  flex-direction: column;
  border-radius: @radius-m;
  overflow: hidden;
  background-color: @bg-color-m;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  
  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
    
    .gallery__image-overlay {
      opacity: 1;
    }
    
    .gallery__image {
      transform: scale(1.05);
    }
  }
  
  &.photo-highlight {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(53, 124, 255, 0.2);
    border: 2px solid @pcolor;
    
    .gallery__image {
      transform: scale(1.05);
    }
  }
}

.gallery__image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery__image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery__image-info {
  padding: @space-m;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gallery__empty {
  grid-column: 1 / -1;
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