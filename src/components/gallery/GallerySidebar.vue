<template>
  <div class="gallery__sidebar">
    <div class="gallery__sidebar-title">
      <yk-title :level="4" style="margin: 0; line-height: 36px">相册分类</yk-title>
      <yk-space style="flex: none">
        <yk-popconfirm
          title="新建相册"
          @cancel="cancel"
          @confirm="confirmNewAlbum"
          placement="bottom"
          tigger="click"
          class="add-album-popconfirm"
        >
          <yk-text type="primary">
            <span style="margin-right: 4px">➕</span>新建
          </yk-text>
          <template #content>
            <div style="margin: 8px 0 16px">
              <yk-input
                show-counter
                :limit="10"
                placeholder="请输入相册名称"
                style="width: 208px"
                v-model="albumName"
              >
              </yk-input>
            </div>
          </template>
        </yk-popconfirm>
        <yk-text type="primary" @click="$emit('showAlbumModal')">
          <span style="margin-right: 4px">⚙️</span>管理相册
        </yk-text>
      </yk-space>
    </div>

    <div class="album-list">
      <div class="album-category">我的收藏</div>
      <div
        v-for="album in albums"
        :key="album.id"
        :class="{ 'album-item--active': selectedAlbum === album.id + 'album' }"
        class="album-item"
        @click="$emit('selectAlbum', album.id, 'album')"
      >
        <div class="album-item__icon">
          <span v-if="album.id !== 1">📁</span>
          <span v-else>🖼️</span>
        </div>
        <div class="album-item__title">
          <span>{{ album.name }}</span>
          <span class="album-item__count">{{ album.count }}</span>
        </div>
      </div>
      
      <div class="album-category">更多分类</div>
      <div class="album-item album-item--add" @click="showAddAlbumPopup">
        <div class="album-item__icon">
          <span>➕</span>
        </div>
        <div class="album-item__title">
          <span>添加新相册</span>
        </div>
      </div>
    </div>
    
    <div class="gallery__sidebar-footer">
      <yk-title :level="5" style="margin-bottom: 12px">分享你的相册</yk-title>
      <div class="social-icons">
        <span class="social-icon">📤</span>
        <span class="social-icon">❤️</span>
        <span class="social-icon">💬</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  albums: any[]
  selectedAlbum: string
}>()

const emit = defineEmits<{
  (e: 'selectAlbum', id: number, type: string): void
  (e: 'showAlbumModal'): void
  (e: 'createAlbum', name: string): void
}>()

const albumName = ref('')

const cancel = () => {
  albumName.value = ''
}

const confirmNewAlbum = () => {
  if (albumName.value) {
    emit('createAlbum', albumName.value)
    albumName.value = ''
  }
}

const showAddAlbumPopup = () => {
  const popconfirmEl = document.querySelector('.add-album-popconfirm') as any
  if (popconfirmEl) {
    popconfirmEl.click()
  }
}
</script>

<style lang="less" scoped>
.gallery__sidebar {
  flex: none;
  width: 280px;
  padding: @space-l @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  display: flex;
  flex-direction: column;
  
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @space-l;
  }
  
  &-footer {
    margin-top: auto;
    padding-top: @space-xl;
  }
}

.album-list {
  width: 100%;
  margin-bottom: @space-l;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 0;
}

.album-category {
  font-size: 12px;
  color: @font-color-s;
  padding: 8px @space-m 4px;
  margin-top: 6px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: @space-m;
    right: @space-m;
    bottom: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, @line-color-s, transparent);
  }
  
  &:first-child {
    margin-top: 0;
  }
}

.album-item {
  display: flex;
  align-items: center;
  padding: 10px @space-m;
  border-radius: @radius-s;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border-left: 3px solid transparent;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  &--add {
    border-style: dashed;
    border-width: 1px;
    border-color: @line-color-s;
    background-color: transparent;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.8);
      border-color: @pcolor;
    }
  }
  
  &__icon {
    margin-right: @space-s;
    font-size: 18px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s, opacity 0.2s;
    opacity: 0.7;
    
    span {
      transition: all 0.3s;
    }
  }
  
  &:hover {
    background-color: @pcolor-1;
    border-left-color: @pcolor;
    transform: translateX(2px);
    
    .album-item__icon {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  
  &--active {
    background-color: @pcolor-2;
    border-left-color: @pcolor;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    
    .album-item__icon {
      opacity: 1;
    }
    
    .album-item__title {
      color: @pcolor;
      font-weight: 500;
    }
  }
  
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
  
  &__count {
    background-color: @bg-color-m;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    min-width: 28px;
    text-align: center;
    transition: all 0.2s;
  }
  
  &--active .album-item__count {
    background-color: @pcolor-1;
    color: @pcolor;
  }
}

.social-icons {
  display: flex;
  gap: @space-m;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: @bg-color-m;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: @pcolor-1;
    color: @pcolor;
  }
}
</style> 