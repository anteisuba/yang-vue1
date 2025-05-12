<template>
  <div class="gallery-container">
    <GalleryHeader />
    
    <div class="gallery">
      <GallerySidebar
        :albums="albums"
        :selected-album="selectedAlbum"
        @select-album="selectAlbum"
        @show-album-modal="showModal"
        @create-album="confirmNewAlbum"
      />

      <div class="gallery__content">
        <GalleryToolbar
          :initial-view-mode="viewMode"
          @search="searchPhotos"
          @search-input="handleSearchInput"
          @view-mode-change="toggleViewMode"
          @show-upload-modal="showUploadModal"
        />
        
        <GalleryGrid
          v-if="viewMode === 'grid'"
          :photos="paginatedPhotos"
          :highlighted-photo-ids="highlightedPhotoIds"
          :empty-message="emptyMessage"
          @preview="handlePreview"
          @move="showMovePhotoModal"
          @delete="handleDelete"
        />
        
        <GalleryList
          v-else
          :photos="paginatedPhotos"
          :empty-message="emptyMessage"
          @preview="handlePreview"
          @move="showMovePhotoModal"
          @delete="handleDelete"
        />
        
        <div class="gallery__pagination" v-if="filteredPhotos.length > 0">
          <yk-pagination
            v-model:current="currentPage"
            v-model:page-size="pageSize"
            :total="filteredPhotos.length"
            @change="handlePageChange"
            show-size-changer
            :page-size-options="[8, 12, 16, 24]"
          />
        </div>
      </div>
    </div>
    
    <div class="gallery-footer">
      <div class="footer-divider"></div>
      <div class="social-links">
        <div class="footer-text">
          <yk-title :level="5" style="margin-bottom: 12px">关注我们</yk-title>
          <yk-text type="secondary">© 2024 YANG BLOG. 保留所有权利。</yk-text>
        </div>
        <div class="social-icons-container">
          <a href="https://x.com/home" target="_blank" class="social-link" title="Twitter">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon-img" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" class="social-link" title="Instagram">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon-img" />
          </a>
          <a href="https://github.com/" target="_blank" class="social-link" title="GitHub">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" class="social-icon-img" />
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <UploadModal
    v-model="uploadModalVisible"
    :albums="albums"
    :selected-album-id="selectedUploadAlbum"
    @upload="handleUpload"
  />
  
  <MovePhotoModal
    v-model="movePhotoModalVisible"
    :selected-photo="selectedPhotoForMove"
    :albums="albums"
    @move="movePhotoToAlbum"
  />
  
  <AlbumModal
    v-model="albumModalVisible"
    :albums="albums"
    @edit="handleEditAlbum"
    @delete="handleDeleteAlbum"
  />
  
  <yk-modal v-model="previewVisible" title="照片预览" :footer="null">
    <div class="preview-image-container">
      <img :src="previewImage" alt="预览图片" class="preview-image" />
    </div>
  </yk-modal>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, computed, watch } from 'vue'
import { uploadImageApi, uploadImagesApi, getAllAlbumsApi, getAllPhotosApi, getPhotosByAlbumApi, createAlbumApi, movePhotoToAlbumApi, deletePhotoApi } from '@/api'
import { baseImgPath } from '@/utils/env'
import type { Photo, Album } from '@/types/api'
import GalleryHeader from './GalleryHeader.vue'
import GallerySidebar from './GallerySidebar.vue'
import GalleryToolbar from './GalleryToolbar.vue'
import GalleryGrid from './GalleryGrid.vue'
import GalleryList from './GalleryList.vue'
import UploadModal from './UploadModal.vue'
import MovePhotoModal from './MovePhotoModal.vue'
import AlbumModal from './AlbumModal.vue'

// 相册数据
const albums = ref<Album[]>([
  { id: 1, name: '全部照片', count: 0, description: '', cover: '' }
])

// 照片数据
const photos = ref<Photo[]>([])
const isLoading = ref(false)

// 加载初始示例照片数据（如果数据库中没有照片）
const loadExamplePhotos = () => {
  const examplePhotos = Array(20).fill(null).map((_, index) => ({
    id: index + 1,
    name: `照片${index + 1}.jpg`,
    url: `https://picsum.photos/300/200?random=${index + 1}`,
    size: `${Math.floor(Math.random() * 5 + 1)}MB`,
    date: `2023-${Math.floor(Math.random() * 12 + 1)}-${Math.floor(Math.random() * 28 + 1)}`,
    albumId: Math.floor(Math.random() * 5 + 1),
    filename: `photo${index + 1}.jpg`
  }))
  
  if (photos.value.length === 0) {
    photos.value = examplePhotos
  }
}

