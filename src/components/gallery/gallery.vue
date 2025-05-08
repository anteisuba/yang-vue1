<template>
  <div class="gallery-container">
    <div class="gallery-header">
      <yk-title :level="2" style="margin-bottom: 8px">摄影作品集</yk-title>
      <yk-text type="secondary">探索我的摄影世界，记录生活中的美好瞬间</yk-text>
    </div>
    
    <div class="gallery">
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
            >
              <yk-text type="primary">
                <IconCirclePlusOutline style="margin-right: 4px" />新建
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
            <yk-text type="primary" @click="showModal">
              <IconSettingsOutline style="margin-right: 4px" />管理相册
            </yk-text>
          </yk-space>
        </div>

        <yk-space dir="vertical" size="s" style="width: 100%">
          <div
            v-for="album in albums"
            :key="album.id"
            :class="{ 'gallery__sidebar-selected': selectedAlbum === album.id + 'album' }"
            class="album-item"
            @click="selectAlbum(album.id, 'album')"
          >
            <div class="album-item__title">
              <span>{{ album.name }}</span>
              <span class="album-item__count">{{ album.count }}</span>
            </div>
          </div>
        </yk-space>
        
        <div class="gallery__sidebar-footer">
          <yk-title :level="5" style="margin-bottom: 12px">分享你的相册</yk-title>
          <div class="social-icons">
            <span class="social-icon"><IconSendOutline /></span>
            <span class="social-icon"><IconHeartOutline /></span>
            <span class="social-icon"><IconCommentOutline /></span>
          </div>
        </div>
      </div>

      <div class="gallery__content">
        <div class="gallery__toolbar">
          <div class="gallery__toolbar-left">
            <yk-input-search placeholder="搜索照片..." style="width: 240px" @search="searchPhotos" />
          </div>
          <div class="gallery__toolbar-right">
            <yk-space>
              <yk-button type="primary" @click="showUploadModal">
                <IconUploadOutline style="margin-right: 4px" />上传照片
              </yk-button>
              <yk-button type="secondary" @click="toggleViewMode">
                <IconEyeOutline v-if="viewMode === 'list'" style="margin-right: 4px" />
                <IconBulbOutline v-else style="margin-right: 4px" />
                {{ viewMode === 'list' ? '网格视图' : '列表视图' }}
              </yk-button>
            </yk-space>
          </div>
        </div>
        
        <!-- 照片网格视图 -->
        <div class="gallery__grid" v-if="viewMode === 'grid'">
          <div class="gallery__grid-item" v-for="(photo, index) in photos" :key="index">
            <div class="gallery__image-container">
              <img :src="photo.url" :alt="photo.name" class="gallery__image" />
              <div class="gallery__image-overlay">
                <yk-space>
                  <yk-button circle size="s" type="secondary">
                    <IconEyeOutline />
                  </yk-button>
                  <yk-button circle size="s" type="secondary">
                    <IconCommentOutline />
                  </yk-button>
                  <yk-button circle size="s" type="danger">
                    <IconDeleteOutline />
                  </yk-button>
                </yk-space>
              </div>
            </div>
            <div class="gallery__image-info">
              <yk-text>{{ photo.name }}</yk-text>
              <yk-text type="secondary" size="s">{{ photo.date }}</yk-text>
            </div>
          </div>
        </div>
        
        <!-- 照片列表视图 -->
        <div class="gallery__list" v-else>
          <yk-table :data="photos" :columns="columns">
            <template #operation="{ record }">
              <yk-space>
                <yk-button type="text" size="s">
                  <IconEyeOutline />
                </yk-button>
                <yk-button type="text" size="s">
                  <IconCommentOutline />
                </yk-button>
                <yk-button type="text" size="s" danger>
                  <IconDeleteOutline />
                </yk-button>
              </yk-space>
            </template>
          </yk-table>
        </div>
        
        <!-- 分页 -->
        <div class="gallery__pagination">
          <yk-pagination
            v-model:current="currentPage"
            v-model:page-size="pageSize"
            :total="total"
            @change="handlePageChange"
          />
        </div>
      </div>
    </div>
    
    <!-- 页面底部社交媒体链接 -->
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
  
  <!-- 上传照片模态框 -->
  <yk-modal v-model="uploadModalVisible" title="上传照片">
    <div class="upload-container">
      <yk-upload
        :multiple="true"
        :limit="5"
        accept="image/*"
        list-type="picture-card"
      >
        <IconUploadOutline style="margin-right: 4px" />上传
      </yk-upload>
      
      <div class="upload-tips">
        <yk-title :level="5">上传提示</yk-title>
        <yk-text type="secondary">• 支持 JPG、PNG、GIF 格式</yk-text>
        <yk-text type="secondary">• 单张照片大小不超过 10MB</yk-text>
        <yk-text type="secondary">• 请确保拥有照片版权</yk-text>
      </div>
    </div>
    <template #footer>
      <yk-space>
        <yk-button @click="uploadModalVisible = false">取消</yk-button>
        <yk-button type="primary" @click="handleUpload">确认上传</yk-button>
      </yk-space>
    </template>
  </yk-modal>
  
  <!-- 管理相册模态框 -->
  <yk-modal v-model="albumModalVisible" title="管理相册">
    <yk-table :data="albums" :columns="albumColumns">
      <template #operation="{ record }">
        <yk-space>
          <yk-button type="text" size="s">编辑</yk-button>
          <yk-button type="text" size="s" danger>删除</yk-button>
        </yk-space>
      </template>
    </yk-table>
    <template #footer>
      <yk-button type="primary" @click="albumModalVisible = false">确定</yk-button>
    </template>
  </yk-modal>
