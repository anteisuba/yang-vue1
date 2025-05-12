<template>
  <div class="gallery__toolbar">
    <div class="gallery__toolbar-left">
      <yk-input-search 
        placeholder="搜索照片..." 
        style="width: 240px" 
        @search="handleSearch"
        v-model="searchQuery"
        @input="handleSearchInput"
      >
        <template #prefix>
          <div class="search-icon">🔍</div>
        </template>
      </yk-input-search>
    </div>
    <div class="gallery__toolbar-right">
      <yk-space>
        <yk-button type="primary" @click="$emit('showUploadModal')">
          <span style="margin-right: 4px">⬆️</span>上传照片
        </yk-button>
        <yk-button type="secondary" @click="toggleViewMode">
          <span v-if="viewMode === 'list'" style="margin-right: 4px">👁️</span>
          <span v-else style="margin-right: 4px">💡</span>
          {{ viewMode === 'list' ? '网格视图' : '列表视图' }}
        </yk-button>
      </yk-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  initialViewMode?: 'grid' | 'list'
}>()

const emit = defineEmits<{
  (e: 'search', keyword: string): void
  (e: 'searchInput', keyword: string): void
  (e: 'viewModeChange', mode: 'grid' | 'list'): void
  (e: 'showUploadModal'): void
}>()

const searchQuery = ref('')
const viewMode = ref(props.initialViewMode || 'grid')

const handleSearch = (keyword: string) => {
  emit('search', keyword)
}

const handleSearchInput = () => {
  emit('searchInput', searchQuery.value)
}

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
  emit('viewModeChange', viewMode.value)
}
</script>

<style lang="less" scoped>
.gallery__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &-left, &-right {
    display: flex;
    align-items: center;
  }
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}
</style> 