// 加载所有相册
const loadAlbums = async () => {
  try {
    const res = await getAllAlbumsApi()
    if (res.code === 200 && res.data) {
      const allPhotos = albums.value.find(a => a.id === 1)
      const backendAlbums = res.data.map((album: any) => ({
        id: album.id,
        name: album.name,
        count: album.count || 0,
        description: album.description,
        cover: album.cover
      }))
      
      const hasAllPhotosAlbum = backendAlbums.some((album: any) => album.id === 1)
      if (!hasAllPhotosAlbum) {
        backendAlbums.unshift(allPhotos)
      }
      
      albums.value = backendAlbums
    }
  } catch (error) {
    console.error('加载相册失败:', error)
  }
}

// 加载照片数据
const loadPhotos = async (albumId?: number) => {
  isLoading.value = true
  try {
    let res
    
    if (albumId && albumId !== 1) {
      res = await getPhotosByAlbumApi(albumId)
    } else {
      res = await getAllPhotosApi()
    }
    
    if (res.code === 200 && res.data) {
      photos.value = res.data.map((photo: any) => ({
        id: photo.id,
        name: photo.name,
        url: photo.url,
        size: formatFileSize(photo.size),
        date: photo.date,
        albumId: photo.album_id,
        filename: photo.filename
      }))
      
      if (photos.value.length === 0 && albumId === undefined) {
        loadExamplePhotos()
      }
    }
  } catch (error) {
    console.error('加载照片失败:', error)
    if (albumId === undefined) {
      loadExamplePhotos()
    }
  } finally {
    isLoading.value = false
  }
}

// 格式化文件大小
const formatFileSize = (size: number | string): string => {
  if (typeof size === 'string') {
    if (size.includes('KB') || size.includes('MB') || size.includes('GB')) {
      return size
    }
    size = parseInt(size, 10)
  }
  
  const kb = 1024
  const mb = kb * 1024
  const gb = mb * 1024
  
  if (size < kb) {
    return size + 'B'
  } else if (size < mb) {
    return (size / kb).toFixed(2) + 'KB'
  } else if (size < gb) {
    return (size / mb).toFixed(2) + 'MB'
  } else {
    return (size / gb).toFixed(2) + 'GB'
  }
}

// 分页相关
const currentPage = ref(1)
const pageSize = ref(8)

// 搜索相关
const searchQuery = ref('')
const isSearchActive = ref(false)
const highlightedPhotoIds = ref<number[]>([])
const searchTimeout = ref<any>(null)

// UI状态控制
const viewMode = ref<'grid' | 'list'>('grid')
const selectedAlbum = ref('1album')
const uploadModalVisible = ref(false)
const albumModalVisible = ref(false)
const movePhotoModalVisible = ref(false)
const previewVisible = ref(false)
const previewImage = ref('')
const selectedPhotoForMove = ref<Photo | null>(null)
const selectedUploadAlbum = ref(1)

// 获取组件实例
const proxy: any = getCurrentInstance()?.proxy

// 根据搜索条件和选择的相册筛选照片
const filteredPhotos = computed(() => {
  let result = [...photos.value]
  
  if (selectedAlbum.value) {
    const albumId = parseInt(selectedAlbum.value.replace('album', ''))
    if (albumId !== 1) {
      result = result.filter(photo => photo.albumId === albumId)
    }
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(photo => 
      photo.name.toLowerCase().includes(query)
    )
  }
  
  return result
})

// 当前页显示的照片
const paginatedPhotos = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  return filteredPhotos.value.slice(startIndex, startIndex + pageSize.value)
})

// 空状态提示信息
const emptyMessage = computed(() => {
  if (searchQuery.value.trim()) {
    return `没有找到名称包含 "${searchQuery.value}" 的照片`
  } else {
    return '该相册中还没有照片'
  }
})

// 选择相册
const selectAlbum = async (id: number, type: string) => {
  const oldSelected = selectedAlbum.value
  selectedAlbum.value = id + type
  
  currentPage.value = 1
  
  await loadPhotos(id)
  
  setTimeout(() => {
    const element = document.querySelector(`.album-item--active .album-item__icon span`)
    if (element) {
      element.classList.add('pulse-animation')
      setTimeout(() => {
        element.classList.remove('pulse-animation')
      }, 1000)
    }
  }, 50)
}