</template>

<script lang="ts" setup>
  import { ref, onMounted, getCurrentInstance } from 'vue'
  
  // 相册数据
  const albums = ref([
    { id: 1, name: '全部照片', count: 42 },
    { id: 2, name: '风景', count: 15 },
    { id: 3, name: '人物', count: 8 },
    { id: 4, name: '动物', count: 12 },
    { id: 5, name: '建筑', count: 7 }
  ])
  
  // 照片数据（示例）
  const photos = ref(Array(20).fill(null).map((_, index) => ({
    id: index + 1,
    name: `照片${index + 1}.jpg`,
    url: `https://picsum.photos/300/200?random=${index + 1}`,
    size: `${Math.floor(Math.random() * 5 + 1)}MB`,
    date: `2023-${Math.floor(Math.random() * 12 + 1)}-${Math.floor(Math.random() * 28 + 1)}`,
    albumId: Math.floor(Math.random() * 5 + 1)
  })))
  
  // 列表视图列设置
  const columns = [
    { title: '照片名称', dataIndex: 'name', width: 200 },
    { title: '大小', dataIndex: 'size', width: 100 },
    { title: '上传日期', dataIndex: 'date', width: 150 },
    { title: '操作', slotName: 'operation', width: 150 }
  ]
  
  // 相册表格列设置
  const albumColumns = [
    { title: '相册名称', dataIndex: 'name', width: 200 },
    { title: '照片数量', dataIndex: 'count', width: 100 },
    { title: '操作', slotName: 'operation', width: 150 }
  ]
  
  // 分页相关
  const currentPage = ref(1)
  const pageSize = ref(12)
  const total = ref(42)
  
  // UI状态控制
  const viewMode = ref('grid') // grid 或 list
  const selectedAlbum = ref('1album')
  const albumName = ref('')
  const uploadModalVisible = ref(false)
  const albumModalVisible = ref(false)
  
  // 获取组件实例
  const proxy: any = getCurrentInstance()?.proxy
  
  // 选择相册
  const selectAlbum = (id: number, type: string) => {
    selectedAlbum.value = id + type
    // 根据相册筛选照片（实际应用中可能需要从API获取）
    // 这里仅做示例
  }
  
  // 切换视图模式
  const toggleViewMode = () => {
    viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
  }
  
  // 显示上传模态框
  const showUploadModal = () => {
    uploadModalVisible.value = true
  }
  
  // 处理上传
  const handleUpload = () => {
    // 处理上传逻辑
    proxy.$message({ type: 'success', message: '照片上传成功！' })
    uploadModalVisible.value = false
  }
  
  // 显示相册管理模态框
  const showModal = () => {
    albumModalVisible.value = true
  }
  
  // 取消创建相册
  const cancel = () => {
    albumName.value = ''
  }
  
  // 确认创建相册
  const confirmNewAlbum = () => {
    if (albumName.value) {
      const newAlbum = {
        id: albums.value.length + 1,
        name: albumName.value,
        count: 0
      }
      albums.value.push(newAlbum)
      albumName.value = ''
      proxy.$message({ type: 'success', message: '创建相册成功！' })
    } else {
      proxy.$message({ type: 'warning', message: '请输入相册名称' })
    }
  }
  
  // 分页变化处理
  const handlePageChange = (page: number) => {
    currentPage.value = page
    // 在实际应用中可能需要从API获取数据
  }
  
  // 搜索照片
  const searchPhotos = (keyword: string) => {
    // 实现搜索功能，这里仅做示例
    proxy.$message({ type: 'info', message: `正在搜索: ${keyword}` })
  }
  
  onMounted(() => {
    // 初始化加载数据
  })
</script>

<style lang="less" scoped>
  .gallery-container {
    padding: @space-xl 0;
    max-width: 1200px;
    margin: 0 auto;
  }

  .gallery-header {
    text-align: center;
    margin-bottom: @space-xl;
  }
  
  .gallery {
    display: flex;
    gap: @space-xl;
    width: 100%;
    
    &__sidebar {
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
      
      &-selected {
        background-color: @pcolor-2;
        color: @pcolor;
      }
      
      &-footer {
        margin-top: auto;
        padding-top: @space-xl;
      }
      
      .yk-text {
        cursor: pointer;
      }
    }
    
    &__content {
      flex: 1;
      background-color: @bg-color-l;
      border-radius: @radius-m;
      padding: @space-l;
      display: flex;
      flex-direction: column;
      gap: @space-l;
    }
    
    &__toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &-left, &-right {
        display: flex;
        align-items: center;
      }
    }
    
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: @space-l;
    }
    
    &__grid-item {
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
    }
    
    &__image-container {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4/3;
    }
    
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    
    &__image-overlay {
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
    
    &__image-info {
      padding: @space-m;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    &__pagination {
      display: flex;
      justify-content: center;
      margin-top: @space-l;
    }
  }
  
  .album-item {
    padding: @space-s @space-m;
    border-radius: @radius-s;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 4px;
    border-left: 3px solid transparent;
    
    &:hover {
      background-color: @pcolor-1;
      border-left-color: @pcolor;
    }
    
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    &__count {
      background-color: @bg-color-m;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
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
  
  .upload-container {
    display: flex;
    gap: @space-xl;
  }
  
  .upload-tips {
    display: flex;
    flex-direction: column;
    gap: @space-s;
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
</style>