// 切换视图模式
const toggleViewMode = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}

// 显示上传模态框
const showUploadModal = () => {
  uploadModalVisible.value = true
}

// 处理上传
const handleUpload = async (files: File[], albumId: number, customNames: string[]) => {
  try {
    if (files.length === 1) {
      const formData = new FormData()
      formData.append('image', files[0])
      formData.append('albumId', albumId.toString())
      
      if (customNames[0]) {
        formData.append('customName', customNames[0])
      }
      
      const res = await uploadImageApi(formData)
      
      if (res.code === 200 && res.data) {
        const newPhoto = {
          id: res.data.id,
          name: res.data.name,
          url: res.data.url,
          size: formatFileSize(res.data.size),
          date: res.data.date,
          albumId: albumId,
          filename: res.data.filename
        }
        
        photos.value = [newPhoto, ...photos.value]
        updateAlbumCountUI(albumId, 1)
        
        proxy.$message({ type: 'success', message: res.message || '上传成功' })
      } else {
        throw new Error(res.message || '上传失败')
      }
    } else {
      const formData = new FormData()
      
      files.forEach((file, index) => {
        formData.append('images', file)
      })
      
      formData.append('albumId', albumId.toString())
      formData.append('customNames', JSON.stringify(customNames))
      
      const res = await uploadImagesApi(formData)
      
      if (res.code === 200 && res.data) {
        const newPhotos = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          url: item.url,
          size: formatFileSize(item.size),
          date: item.date,
          albumId: albumId,
          filename: item.filename
        }))
        
        photos.value = [...newPhotos, ...photos.value]
        updateAlbumCountUI(albumId, newPhotos.length)
        
        proxy.$message({ type: 'success', message: res.message || `成功上传${newPhotos.length}张照片` })
      } else {
        throw new Error(res.message || '上传失败')
      }
    }
    
    if (selectedAlbum.value === `${albumId}album`) {
      currentPage.value = 1
    }
    
    loadAlbums()
    uploadModalVisible.value = false
    
  } catch (error: any) {
    console.error('上传错误:', error)
    proxy.$message({ type: 'error', message: error.message || '上传失败，请稍后重试' })
  }
}

// 更新UI中相册的照片计数
const updateAlbumCountUI = (albumId: number, count: number) => {
  const targetAlbumIndex = albums.value.findIndex(album => album.id === albumId)
  if (targetAlbumIndex !== -1) {
    albums.value[targetAlbumIndex].count += count
  }
  
  if (albumId !== 1) {
    const allPhotosAlbumIndex = albums.value.findIndex(album => album.id === 1)
    if (allPhotosAlbumIndex !== -1) {
      albums.value[allPhotosAlbumIndex].count += count
    }
  }
}

// 显示相册管理模态框
const showModal = () => {
  albumModalVisible.value = true
}

// 确认创建相册
const confirmNewAlbum = async (name: string) => {
  try {
    const res = await createAlbumApi({
      name: name,
      description: '',
      cover: ''
    })
    
    if (res.code === 200 && res.data) {
      albums.value.push({
        id: res.data.id,
        name: res.data.name,
        count: 0,
        description: res.data.description,
        cover: res.data.cover
      })
      
      proxy.$message({ type: 'success', message: '创建相册成功！' })
    } else {
      throw new Error(res.message || '创建相册失败')
    }
  } catch (error: any) {
    console.error('创建相册失败:', error)
    proxy.$message({ type: 'error', message: error.message || '创建相册失败' })
  }
}

// 分页变化处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  const contentElement = document.querySelector('.gallery__content')
  if (contentElement) {
    contentElement.scrollTop = 0
  }
}

// 搜索照片
const searchPhotos = (keyword: string) => {
  searchQuery.value = keyword.trim()
  isSearchActive.value = Boolean(searchQuery.value)
  currentPage.value = 1
  highlightMatchingPhotos()
  
  if (searchQuery.value) {
    proxy.$message({ 
      type: 'info', 
      message: `搜索结果: 找到 ${filteredPhotos.value.length} 张照片` 
    })
  }
}

// 处理搜索输入
const handleSearchInput = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  searchTimeout.value = setTimeout(() => {
    isSearchActive.value = Boolean(searchQuery.value.trim())
    highlightMatchingPhotos()
    currentPage.value = 1
  }, 300)
}

// 重置搜索
const resetSearch = () => {
  searchQuery.value = ''
  isSearchActive.value = false
  highlightedPhotoIds.value = []
  currentPage.value = 1
}

// 高亮匹配的照片
const highlightMatchingPhotos = () => {
  highlightedPhotoIds.value = []
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    highlightedPhotoIds.value = photos.value
      .filter(photo => photo.name.toLowerCase().includes(query))
      .map(photo => photo.id)
  }
}

// 监听相册选择变化
watch(selectedAlbum, () => {
  if (isSearchActive.value) {
    resetSearch()
  }
})

// 处理预览
const handlePreview = (photo: any) => {
  if (!photo || !photo.url) {
    proxy.$message({ type: 'error', message: '无法预览该照片' })
    return
  }
  
  previewImage.value = photo.url.startsWith('http') ? photo.url : baseImgPath + photo.url.replace(/^\/img/, '')
  previewVisible.value = true
}

// 显示移动照片模态框
const showMovePhotoModal = (photo: any) => {
  selectedPhotoForMove.value = photo
  movePhotoModalVisible.value = true
}

// 处理移动照片到其他相册
const movePhotoToAlbum = async (photoId: number, targetAlbumId: number) => {
  try {
    const res = await movePhotoToAlbumApi(photoId, targetAlbumId)
    
    if (res.code === 200 && res.data) {
      photos.value = photos.value.map((photo) =>
        photo.id === photoId ? {
          ...photo,
          albumId: targetAlbumId
        } : photo
      )
      
      const oldAlbumId = selectedPhotoForMove.value.albumId
      updateAlbumCountUI(oldAlbumId, -1)
      updateAlbumCountUI(targetAlbumId, 1)
      
      if (selectedAlbum.value === `${oldAlbumId}album` && oldAlbumId !== 1) {
        await loadPhotos(parseInt(selectedAlbum.value))
      }
      
      proxy.$message({ type: 'success', message: res.message || '照片移动成功' })
    } else {
      throw new Error(res.message || '照片移动失败')
    }
  } catch (error: any) {
    console.error('移动照片失败:', error)
    proxy.$message({ type: 'error', message: error.message || '照片移动失败，请稍后重试' })
  } finally {
    movePhotoModalVisible.value = false
  }
}

// 处理编辑相册
const handleEditAlbum = (album: any) => {
  // TODO: 实现编辑相册功能
  console.log('编辑相册:', album)
}

// 处理删除相册
const handleDeleteAlbum = (album: any) => {
  // TODO: 实现删除相册功能
  console.log('删除相册:', album)
}

// 处理删除照片
const handleDelete = async (photo: any) => {
  try {
    const res = await deletePhotoApi(photo.id)
    
    if (res.code === 200) {
      // 从列表中移除照片
      photos.value = photos.value.filter(p => p.id !== photo.id)
      
      // 更新相册计数
      const albumId = photo.albumId
      updateAlbumCountUI(albumId, -1)
      
      proxy.$message({ type: 'success', message: '照片删除成功' })
    } else {
      throw new Error(res.message || '删除照片失败')
    }
  } catch (error: any) {
    console.error('删除照片失败:', error)
    proxy.$message({ type: 'error', message: error.message || '删除照片失败，请稍后重试' })
  }
}

onMounted(async () => {
  await loadAlbums()
  await loadPhotos()
})
</script>

<style lang="less" scoped>
.gallery-container {
  padding: @space-xl 0;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery {
  display: flex;
  gap: @space-xl;
  width: 100%;
  
  &__content {
    flex: 1;
    background-color: @bg-color-l;
    border-radius: @radius-m;
    padding: @space-l;
    display: flex;
    flex-direction: column;
    gap: @space-l;
    max-height: 720px;
    overflow-y: auto;
  }
  
  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: @space-l;
  }
}

.gallery-footer {
  margin-top: @space-xl;
  padding: @space-xl 0;
  
  .footer-divider {
    height: 1px;
    background-color: #e0e0e0;
    margin-bottom: @space-xl;
  }
  
  .social-links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 @space-xl;
    
    .footer-text {
      text-align: left;
    }
    
    .social-icons-container {
      display: flex;
      gap: @space-xl;
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
      
      .social-icon-img {
        width: 32px;
        height: 32px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

.preview-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>